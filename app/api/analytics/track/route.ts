import { NextRequest, NextResponse } from "next/server";
import { getSkipReason } from "@/lib/analytics/filter";
import { trackPageView } from "@/lib/analytics/db";

export const runtime = "nodejs";
export const maxDuration = 10;

type TrackBody = {
  path?: string;
  sessionId?: string;
  dedupeWindowMinutes?: number;
};

const SESSION_ID_PATTERN = /^[a-zA-Z0-9._-]{8,128}$/;

function sanitizePath(path: string | undefined): string {
  if (!path || typeof path !== "string") {
    return "/";
  }
  if (!path.startsWith("/")) {
    return "/";
  }
  return path.slice(0, 200);
}

export async function POST(request: NextRequest) {
  let body: TrackBody;
  try {
    body = (await request.json()) as TrackBody;
  } catch {
    return NextResponse.json({ counted: false, reason: "invalid" }, { status: 400 });
  }

  const path = sanitizePath(body.path);
  const sessionId = body.sessionId?.trim() ?? "";
  const dedupeWindowMinutes = Math.min(
    120,
    Math.max(5, body.dedupeWindowMinutes ?? 30)
  );

  if (!SESSION_ID_PATTERN.test(sessionId)) {
    return NextResponse.json({ counted: false, reason: "invalid" }, { status: 400 });
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  const skipReason = getSkipReason(path, userAgent, request.headers);
  if (skipReason !== "ok") {
    return NextResponse.json({ counted: false, reason: skipReason }, { status: 200 });
  }

  try {
    const counted = await trackPageView(path, sessionId, dedupeWindowMinutes);
    return NextResponse.json(
      { counted, reason: counted ? "ok" : "duplicate" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ counted: false, reason: "error" }, { status: 500 });
  }
}

