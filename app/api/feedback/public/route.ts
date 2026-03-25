import { NextResponse } from "next/server";
import { getPublicFeedbackStats } from "@/lib/feedback/db";

export const runtime = "nodejs";
export const maxDuration = 10;

export async function GET() {
  try {
    const stats = await getPublicFeedbackStats();
    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      {
        totalEntries: 0,
        last7dEntries: 0,
        withEmailRate: 0,
        updatedAt: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
