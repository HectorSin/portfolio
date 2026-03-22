"use client";

import Image from "next/image";
import type { AboutAwardItem, AboutGalleryItem, LocalizedText } from "@/data/about-detail";
import { pickLocalizedText } from "@/data/about-detail";
import { useTheme } from "@/contexts/theme-context";
import AboutPageShell from "@/components/about/about-page-shell";

interface AboutAwardsPageProps {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  backHref: string;
  backLabel: LocalizedText;
  items: AboutAwardItem[];
  galleryItems: AboutGalleryItem[];
}

export default function AboutAwardsPage({
  eyebrow,
  title,
  description,
  backHref,
  backLabel,
  items,
  galleryItems,
}: AboutAwardsPageProps) {
  const { isDark, isKorean } = useTheme();

  return (
    <AboutPageShell
      eyebrow={pickLocalizedText(eyebrow, isKorean)}
      title={pickLocalizedText(title, isKorean)}
      description={pickLocalizedText(description, isKorean)}
      backHref={backHref}
      backLabel={pickLocalizedText(backLabel, isKorean)}
    >
      <section
        className={`overflow-hidden rounded-[2rem] border ${
          isDark ? "border-neutral-800 bg-neutral-950/70" : "border-neutral-300 bg-white"
        }`}
      >
        <div
          className={`grid gap-3 border-b px-6 py-5 text-xs font-semibold uppercase tracking-[0.18em] md:grid-cols-[180px_minmax(0,1fr)_220px] ${
            isDark ? "border-neutral-800 text-neutral-500" : "border-neutral-300 text-neutral-600"
          }`}
        >
          <span>{isKorean ? "Date" : "Date"}</span>
          <span>{isKorean ? "Award" : "Award"}</span>
          <span>{isKorean ? "Organizer" : "Organizer"}</span>
        </div>

        <div className="divide-y divide-black/5 dark:divide-white/10">
          {items.map((item) => (
            <article key={`${item.date}-${item.title.en}`} className="grid gap-3 px-6 py-5 md:grid-cols-[180px_minmax(0,1fr)_220px] md:items-start">
              <p className={`text-sm font-semibold ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>{item.date}</p>

              <div className="min-w-0">
                <h2 className="text-xl font-bold tracking-tight">{pickLocalizedText(item.title, isKorean)}</h2>
                <p className={`mt-2 text-sm font-semibold ${isDark ? "text-emerald-300" : "text-emerald-700"}`}>
                  {pickLocalizedText(item.result, isKorean)}
                </p>
              </div>

              <p className={`text-sm leading-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                {pickLocalizedText(item.organizer, isKorean)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5">
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
            {isKorean ? "Supporting Images" : "Supporting Images"}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">{isKorean ? "수상 이미지 모음" : "Award Image Archive"}</h2>
        </div>

        {galleryItems.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <div
                key={item.src}
                className={`relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border ${
                  isDark ? "border-neutral-800 bg-neutral-950/70" : "border-neutral-300 bg-white"
                }`}
              >
                <Image src={item.src} alt={pickLocalizedText(item.alt, isKorean)} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </AboutPageShell>
  );
}
