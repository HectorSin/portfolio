"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SESSION_STORAGE_KEY = "portfolio.analytics.session_id";
const LAST_TRACK_PREFIX = "portfolio.analytics.last_track";
const DEDUPE_WINDOW_MINUTES = 30;
const DEDUPE_WINDOW_MS = DEDUPE_WINDOW_MINUTES * 60 * 1000;

function getSessionId(): string {
  const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const id =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;

  window.sessionStorage.setItem(SESSION_STORAGE_KEY, id);
  return id;
}

function shouldSkipClientTrack(pathname: string): boolean {
  const key = `${LAST_TRACK_PREFIX}:${pathname}`;
  const lastTrackRaw = window.sessionStorage.getItem(key);
  const lastTrack = lastTrackRaw ? Number.parseInt(lastTrackRaw, 10) : 0;
  const now = Date.now();

  if (lastTrack > 0 && now - lastTrack < DEDUPE_WINDOW_MS) {
    return true;
  }

  window.sessionStorage.setItem(key, String(now));
  return false;
}

export default function PageViewTracker() {
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (shouldSkipClientTrack(pathname)) {
      return;
    }

    const sessionId = getSessionId();

    void fetch("/api/analytics/track", {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: pathname,
        sessionId,
        dedupeWindowMinutes: DEDUPE_WINDOW_MINUTES,
      }),
    });
  }, [pathname]);

  return null;
}

