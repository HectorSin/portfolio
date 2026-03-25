"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useTheme } from "@/contexts/theme-context";
import { getPublicFeedbackStatsClient } from "@/lib/feedback/public";

type PublicFeedbackStats = {
  totalEntries: number;
  last7dEntries: number;
  withEmailRate: number;
  updatedAt: string;
};

const EMPTY_STATS: PublicFeedbackStats = {
  totalEntries: 0,
  last7dEntries: 0,
  withEmailRate: 0,
  updatedAt: "",
};

export default function FeedbackDashboard() {
  const { isDark, isKorean } = useTheme();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState<PublicFeedbackStats>(EMPTY_STATS);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);

  const copy = useMemo(
    () => ({
      sectionId: "feedback",
      eyebrow: "PORTFOLIO SIGNALS",
      title: isKorean
        ? "포트폴리오에 대한　피드백을 남겨주세요."
        : "Leave feedback on this portfolio.",
      descriptionLine1: isKorean
        ? "인상 깊었던 점이나 아쉬웠던 점, 더 보고 싶은 작업을 남겨주시면 실제 업데이트에 반영하고 있습니다."
        : "Share what stood out, what felt weak, or what you want to see next. Real feedback shapes real updates here.",
      descriptionLine2: isKorean
        ? "아래 입력창에 편하게 남겨주세요."
        : "Use the form below and leave your thoughts freely.",
      messageLabel: isKorean ? "피드백" : "Feedback",
      messagePlaceholder: isKorean
        ? "좋았던 점이나 아쉬웠던 점을 편하게 남겨주세요. (짧아도 괜찮습니다)"
        : "Feel free to share what worked well or what felt missing.",
      emailLabel: isKorean ? "이메일 (선택)" : "Email (optional)",
      emailPlaceholder: "reply@example.com",
      submit: isKorean ? "피드백 보내기" : "Send feedback",
      submitting: isKorean ? "저장 중..." : "Saving...",
      formTitle: isKorean ? "피드백 남기기" : "Send Feedback",
      total: isKorean ? "누적 피드백" : "Total feedback",
      recent: isKorean ? "최근 7일" : "Last 7 days",
      contactRate: isKorean ? "연락처 남긴 비율" : "Contact share rate",
      note: isKorean
        ? "남겨주신 피드백과 이메일은 외부에 공개되지 않으며, 포트폴리오 개선을 위한 참고 용도로만 사용됩니다."
        : "Your feedback and email are never shown publicly and are only used to improve the portfolio.",
      success: isKorean ? "피드백이 저장되었습니다." : "Feedback saved.",
      error: isKorean
        ? "피드백 저장에 실패했습니다. 잠시 후 다시 시도해주세요."
        : "Failed to save feedback. Please try again shortly.",
      validation: isKorean
        ? "피드백 내용을 먼저 입력해주세요."
        : "Please enter your feedback first.",
      updatedAt: isKorean ? "업데이트" : "Updated",
      waitingTitle: isKorean
        ? "첫 피드백이 이 섹션을 만듭니다."
        : "The first feedback shapes this section.",
      waitingBody: isKorean
        ? "이 공간은 실제 방문자의 피드백으로 채워집니다."
        : "This space will be filled with real visitor feedback.",
      comingSoon: "Coming Soon",
    }),
    [isKorean]
  );

  useEffect(() => {
    const controller = new AbortController();

    void (async () => {
      const nextStats = await getPublicFeedbackStatsClient(controller.signal);
      if (nextStats) {
        setStats(nextStats);
      }
    })();

    return () => controller.abort();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message.trim()) {
      setStatusType("error");
      setStatusMessage(copy.validation);
      return;
    }

    setIsSubmitting(true);
    setStatusType(null);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          email,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? copy.error);
      }

      setMessage("");
      setEmail("");
      setStatusType("success");
      setStatusMessage(copy.success);

      const refreshedStats = await getPublicFeedbackStatsClient();
      if (refreshedStats) {
        setStats(refreshedStats);
      }
    } catch (error) {
      setStatusType("error");
      setStatusMessage(error instanceof Error ? error.message : copy.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const cardClassName = isDark
    ? "rounded-[28px] border border-white/10 bg-white/5"
    : "rounded-[28px] border border-black/10 bg-white/80";

  const surfaceStyle = {
    backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
    color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
  };

  const statCards = [
    { label: copy.total, value: stats.totalEntries.toLocaleString() },
    { label: copy.recent, value: stats.last7dEntries.toLocaleString() },
    { label: copy.contactRate, value: `${stats.withEmailRate.toFixed(1)}%` },
  ];

  const hasFeedback = stats.totalEntries > 0;

  return (
    <section id={copy.sectionId} className="min-h-screen px-6 py-20" style={surfaceStyle}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className={`${cardClassName} overflow-hidden p-8 md:p-10`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
              {copy.eyebrow}
            </p>
            <h2
              className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl"
              style={{ color: "#C3E41D" }}
            >
              {copy.title}
            </h2>
            <p
              className={`mt-6 max-w-2xl text-lg leading-relaxed ${
                isDark ? "text-neutral-300" : "text-neutral-700"
              }`}
            >
              {isKorean ? (
                <>
                  인상 깊었던 점이나 아쉬웠던 점, 더 보고 싶은 작업을 남겨주시면 실제{" "}
                  <strong>업데이트에 반영</strong>하고 있습니다.
                </>
              ) : (
                copy.descriptionLine1
              )}
            </p>
            <p
              className={`mt-4 max-w-2xl text-base leading-relaxed ${
                isDark ? "text-neutral-100" : "text-neutral-900"
              }`}
            >
              <strong>{copy.descriptionLine2}</strong>
            </p>

            {hasFeedback ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {statCards.map((card) => (
                  <div
                    key={card.label}
                    className={`rounded-3xl border p-5 ${
                      isDark ? "border-white/10 bg-black/40" : "border-black/10 bg-black/[0.03]"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                      {card.label}
                    </p>
                    <p className="mt-3 text-3xl font-bold">{card.value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`mt-12 rounded-[28px] border p-6 ${
                  isDark ? "border-white/10 bg-black/30" : "border-black/10 bg-black/[0.02]"
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
                  {copy.comingSoon}
                </p>
                <p className="mt-3 text-2xl font-bold">
                  {isKorean ? (
                    <>
                      첫 피드백이 <strong>이 섹션을 만듭니다.</strong>
                    </>
                  ) : (
                    copy.waitingTitle
                  )}
                </p>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    isDark ? "text-neutral-300" : "text-neutral-700"
                  }`}
                >
                  {copy.waitingBody}
                </p>
              </div>
            )}

            <div
              className={`mt-8 rounded-3xl border p-5 ${
                isDark
                  ? "border-lime-400/20 bg-lime-400/5 text-neutral-300"
                  : "border-lime-600/20 bg-lime-100/60 text-neutral-700"
              }`}
            >
              <p className="text-sm leading-relaxed">{copy.note}</p>
              <p className="mt-3 text-xs text-neutral-500">
                {copy.updatedAt}:{" "}
                {stats.updatedAt
                  ? new Date(stats.updatedAt).toLocaleString(isKorean ? "ko-KR" : "en-US")
                  : "-"}
              </p>
            </div>
          </div>

          <div className={`${cardClassName} p-8 md:p-10`}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">{copy.formTitle}</h3>
              <div className="h-3 w-3 rounded-full bg-[#C3E41D]" aria-hidden="true" />
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">{copy.messageLabel}</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={copy.messagePlaceholder}
                  className={`min-h-48 w-full rounded-3xl border px-5 py-4 text-sm leading-relaxed outline-none transition focus:border-[#C3E41D] ${
                    isDark
                      ? "border-white/10 bg-black/40 text-white placeholder:text-neutral-500"
                      : "border-black/10 bg-black/[0.03] text-black placeholder:text-neutral-500"
                  }`}
                  maxLength={2000}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">{copy.emailLabel}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={copy.emailPlaceholder}
                  className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-[#C3E41D] ${
                    isDark
                      ? "border-white/10 bg-black/40 text-white placeholder:text-neutral-500"
                      : "border-black/10 bg-black/[0.03] text-black placeholder:text-neutral-500"
                  }`}
                  maxLength={320}
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full px-5 py-3 text-sm font-semibold text-black transition duration-200 hover:scale-[1.01] hover:shadow-[0_18px_40px_rgba(195,228,29,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: "#C3E41D" }}
              >
                {isSubmitting ? copy.submitting : copy.submit}
              </button>
            </form>

            {statusMessage ? (
              <p
                className={`mt-4 text-sm ${
                  statusType === "error"
                    ? "text-red-500"
                    : isDark
                    ? "text-lime-300"
                    : "text-lime-700"
                }`}
              >
                {statusMessage}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
