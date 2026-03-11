"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { projects, type LocalizedList, type LocalizedText, type Project } from "@/data/projects";
import { techDocs } from "@/data/tech-docs";
import { useTheme } from "@/contexts/theme-context";
import { getProjectAccentStyle } from "@/lib/project-accent";
import { getAllProjectAnchorIds } from "@/lib/project-anchors";
import { hasProjectDetail } from "@/lib/projects";

type ProjectEntry = {
  project: Project;
  anchorId: string;
};

function toLocalized(value: string | LocalizedText, isKorean: boolean): string {
  return typeof value === "string" ? value : isKorean ? value.ko : value.en;
}

function toLocalizedArray(value: string[] | LocalizedList, isKorean: boolean): string[] {
  return Array.isArray(value) ? value : isKorean ? value.ko : value.en;
}

function getDetailStatusLabel(project: Project, isKorean: boolean): string {
  if (hasProjectDetail(project)) {
    return isKorean ? "\uC0C1\uC138 \uD398\uC774\uC9C0 \uACF5\uAC1C" : "Detail page available";
  }
  return isKorean ? "\uC0C1\uC138 \uD398\uC774\uC9C0 \uC900\uBE44 \uC911" : "Detail page coming soon";
}

function getSectionLabel(isKorean: boolean, featured: boolean): string {
  if (featured) {
    return isKorean ? "\uAC15\uC870 \uD504\uB85C\uC81D\uD2B8" : "Highlighted Projects";
  }
  return isKorean ? "\uAE30\uD0C0 \uD504\uB85C\uC81D\uD2B8" : "Additional Projects";
}

