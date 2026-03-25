import { sql } from "@vercel/postgres";

export type PublicFeedbackStats = {
  totalEntries: number;
  last7dEntries: number;
  withEmailRate: number;
  updatedAt: string;
};

export type FeedbackSummary = {
  totalEntries: number;
  last24hEntries: number;
  withEmailEntries: number;
  withEmailRate: number;
};

export type FeedbackListItem = {
  id: number;
  message: string;
  email: string | null;
  ip: string;
  userAgent: string;
  referer: string;
  createdAt: string;
};

type FeedbackInput = {
  message: string;
  email?: string | null;
  ip: string;
  userAgent: string;
  referer: string;
};

let schemaReady: Promise<void> | null = null;

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

function clampText(value: string | null | undefined, maxLength: number): string | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim().replace(/\s+/g, " ");
  if (!normalized) {
    return null;
  }

  return normalized.slice(0, maxLength);
}

export async function ensureFeedbackSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS feedback_entries (
          id BIGSERIAL PRIMARY KEY,
          message TEXT NOT NULL,
          email VARCHAR(320),
          ip VARCHAR(100) NOT NULL,
          user_agent TEXT NOT NULL,
          referer TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_feedback_entries_created_at
        ON feedback_entries (created_at DESC);
      `;
    })().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }

  await schemaReady;
}

export async function saveFeedback(input: FeedbackInput): Promise<void> {
  await ensureFeedbackSchema();

  const message = clampText(input.message, 2000) ?? "";
  const email = clampText(input.email, 320);
  const ip = clampText(input.ip, 100) ?? "unknown";
  const userAgent = clampText(input.userAgent, 1000) ?? "unknown";
  const referer = clampText(input.referer, 1000) ?? "unknown";

  await sql`
    INSERT INTO feedback_entries (message, email, ip, user_agent, referer)
    VALUES (${message}, ${email}, ${ip}, ${userAgent}, ${referer});
  `;
}

export async function getPublicFeedbackStats(): Promise<PublicFeedbackStats> {
  await ensureFeedbackSchema();

  const result = await sql<{
    total_entries: number | string;
    last_7d_entries: number | string;
    with_email_entries: number | string;
  }>`
    SELECT
      COUNT(*)::bigint AS total_entries,
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::bigint AS last_7d_entries,
      COUNT(*) FILTER (WHERE email IS NOT NULL AND LENGTH(TRIM(email)) > 0)::bigint AS with_email_entries
    FROM feedback_entries;
  `;

  const totalEntries = toNumber(result.rows[0]?.total_entries ?? 0);
  const withEmailEntries = toNumber(result.rows[0]?.with_email_entries ?? 0);

  return {
    totalEntries,
    last7dEntries: toNumber(result.rows[0]?.last_7d_entries ?? 0),
    withEmailRate: totalEntries > 0 ? Number(((withEmailEntries / totalEntries) * 100).toFixed(1)) : 0,
    updatedAt: new Date().toISOString(),
  };
}

export async function getFeedbackSummary(): Promise<FeedbackSummary> {
  await ensureFeedbackSchema();

  const result = await sql<{
    total_entries: number | string;
    last_24h_entries: number | string;
    with_email_entries: number | string;
  }>`
    SELECT
      COUNT(*)::bigint AS total_entries,
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours')::bigint AS last_24h_entries,
      COUNT(*) FILTER (WHERE email IS NOT NULL AND LENGTH(TRIM(email)) > 0)::bigint AS with_email_entries
    FROM feedback_entries;
  `;

  const totalEntries = toNumber(result.rows[0]?.total_entries ?? 0);
  const withEmailEntries = toNumber(result.rows[0]?.with_email_entries ?? 0);

  return {
    totalEntries,
    last24hEntries: toNumber(result.rows[0]?.last_24h_entries ?? 0),
    withEmailEntries,
    withEmailRate: totalEntries > 0 ? Number(((withEmailEntries / totalEntries) * 100).toFixed(2)) : 0,
  };
}

export async function getRecentFeedback(limit = 50): Promise<FeedbackListItem[]> {
  await ensureFeedbackSchema();
  const normalizedLimit = Math.min(200, Math.max(1, limit));

  const result = await sql<{
    id: number;
    message: string;
    email: string | null;
    ip: string;
    user_agent: string;
    referer: string;
    created_at: string;
  }>`
    SELECT
      id,
      message,
      email,
      ip,
      user_agent,
      referer,
      TO_CHAR(created_at AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD HH24:MI:SS') AS created_at
    FROM feedback_entries
    ORDER BY created_at DESC
    LIMIT ${normalizedLimit};
  `;

  return result.rows.map((row) => ({
    id: row.id,
    message: row.message,
    email: row.email,
    ip: row.ip,
    userAgent: row.user_agent,
    referer: row.referer,
    createdAt: row.created_at,
  }));
}
