import { CLICK_CHECK_API_CATALOG } from "@/lib/admin/catalog";
import { getAdminStats, getTotalVisits } from "@/lib/analytics/db";
import { getChatLogSummary, getRecentChatLogs } from "@/lib/chat/admin";

export type AdminOverviewResponse = {
  analytics: Awaited<ReturnType<typeof getAdminStats>>;
  publicStats: {
    totalVisits: number;
    updatedAt: string;
  };
  chatSummary: Awaited<ReturnType<typeof getChatLogSummary>>;
  recentChatLogs: Awaited<ReturnType<typeof getRecentChatLogs>>;
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
  const [analytics, totalVisits, chatSummary, recentChatLogsRaw] = await Promise.all([
    getAdminStats(),
    getTotalVisits(),
    getChatLogSummary(),
    getRecentChatLogs(50),
  ]);

  return {
    analytics,
    publicStats: {
      totalVisits,
      updatedAt: new Date().toISOString(),
    },
    chatSummary,
    recentChatLogs: recentChatLogsRaw.map((row) => ({
      ...row,
      ip: maskIp(row.ip),
      question: maskText(row.question) ?? "",
      answer: maskText(row.answer, 200),
      error: maskText(row.error, 200),
    })),
    apiCatalog: CLICK_CHECK_API_CATALOG,
    generatedAt: new Date().toISOString(),
  };
}
