const KST_TIME_ZONE = "Asia/Seoul";

function getPart(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  const value = parts.find((part) => part.type === type)?.value;
  if (!value) {
    throw new Error(`Missing date part: ${type}`);
  }
  return value;
}

export function getKstDateParts(now: Date = new Date()): { date: string; month: string } {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: KST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(now);

  const year = getPart(parts, "year");
  const month = getPart(parts, "month");
  const day = getPart(parts, "day");

  return {
    date: `${year}-${month}-${day}`,
    month: `${year}-${month}`,
  };
}

export function getWindowBucket(windowMinutes: number, now: number = Date.now()): number {
  const windowMs = windowMinutes * 60 * 1000;
  return Math.floor(now / windowMs);
}

