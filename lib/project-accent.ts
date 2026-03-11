import type { CSSProperties } from "react";

type ProjectPalette = {
  accent: string;
  accentSoft: string;
  accentStrong: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  badge: string;
  badgeText: string;
  textMuted: string;
};

const PROJECT_PALETTES: Record<"dark" | "light", ProjectPalette> = {
  light: {
    accent: "#4f7f4d",
    accentSoft: "#dfe8d7",
    accentStrong: "#355d38",
    surface: "#f5f6f0",
    surfaceAlt: "#eef1e6",
    border: "#c6cdc1",
    badge: "#d1e2c4",
    badgeText: "#2f4f2f",
    textMuted: "#5f655d",
  },
  dark: {
    accent: "#9fcf8e",
    accentSoft: "#1c241c",
    accentStrong: "#c6e3b9",
    surface: "#151917",
    surfaceAlt: "#1d231f",
    border: "#3a433c",
    badge: "#253126",
    badgeText: "#c6e3b9",
    textMuted: "#9aa497",
  },
};

export function getProjectPalette(isDark: boolean): ProjectPalette {
  return isDark ? PROJECT_PALETTES.dark : PROJECT_PALETTES.light;
}

export function getProjectAccentStyle(isDark: boolean): CSSProperties {
  return { color: getProjectPalette(isDark).accent };
}
