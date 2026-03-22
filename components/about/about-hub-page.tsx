"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BriefcaseBusiness, FolderHeart, ShieldCheck, Sparkles, Users } from "lucide-react";
import {
  aboutCategoryCards,
  aboutPageIntro,
  activityItems,
  personalHighlights,
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

function PlaceholderTile({ label, featured = false }: { label: string; featured?: boolean }) {
  return (
    <div
      className={`flex items-end rounded-[1.75rem] p-5 ${featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}
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
      <div className={`relative overflow-hidden rounded-[1.75rem] ${featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
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
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">{isKorean ? "상세 이력 카테고리" : "Detailed Sections"}</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {aboutCategoryCards.map((category, index) => {
            const Icon = getCategoryIcon(category.slug);
            const featured = index === 0;
            const previewImageSrc =
              category.slug === "recommendations"
                ? recommendationItems[0]?.imageSrc
                : category.slug === "awards"
                  ? awardPreviewImageSrc
                  : category.slug === "activities"
                    ? activityItems[1]?.imageSrc
                    : undefined;

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
                    <span>{featured ? (isKorean ? "추천 시작점" : "Start here") : pickLocalizedText(category.eyebrow, isKorean)}</span>
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

                <CategoryPreview label={pickLocalizedText(category.stat, isKorean)} featured={featured} imageSrc={previewImageSrc} />

                <p className={`mt-5 text-[12px] font-semibold uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                  {pickLocalizedText(category.subtitle, isKorean)}
                </p>
                <h3 className="mt-2 text-[1.75rem] font-extrabold tracking-tight">{pickLocalizedText(category.title, isKorean)}</h3>
                <p className={`mt-3 text-[15px] leading-7 ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                  {pickLocalizedText(category.summary, isKorean)}
                </p>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                    {pickLocalizedText(category.stat, isKorean)}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: ACCENT }}>
                    {category.href ? (isKorean ? "자세히 보기" : "Open section") : isKorean ? "준비 중" : "Planned"}
                    {category.href && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
                  </span>
                </div>
              </article>
            );

            return category.href ? (
              <Link key={category.slug} href={category.href} className="block">
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
        <div className="mt-3 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold md:text-3xl">{isKorean ? "일 바깥의 저" : "A little more personal"}</h2>
            <p className={`mt-3 text-[15px] leading-8 ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
              {isKorean
                ? "일을 하지 않을 때의 저는, 하나를 붙잡고 조금씩 더 나아지는 과정을 즐기는 편입니다. 클라이밍에서는 한 번에 풀리지 않는 문제를 여러 번 시도하면서 방법을 바꿔보고, 더빙 할때는 같은 문장도 더 자연스럽게 들리도록 계속 다듬습니다. \n 이런 시간을 보내다 보니, 저는 결과를 빠르게 내기보다 과정을 이해하고 개선해 나가는 데 더 익숙한 사람이라는 걸 느끼게 됐습니다. \n 일 속에서도 자연스럽게 이어져, 문제를 쪼개서 접근하고 하나씩 해결해 나가는 방식으로 나타납니다."
                : "This section holds short personal highlights that complement the professional story, with room for future images and links."}
            </p>
          </div>
          <div className="grid flex-1 gap-4 md:grid-cols-2">
            {personalHighlights.map((item, index) => (
              <article
                key={`${item.title.en}-${index}`}
                className={`rounded-[1.5rem] border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                  isDark ? "border-neutral-800 bg-black/40 hover:border-[rgba(15,118,110,0.4)]" : "border-neutral-200 bg-neutral-50 hover:border-[rgba(15,118,110,0.35)]"
                }`}
              >
                <div
                  className="mb-4 aspect-[4/3] rounded-[1.25rem]"
                  style={{
                    background:
                      index === 0
                        ? "linear-gradient(135deg, rgba(15,118,110,0.42), rgba(255,255,255,0.04))"
                        : "linear-gradient(135deg, rgba(15,118,110,0.26), rgba(255,255,255,0.04))",
                  }}
                />
                <h3 className="text-[1.3rem] font-extrabold">{pickLocalizedText(item.title, isKorean)}</h3>
                <p className={`mt-3 text-[15px] leading-7 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                  {pickLocalizedText(item.description, isKorean)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </AboutPageShell>
  );
}
