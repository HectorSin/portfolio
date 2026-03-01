export type ApiCatalogItem = {
  path: string;
  method: "GET" | "POST";
  auth: "public" | "bearer" | "internal";
  description: string;
  branchWork: string;
};

export const CLICK_CHECK_API_CATALOG: ApiCatalogItem[] = [
  {
    path: "/api/analytics/public",
    method: "GET",
    auth: "public",
    description: "Returns total visitor count for hero UI.",
    branchWork: "Visitor analytics public counter",
  },
  {
    path: "/api/analytics/track",
    method: "POST",
    auth: "public",
    description: "Tracks page view with dedupe and bot filtering.",
    branchWork: "Visitor analytics tracking",
  },
  {
    path: "/api/analytics/stats",
    method: "GET",
    auth: "bearer",
    description: "Returns admin analytics stats via ADMIN_STATS_TOKEN.",
    branchWork: "Admin analytics stats with IP/revisit metrics",
  },
  {
    path: "/api/chat",
    method: "POST",
    auth: "public",
    description: "Chat completion endpoint with rate limit and Q/A logging.",
    branchWork: "Chat logging persistence to Postgres",
  },
];
