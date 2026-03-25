import { NextRequest, NextResponse } from "next/server";
import { saveFeedback } from "@/lib/feedback/db";

export const runtime = "nodejs";
export const maxDuration = 10;

type FeedbackRequestBody = {
  message?: string;
  email?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return "unknown";
}

function normalizeMessage(value: string | undefined): string {
  return (value ?? "").trim().replace(/\s+/g, " ").slice(0, 2000);
}

function normalizeEmail(value: string | undefined): string {
  return (value ?? "").trim().slice(0, 320);
}

export async function POST(request: NextRequest) {
  let body: FeedbackRequestBody;

  try {
    body = (await request.json()) as FeedbackRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const message = normalizeMessage(body.message);
  const email = normalizeEmail(body.email);

  if (!message) {
    return NextResponse.json({ error: "Feedback message is required." }, { status: 400 });
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    await saveFeedback({
      message,
      email: email || null,
      ip: getClientIp(request),
      userAgent: request.headers.get("user-agent") ?? "unknown",
      referer: request.headers.get("referer") ?? "unknown",
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save feedback." }, { status: 500 });
  }
}
