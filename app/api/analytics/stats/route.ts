import { NextRequest, NextResponse } from "next/server";
import { getAdminStats } from "@/lib/analytics/db";

export const runtime = "nodejs";
export const maxDuration = 10;

function isAuthorized(request: NextRequest): boolean {
  const token = process.env.ADMIN_STATS_TOKEN;
  if (!token) {
    return false;
  }

  const authorization = request.headers.get("authorization") ?? "";
  return authorization === `Bearer ${token}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const stats = await getAdminStats();
    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}

