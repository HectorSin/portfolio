import { CLICK_CHECK_API_CATALOG } from "@/lib/admin/catalog";
import { getAdminStats, getTotalVisits } from "@/lib/analytics/db";
import { getFeedbackSummary, getRecentFeedback } from "@/lib/feedback/db";

export type AdminOverviewResponse = {
  analytics: Awaited<ReturnType<typeof getAdminStats>>;
  publicStats: {
    totalVisits: number;
    updatedAt: string;
  };
  feedbackSummary: Awaited<ReturnType<typeof getFeedbackSummary>>;
  recentFeedback: Awaited<ReturnType<typeof getRecentFeedback>>;
  apiCatalog: typeof CLICK_CHECK_API_CATALOG;
  generatedAt: string;
};

function maskIp(ip: string): string {
  if (!ip || ip === "unknown") {
    return "unknown";
  }

  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
    }
  }

  if (ip.includes(":")) {
    const parts = ip.split(":");
    if (parts.length > 2) {
      return `${parts.slice(0, 2).join(":")}:****`;
    }
  }

  return "masked";
}

function maskText(text: string | null, visibleLength = 120): string | null {
  if (!text) {
    return null;
  }

  const trimmed = text.trim();
  if (trimmed.length <= visibleLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, visibleLength)}...`;
}

export async function getAdminOverview(): Promise<AdminOverviewResponse> {
  const [analytics, totalVisits, feedbackSummary, recentFeedbackRaw] = await Promise.all([
    getAdminStats(),
    getTotalVisits(),
    getFeedbackSummary(),
    getRecentFeedback(50),
  ]);

  return {
    analytics,
    publicStats: {
      totalVisits,
      updatedAt: new Date().toISOString(),
    },
    feedbackSummary,
    recentFeedback: recentFeedbackRaw.map((row) => ({
      ...row,
      ip: maskIp(row.ip),
      message: maskText(row.message, 240) ?? "",
    })),
    apiCatalog: CLICK_CHECK_API_CATALOG,
    generatedAt: new Date().toISOString(),
  };
}
