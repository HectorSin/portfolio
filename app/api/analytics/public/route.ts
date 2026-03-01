import { NextResponse } from "next/server";
import { getTotalVisits } from "@/lib/analytics/db";

export const runtime = "nodejs";
export const maxDuration = 10;

export async function GET() {
  try {
    const totalVisits = await getTotalVisits();
    return NextResponse.json(
      { totalVisits, updatedAt: new Date().toISOString() },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { totalVisits: 0, updatedAt: new Date().toISOString() },
      { status: 500 }
    );
  }
}

