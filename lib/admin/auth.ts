import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "portfolio_admin_session";
const ADMIN_SESSION_PAYLOAD = "portfolio-admin-v1";

function getAdminToken(): string {
  return process.env.ADMIN_STATS_TOKEN ?? "";
}

function createSessionSignature(token: string): string {
  return createHmac("sha256", token).update(ADMIN_SESSION_PAYLOAD).digest("hex");
}

export function isAdminTokenValid(candidate: string): boolean {
  const token = getAdminToken();
  if (!token || !candidate) {
    return false;
  }

  const expected = Buffer.from(token);
  const actual = Buffer.from(candidate);
  if (expected.length !== actual.length) {
    return false;
  }

  return timingSafeEqual(expected, actual);
}

export function buildAdminSessionValue(): string | null {
  const token = getAdminToken();
  if (!token) {
    return null;
  }

  return createSessionSignature(token);
}

export function isAdminSessionAuthorized(sessionValue: string | undefined): boolean {
  if (!sessionValue) {
    return false;
  }

  const expected = buildAdminSessionValue();
  if (!expected) {
    return false;
  }

  const expectedBytes = Buffer.from(expected);
  const actualBytes = Buffer.from(sessionValue);
  if (expectedBytes.length !== actualBytes.length) {
    return false;
  }

  return timingSafeEqual(expectedBytes, actualBytes);
}

export async function isAdminAuthorizedFromCookies(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(ADMIN_SESSION_COOKIE)?.value;
  return isAdminSessionAuthorized(value);
}
