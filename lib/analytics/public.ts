export async function getPublicTotalVisits(signal?: AbortSignal): Promise<number | null> {
  try {
    const response = await fetch("/api/analytics/public", {
      method: "GET",
      cache: "no-store",
      signal,
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { totalVisits?: number };
    if (typeof payload.totalVisits !== "number") {
      return null;
    }

    return payload.totalVisits;
  } catch {
    return null;
  }
}

