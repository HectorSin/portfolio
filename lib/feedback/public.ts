import type { PublicFeedbackStats } from "@/lib/feedback/db";

export async function getPublicFeedbackStatsClient(
  signal?: AbortSignal
): Promise<PublicFeedbackStats | null> {
  try {
    const response = await fetch("/api/feedback/public", {
      method: "GET",
      cache: "no-store",
      signal,
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as Partial<PublicFeedbackStats>;
    if (
      typeof payload.totalEntries !== "number" ||
      typeof payload.last7dEntries !== "number" ||
      typeof payload.withEmailRate !== "number" ||
      typeof payload.updatedAt !== "string"
    ) {
      return null;
    }

    return payload as PublicFeedbackStats;
  } catch {
    return null;
  }
}
