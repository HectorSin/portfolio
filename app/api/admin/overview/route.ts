import { NextResponse } from "next/server";
import { isAdminAuthorizedFromCookies } from "@/lib/admin/auth";
import { getAdminOverview } from "@/lib/admin/overview";

export const runtime = "nodejs";
export const maxDuration = 10;

export async function GET() {
  const authorized = await isAdminAuthorizedFromCookies();
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await getAdminOverview();
    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to load admin overview." }, { status: 500 });
  }
}
