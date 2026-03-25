"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BriefcaseBusiness, FolderHeart, MicVocal, ShieldCheck, Sparkles, Users, Waves, Mountain } from "lucide-react";
import {
  archiveSections,
  aboutCategoryCards,
  aboutPageIntro,
  activityItems,
  type LocalizedRichText,
  personalNoteCards,
  personalNotesClosing,
  personalNotesIntro,
  pickLocalizedText,
  recommendationItems,
} from "@/data/about-detail";
import AboutPageShell from "@/components/about/about-page-shell";
import { useTheme } from "@/contexts/theme-context";

const ACCENT = "#0F766E";

function getCategoryIcon(slug: string) {
  switch (slug) {
    case "recommendations":
      return ShieldCheck;
    case "awards":
      return Award;
    case "activities":
      return BriefcaseBusiness;
    case "clubs":
      return Users;
    default:
      return FolderHeart;
  }
}

function getPersonalNoteMeta(index: number) {
  if (index === 0) {
    return {
      icon: Mountain,
      badge: "Climbing",
      gradient: "linear-gradient(135deg, rgba(15,118,110,0.92), rgba(17,24,39,0.82))",
      glow: "rgba(15,118,110,0.28)",
    };
  }

  return {
    icon: MicVocal,
    badge: "Voice",
    gradient: "linear-gradient(135deg, rgba(13,148,136,0.88), rgba(30,41,59,0.84))",
    glow: "rgba(13,148,136,0.24)",
  };
}

function renderHighlightedText(content: LocalizedRichText, isKorean: boolean) {
  const text = pickLocalizedText(content.text, isKorean);
  const emphasisList = content.emphasis?.map((item) => pickLocalizedText(item, isKorean)) ?? [];

  if (emphasisList.length === 0) {
    return text;
  }

  const segments: Array<{ text: string; emphasized: boolean }> = [];
  let cursor = 0;

  emphasisList.forEach((emphasis) => {
    const start = text.indexOf(emphasis, cursor);

    if (start === -1) {
      return;
    }

    if (start > cursor) {
      segments.push({ text: text.slice(cursor, start), emphasized: false });
    }

    segments.push({ text: emphasis, emphasized: true });
    cursor = start + emphasis.length;
  });

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), emphasized: false });
  }

  return segments.map((segment, index) =>
    segment.emphasized ? <strong key={`${segment.text}-${index}`}>{segment.text}</strong> : segment.text,
  );
}

function PlaceholderTile({ label, featured = false }: { label: string; featured?: boolean }) {
  return (
    <div
      className="flex aspect-[4/3] items-end rounded-[1.75rem] p-5"
      style={{
        background: featured
          ? "linear-gradient(135deg, rgba(15,118,110,0.42) 0%, rgba(255,255,255,0.02) 100%)"
          : "linear-gradient(135deg, rgba(15,118,110,0.22) 0%, rgba(255,255,255,0.02) 100%)",
      }}
    >
      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-900/80">{label}</span>
    </div>
  );
}

function CategoryPreview({
  label,
  featured,
  imageSrc,
}: {
  label: string;
  featured: boolean;
  imageSrc?: string;
}) {
  if (imageSrc) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
        <Image src={imageSrc} alt={label} fill sizes="(max-width: 1280px) 100vw, 720px" className="object-cover" />
      </div>
    );
  }

  return <PlaceholderTile label={label} featured={featured} />;
}

interface AboutHubPageProps {
  awardPreviewImageSrc?: string;
}

