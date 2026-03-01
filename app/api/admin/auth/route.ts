import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  buildAdminSessionValue,
  isAdminTokenValid,
} from "@/lib/admin/auth";

export const runtime = "nodejs";
export const maxDuration = 10;

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

type AuthRequestBody = {
  token?: string;
};

function setSessionCookie(response: NextResponse, value: string) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function POST(request: NextRequest) {
  const expectedSession = buildAdminSessionValue();
  if (!expectedSession) {
    return NextResponse.json({ error: "ADMIN_STATS_TOKEN is not configured." }, { status: 500 });
  }

  let body: AuthRequestBody;
  try {
    body = (await request.json()) as AuthRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const token = body.token?.trim() ?? "";
  if (!isAdminTokenValid(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = new NextResponse(null, { status: 204 });
  setSessionCookie(response, expectedSession);
  return response;
}

export async function DELETE() {
  const response = new NextResponse(null, { status: 204 });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    path: "/",
    maxAge: 0,
  });
  return response;
}
