"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { projects, type LocalizedList, type LocalizedText, type Project } from "@/data/projects";
import { techDocs } from "@/data/tech-docs";
import { useTheme } from "@/contexts/theme-context";
import { getProjectAccentStyle, getProjectPalette } from "@/lib/project-accent";
import { getAllProjectAnchorIds } from "@/lib/project-anchors";
import { hasProjectDetail } from "@/lib/projects";

type ProjectEntry = {
  project: Project;
  anchorId: string;
};

function toLocalized(value: string | LocalizedText | undefined, isKorean: boolean): string {
  if (!value) {
    return "";
  }
  return typeof value === "string" ? value : isKorean ? value.ko : value.en;
}

function toLocalizedArray(value: string[] | LocalizedList | undefined, isKorean: boolean): string[] {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : isKorean ? value.ko : value.en;
}

function formatProjectPeriod(period: string): string {
  return period.replace(" ~ ", " — ");
}

function getDetailStatusLabel(project: Project, isKorean: boolean): string {
  if (hasProjectDetail(project)) {
    return isKorean ? "상세 페이지 공개" : "Detail page available";
  }
  return isKorean ? "상세 페이지 준비 중" : "Detail page coming soon";
}

function getResultLabel(project: Project, isKorean: boolean): string {
  return toLocalized(project.featuredResultLabel, isKorean) || (isKorean ? "대표 성과" : "Result");
}

function getResultText(project: Project, isKorean: boolean): string {
  const featuredResult = toLocalized(project.featuredResult, isKorean);
  if (featuredResult) {
    return featuredResult;
  }

  return toLocalizedArray(project.achievements, isKorean)[0] ?? "";
}

function getContributionList(project: Project, isKorean: boolean): string[] {
  const explicit = toLocalizedArray(project.keyContributions, isKorean);
  if (explicit.length > 0) {
    return explicit;
  }

  return toLocalizedArray(project.achievements, isKorean).slice(1);
}

function getSecondaryToggleLabel(isOpen: boolean, isKorean: boolean): string {
  if (isOpen) {
    return isKorean ? "상세 닫기" : "Hide details";
  }

  return isKorean ? "상세 보기" : "View details";
}

