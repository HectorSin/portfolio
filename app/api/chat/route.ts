import { NextRequest, NextResponse } from "next/server";
import { getRelevantKnowledge } from "@/lib/chat/knowledge";
import { buildUserPrompt, CHAT_SYSTEM_PROMPT } from "@/lib/chat/prompt";
import { checkRateLimit } from "@/lib/chat/rate-limit";
import { saveChatLog } from "@/lib/chat/log";

export const runtime = "nodejs";
export const maxDuration = 30;

type ChatRole = "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
}

type CitationSource = {
  id: string;
  title: string;
  sectionId: string;
  citationNumber: number;
};

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return "unknown";
}

function sanitizeMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .slice(-MAX_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }))
    .filter((message) => message.content.length > 0);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const referer = request.headers.get("referer") ?? "unknown";
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please retry shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds ?? 30),
        },
      }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is missing GEMINI_API_KEY." },
      { status: 500 }
    );
  }

  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body?.messages || !Array.isArray(body.messages)) {
    return NextResponse.json({ error: "messages array is required." }, { status: 400 });
  }

  const messages = sanitizeMessages(body.messages);
  if (messages.length === 0) {
    return NextResponse.json({ error: "At least one message is required." }, { status: 400 });
  }

  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  if (!latestUserMessage) {
    return NextResponse.json({ error: "A user message is required." }, { status: 400 });
  }

  const relevantKnowledge = getRelevantKnowledge(latestUserMessage.content);
  const knowledgeContext = relevantKnowledge
    .map((snippet, index) => `${index + 1}. [${snippet.title}] ${snippet.content}`)
    .join("\n");
  const userPrompt = buildUserPrompt(latestUserMessage.content, knowledgeContext);

  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: CHAT_SYSTEM_PROMPT }],
        },
        generationConfig: {
          temperature: 0.2,
        },
        contents: [
          ...messages.slice(0, -1).map((message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [{ text: message.content }],
          })),
          { role: "user", parts: [{ text: userPrompt }] },
        ],
      }),
      signal: controller.signal,
    });

    if (!upstream.ok) {
      const fallbackText = await upstream.text();
      try {
        await saveChatLog({
          question: latestUserMessage.content,
          error: fallbackText.slice(0, 400),
          model,
          ip,
          userAgent,
          referer,
        });
      } catch {
        // Ignore logging errors to keep chat availability.
      }
      return NextResponse.json(
        { error: "LLM request failed.", detail: fallbackText.slice(0, 400) },
        { status: 502 }
      );
    }

    const completion = (await upstream.json()) as GeminiResponse;
    const answer = completion.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();

    if (!answer) {
      return NextResponse.json({ error: "LLM returned an empty response." }, { status: 502 });
    }

    const sources: CitationSource[] = relevantKnowledge.map((item, index) => ({
      id: item.id,
      title: item.title,
      sectionId: item.sectionId,
      citationNumber: index + 1,
    }));
    const citationMap = Object.fromEntries(
      sources.map((source) => [
        source.citationNumber,
        { id: source.id, title: source.title, sectionId: source.sectionId },
      ])
    );

    try {
      await saveChatLog({
        question: latestUserMessage.content,
        answer,
        model,
        ip,
        userAgent,
        referer,
      });
    } catch {
      // Ignore logging errors to keep chat availability.
    }

    return NextResponse.json({ answer, sources, citationMap });
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "LLM request timed out."
        : "Unexpected server error.";

    try {
      await saveChatLog({
        question: latestUserMessage.content,
        error: message,
        model,
        ip,
        userAgent,
        referer,
      });
    } catch {
      // Ignore logging errors to keep chat availability.
    }

    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    clearTimeout(timeout);
  }
}