export default function Projects() {
  const { isDark, isKorean } = useTheme();
  const [openSecondaryId, setOpenSecondaryId] = useState<string | null>(null);
  const projectAnchorIds = useMemo(() => getAllProjectAnchorIds(), []);
  const accentStyle = useMemo(() => getProjectAccentStyle(isDark), [isDark]);

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

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash.startsWith("project-")) {
        return;
      }

      const secondaryEntry = secondaryEntries.find((entry) => entry.anchorId === hash);
      if (secondaryEntry) {
        setOpenSecondaryId(secondaryEntry.project.id);
      }

      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [secondaryEntries]);

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-tight text-balance" style={{ color: "#C3E41D" }}>
          {isKorean ? "\uD504\uB85C\uC81D\uD2B8" : "PROJECTS"}
        </h2>

        <div className="space-y-16">
          <section>
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className={`text-sm uppercase tracking-[0.24em] mb-2 ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                  {getSectionLabel(isKorean, true)}
                </p>
                <p className={`text-sm max-w-2xl ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                  {isKorean
                    ? "\uC9C0\uAE08 \uD3EC\uD2B8\uD3F4\uB9AC\uC624\uC5D0\uC11C \uAC00\uC7A5 \uAC15\uD558\uAC8C \uBCF4\uC5EC\uC8FC\uACE0 \uC2F6\uC740 \uD504\uB85C\uC81D\uD2B8\uB4E4\uC785\uB2C8\uB2E4."
                    : "Projects that should carry the strongest emphasis in the portfolio."}
                </p>
              </div>
            </div>

            <div className="grid gap-8">
              {featuredEntries.map(({ project, anchorId }, index) => (
                <article
                  key={`${anchorId}-${index}`}
                  id={anchorId}
                  className={`border rounded-lg p-8 transition-colors ${
                    isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      {hasProjectDetail(project) ? (
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                          <Link href={`/projects/${project.slug}`} className="hover:underline focus-visible:underline">
                            {toLocalized(project.title, isKorean)}
                          </Link>
                        </h3>
                      ) : (
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">{toLocalized(project.title, isKorean)}</h3>
                      )}

                      <p className={`text-xs mb-2 ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                        {getDetailStatusLabel(project, isKorean)}
                      </p>

                      {project.links && project.links.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-1 mb-1">
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

                      <p className={`text-sm ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                        {toLocalized(project.company, isKorean)} | {toLocalized(project.team, isKorean)}
                      </p>
                    </div>

                    <span className={`mt-2 md:mt-0 text-sm font-semibold whitespace-nowrap ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                      {project.period}
                    </span>
                  </div>

                  <p className={`text-base mb-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                    {toLocalized(project.description, isKorean)}
                  </p>

                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                      {isKorean ? "\uD575\uC2EC \uC131\uACFC" : "KEY ACHIEVEMENTS"}
                    </h4>
                    <ul className="space-y-2">
                      {toLocalizedArray(project.achievements, isKorean).map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start">
                          <span className={isDark ? "text-green-400" : "text-green-600"} style={{ marginRight: "0.75rem" }}>
                            -
                          </span>
                          <span className={`text-sm ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                      {isKorean ? "\uAE30\uC220 \uC2A4\uD0DD" : "TECH STACK"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => {
                        const docUrl = techDocs[tech];
                        const className = `px-3 py-1 border rounded-full text-xs transition-colors ${
                          isDark ? "bg-neutral-900 border-neutral-800 hover:border-neutral-700" : "bg-neutral-100 border-neutral-300 hover:border-neutral-400"
                        }`;

                        return docUrl ? (
                          <a key={techIndex} href={docUrl} target="_blank" rel="noopener noreferrer" className={className}>
                            {tech} (doc)
                          </a>
                        ) : (
                          <span key={techIndex} className={className}>
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {hasProjectDetail(project) && (
                    <div className="mt-6">
                      <Link href={`/projects/${project.slug}`} className="text-sm hover:underline" style={accentStyle}>
                        {isKorean ? "\uD504\uB85C\uC81D\uD2B8 \uC0C1\uC138 \uBCF4\uAE30" : "View project details"}
                      </Link>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className={`text-sm uppercase tracking-[0.24em] mb-2 ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                  {getSectionLabel(isKorean, false)}
                </p>
                <p className={`text-sm max-w-2xl ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                  {isKorean
                    ? "\uD544\uC694\uD560 \uB54C \uD655\uC7A5\uD574 \uBCFC \uC218 \uC788\uB3C4\uB85D \uAC04\uB7B5\uD788 \uC815\uB9AC\uD55C \uD504\uB85C\uC81D\uD2B8 \uBAA9\uB85D\uC785\uB2C8\uB2E4."
                    : "Lower-emphasis projects, kept compact and expandable on demand."}
                </p>
              </div>
            </div>

            <div className={`rounded-2xl border overflow-hidden ${isDark ? "border-neutral-800" : "border-neutral-300"}`}>
              {secondaryEntries.map(({ project, anchorId }, index) => {
                const isOpen = openSecondaryId === project.id;
                const accordionContentId = `${project.id}-content`;

                return (
                  <article
                    key={`${anchorId}-${index}`}
                    id={anchorId}
                    className={`${index > 0 ? (isDark ? "border-t border-neutral-800" : "border-t border-neutral-300") : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenSecondaryId((prev) => (prev === project.id ? null : project.id))}
                      className={`w-full text-left px-5 py-4 transition-colors ${
                        isDark ? "bg-neutral-950 hover:bg-neutral-900" : "bg-white hover:bg-neutral-50"
                      }`}
                      aria-expanded={isOpen}
                      aria-controls={accordionContentId}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <h3 className="text-lg md:text-xl font-semibold">{toLocalized(project.title, isKorean)}</h3>
                            <span className={`text-xs font-medium ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                              {getDetailStatusLabel(project, isKorean)}
                            </span>
                          </div>
                          <p className={`text-sm mt-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                            {toLocalized(project.company, isKorean)} | {toLocalized(project.team, isKorean)}
                          </p>
                          <p className={`text-sm mt-1 ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>{project.period}</p>
                        </div>
                        <ChevronDown className={`mt-1 h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    {isOpen && (
                      <div
                        id={accordionContentId}
                        className={`px-5 pb-5 ${isDark ? "bg-black" : "bg-neutral-50/60"}`}
                      >
                        <p className={`text-sm leading-7 pt-1 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
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
                          <h4 className={`text-xs font-semibold mb-2 tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                            {isKorean ? "\uD575\uC2EC \uC131\uACFC" : "KEY ACHIEVEMENTS"}
                          </h4>
                          <ul className="space-y-2">
                            {toLocalizedArray(project.achievements, isKorean).map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className={`text-sm ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                                - {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-5">
                          <h4 className={`text-xs font-semibold mb-2 tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                            {isKorean ? "\uAE30\uC220 \uC2A4\uD0DD" : "TECH STACK"}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => {
                              const docUrl = techDocs[tech];
                              const className = `px-3 py-1 border rounded-full text-xs transition-colors ${
                                isDark ? "bg-neutral-900 border-neutral-800 hover:border-neutral-700" : "bg-white border-neutral-300 hover:border-neutral-400"
                              }`;

                              return docUrl ? (
                                <a key={`${project.id}-${tech}`} href={docUrl} target="_blank" rel="noopener noreferrer" className={className}>
                                  {tech} (doc)
                                </a>
                              ) : (
                                <span key={`${project.id}-${tech}`} className={className}>
                                  {tech}
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
        </div>
      </div>
    </section>
  );
}
