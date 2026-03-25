"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { AboutActivityItem } from "@/data/about-detail";
import { clubItems, volunteerItems, pickLocalizedText } from "@/data/about-detail";
import { useTheme } from "@/contexts/theme-context";
import { profileData, t } from "@/data/profile";

const HIGHLIGHT_TOKENS = {
  ko: ["6주에서 2주", "연간 약 200만 원"],
  en: ["6 weeks to 2 weeks", "about KRW 2 million"],
} as const;

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14.5 14.5 0 0 1 0 18" />
      <path d="M12 3a14.5 14.5 0 0 0 0 18" />
    </svg>
  );
}

function renderHighlightedText(text: string, tokens: readonly string[], highlightClassName: string) {
  const parts: React.ReactNode[] = [text];

  for (const token of tokens) {
    const nextParts: React.ReactNode[] = [];

    for (const part of parts) {
      if (typeof part !== "string") {
        nextParts.push(part);
        continue;
      }

      const segments = part.split(token);
      segments.forEach((segment, index) => {
        if (segment) {
          nextParts.push(segment);
        }

        if (index < segments.length - 1) {
          nextParts.push(
            <strong key={`${token}-${index}`} className={highlightClassName}>
              {token}
            </strong>
          );
        }
      });
    }

    parts.splice(0, parts.length, ...nextParts);
  }

  return parts;
}

