"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/contexts/theme-context";
import { techDocs } from "@/data/tech-docs";
import { projects } from "@/data/projects";
import { getAllProjectAnchorIds } from "@/lib/project-anchors";

export default function Projects() {
  const { isDark, isKorean } = useTheme();
  const [showAll, setShowAll] = useState(false);
  const projectAnchorIds = useMemo(() => getAllProjectAnchorIds(), []);

  const displayedEntries = useMemo(() => {
    const indices = showAll ? projects.map((_, index) => index) : [0, 1, 2].filter((index) => index < projects.length);
    return indices.map((index) => ({
      project: projects[index],
      anchorId: projectAnchorIds[index],
    }));
  }, [projectAnchorIds, showAll]);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash.startsWith("project-")) {
        return;
      }

      const hiddenAnchorIds = projectAnchorIds.slice(3);
      if (hiddenAnchorIds.includes(hash)) {
        setShowAll(true);
      }

      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [projectAnchorIds]);

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
          {isKorean ? "프로젝트" : "PROJECTS"}
        </h2>

        <div className="grid gap-8">
          {displayedEntries.map(({ project, anchorId }, index) => (
            <div
              key={`${anchorId}-${index}`}
              id={anchorId}
              style={{ scrollMarginTop: "5rem" }}
              className={`border rounded-lg p-8 transition-colors ${
                isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {typeof project.title === "string" ? project.title : isKorean ? project.title.ko : project.title.en}
                  </h3>
                  {project.links && (
                    <div className="flex gap-3 mt-1 mb-1">
                      {project.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                          style={{ color: "#C3E41D" }}
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                  <p className={`text-sm ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                    {typeof project.company === "string" ? project.company : isKorean ? project.company.ko : project.company.en} |{" "}
                    {typeof project.team === "string" ? project.team : isKorean ? project.team.ko : project.team.en}
                  </p>
                </div>
                <span className={`mt-2 md:mt-0 text-sm font-semibold whitespace-nowrap ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                  {project.period}
                </span>
              </div>

              <p className={`text-base mb-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                {typeof project.description === "string" ? project.description : isKorean ? project.description.ko : project.description.en}
              </p>

              <div className="mb-6">
                <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                  {isKorean ? "핵심 성과" : "KEY ACHIEVEMENTS"}
                </h4>
                <ul className="space-y-2">
                  {(Array.isArray(project.achievements) ? project.achievements : isKorean ? project.achievements.ko : project.achievements.en).map(
                    (achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start">
                        <span className={isDark ? "text-green-400" : "text-green-600"} style={{ marginRight: "0.75rem" }}>
                          •
                        </span>
                        <span className={`text-sm ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>{achievement}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                  {isKorean ? "기술 스택" : "TECH STACK"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => {
                    const docUrl = techDocs[tech];
                    const className = `px-3 py-1 border rounded-full text-xs transition-colors ${
                      isDark ? "bg-neutral-900 border-neutral-800 hover:border-neutral-700" : "bg-neutral-100 border-neutral-300 hover:border-neutral-400"
                    }`;
                    return docUrl ? (
                      <a key={techIndex} href={docUrl} target="_blank" rel="noopener noreferrer" className={className}>
                        {tech} ↗
                      </a>
                    ) : (
                      <span key={techIndex} className={className}>
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                isDark
                  ? "bg-neutral-900 border-2 border-neutral-800 hover:border-neutral-700"
                  : "bg-neutral-100 border-2 border-neutral-300 hover:border-neutral-400"
              }`}
            >
              {showAll ? (isKorean ? "간략히 보기" : "Show Less") : isKorean ? `더 보기 (${projects.length - 3})` : `Show More (${projects.length - 3})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
