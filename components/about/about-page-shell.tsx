"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Languages, MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

interface AboutPageShellProps {
  title: string;
  description: string;
  eyebrow: string;
  backHref: string;
  backLabel: string;
  children: ReactNode;
}

const ACCENT = "#0F766E";

export default function AboutPageShell({
  title,
  description,
  eyebrow,
  backHref,
  backLabel,
  children,
}: AboutPageShellProps) {
  const { isDark, isKorean, toggleLanguage, toggleTheme } = useTheme();

  return (
    <main
      className="min-h-screen px-6 py-24"
      style={{
        background:
          isDark
            ? "radial-gradient(circle at top, rgba(15,118,110,0.18), transparent 28%), hsl(0 0% 0%)"
            : "radial-gradient(circle at top, rgba(15,118,110,0.14), transparent 28%), hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 flex flex-col gap-8 border-b pb-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-4xl">
            <Link
              href={backHref}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                isDark
                  ? "border-transparent bg-[rgba(15,118,110,0.18)] text-white hover:bg-[rgba(15,118,110,0.3)]"
                  : "border-transparent bg-[rgba(15,118,110,0.12)] text-neutral-950 hover:bg-[rgba(15,118,110,0.2)]"
              }`}
              style={{ boxShadow: `0 12px 30px ${isDark ? "rgba(0,0,0,0.28)" : "rgba(15,118,110,0.12)"}` }}
            >
              <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
              {backLabel}
            </Link>
            <p className={`mt-8 text-xs font-semibold uppercase tracking-[0.24em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
              {eyebrow}
            </p>
            <h1 className="mt-3 max-w-[18ch] text-4xl font-bold tracking-tight md:max-w-[20ch] md:text-6xl">{title}</h1>
            <p className={`mt-5 max-w-3xl text-[17px] leading-8 md:text-[19px] ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
              {description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 self-start">
            <button
              type="button"
              onClick={toggleLanguage}
              className={`flex min-w-[128px] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all hover:-translate-y-0.5 ${
                isDark ? "border-neutral-800 bg-neutral-950/80 hover:border-neutral-700" : "border-neutral-300 bg-white hover:border-neutral-400"
              }`}
              aria-label="Toggle language"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: isDark ? "rgba(15,118,110,0.18)" : "rgba(15,118,110,0.12)", color: ACCENT }}
              >
                <Languages className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className={`block text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                  Language
                </span>
                <span className="block text-sm font-semibold">{isKorean ? "한국어" : "English"}</span>
              </span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className={`flex min-w-[128px] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all hover:-translate-y-0.5 ${
                isDark ? "border-neutral-800 bg-neutral-950/80 hover:border-neutral-700" : "border-neutral-300 bg-white hover:border-neutral-400"
              }`}
              aria-label="Toggle theme"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: isDark ? "rgba(15,118,110,0.18)" : "rgba(15,118,110,0.12)", color: ACCENT }}
              >
                {isDark ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
              </span>
              <span className="min-w-0">
                <span className={`block text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                  Theme
                </span>
                <span className="block text-sm font-semibold">{isDark ? "Dark" : "Light"}</span>
              </span>
            </button>
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}