function SecondaryProjects({
  entries,
  isDark,
  isKorean,
  accentStyle,
  palette,
}: {
  entries: ProjectEntry[];
  isDark: boolean;
  isKorean: boolean;
  accentStyle: { color: string };
  palette: ReturnType<typeof getProjectPalette>;
}) {
  const [openSecondaryId, setOpenSecondaryId] = useState<string | null>(null);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash.startsWith("project-")) {
        return;
      }

      const matched = entries.find((entry) => entry.anchorId === hash);
      if (matched) {
        setOpenSecondaryId(matched.project.id);
      }

      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [entries]);

  return (
    <section className="mt-16">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1" style={{ backgroundColor: isDark ? "rgba(159, 207, 142, 0.22)" : "rgba(79, 127, 77, 0.18)" }} />
        <p className={`text-sm uppercase tracking-[0.18em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
          {isKorean ? "기타 프로젝트" : "Additional Projects"}
        </p>
        <div className="h-px flex-1" style={{ backgroundColor: isDark ? "rgba(159, 207, 142, 0.22)" : "rgba(79, 127, 77, 0.18)" }} />
      </div>

      <p
        className="mt-5 max-w-2xl text-base md:text-lg font-medium leading-[1.6] mb-6"
        style={{ color: isDark ? "rgba(226, 232, 224, 0.9)" : "#465043" }}
      >
        {isKorean
          ? "간단히 훑어볼 수 있도록 압축해 둔 프로젝트 목록입니다."
          : "A compressed project list designed for quick scanning."}
      </p>

      <div
        className="overflow-hidden rounded-[1.75rem] border"
        style={{
          backgroundColor: palette.surface,
          borderColor: isDark ? "rgba(159, 207, 142, 0.18)" : "rgba(79, 127, 77, 0.16)",
        }}
      >
        {entries.map(({ project, anchorId }, index) => {
          const isOpen = openSecondaryId === project.id;
          const accordionContentId = `${project.id}-content`;
          const summary = toLocalized(project.description, isKorean);
          const meta = `${toLocalized(project.company, isKorean)} | ${toLocalized(project.team, isKorean)}`;
          const summaryLinks = project.links ?? [];
          const rowBorderColor = isDark ? "rgba(159, 207, 142, 0.14)" : "rgba(79, 127, 77, 0.12)";
          const openBorderColor = isDark ? "rgba(159, 207, 142, 0.34)" : "rgba(79, 127, 77, 0.28)";
          const rowBackground = isOpen
            ? isDark
              ? "rgba(255,255,255,0.028)"
              : "rgba(248, 251, 246, 0.96)"
            : isDark
              ? "rgba(255,255,255,0.015)"
              : "rgba(255,255,255,0.72)";

          return (
            <article
              key={`${anchorId}-${index}`}
              id={anchorId}
              className={index > 0 ? "border-t" : ""}
              style={{
                borderColor: index > 0 ? rowBorderColor : undefined,
                boxShadow: isOpen ? `inset 2px 0 0 ${palette.accent}` : "none",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenSecondaryId((prev) => (prev === project.id ? null : project.id))}
                className="group w-full px-5 py-5 text-left transition-all duration-200 hover:[&_.secondary-project-toggle]:opacity-100"
                style={{ backgroundColor: rowBackground }}
                aria-expanded={isOpen}
                aria-controls={accordionContentId}
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="pr-2 text-lg font-semibold leading-snug tracking-[-0.01em] md:text-[1.35rem]">
                        {toLocalized(project.title, isKorean)}
                      </h3>
                      <span
                        className="secondary-project-toggle inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] opacity-100 transition-all duration-200 md:opacity-70"
                        style={{
                          color: isOpen ? palette.accentStrong : palette.textMuted,
                          borderColor: isOpen ? openBorderColor : rowBorderColor,
                          backgroundColor: isOpen
                            ? isDark
                              ? "rgba(159, 207, 142, 0.08)"
                              : "rgba(79, 127, 77, 0.08)"
                            : isDark
                              ? "rgba(255,255,255,0.03)"
                              : "rgba(255,255,255,0.8)",
                        }}
                      >
                        {getSecondaryToggleLabel(isOpen, isKorean)}
                        {isOpen ? <Minus size={14} strokeWidth={2.2} /> : <Plus size={14} strokeWidth={2.2} />}
                      </span>
                    </div>

                    <p className={`mt-2 text-sm leading-7 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                      {summary}
                      {isOpen && summaryLinks.length > 0 && (
                        <span className="ml-2 inline-flex flex-wrap items-center gap-x-2 gap-y-1 align-baseline">
                          {summaryLinks.map((link) => (
                            <a
                              key={`${project.id}-${link.label}-inline`}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium hover:underline"
                              style={accentStyle}
                            >
                              ({link.label})
                            </a>
                          ))}
                        </span>
                      )}
                    </p>

                    <div
                      className="mt-3 flex flex-col gap-1 text-xs md:flex-row md:flex-wrap md:items-center md:gap-x-4 md:gap-y-1"
                      style={{ color: palette.textMuted }}
                    >
                      <p className="leading-6">{meta}</p>
                      <span className="hidden md:inline" aria-hidden="true">
                        •
                      </span>
                      <p className="leading-6">{formatProjectPeriod(project.period)}</p>
                    </div>
                  </div>
                </div>
              </button>

              <div
                className="grid transition-[grid-template-rows,opacity] duration-200 ease-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  opacity: isOpen ? 1 : 0,
                  backgroundColor: rowBackground,
                }}
              >
                <div className="overflow-hidden">
                  <div
                    id={accordionContentId}
                    className="px-5 pb-5"
                    aria-hidden={!isOpen}
                    style={{ pointerEvents: isOpen ? "auto" : "none" }}
                  >
                    <div
                      className="mb-4 h-px w-full"
                      style={{ backgroundColor: isOpen ? openBorderColor : rowBorderColor }}
                    />

                    <div>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: palette.textMuted }}>
                        {isKorean ? "핵심 성과" : "Key achievements"}
                      </h4>
                      <ul className="space-y-2">
                        {toLocalizedArray(project.achievements, isKorean).map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className={`text-sm leading-7 ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                            - {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5">
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: palette.textMuted }}>
                        {isKorean ? "사용 도구" : "Tools"}
                      </h4>
                      <p className={`text-sm leading-7 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>{project.tech.join(", ")}</p>
                    </div>

                    {hasProjectDetail(project) && (
                      <div className="mt-5">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-sm hover:underline"
                          style={accentStyle}
                          tabIndex={isOpen ? undefined : -1}
                        >
                          {isKorean ? "프로젝트 상세 보기" : "View project details"}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function Projects() {
  const { isDark, isKorean } = useTheme();
  const projectAnchorIds = useMemo(() => getAllProjectAnchorIds(), []);
  const palette = getProjectPalette(isDark);
  const accentStyle = getProjectAccentStyle(isDark) as { color: string };

  const entries = useMemo<ProjectEntry[]>(
    () =>
      projects.map((project, index) => ({
        project,
        anchorId: projectAnchorIds[index] ?? `project-${index + 1}`,
      })),
    [projectAnchorIds]
  );

  const featuredEntries = useMemo(() => entries.filter(({ project }) => project.isFeatured), [entries]);
  const secondaryEntries = useMemo(() => entries.filter(({ project }) => !project.isFeatured), [entries]);

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        background: isDark
          ? "radial-gradient(circle at top, rgba(159, 207, 142, 0.14), transparent 30%), hsl(0 0% 0%)"
          : "radial-gradient(circle at top, rgba(79, 127, 77, 0.08), transparent 28%), hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <div className="max-w-[1100px] w-full">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl" style={{ color: palette.accentStrong }}>
          {isKorean ? "프로젝트" : "PROJECTS"}
        </h2>
        <p
          className="mb-8 max-w-2xl text-base font-medium leading-[1.6] md:text-lg"
          style={{ color: isDark ? "rgba(226, 232, 224, 0.9)" : "#465043" }}
        >
          {isKorean
            ? "AI 파이프라인 설계와 서비스 자동화 경험을 중심으로 정리했습니다."
            : "Selected work centered on AI pipeline design and service automation."}
        </p>
        <p className={`mb-6 text-sm uppercase tracking-[0.18em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
          {isKorean ? "대표 프로젝트" : "Featured Projects"}
        </p>

        <div className="grid gap-6">
          {featuredEntries.map(({ project, anchorId }, index) => (
            <article
              key={`${anchorId}-${index}`}
              id={anchorId}
              className="rounded-[1.75rem] border p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]"
              style={{
                backgroundColor: isDark ? "rgba(10, 10, 10, 0.72)" : "rgba(255, 255, 255, 0.92)",
                borderColor: palette.border,
                boxShadow: isDark ? "0 20px 44px rgba(0, 0, 0, 0.24)" : "0 24px 52px rgba(53, 93, 56, 0.10)",
              }}
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_300px] lg:items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase"
                      style={{ backgroundColor: palette.accentSoft, color: palette.accentStrong }}
                    >
                      {getDetailStatusLabel(project, isKorean)}
                    </span>
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase"
                      style={{ backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(79,127,77,0.08)", color: palette.textMuted }}
                    >
                      DATE {formatProjectPeriod(project.period)}
                    </span>
                  </div>

                  {hasProjectDetail(project) ? (
                    <h3 className="mt-5 text-3xl font-bold tracking-tight leading-tight md:text-[2rem]">
                      <Link href={`/projects/${project.slug}`} className="hover:underline focus-visible:underline">
                        {toLocalized(project.title, isKorean)}
                      </Link>
                    </h3>
                  ) : (
                    <h3 className="mt-5 text-3xl font-bold tracking-tight leading-tight md:text-[2rem]">{toLocalized(project.title, isKorean)}</h3>
                  )}

                  <div
                    className="mt-5 rounded-[1.25rem] border px-5 py-4"
                    style={{
                      background: isDark ? "linear-gradient(135deg, #263126 0%, #162017 100%)" : "linear-gradient(135deg, #edf6e8 0%, #d8e8d0 100%)",
                      borderColor: palette.accent,
                      boxShadow: isDark ? "0 12px 28px rgba(0,0,0,0.22)" : "0 12px 28px rgba(53, 93, 56, 0.10)",
                    }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: palette.accentStrong }}>
                      {getResultLabel(project, isKorean)}
                    </p>
                    <p className="mt-2 text-2xl font-bold leading-tight md:text-[1.75rem]" style={{ color: palette.accentStrong }}>
                      {getResultText(project, isKorean)}
                    </p>
                  </div>

                  <p className={`mt-5 text-base leading-[1.7] ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                    {toLocalized(project.description, isKorean)}
                  </p>
                  <p className="mt-2 text-sm leading-7" style={{ color: palette.textMuted }}>
                    {toLocalized(project.company, isKorean)} | {toLocalized(project.team, isKorean)}
                  </p>

                  <div className="mt-7">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: palette.textMuted }}>
                      Key Contributions
                    </h4>
                    <ul className="mt-4 space-y-3">
                      {getContributionList(project, isKorean).map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-sm leading-[1.7]">
                          <span style={{ color: palette.accent }}>-</span>
                          <span className={isDark ? "text-neutral-200" : "text-neutral-800"}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: palette.textMuted }}>
                      {isKorean ? "기술 스택" : "Tech Stack"}
                    </h4>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {project.tech.map((tech) => {
                        const docUrl = techDocs[tech];
                        const className = "px-3.5 py-2 rounded-full border text-xs transition-all duration-200 hover:-translate-y-0.5";
                        const style = {
                          borderColor: palette.border,
                          backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "#f7faf4",
                          color: isDark ? "hsl(0 0% 92%)" : "hsl(0 0% 15%)",
                        };

                        return docUrl ? (
                          <a key={tech} href={docUrl} target="_blank" rel="noopener noreferrer" className={className} style={style}>
                            [{tech}]
                          </a>
                        ) : (
                          <span key={tech} className={className} style={style}>
                            [{tech}]
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    {project.links?.map((link) => (
                      <a
                        key={`${project.id}-${link.label}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border px-3.5 py-2 text-sm transition-colors hover:underline"
                        style={{
                          ...accentStyle,
                          borderColor: palette.border,
                          backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)",
                        }}
                      >
                        {link.label} (ext)
                      </a>
                    ))}

                    {hasProjectDetail(project) && (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors hover:underline"
                        style={{
                          ...accentStyle,
                          borderColor: palette.accent,
                          backgroundColor: isDark ? "rgba(159, 207, 142, 0.08)" : "rgba(79, 127, 77, 0.10)",
                        }}
                      >
                        {isKorean ? "프로젝트 상세 보기" : "View project details"}
                      </Link>
                    )}
                  </div>
                </div>

                <div className="rounded-[1.35rem] border p-3" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.78)", borderColor: palette.border }}>
                  {project.previewImageSrc ? (
                    hasProjectDetail(project) ? (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="block overflow-hidden rounded-[1rem] border transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        style={{
                          borderColor: palette.border,
                          ...(isDark
                            ? { boxShadow: "0 0 0 0 rgba(0,0,0,0)", ["--tw-ring-color" as string]: "rgba(159, 207, 142, 0.65)", ["--tw-ring-offset-color" as string]: "rgba(10, 10, 10, 1)" }
                            : { boxShadow: "0 0 0 0 rgba(0,0,0,0)", ["--tw-ring-color" as string]: "rgba(79, 127, 77, 0.45)", ["--tw-ring-offset-color" as string]: "rgba(255, 255, 255, 1)" }),
                        }}
                        aria-label={`${toLocalized(project.title, isKorean)} ${isKorean ? "상세 보기" : "details"}`}
                      >
                        <Image
                          src={project.previewImageSrc}
                          alt={toLocalized(project.previewImageAlt, isKorean) || toLocalized(project.title, isKorean)}
                          width={640}
                          height={480}
                          className="h-auto w-full transition-transform duration-300 hover:scale-[1.02]"
                        />
                      </Link>
                    ) : (
                      <div className="overflow-hidden rounded-[1rem] border" style={{ borderColor: palette.border }}>
                        <Image
                          src={project.previewImageSrc}
                          alt={toLocalized(project.previewImageAlt, isKorean) || toLocalized(project.title, isKorean)}
                          width={640}
                          height={480}
                          className="h-auto w-full"
                        />
                      </div>
                    )
                  ) : (
                    <div
                      className="min-h-[220px] rounded-[1rem] p-5"
                      style={{ background: `linear-gradient(160deg, ${palette.accentSoft} 0%, ${palette.surfaceAlt} 100%)` }}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: palette.accentStrong }}>
                        {isKorean ? "스냅샷" : "Snapshot"}
                      </p>
                      <p className="mt-6 text-xl font-semibold leading-snug" style={{ color: palette.accentStrong }}>
                        {isKorean ? "사진 또는 이미지 준비 중입니다." : "Image or screenshot coming soon."}
                      </p>
                      <p className="mt-4 text-sm leading-7" style={{ color: palette.textMuted }}>
                        {isKorean
                          ? "추후 서비스 화면 또는 구조 다이어그램을 추가할 예정입니다."
                          : "A service screen or architecture diagram will be added here later."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <SecondaryProjects
          entries={secondaryEntries}
          isDark={isDark}
          isKorean={isKorean}
          accentStyle={accentStyle}
          palette={palette}
        />
      </div>
    </section>
  );
}