export default function AboutHubPage({ awardPreviewImageSrc }: AboutHubPageProps) {
  const { isDark, isKorean } = useTheme();

  return (
    <AboutPageShell
      eyebrow="About Archive"
      title={pickLocalizedText(aboutPageIntro.title, isKorean)}
      description={pickLocalizedText(aboutPageIntro.description, isKorean)}
      backHref="/#about"
      backLabel={isKorean ? "메인 소개로 돌아가기" : "Back to about section"}
    >
      <section className="mb-18">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
              Resume Map
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">{isKorean ? "상세 섹션 둘러보기" : "Detailed Sections"}</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {aboutCategoryCards.map((category, index) => {
            const Icon = getCategoryIcon(category.slug);
            const featured = index === 0;
            const archiveSection =
              category.slug === "activities" || category.slug === "clubs" || category.slug === "volunteer"
                ? archiveSections[category.slug]
                : undefined;
            const categoryHref = archiveSection ? `/about/${category.slug}` : category.href;
            const categoryTitle = archiveSection?.title ?? category.title;
            const categorySubtitle = archiveSection?.description ?? category.subtitle;
            const categorySummary =
              category.slug === "clubs"
                ? {
                    ko: "더빙 동아리, 국제교류 커뮤니티, 클라이밍 동호회까지 이어지는 활동을 이미지와 함께 정리합니다.",
                    en: "A visual archive of dubbing, global exchange, and climbing communities, including leadership and event planning.",
                  }
                : category.slug === "volunteer"
                  ? {
                      ko: "교내 급식 봉사, 축제 통역, 공동체 지원 활동을 통해 쌓아 온 꾸준한 기여를 모았습니다.",
                      en: "A dedicated record of volunteer work ranging from campus cat-care support to festival interpretation and community assistance.",
                    }
                  : category.summary;
            const categoryEyebrow =
              category.slug === "clubs"
                ? { ko: "커뮤니티 리더십", en: "Community leadership" }
                : category.slug === "volunteer"
                  ? { ko: "지속적인 기여", en: "Consistent contribution" }
                  : category.eyebrow;
            const categoryStat =
              category.slug === "clubs"
                ? { ko: "3개 활동 기록", en: "3 community entries" }
                : category.slug === "volunteer"
                  ? { ko: "3개 봉사 기록", en: "3 volunteer entries" }
                  : category.stat;
            const previewImageSrc =
              category.slug === "recommendations"
                ? recommendationItems[0]?.imageSrc
                : category.slug === "awards"
                  ? awardPreviewImageSrc
                  : category.slug === "activities"
                    ? activityItems[1]?.imageSrc
                    : archiveSection?.items[0]?.imageSrc;

            const content = (
              <article
                className={`group h-full rounded-[2rem] border p-5 transition-all duration-300 hover:-translate-y-1 ${
                  featured
                    ? isDark
                      ? "border-[rgba(15,118,110,0.45)] bg-[linear-gradient(180deg,rgba(15,118,110,0.16),rgba(10,10,10,0.88))] shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
                      : "border-[rgba(15,118,110,0.25)] bg-[linear-gradient(180deg,rgba(15,118,110,0.10),rgba(255,255,255,1))] shadow-[0_24px_60px_rgba(15,118,110,0.10)]"
                    : isDark
                      ? "border-neutral-800 bg-neutral-950/70 hover:border-[rgba(15,118,110,0.4)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
                      : "border-neutral-300 bg-white hover:border-[rgba(15,118,110,0.35)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                } ${featured ? "md:col-span-2 xl:col-span-2" : ""}`}
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{
                      backgroundColor: isDark ? "rgba(15,118,110,0.18)" : "rgba(15,118,110,0.12)",
                      color: ACCENT,
                    }}
                  >
                    {featured && <Sparkles className="h-3.5 w-3.5" />}
                    <span>{featured ? (isKorean ? "시작 추천" : "Start here") : pickLocalizedText(categoryEyebrow, isKorean)}</span>
                  </div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      isDark ? "bg-black/30" : "bg-white/70"
                    }`}
                    style={{ color: ACCENT }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <CategoryPreview label={pickLocalizedText(categoryStat, isKorean)} featured={featured} imageSrc={previewImageSrc} />

                <p className={`mt-5 text-[12px] font-semibold uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                  {pickLocalizedText(categorySubtitle, isKorean)}
                </p>
                <h3 className="mt-2 text-[1.75rem] font-extrabold tracking-tight">{pickLocalizedText(categoryTitle, isKorean)}</h3>
                <p className={`mt-3 text-[15px] leading-7 ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                  {pickLocalizedText(categorySummary, isKorean)}
                </p>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                    {pickLocalizedText(categoryStat, isKorean)}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: ACCENT }}>
                    {categoryHref ? (isKorean ? "자세히 보기" : "Open section") : isKorean ? "준비 중" : "Planned"}
                    {categoryHref && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
                  </span>
                </div>
              </article>
            );

            return categoryHref ? (
              <Link key={category.slug} href={categoryHref} className="block">
                {content}
              </Link>
            ) : (
              <div key={category.slug}>{content}</div>
            );
          })}
        </div>
      </section>

      <section
        className={`rounded-[2rem] border p-6 md:p-8 ${
          isDark ? "border-neutral-800 bg-neutral-950/60" : "border-neutral-300 bg-white/80"
        }`}
      >
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
          Personal Notes
        </p>
        <div className="mt-3 max-w-2xl">
          <h2 className="text-2xl font-bold md:text-3xl">{pickLocalizedText(personalNotesIntro.title, isKorean)}</h2>
          <p className={`mt-3 text-[15px] leading-8 ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
            {pickLocalizedText(personalNotesIntro.description, isKorean)}
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {personalNoteCards.map((item, index) => {
            const meta = getPersonalNoteMeta(index);
            const Icon = meta.icon;

            return (
              <article
                key={`${item.title.en}-${index}`}
                className={`group overflow-hidden rounded-[1.75rem] border transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? "border-neutral-800 bg-black/40 hover:border-[rgba(15,118,110,0.45)]"
                    : "border-neutral-200 bg-white hover:border-[rgba(15,118,110,0.35)]"
                }`}
                style={{
                  boxShadow: isDark ? `0 18px 40px ${meta.glow}` : `0 20px 48px ${meta.glow}`,
                }}
              >
                <div
                  className="relative overflow-hidden px-6 py-6"
                  style={{ background: meta.gradient }}
                >
                  <div className="absolute right-5 top-5 opacity-[0.08]">
                    <Waves className="h-18 w-18 text-white" />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/72">{meta.badge}</p>
                      <h3 className="mt-3 text-[1.45rem] font-extrabold tracking-tight text-white">
                        {pickLocalizedText(item.title, isKorean)}
                      </h3>
                    </div>
                    <div className="flex h-15 w-15 items-center justify-center rounded-2xl bg-white/16 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur">
                      <Icon className="h-8 w-8 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4 px-6 py-6 pb-7">
                  {item.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={`${item.title.en}-paragraph-${paragraphIndex}`}
                      className={`text-[15px] leading-[1.95] ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                    >
                      {renderHighlightedText(paragraph, isKorean)}
                    </p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
        <p
          className={`mt-8 border-t pt-6 text-[17px] font-semibold leading-8 ${
            isDark ? "border-neutral-800 text-neutral-100" : "border-neutral-200 text-neutral-900"
          }`}
        >
          {pickLocalizedText(personalNotesClosing, isKorean)}
        </p>
      </section>
    </AboutPageShell>
  );
}
