import type { CSSProperties } from "react";

const PROJECT_ACCENT = {
  dark: "#bef264",
  light: "#4d7c0f",
} as const;

export function getProjectAccentColor(isDark: boolean): string {
  return isDark ? PROJECT_ACCENT.dark : PROJECT_ACCENT.light;
}

export function getProjectAccentStyle(isDark: boolean): CSSProperties {
  return { color: getProjectAccentColor(isDark) };
}
