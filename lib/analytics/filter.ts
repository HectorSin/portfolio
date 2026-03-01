const BOT_USER_AGENT_PATTERN =
  /bot|crawler|spider|slurp|curl|wget|preview|facebookexternalhit|discordbot|whatsapp|telegrambot|kakaotalk/i;

const STATIC_ASSET_PATTERN =
  /\.(css|js|mjs|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|map|txt|xml|json)$/i;

type SkipReason = "ok" | "bot" | "prefetch" | "static";

export function getSkipReason(path: string, userAgent: string, headers: Headers): SkipReason {
  if (!path || path.startsWith("/_next") || STATIC_ASSET_PATTERN.test(path)) {
    return "static";
  }

  if (isPrefetch(headers)) {
    return "prefetch";
  }

  if (BOT_USER_AGENT_PATTERN.test(userAgent)) {
    return "bot";
  }

  return "ok";
}

function isPrefetch(headers: Headers): boolean {
  const purpose = headers.get("purpose");
  const routerPrefetch = headers.get("next-router-prefetch");
  const middlewarePrefetch = headers.get("x-middleware-prefetch");

  return purpose === "prefetch" || routerPrefetch !== null || middlewarePrefetch === "1";
}

