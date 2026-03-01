import { sql } from "@vercel/postgres";
import { ensureChatLogSchema } from "@/lib/chat/log";

type ModelStat = {
  model: string;
  count: number;
};

export type ChatLogSummary = {
  totalLogs: number;
  last24hLogs: number;
  errorRate: number;
  models: ModelStat[];
};

export type ChatLogListItem = {
  id: number;
  question: string;
  answer: string | null;
  error: string | null;
  model: string;
  ip: string;
  userAgent: string;
  referer: string;
  createdAt: string;
};

function toNumber(value: unknown): number {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

export async function getChatLogSummary(): Promise<ChatLogSummary> {
  await ensureChatLogSchema();

  const [totalsResult, modelsResult] = await Promise.all([
    sql<{ total_logs: number | string; last_24h_logs: number | string; error_logs: number | string }>`
      SELECT
        COUNT(*)::bigint AS total_logs,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours')::bigint AS last_24h_logs,
        COUNT(*) FILTER (WHERE error IS NOT NULL AND LENGTH(TRIM(error)) > 0)::bigint AS error_logs
      FROM chat_logs;
    `,
    sql<{ model: string; count: number | string }>`
      SELECT model, COUNT(*)::bigint AS count
      FROM chat_logs
      GROUP BY model
      ORDER BY count DESC
      LIMIT 10;
    `,
  ]);

  const totalLogs = toNumber(totalsResult.rows[0]?.total_logs ?? 0);
  const errorLogs = toNumber(totalsResult.rows[0]?.error_logs ?? 0);
  const errorRate = totalLogs > 0 ? Number(((errorLogs / totalLogs) * 100).toFixed(2)) : 0;

  return {
    totalLogs,
    last24hLogs: toNumber(totalsResult.rows[0]?.last_24h_logs ?? 0),
    errorRate,
    models: modelsResult.rows.map((row) => ({
      model: row.model,
      count: toNumber(row.count),
    })),
  };
}

export async function getRecentChatLogs(limit = 50): Promise<ChatLogListItem[]> {
  await ensureChatLogSchema();
  const normalizedLimit = Math.min(200, Math.max(1, limit));

  const result = await sql<{
    id: number;
    question: string;
    answer: string | null;
    error: string | null;
    model: string;
    ip: string;
    user_agent: string;
    referer: string;
    created_at: string;
  }>`
    SELECT
      id,
      question,
      answer,
      error,
      model,
      ip,
      user_agent,
      referer,
      TO_CHAR(created_at AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD HH24:MI:SS') AS created_at
    FROM chat_logs
    ORDER BY created_at DESC
    LIMIT ${normalizedLimit};
  `;

  return result.rows.map((row) => ({
    id: row.id,
    question: row.question,
    answer: row.answer,
    error: row.error,
    model: row.model,
    ip: row.ip,
    userAgent: row.user_agent,
    referer: row.referer,
    createdAt: row.created_at,
  }));
}
