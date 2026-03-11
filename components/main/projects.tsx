"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

function getDetailStatusLabel(project: Project, isKorean: boolean): string {
  if (hasProjectDetail(project)) {
    return isKorean ? "\uC0C1\uC138 \uD398\uC774\uC9C0 \uACF5\uAC1C" : "Detail page available";
  }
  return isKorean ? "\uC0C1\uC138 \uD398\uC774\uC9C0 \uC900\uBE44 \uC911" : "Detail page coming soon";
}

function getResultLabel(project: Project, isKorean: boolean): string {
  return toLocalized(project.featuredResultLabel, isKorean) || (isKorean ? "\uB300\uD45C \uC131\uACFC" : "Result");
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
    <section className="mt-12">
      <p className={`text-sm uppercase tracking-[0.18em] mb-2 ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
        {isKorean ? "\uAE30\uD0C0 \uD504\uB85C\uC81D\uD2B8" : "Additional Projects"}
      </p>
      <p className={`text-sm max-w-2xl leading-7 mb-5 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
        {isKorean
          ? "\uAC04\uB2E8\uD788 \uD6D1\uC5B4\uBCFC \uC218 \uC788\uB3C4\uB85D \uC555\uCD95\uD574 \uB454 \uD504\uB85C\uC81D\uD2B8 \uBAA9\uB85D\uC785\uB2C8\uB2E4."
          : "Compressed project list for quick scanning, expandable only when needed."}
      </p>

      <div className="rounded-[1.75rem] border overflow-hidden" style={{ backgroundColor: palette.surface, borderColor: palette.border }}>
        {entries.map(({ project, anchorId }, index) => {
          const isOpen = openSecondaryId === project.id;
          const accordionContentId = `${project.id}-content`;

          return (
            <article
              key={`${anchorId}-${index}`}
              id={anchorId}
              className={index > 0 ? "border-t" : ""}
              style={index > 0 ? { borderColor: palette.border } : undefined}
            >
              <button
                type="button"
                onClick={() => setOpenSecondaryId((prev) => (prev === project.id ? null : project.id))}
                className="w-full text-left px-5 py-4 transition-colors"
                style={{ backgroundColor: isOpen ? palette.surfaceAlt : palette.surface }}
                aria-expanded={isOpen}
                aria-controls={accordionContentId}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-lg md:text-xl font-semibold">{toLocalized(project.title, isKorean)}</h3>
                      <span className="text-xs font-medium" style={{ color: palette.textMuted }}>
                        {getDetailStatusLabel(project, isKorean)}
                      </span>
                    </div>
                    <p className="text-sm mt-2 leading-7" style={{ color: palette.textMuted }}>
                      {toLocalized(project.company, isKorean)} | {toLocalized(project.team, isKorean)}
                    </p>
                    <p className="text-sm leading-7" style={{ color: palette.textMuted }}>
                      {project.period}
                    </p>
                  </div>
                  <span className="text-lg leading-none" style={{ color: palette.accent }}>
                    {isOpen ? "-" : "+"}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div id={accordionContentId} className="px-5 pb-5" style={{ backgroundColor: palette.surfaceAlt }}>
                  <p className={`text-sm leading-7 pt-1 ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                    {toLocalized(project.description, isKorean)}
                  </p>

                  {project.links && project.links.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
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
                  )}

                  <div className="mt-5">
                    <h4 className="text-xs font-semibold mb-2 tracking-[0.16em] uppercase" style={{ color: palette.textMuted }}>
                      {isKorean ? "\uD575\uC2EC \uC131\uACFC" : "Key achievements"}
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
                    <h4 className="text-xs font-semibold mb-2 tracking-[0.16em] uppercase" style={{ color: palette.textMuted }}>
                      {isKorean ? "\uAE30\uC220 \uC2A4\uD0DD" : "Tech stack"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => {
                        const docUrl = techDocs[tech];
                        const className = "px-3 py-1 border rounded-full text-xs transition-colors";
                        const style = {
                          borderColor: palette.border,
                          backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)",
                          color: isDark ? "hsl(0 0% 92%)" : "hsl(0 0% 15%)",
                        };

                        return docUrl ? (
                          <a key={`${project.id}-${tech}`} href={docUrl} target="_blank" rel="noopener noreferrer" className={className} style={style}>
                            [{tech}] (doc)
                          </a>
                        ) : (
                          <span key={`${project.id}-${tech}`} className={className} style={style}>
                            [{tech}]
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {hasProjectDetail(project) && (
                    <div className="mt-5">
                      <Link href={`/projects/${project.slug}`} className="text-sm hover:underline" style={accentStyle}>
                        {isKorean ? "\uD504\uB85C\uC81D\uD2B8 \uC0C1\uC138 \uBCF4\uAE30" : "View project details"}
                      </Link>
                    </div>
                  )}
                </div>
              )}
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
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-balance" style={{ color: palette.accentStrong }}>
          {isKorean ? "\uD504\uB85C\uC81D\uD2B8" : "PROJECTS"}
        </h2>
        <p
          className="max-w-2xl text-base md:text-lg font-medium leading-[1.6] mb-12"
          style={{ color: isDark ? "rgba(226, 232, 224, 0.9)" : "#465043" }}
        >
          {isKorean
            ? "AI \uD30C\uC774\uD504\uB77C\uC778 \uC124\uACC4\uC640 \uC11C\uBE44\uC2A4 \uC790\uB3D9\uD654 \uACBD\uD5D8\uC744 \uC911\uC2EC\uC73C\uB85C \uC815\uB9AC\uD588\uC2B5\uB2C8\uB2E4."
            : "Selected work centered on AI pipeline design and service automation."}
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
                      DATE {project.period.replace(" ~ ", " - ")}
                    </span>
                  </div>

                  {hasProjectDetail(project) ? (
                    <h3 className="mt-5 text-3xl md:text-[2rem] font-bold tracking-tight leading-tight">
                      <Link href={`/projects/${project.slug}`} className="hover:underline focus-visible:underline">
                        {toLocalized(project.title, isKorean)}
                      </Link>
                    </h3>
                  ) : (
                    <h3 className="mt-5 text-3xl md:text-[2rem] font-bold tracking-tight leading-tight">{toLocalized(project.title, isKorean)}</h3>
                  )}

                  <div
                    className="mt-5 rounded-[1.25rem] border px-5 py-4"
                    style={{
                      background: isDark ? "linear-gradient(135deg, #263126 0%, #162017 100%)" : "linear-gradient(135deg, #edf6e8 0%, #d8e8d0 100%)",
                      borderColor: palette.accent,
                      boxShadow: isDark ? "0 12px 28px rgba(0,0,0,0.22)" : "0 12px 28px rgba(53, 93, 56, 0.10)",
                    }}
                  >
                    <p className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: palette.accentStrong }}>
                      {getResultLabel(project, isKorean)}
                    </p>
                    <p className="mt-2 text-2xl md:text-[1.75rem] font-bold leading-tight" style={{ color: palette.accentStrong }}>
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
                    <h4 className="text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: palette.textMuted }}>
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
                    <h4 className="text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: palette.textMuted }}>
                      {isKorean ? "\uAE30\uC220 \uC2A4\uD0DD" : "Tech Stack"}
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
                        {isKorean ? "\uD504\uB85C\uC81D\uD2B8 \uC0C1\uC138 \uBCF4\uAE30" : "View project details"}
                      </Link>
                    )}
                  </div>
                </div>

                <div className="rounded-[1.35rem] border p-3" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.78)", borderColor: palette.border }}>
                  {project.previewImageSrc ? (
                    <div className="overflow-hidden rounded-[1rem] border" style={{ borderColor: palette.border }}>
                      <Image
                        src={project.previewImageSrc}
                        alt={toLocalized(project.previewImageAlt, isKorean) || toLocalized(project.title, isKorean)}
                        width={640}
                        height={480}
                        className="h-auto w-full"
                      />
                    </div>
                  ) : (
                    <div
                      className="rounded-[1rem] p-5 min-h-[220px]"
                      style={{ background: `linear-gradient(160deg, ${palette.accentSoft} 0%, ${palette.surfaceAlt} 100%)` }}
                    >
                      <p className="text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: palette.accentStrong }}>
                        {isKorean ? "\uC2A4\uB0C5\uC0F7" : "Snapshot"}
                      </p>
                      <p className="mt-6 text-xl font-semibold leading-snug" style={{ color: palette.accentStrong }}>
                        {isKorean ? "\uC0AC\uC9C4 \uB610\uB294 \uC774\uBBF8\uC9C0 \uC900\uBE44 \uC911\uC785\uB2C8\uB2E4." : "Image or screenshot coming soon."}
                      </p>
                      <p className="mt-4 text-sm leading-7" style={{ color: palette.textMuted }}>
                        {isKorean
                          ? "\uCD94\uD6C4 \uC11C\uBE44\uC2A4 \uD654\uBA74 \uB610\uB294 \uAD6C\uC870 \uB2E4\uC774\uC5B4\uADF8\uB7A8\uC744 \uCD94\uAC00\uD560 \uC608\uC815\uC785\uB2C8\uB2E4."
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
