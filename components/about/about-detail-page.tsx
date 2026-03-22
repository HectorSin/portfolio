"use client";

import Image from "next/image";
import Link from "next/link";
import type { AboutAwardItem, AboutDocumentItem, LocalizedText } from "@/data/about-detail";
import { pickLocalizedText } from "@/data/about-detail";
import { useTheme } from "@/contexts/theme-context";
import AboutPageShell from "@/components/about/about-page-shell";

interface AboutDetailPageProps {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  backHref: string;
  backLabel: LocalizedText;
  items: AboutDocumentItem[] | AboutAwardItem[];
  itemType: "recommendation" | "award";
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
  itemType,
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
        {items.map((item, index) => {
          const metaLabel =
            itemType === "recommendation"
              ? "issuer" in item
                ? item.issuer
                : null
              : "organizer" in item
                ? item.organizer
                : null;
          const bodyText =
            itemType === "recommendation"
              ? "summary" in item
                ? item.summary
                : null
              : "description" in item
                ? item.description
                : null;
          const actionLabel =
            itemType === "recommendation"
              ? isKorean
                ? "원본 링크 연결 예정"
                : "Original link can be added later"
              : isKorean
                ? "증빙 이미지 추가 가능"
                : "Supporting image can be added";

          return (
            <article
              key={`${pickLocalizedText(item.title, isKorean)}-${index}`}
              className={`grid gap-6 rounded-[2rem] border p-6 md:grid-cols-[320px_minmax(0,1fr)] md:p-7 ${
                isDark ? "border-neutral-800 bg-neutral-950/70" : "border-neutral-300 bg-white"
              }`}
            >
              <PreviewCard
                label={pickLocalizedText(item.thumbnailLabel, isKorean)}
                accent={accent}
                imageSrc={"imageSrc" in item ? item.imageSrc : undefined}
              />

              <div className="min-w-0">
                <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                  {item.date}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">{pickLocalizedText(item.title, isKorean)}</h2>
                {metaLabel && (
                  <p className={`mt-2 text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                    {pickLocalizedText(metaLabel, isKorean)}
                  </p>
                )}
                {bodyText && (
                  <p className={`mt-5 max-w-2xl leading-7 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                    {pickLocalizedText(bodyText, isKorean)}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {"assetUrl" in item && item.assetUrl ? (
                    <Link
                      href={item.assetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80 ${
                        isDark ? "border-neutral-700 bg-black/40" : "border-neutral-300 bg-neutral-50"
                      }`}
                    >
                      {isKorean ? "원본 보기" : "Open original"}
                    </Link>
                  ) : (
                    <span
                      className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${
                        isDark ? "border-neutral-800 bg-black/40 text-neutral-300" : "border-neutral-300 bg-neutral-50 text-neutral-700"
                      }`}
                    >
                      {actionLabel}
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </AboutPageShell>
  );
}
