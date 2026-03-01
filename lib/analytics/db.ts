import { sql } from "@vercel/postgres";
import { getKstDateParts, getWindowBucket } from "@/lib/analytics/time";

type DailyStat = {
  date: string;
  visits: number;
};

type MonthlyStat = {
  month: string;
  visits: number;
};

type IpVisitStat = {
  ip: string;
  visitCount: number;
  firstSeenAt: string;
  lastSeenAt: string;
};

export type AdminAnalyticsStats = {
  totalVisits: number;
  todayVisits: number;
  monthVisits: number;
  totalUsers: number;
  returningUsers: number;
  revisitRate: number;
  recentIpVisits: IpVisitStat[];
  daily: DailyStat[];
  monthly: MonthlyStat[];
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

async function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS analytics_totals (
          id SMALLINT PRIMARY KEY CHECK (id = 1),
          total_visits BIGINT NOT NULL DEFAULT 0,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS analytics_daily (
          visit_date DATE PRIMARY KEY,
          visits BIGINT NOT NULL DEFAULT 0,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS analytics_monthly (
          visit_month CHAR(7) PRIMARY KEY,
          visits BIGINT NOT NULL DEFAULT 0,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS analytics_dedupe (
          dedupe_key TEXT PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS analytics_ip_visits (
          ip VARCHAR(100) PRIMARY KEY,
          visit_count BIGINT NOT NULL DEFAULT 0,
          first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `;

      await sql`
        CREATE INDEX IF NOT EXISTS idx_analytics_ip_last_seen
        ON analytics_ip_visits (last_seen_at DESC);
      `;

      await sql`
        INSERT INTO analytics_totals (id, total_visits)
        VALUES (1, 0)
        ON CONFLICT (id) DO NOTHING;
      `;
    })().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }

  await schemaReady;
}

export async function trackPageView(
  path: string,
  sessionId: string,
  dedupeWindowMinutes: number,
  ip: string
): Promise<boolean> {
  await ensureSchema();

  const now = new Date();
  const { date, month } = getKstDateParts(now);
  const bucket = getWindowBucket(dedupeWindowMinutes, now.getTime());
  const dedupeKey = `${sessionId}:${path}:${dedupeWindowMinutes}:${bucket}`;
  const hasTrackableIp = Boolean(ip && ip !== "unknown");

  const result = await sql<{ counted: number }>`
    WITH inserted AS (
      INSERT INTO analytics_dedupe (dedupe_key, created_at)
      VALUES (${dedupeKey}, NOW())
      ON CONFLICT (dedupe_key) DO NOTHING
      RETURNING 1 AS ok
    ),
    bump_total AS (
      INSERT INTO analytics_totals (id, total_visits, updated_at)
      SELECT 1, 1, NOW() FROM inserted
      ON CONFLICT (id) DO UPDATE
      SET total_visits = analytics_totals.total_visits + 1,
          updated_at = NOW()
      RETURNING 1
    ),
    bump_daily AS (
      INSERT INTO analytics_daily (visit_date, visits, updated_at)
      SELECT ${date}::date, 1, NOW() FROM inserted
      ON CONFLICT (visit_date) DO UPDATE
      SET visits = analytics_daily.visits + 1,
          updated_at = NOW()
      RETURNING 1
    ),
    bump_monthly AS (
      INSERT INTO analytics_monthly (visit_month, visits, updated_at)
      SELECT ${month}, 1, NOW() FROM inserted
      ON CONFLICT (visit_month) DO UPDATE
      SET visits = analytics_monthly.visits + 1,
          updated_at = NOW()
      RETURNING 1
    ),
    bump_ip AS (
      INSERT INTO analytics_ip_visits (ip, visit_count, first_seen_at, last_seen_at, updated_at)
      SELECT ${ip}, 1, NOW(), NOW(), NOW()
      FROM inserted
      WHERE ${hasTrackableIp}
      ON CONFLICT (ip) DO UPDATE
      SET visit_count = analytics_ip_visits.visit_count + 1,
          last_seen_at = NOW(),
          updated_at = NOW()
      RETURNING 1
    )
    SELECT COALESCE((SELECT ok FROM inserted LIMIT 1), 0)::int AS counted;
  `;

  return result.rows[0]?.counted === 1;
}

export async function getTotalVisits(): Promise<number> {
  await ensureSchema();
  const result = await sql<{ total_visits: number | string }>`
    SELECT total_visits
    FROM analytics_totals
    WHERE id = 1
    LIMIT 1;
  `;
  return toNumber(result.rows[0]?.total_visits ?? 0);
}

export async function getAdminStats(): Promise<AdminAnalyticsStats> {
  await ensureSchema();

  const { date, month } = getKstDateParts();

  const [
    totalResult,
    dayResult,
    monthResult,
    userStatsResult,
    dailyResult,
    monthlyResult,
    recentIpResult,
  ] = await Promise.all([
    sql<{ total_visits: number | string }>`
      SELECT total_visits
      FROM analytics_totals
      WHERE id = 1
      LIMIT 1;
    `,
    sql<{ visits: number | string }>`
      SELECT visits
      FROM analytics_daily
      WHERE visit_date = ${date}::date
      LIMIT 1;
    `,
    sql<{ visits: number | string }>`
      SELECT visits
      FROM analytics_monthly
      WHERE visit_month = ${month}
      LIMIT 1;
    `,
    sql<{ total_users: number | string; returning_users: number | string }>`
      SELECT
        COUNT(*)::bigint AS total_users,
        COUNT(*) FILTER (WHERE visit_count > 1)::bigint AS returning_users
      FROM analytics_ip_visits;
    `,
    sql<{ date: string; visits: number | string }>`
      SELECT TO_CHAR(visit_date, 'YYYY-MM-DD') AS date, visits
      FROM analytics_daily
      ORDER BY visit_date DESC
      LIMIT 30;
    `,
    sql<{ month: string; visits: number | string }>`
      SELECT visit_month AS month, visits
      FROM analytics_monthly
      ORDER BY visit_month DESC
      LIMIT 12;
    `,
    sql<{ ip: string; visit_count: number | string; first_seen_at: string; last_seen_at: string }>`
      SELECT
        ip,
        visit_count,
        TO_CHAR(first_seen_at AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD HH24:MI:SS') AS first_seen_at,
        TO_CHAR(last_seen_at AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD HH24:MI:SS') AS last_seen_at
      FROM analytics_ip_visits
      ORDER BY last_seen_at DESC
      LIMIT 100;
    `,
  ]);

  const totalUsers = toNumber(userStatsResult.rows[0]?.total_users ?? 0);
  const returningUsers = toNumber(userStatsResult.rows[0]?.returning_users ?? 0);
  const revisitRate =
    totalUsers > 0 ? Number(((returningUsers / totalUsers) * 100).toFixed(2)) : 0;

  return {
    totalVisits: toNumber(totalResult.rows[0]?.total_visits ?? 0),
    todayVisits: toNumber(dayResult.rows[0]?.visits ?? 0),
    monthVisits: toNumber(monthResult.rows[0]?.visits ?? 0),
    totalUsers,
    returningUsers,
    revisitRate,
    recentIpVisits: recentIpResult.rows.map((row) => ({
      ip: row.ip,
      visitCount: toNumber(row.visit_count),
      firstSeenAt: row.first_seen_at,
      lastSeenAt: row.last_seen_at,
    })),
    daily: dailyResult.rows
      .map((row) => ({ date: row.date, visits: toNumber(row.visits) }))
      .reverse(),
    monthly: monthlyResult.rows
      .map((row) => ({ month: row.month, visits: toNumber(row.visits) }))
      .reverse(),
  };
}
