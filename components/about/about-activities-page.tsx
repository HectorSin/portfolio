"use client";

import Image from "next/image";
import type { AboutActivityItem, LocalizedText } from "@/data/about-detail";
import { pickLocalizedText } from "@/data/about-detail";
import AboutPageShell from "@/components/about/about-page-shell";
import { useTheme } from "@/contexts/theme-context";

interface AboutActivitiesPageProps {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  backHref: string;
  backLabel: LocalizedText;
  items: AboutActivityItem[];
}

const ACCENT = "#0F766E";

export default function AboutActivitiesPage({
  eyebrow,
  title,
  description,
  backHref,
  backLabel,
  items,
}: AboutActivitiesPageProps) {
  const { isDark, isKorean } = useTheme();

  return (
    <AboutPageShell
      eyebrow={pickLocalizedText(eyebrow, isKorean)}
      title={pickLocalizedText(title, isKorean)}
      description={pickLocalizedText(description, isKorean)}
      backHref={backHref}
      backLabel={pickLocalizedText(backLabel, isKorean)}
    >
      <section className="grid gap-5">
        {items.map((item, index) => (
          <article
            key={`${item.dateRange}-${item.title.en}-${index}`}
            className={`rounded-[2rem] border p-6 md:p-7 ${
              isDark ? "border-neutral-800 bg-neutral-950/70" : "border-neutral-300 bg-white"
            }`}
          >
            <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
              <div className="space-y-3">
                {item.imageSrc ? (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-black/5">
                    <Image
                      src={item.imageSrc}
                      alt={pickLocalizedText(item.title, isKorean)}
                      fill
                      sizes="(max-width: 1024px) 100vw, 260px"
                      className="object-cover"
                    />
                  </div>
                ) : null}

                <p
                  className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{
                    backgroundColor: isDark ? "rgba(15,118,110,0.18)" : "rgba(15,118,110,0.12)",
                    color: ACCENT,
                  }}
                >
                  {item.dateRange}
                </p>

                <div
                  className={`rounded-[1.5rem] border p-4 ${
                    isDark ? "border-neutral-800 bg-black/30" : "border-neutral-200 bg-neutral-50"
                  }`}
                >
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                      isDark ? "text-neutral-500" : "text-neutral-600"
                    }`}
                  >
                    {isKorean ? "주최 / 소속" : "Organizer"}
                  </p>
                  <p className="mt-2 text-sm font-semibold">{pickLocalizedText(item.organizer, isKorean)}</p>
                </div>
              </div>

              <div className="min-w-0">
                <h2 className="text-2xl font-bold tracking-tight md:text-[1.9rem]">{pickLocalizedText(item.title, isKorean)}</h2>
                <p className={`mt-4 text-[15px] leading-7 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                  {pickLocalizedText(item.summary, isKorean)}
                </p>

                <div className="mt-6">
                  <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                    {isKorean ? "주요 활동 사항" : "Highlights"}
                  </p>
                  <ul className={`mt-3 space-y-3 text-[15px] leading-7 ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                    {item.highlights.map((highlight) => (
                      <li key={highlight.en} className="flex gap-3">
                        <span
                          className="mt-[0.72rem] h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: ACCENT }}
                          aria-hidden="true"
                        />
                        <span>{pickLocalizedText(highlight, isKorean)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </AboutPageShell>
  );
}
