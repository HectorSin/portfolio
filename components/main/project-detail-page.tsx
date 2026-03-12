"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Project } from "@/data/projects";
import { useTheme } from "@/contexts/theme-context";
import { getProjectAccentStyle } from "@/lib/project-accent";

interface ProjectDetailPageProps {
  project: Project;
}

function toLocalized(value: string | { en: string; ko: string }, isKorean: boolean): string {
  if (typeof value === "string") {
    return value;
  }
  return isKorean ? value.ko : value.en;
}

function toLocalizedArray(value: string[] | { en: string[]; ko: string[] } | undefined, isKorean: boolean): string[] {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return isKorean ? value.ko : value.en;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const { isDark, isKorean, toggleLanguage, toggleTheme } = useTheme();
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollYRef = useRef(0);
  const accentStyle = getProjectAccentStyle(isDark);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY < 120) {
        setShowHeader(true);
      } else if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!project.detail) {
    return null;
  }

  const summary = project.detail.summary ? toLocalized(project.detail.summary, isKorean) : "";
  const highlightMetrics = project.detail.highlightMetrics ?? [];
  const qnaItems = project.detail.qna ?? [];
  const umlImages = project.detail.umlImages ?? [];
  const dividerColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const contentWidthClass = "max-w-[46rem]";

  return (
    <main
      id="top"
      className="min-h-screen px-6 py-28"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <header
        className="fixed inset-x-0 top-0 z-40 px-6 py-6 transition-transform duration-300"
        style={{
          transform: showHeader ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <nav className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/#projects"
            className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-80 ${
              isDark ? "border-neutral-700 bg-neutral-950/90" : "border-neutral-300 bg-white/90"
            }`}
            style={accentStyle}
          >
            {isKorean ? "프로젝트 목록으로" : "Back to projects"}
          </Link>

          <div
            className="text-4xl"
            style={{
              color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
              fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
            }}
          >
            SJ
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="relative flex h-8 w-16 items-center justify-center rounded-full text-xs font-bold transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C3E41D]"
              style={{ backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)" }}
              aria-label="Toggle language"
            >
              <span className={`absolute transition-opacity duration-300 ${isKorean ? "opacity-100" : "opacity-30"}`} style={{ left: "0.5rem" }}>
                KO
              </span>
              <span className={`absolute transition-opacity duration-300 ${!isKorean ? "opacity-100" : "opacity-30"}`} style={{ right: "0.5rem" }}>
                EN
              </span>
              <div
                className="absolute left-1 top-1 h-6 w-6 rounded-full transition-transform duration-300"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                  transform: isKorean ? "translateX(0)" : "translateX(2rem)",
                }}
              />
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="relative h-8 w-16 rounded-full transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C3E41D]"
              style={{ backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)" }}
              aria-label="Toggle theme"
            >
              <div
                className="absolute left-1 top-1 h-6 w-6 rounded-full transition-transform duration-300"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                  transform: isDark ? "translateX(2rem)" : "translateX(0)",
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      <div className="mx-auto max-w-5xl">
        <header className="mb-14 border-b pb-10" style={{ borderColor: dividerColor }}>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">{toLocalized(project.title, isKorean)}</h1>
          <p className={`mb-2 text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>{project.period}</p>
          <p className={`mb-5 text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            {toLocalized(project.company, isKorean)} | {toLocalized(project.team, isKorean)}
          </p>
          <p className={`${contentWidthClass} text-base leading-7 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
            {toLocalized(project.detail.overview, isKorean)}
          </p>

          {summary && (
            <div
              className={`mt-8 ${contentWidthClass} rounded-3xl border px-5 py-5 md:px-6 md:py-5 ${
                isDark ? "border-neutral-700 bg-neutral-950" : "border-neutral-300 bg-white"
              }`}
            >
              <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
                TL;DR
              </p>
              <p className={`whitespace-pre-line text-xl font-semibold leading-9 md:text-[1.65rem] ${isDark ? "text-neutral-50" : "text-neutral-950"}`}>
                {summary}
              </p>
            </div>
          )}
        </header>

        <section className="mb-14 border-b pb-10" style={{ borderColor: dividerColor }}>
          <h2 className="mb-5 text-xl font-semibold">{isKorean ? "핵심 성과" : "Key Achievements"}</h2>
          {highlightMetrics.length > 0 ? (
            <div className="grid max-w-[42rem] gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {highlightMetrics.map((metric, index) => (
                <article
                  key={`${project.id}-metric-${index}`}
                  className={`rounded-3xl border px-4 py-4 ${
                    isDark ? "border-neutral-800 bg-neutral-950/70" : "border-neutral-200 bg-white"
                  }`}
                >
                  <p className={`text-[1.7rem] font-semibold tracking-tight md:text-[1.95rem] ${isDark ? "text-neutral-50" : "text-neutral-950"}`}>
                    {toLocalized(metric.value, isKorean)}
                  </p>
                  <p className={`mt-1.5 text-xs leading-5 md:text-[13px] ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                    {toLocalized(metric.label, isKorean)}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <ul className={`${contentWidthClass} space-y-2`}>
              {toLocalizedArray(project.achievements, isKorean).map((achievement, index) => (
                <li key={`${project.id}-achievement-${index}`} className={`text-sm leading-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                  - {achievement}
                </li>
              ))}
            </ul>
          )}
        </section>

        {umlImages.length > 0 && (
          <section className="mb-14 border-b pb-10" style={{ borderColor: dividerColor }}>
            <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
              System Architecture
            </p>
            <h2 className="mb-2 text-xl font-semibold">{isKorean ? "시스템 아키텍처" : "System Architecture"}</h2>
            <p className={`${contentWidthClass} mb-6 text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
              {isKorean ? "파이프라인 전체 흐름과 검증 구조를 한눈에 보여주는 다이어그램" : "Architecture view of the end-to-end generation and validation pipeline"}
            </p>
            <div className="space-y-8">
              {umlImages.map((diagram, index) => (
                <figure
                  key={`${project.id}-uml-${index}`}
                  className={`max-w-[44rem] border rounded-[2rem] p-3 md:p-4 ${
                    isDark ? "border-neutral-800 bg-neutral-950/60" : "border-neutral-200 bg-white"
                  }`}
                >
                  <div className={`rounded-2xl p-2 md:p-3 ${isDark ? "bg-neutral-900" : "bg-neutral-50"}`}>
                    <Image
                      src={diagram.src}
                      alt={isKorean ? diagram.alt.ko : diagram.alt.en}
                      width={1280}
                      height={720}
                      sizes="100vw"
                      className="h-auto w-full rounded-lg"
                    />
                  </div>
                  {diagram.caption && (
                    <figcaption className={`mt-4 text-xs ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                      {isKorean ? diagram.caption.ko : diagram.caption.en}
                    </figcaption>
                  )}
                  <div className="mt-3">
                    <a href={diagram.src} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline" style={accentStyle}>
                      {isKorean ? "원본 다이어그램 보기" : "Open full-size diagram"}
                    </a>
                  </div>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="mb-14">
          <h2 className="mb-8 text-xl font-semibold">{isKorean ? "상세 설명" : "Detailed Notes"}</h2>
          <div className="space-y-10">
            {project.detail.sections.map((section) => (
              <article key={section.key} className="border-b pb-8 last:border-b-0 last:pb-0" style={{ borderColor: dividerColor }}>
                <h3 className="mb-4 text-lg font-semibold">{isKorean ? section.title.ko : section.title.en}</h3>
                <div className={`${contentWidthClass} space-y-4`}>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${section.key}-${paragraphIndex}`} className={`text-sm leading-7 md:text-[15px] ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                      {isKorean ? paragraph.ko : paragraph.en}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {qnaItems.length > 0 && (
          <section className="mb-14 border-b pb-10" style={{ borderColor: dividerColor }}>
            <h2 className="mb-6 text-xl font-semibold">Q&A</h2>
            <div className={`${contentWidthClass} space-y-3`}>
              {qnaItems.map((item, index) => (
                <details
                  key={`${project.id}-qna-${index}`}
                  className={`group rounded-[1.5rem] border px-5 py-4 ${
                    isDark ? "border-neutral-800 bg-neutral-950/70" : "border-neutral-200 bg-white"
                  }`}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-semibold leading-6">
                    <span>{toLocalized(item.question, isKorean)}</span>
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 shrink-0 text-lg leading-none transition-transform group-open:rotate-45 ${
                        isDark ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    >
                      +
                    </span>
                  </summary>
                  <p className={`pt-3 text-sm leading-7 md:text-[15px] ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                    {toLocalized(item.answer, isKorean)}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">{isKorean ? "기술 스택" : "Tech Stack"}</h2>
          <div className={`${contentWidthClass} flex flex-wrap gap-2.5`}>
            {project.tech.map((tech) => (
              <span
                key={`${project.id}-${tech}`}
                className={`min-w-[9rem] rounded-full border px-3 py-2 text-center text-xs ${
                  isDark ? "border-neutral-800 bg-neutral-900" : "border-neutral-300 bg-neutral-100"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {project.links && project.links.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-semibold">{isKorean ? "관련 링크" : "Related Links"}</h2>
            <div className={`${contentWidthClass} flex flex-wrap gap-3`}>
              {project.links.map((link) => (
                <a
                  key={`${project.id}-${link.label}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                  style={accentStyle}
                >
                  {link.label} (ext)
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      <a
        href="#top"
        aria-label={isKorean ? "페이지 맨 위로 이동" : "Back to top"}
        className="fixed bottom-24 right-6 flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-semibold uppercase tracking-[0.08em] transition-opacity hover:opacity-100"
        style={{
          backgroundColor: accentStyle.color,
          color: isDark ? "hsl(0 0% 6%)" : "hsl(0 0% 100%)",
          opacity: 0.8,
        }}
      >
        Top
      </a>
    </main>
  );
}
