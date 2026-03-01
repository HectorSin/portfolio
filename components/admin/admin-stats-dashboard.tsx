"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";
import type { AdminOverviewResponse } from "@/lib/admin/overview";

type LoadStatus = "loading" | "ready" | "unauthorized" | "error";

const numberFormatter = new Intl.NumberFormat("ko-KR");

function metricValue(value: number): string {
  return numberFormatter.format(value);
}

function percentValue(value: number): string {
  return `${value.toFixed(2)}%`;
}

type BarRow = {
  label: string;
  visits: number;
};

function Bars({ data }: { data: BarRow[] }) {
  const maxValue = Math.max(1, ...data.map((item) => item.visits));

  if (data.length === 0) {
    return <p className="text-sm text-neutral-500">No data</p>;
  }

  return (
    <div className="space-y-2">
      {data.map((item) => (
        <div key={item.label} className="space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-600">
            <span>{item.label}</span>
            <span>{metricValue(item.visits)}</span>
          </div>
          <div className="h-2 rounded bg-neutral-200">
            <div
              className="h-2 rounded bg-[#C3E41D]"
              style={{ width: `${Math.max(4, (item.visits / maxValue) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

type AdminStatsDashboardProps = {
  initialOverview: AdminOverviewResponse | null;
  initiallyAuthorized: boolean;
};

export default function AdminStatsDashboard({
  initialOverview,
  initiallyAuthorized,
}: AdminStatsDashboardProps) {
  const [status, setStatus] = useState<LoadStatus>(() =>
    initialOverview ? "ready" : initiallyAuthorized ? "error" : "unauthorized"
  );
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [overview, setOverview] = useState<AdminOverviewResponse | null>(initialOverview);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const loadOverview = useCallback(async (manualReload = true) => {
    if (manualReload) {
      setStatus("loading");
      setError(null);
    }

    try {
      const response = await fetch("/api/admin/overview", {
        method: "GET",
        cache: "no-store",
      });

      if (response.status === 401) {
        setStatus("unauthorized");
        setOverview(null);
        return;
      }

      if (!response.ok) {
        setStatus("error");
        setError("관리자 데이터를 불러오지 못했습니다.");
        return;
      }

      const payload = (await response.json()) as AdminOverviewResponse;
      setOverview(payload);
      setStatus("ready");
    } catch {
      setStatus("error");
      setError("네트워크 오류로 데이터를 불러오지 못했습니다.");
    }
  }, []);

  const onLogin = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setIsAuthenticating(true);
      setStatus("loading");

      try {
        const response = await fetch("/api/admin/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          setStatus("unauthorized");
          setError("토큰이 올바르지 않습니다.");
          setIsAuthenticating(false);
          return;
        }

        setToken("");
        await loadOverview(false);
        setIsAuthenticating(false);
      } catch {
        setStatus("unauthorized");
        setError("로그인 요청에 실패했습니다.");
        setIsAuthenticating(false);
      }
    },
    [loadOverview, token]
  );

  const onLogout = useCallback(async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setOverview(null);
    setStatus("unauthorized");
  }, []);

  const dailyBars = useMemo(
    () =>
      (overview?.analytics.daily ?? []).map((item) => ({
        label: item.date.slice(5),
        visits: item.visits,
      })),
    [overview]
  );

  const monthlyBars = useMemo(
    () =>
      (overview?.analytics.monthly ?? []).map((item) => ({
        label: item.month,
        visits: item.visits,
      })),
    [overview]
  );

  const needsAuth = status === "unauthorized" || (!overview && status !== "loading");

  if (needsAuth) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-neutral-300 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold">Admin Access</h1>
        <p className="mt-2 text-sm text-neutral-600">
          `ADMIN_STATS_TOKEN`을 입력해야 관리자 통계 페이지에 접근할 수 있습니다.
        </p>
        <form className="mt-4 space-y-3" onSubmit={onLogin}>
          <input
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="ADMIN_STATS_TOKEN"
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[#C3E41D]"
            autoComplete="off"
          />
          <button
            type="submit"
            className="w-full rounded bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-85"
            disabled={isAuthenticating}
          >
            {isAuthenticating ? "Checking..." : "Sign In"}
          </button>
        </form>
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center text-sm text-neutral-600">Loading...</div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-8">
      <div className="flex flex-col gap-3 rounded-xl border border-neutral-300 bg-white p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Stats</h1>
          <p className="text-xs text-neutral-600">Generated: {overview.generatedAt}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void loadOverview()}
            className="rounded border border-neutral-400 px-3 py-2 text-sm hover:bg-neutral-100"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => void onLogout()}
            className="rounded bg-neutral-900 px-3 py-2 text-sm text-white hover:opacity-90"
          >
            Logout
          </button>
        </div>
      </div>

      <section className="rounded-xl border border-neutral-300 bg-white p-4">
        <h2 className="text-lg font-semibold">API Catalog (click_check)</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-neutral-600">
              <tr>
                <th className="py-2">Method</th>
                <th className="py-2">Path</th>
                <th className="py-2">Auth</th>
                <th className="py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {overview.apiCatalog.map((item) => (
                <tr key={`${item.method}-${item.path}`} className="border-t border-neutral-200">
                  <td className="py-2 font-mono text-xs">{item.method}</td>
                  <td className="py-2 font-mono text-xs">{item.path}</td>
                  <td className="py-2">{item.auth}</td>
                  <td className="py-2 text-neutral-700">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-neutral-300 bg-white p-4">
        <h2 className="text-lg font-semibold">Analytics</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded border border-neutral-200 p-3">
            <p className="text-xs text-neutral-600">Total Visits</p>
            <p className="text-xl font-semibold">{metricValue(overview.analytics.totalVisits)}</p>
          </div>
          <div className="rounded border border-neutral-200 p-3">
            <p className="text-xs text-neutral-600">Today Visits</p>
            <p className="text-xl font-semibold">{metricValue(overview.analytics.todayVisits)}</p>
          </div>
          <div className="rounded border border-neutral-200 p-3">
            <p className="text-xs text-neutral-600">Month Visits</p>
            <p className="text-xl font-semibold">{metricValue(overview.analytics.monthVisits)}</p>
          </div>
          <div className="rounded border border-neutral-200 p-3">
            <p className="text-xs text-neutral-600">Total Users</p>
            <p className="text-xl font-semibold">{metricValue(overview.analytics.totalUsers)}</p>
          </div>
          <div className="rounded border border-neutral-200 p-3">
            <p className="text-xs text-neutral-600">Returning Users</p>
            <p className="text-xl font-semibold">{metricValue(overview.analytics.returningUsers)}</p>
          </div>
          <div className="rounded border border-neutral-200 p-3">
            <p className="text-xs text-neutral-600">Revisit Rate</p>
            <p className="text-xl font-semibold">{percentValue(overview.analytics.revisitRate)}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded border border-neutral-200 p-3">
            <h3 className="mb-2 text-sm font-semibold">Daily (30d)</h3>
            <Bars data={dailyBars} />
          </div>
          <div className="rounded border border-neutral-200 p-3">
            <h3 className="mb-2 text-sm font-semibold">Monthly (12m)</h3>
            <Bars data={monthlyBars} />
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold">Recent IP Visits</h3>
          <div className="mt-2 max-h-64 overflow-y-auto rounded border border-neutral-200">
            <table className="min-w-full text-left text-xs">
              <thead className="sticky top-0 bg-white text-neutral-600">
                <tr>
                  <th className="px-2 py-2">IP</th>
                  <th className="px-2 py-2">Count</th>
                  <th className="px-2 py-2">First Seen</th>
                  <th className="px-2 py-2">Last Seen</th>
                </tr>
              </thead>
              <tbody>
                {overview.analytics.recentIpVisits.map((row) => (
                  <tr key={`${row.ip}-${row.lastSeenAt}`} className="border-t border-neutral-200">
                    <td className="px-2 py-2 font-mono">{row.ip}</td>
                    <td className="px-2 py-2">{metricValue(row.visitCount)}</td>
                    <td className="px-2 py-2">{row.firstSeenAt}</td>
                    <td className="px-2 py-2">{row.lastSeenAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-neutral-300 bg-white p-4">
        <h2 className="text-lg font-semibold">Chat Logs</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <div className="rounded border border-neutral-200 p-3">
            <p className="text-xs text-neutral-600">Total Logs</p>
            <p className="text-xl font-semibold">{metricValue(overview.chatSummary.totalLogs)}</p>
          </div>
          <div className="rounded border border-neutral-200 p-3">
            <p className="text-xs text-neutral-600">Last 24h</p>
            <p className="text-xl font-semibold">{metricValue(overview.chatSummary.last24hLogs)}</p>
          </div>
          <div className="rounded border border-neutral-200 p-3">
            <p className="text-xs text-neutral-600">Error Rate</p>
            <p className="text-xl font-semibold">{percentValue(overview.chatSummary.errorRate)}</p>
          </div>
          <div className="rounded border border-neutral-200 p-3">
            <p className="text-xs text-neutral-600">Public Total Visits</p>
            <p className="text-xl font-semibold">{metricValue(overview.publicStats.totalVisits)}</p>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold">Model Distribution</h3>
          <ul className="mt-2 space-y-1 text-sm text-neutral-700">
            {overview.chatSummary.models.map((item) => (
              <li key={item.model} className="flex justify-between rounded border border-neutral-200 px-2 py-1">
                <span className="font-mono text-xs">{item.model}</span>
                <span>{metricValue(item.count)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold">Recent Chat Logs (Masked)</h3>
          <div className="mt-2 space-y-2">
            {overview.recentChatLogs.map((row) => (
              <details key={row.id} className="rounded border border-neutral-200 p-3">
                <summary className="cursor-pointer text-sm font-medium">
                  #{row.id} [{row.model}] {row.createdAt} | IP: {row.ip}
                </summary>
                <div className="mt-2 space-y-2 text-xs">
                  <p>
                    <span className="font-semibold">Q:</span> {row.question}
                  </p>
                  <p>
                    <span className="font-semibold">A:</span> {row.answer ?? "-"}
                  </p>
                  <p>
                    <span className="font-semibold">Error:</span> {row.error ?? "-"}
                  </p>
                  <p>
                    <span className="font-semibold">Referer:</span> {row.referer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
