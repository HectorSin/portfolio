"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useTheme } from "@/contexts/theme-context";
import MarkdownMessage from "@/components/chat/markdown-message";

type UiMessage = {
  role: "user" | "assistant";
  content: string;
  citationMap?: CitationMap;
};

type SourceRef = {
  id: string;
  title: string;
  sectionId: string;
  citationNumber: number;
};

type CitationRef = {
  id: string;
  title: string;
  sectionId: string;
};

type CitationMap = Record<number, CitationRef>;

const WELCOME_MESSAGE = {
  ko: "안녕하세요. 포트폴리오 기반으로 Jaehyun Sin에 대해 답변해드릴게요. 프로젝트, 기술 스택, 경력, 협업 방식 등을 물어보세요.",
  en: "Hello. I can answer portfolio-based questions about Jaehyun Sin. Ask about projects, tech stack, experience, or collaboration style.",
};

export default function ChatWidget() {
  const { isDark, isKorean } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sources, setSources] = useState<SourceRef[]>([]);
  const [messages, setMessages] = useState<UiMessage[]>([
    { role: "assistant", content: isKorean ? WELCOME_MESSAGE.ko : WELCOME_MESSAGE.en },
  ]);

  const labels = useMemo(
    () => ({
      title: isKorean ? "포트폴리오 챗봇" : "Portfolio Chatbot",
      placeholder: isKorean ? "질문을 입력하세요..." : "Type your question...",
      send: isKorean ? "보내기" : "Send",
      opening: isKorean ? "챗 열기" : "Open chat",
      close: isKorean ? "닫기" : "Close",
      loading: isKorean ? "답변 생성 중..." : "Generating answer...",
      error: isKorean
        ? "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        : "A temporary error occurred. Please try again shortly.",
      sources: isKorean ? "참고 소스" : "Sources",
    }),
    [isKorean]
  );

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length !== 1 || prev[0].role !== "assistant") {
        return prev;
      }

      return [{ role: "assistant", content: isKorean ? WELCOME_MESSAGE.ko : WELCOME_MESSAGE.en }];
    });
  }, [isKorean]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question || isLoading) {
      return;
    }

    const nextMessages = [...messages, { role: "user" as const, content: question }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setSources([]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const payload = (await response.json()) as {
        answer?: string;
        error?: string;
        sources?: SourceRef[];
        citationMap?: CitationMap;
      };

      if (!response.ok || !payload.answer) {
        throw new Error(payload.error ?? "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: payload.answer as string,
          citationMap: payload.citationMap ?? {},
        },
      ]);
      setSources(payload.sources ?? []);
    } catch (error) {
      const detail =
        error instanceof Error && error.message ? error.message : labels.error;
      setMessages((prev) => [...prev, { role: "assistant", content: detail }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSourceClick(sectionId: string) {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (!sectionId) {
      return;
    }

    window.location.hash = sectionId;
  }

  function handleCitationClick(citationNumber: number, citationMap?: CitationMap) {
    const citation = citationMap?.[citationNumber];
    if (!citation) {
      return;
    }
    handleSourceClick(citation.sectionId);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed right-4 bottom-4 z-[120] rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C3E41D]"
        style={{
          backgroundColor: "#C3E41D",
          color: "hsl(0 0% 10%)",
        }}
        aria-label={isOpen ? labels.close : labels.opening}
      >
        {isOpen ? labels.close : labels.title}
      </button>

      {isOpen && (
        <section
          className="fixed right-4 bottom-20 z-[120] flex h-[70vh] max-h-[560px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border shadow-2xl"
          style={{
            backgroundColor: isDark ? "hsl(0 0% 6%)" : "hsl(0 0% 100%)",
            borderColor: isDark ? "hsl(0 0% 20%)" : "hsl(0 0% 85%)",
            color: isDark ? "hsl(0 0% 96%)" : "hsl(0 0% 12%)",
          }}
          aria-label={labels.title}
        >
          <header
            className="border-b px-4 py-3 text-sm font-semibold"
            style={{
              borderColor: isDark ? "hsl(0 0% 20%)" : "hsl(0 0% 88%)",
            }}
          >
            {labels.title}
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === "user" ? "ml-auto" : "mr-auto"
                }`}
                style={{
                  backgroundColor:
                    message.role === "user"
                      ? "#C3E41D"
                      : isDark
                      ? "hsl(0 0% 14%)"
                      : "hsl(0 0% 94%)",
                  color:
                    message.role === "user"
                      ? "hsl(0 0% 8%)"
                      : isDark
                      ? "hsl(0 0% 96%)"
                      : "hsl(0 0% 12%)",
                }}
              >
                {message.role === "assistant" ? (
                  <MarkdownMessage
                    content={message.content}
                    isDark={isDark}
                    citationMap={message.citationMap}
                    onCitationClick={(citationNumber) => handleCitationClick(citationNumber, message.citationMap)}
                  />
                ) : (
                  message.content
                )}
              </div>
            ))}
            {isLoading && (
              <p className="text-xs" style={{ opacity: 0.8 }}>
                {labels.loading}
              </p>
            )}
            {sources.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs" style={{ opacity: 0.85 }}>
                  {labels.sources}
                </p>
                <div className="flex flex-wrap gap-1">
                  {sources.map((source) => (
                    <button
                      key={source.id}
                      type="button"
                      onClick={() => handleSourceClick(source.sectionId)}
                      className="rounded-full px-2 py-1 text-[11px] underline underline-offset-2"
                      style={{
                        backgroundColor: isDark ? "hsl(0 0% 16%)" : "hsl(0 0% 90%)",
                      }}
                    >
                      [{source.citationNumber}] {source.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t p-3"
            style={{
              borderColor: isDark ? "hsl(0 0% 20%)" : "hsl(0 0% 88%)",
            }}
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={labels.placeholder}
                className="w-full rounded-lg border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#C3E41D]"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 10%)" : "hsl(0 0% 100%)",
                  borderColor: isDark ? "hsl(0 0% 24%)" : "hsl(0 0% 82%)",
                  color: isDark ? "hsl(0 0% 96%)" : "hsl(0 0% 8%)",
                }}
                maxLength={1200}
                aria-label={labels.placeholder}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-lg px-3 py-2 text-sm font-semibold disabled:opacity-60"
                style={{
                  backgroundColor: "#C3E41D",
                  color: "hsl(0 0% 10%)",
                }}
              >
                {labels.send}
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