function ArchiveSummarySection({
  title,
  href,
  items,
  isDark,
  isKorean,
}: {
  title: string;
  href: string;
  items: readonly AboutActivityItem[];
  isDark: boolean;
  isKorean: boolean;
}) {
  return (
    <div
      className={`rounded-[2rem] border p-5 md:p-6 ${
        isDark ? "border-neutral-800 bg-neutral-950/65" : "border-neutral-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
            Summary Archive
          </p>
          <h4 className="mt-2 text-xl font-bold">{title}</h4>
        </div>
        <Link
          href={href}
          className={`inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all hover:-translate-y-0.5 ${
            isDark
              ? "border-neutral-700 bg-black/40 text-neutral-100 hover:border-[#C3E41D]"
              : "border-neutral-300 bg-neutral-50 text-neutral-900 hover:border-neutral-900"
          }`}
        >
          {isKorean ? "상세 보기" : "Open"}
        </Link>
      </div>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <article
            key={`${item.dateRange}-${item.title.en}`}
            className={`grid gap-4 rounded-[1.5rem] border p-4 md:grid-cols-[128px_minmax(0,1fr)] ${
              isDark ? "border-neutral-800 bg-black/25" : "border-neutral-200 bg-neutral-50"
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] border border-black/5">
              <Image
                src={item.imageSrc ?? "/about/activities/placeholder.svg"}
                alt={pickLocalizedText(item.title, isKorean)}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                {item.dateRange}
              </p>
              <h5 className="mt-2 text-lg font-semibold">{pickLocalizedText(item.title, isKorean)}</h5>
              <p className={`mt-2 text-sm leading-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                {pickLocalizedText(item.summary, isKorean)}
              </p>
              <ul className={`mt-3 space-y-2 text-sm leading-6 ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                {item.highlights.slice(0, 2).map((highlight) => (
                  <li key={highlight.en} className="flex gap-3">
                    <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C3E41D]" aria-hidden="true" />
                    <span>{pickLocalizedText(highlight, isKorean)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const { isDark, isKorean } = useTheme();
  const firstEducation = profileData.education[0];
  const sectionTitleClass = `text-2xl font-bold mb-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`;
  const secondaryTextClass = isDark ? "text-neutral-500" : "text-neutral-700";
  const highlightClassName = isDark
    ? "font-semibold underline decoration-[#C3E41D] decoration-2 underline-offset-4 text-[#C3E41D]"
    : "font-semibold underline decoration-neutral-900 decoration-2 underline-offset-4 text-neutral-900";
  const highlightTokens = isKorean ? HIGHLIGHT_TOKENS.ko : HIGHLIGHT_TOKENS.en;

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <div className="max-w-6xl w-full">
        <h2
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-tight text-balance"
          style={{ color: "#C3E41D" }}
        >
          {isKorean ? "소개" : "ABOUT"}
        </h2>

        <div className="grid gap-12 lg:grid-cols-[272px_minmax(0,1fr)] lg:gap-16">
          <div className="space-y-8 lg:space-y-10">
            <div>
              <h3 className={sectionTitleClass}>{isKorean ? "학력" : "Education"}</h3>
              <div className="space-y-2">
                <p className="text-xl font-semibold">{t(firstEducation.school, isKorean)}</p>
                <p className={`${secondaryTextClass} whitespace-pre-line`}>{t(firstEducation.degree, isKorean)}</p>
                <p className={secondaryTextClass}>{t(firstEducation.graduation, isKorean)}</p>
              </div>
            </div>

            <div>
              <h3 className={`${sectionTitleClass} flex items-center gap-3`}>
                <GlobeIcon className="h-[18px] w-[18px] text-[#C3E41D]" />
                <span>{isKorean ? "언어" : "Languages"}</span>
              </h3>
              <div className="space-y-3">
                {profileData.languages.map((language) => (
                  <div
                    key={language.name.en}
                    className={`grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 border-b pb-3 ${
                      isDark ? "border-neutral-900" : "border-neutral-200"
                    }`}
                  >
                    <span className="text-lg">{t(language.name, isKorean)}</span>
                    <span className={`text-right ${secondaryTextClass}`}>{t(language.level, isKorean)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-[760px]">
            <p
              className={`text-sm font-semibold uppercase tracking-[0.24em] ${
                isDark ? "text-neutral-500" : "text-neutral-600"
              }`}
            >
              {t(profileData.identity.title, isKorean)}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {profileData.identity.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className={`rounded-full border px-4 py-2 text-sm uppercase tracking-[0.18em] ${
                    isDark
                      ? "border-neutral-800 bg-neutral-950 text-neutral-300"
                      : "border-neutral-300 bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <h3 className={sectionTitleClass}>About Me</h3>
              <div className={`space-y-[18px] text-lg leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                {profileData.bio.map((paragraph, index) => (
                  <p
                    key={index}
                    className={index === 3 ? "font-medium whitespace-pre-line text-balance" : "whitespace-pre-line"}
                  >
                    {index === 3
                      ? renderHighlightedText(t(paragraph, isKorean), highlightTokens, highlightClassName)
                      : t(paragraph, isKorean)}
                  </p>
                ))}
              </div>
              <blockquote
                className={`mt-8 border-l-2 pl-5 text-base italic ${
                  isDark ? "border-[#C3E41D]/50 text-neutral-400" : "border-[#A8C51A] text-neutral-600"
                }`}
              >
                &ldquo;{t(profileData.quote, isKorean)}&rdquo;
              </blockquote>

              <div className="mt-10 grid gap-5 xl:grid-cols-2">
                <ArchiveSummarySection
                  title={isKorean ? "동아리 및 동호회 활동" : "Clubs & Communities"}
                  href="/about/clubs"
                  items={clubItems}
                  isDark={isDark}
                  isKorean={isKorean}
                />
                <ArchiveSummarySection
                  title={isKorean ? "봉사활동" : "Volunteer Work"}
                  href="/about/volunteer"
                  items={volunteerItems}
                  isDark={isDark}
                  isKorean={isKorean}
                />
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className={`inline-flex items-center rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] transition-all hover:-translate-y-0.5 ${
                    isDark
                      ? "border-neutral-700 bg-neutral-950 text-neutral-100 hover:border-[#C3E41D]"
                      : "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900"
                  }`}
                >
                  {isKorean ? "상세 프로필 열기" : "Open detailed profile"}
                </Link>
                <p className={`text-sm ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                  {isKorean
                    ? "추천서, 수상, 교내외 활동, 동아리 및 봉사 기록까지 한 번에 이어서 볼 수 있습니다."
                    : "Continue to recommendations, awards, activities, clubs, and volunteer highlights."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
