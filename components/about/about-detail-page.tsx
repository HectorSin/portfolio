"use client";

import Image from "next/image";
import Link from "next/link";
import type { AboutDocumentItem, LocalizedText } from "@/data/about-detail";
import { pickLocalizedText } from "@/data/about-detail";
import { useTheme } from "@/contexts/theme-context";
import AboutPageShell from "@/components/about/about-page-shell";

interface AboutDetailPageProps {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  backHref: string;
  backLabel: LocalizedText;
  items: AboutDocumentItem[];
}

function PreviewCard({
  label,
  accent,
  imageSrc,
}: {
  label: string;
  accent: string;
  imageSrc?: string;
}) {
  if (imageSrc) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-black/5">
        <Image src={imageSrc} alt={label} fill sizes="(max-width: 768px) 100vw, 320px" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className="flex aspect-[4/3] items-end rounded-[1.5rem] p-5"
      style={{
        background: `linear-gradient(135deg, ${accent}40 0%, rgba(255,255,255,0.02) 100%)`,
      }}
    >
      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-900/80">{label}</span>
    </div>
  );
}

export default function AboutDetailPage({
  eyebrow,
  title,
  description,
  backHref,
  backLabel,
  items,
}: AboutDetailPageProps) {
  const { isDark, isKorean } = useTheme();
  const accent = "#0F766E";

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
            key={`${pickLocalizedText(item.title, isKorean)}-${index}`}
            className={`grid gap-6 rounded-[2rem] border p-6 md:grid-cols-[320px_minmax(0,1fr)] md:p-7 ${
              isDark ? "border-neutral-800 bg-neutral-950/70" : "border-neutral-300 bg-white"
            }`}
          >
            <PreviewCard
              label={pickLocalizedText(item.thumbnailLabel, isKorean)}
              accent={accent}
              imageSrc={item.imageSrc}
            />

            <div className="min-w-0">
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                {item.date}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">{pickLocalizedText(item.title, isKorean)}</h2>
              <p className={`mt-2 text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                {pickLocalizedText(item.issuer, isKorean)}
              </p>
              <p className={`mt-5 max-w-2xl leading-7 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                {pickLocalizedText(item.summary, isKorean)}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {item.assetUrl ? (
                  <Link
                    href={item.assetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80 ${
                      isDark ? "border-neutral-700 bg-black/40" : "border-neutral-300 bg-neutral-50"
                    }`}
                  >
                    {isKorean ? "원본 열기" : "Open original"}
                  </Link>
                ) : (
                  <span
                    className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${
                      isDark ? "border-neutral-800 bg-black/40 text-neutral-300" : "border-neutral-300 bg-neutral-50 text-neutral-700"
                    }`}
                  >
                    {isKorean ? "원본 링크는 추후 추가 예정" : "Original link can be added later"}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </AboutPageShell>
  );
}
