"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/theme-context";
import { techDocs } from "@/data/tech-docs";
import { projects } from "@/data/projects";

export default function Projects() {
  const { isDark, isKorean } = useTheme();
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  // 해시 변경 시 해당 프로젝트로 자동 확장 + 스크롤
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith("#project-")) return;
      const index = parseInt(hash.replace("#project-", ""), 10);
      if (isNaN(index)) return;

      if (index >= 3) {
        setShowAll(true);
      }

      // DOM 업데이트 후 스크롤
      setTimeout(() => {
        document.getElementById(`project-${index}`)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

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
          {displayedProjects.map((project, index) => (
            <div
              key={index}
              id={`project-${index}`}
              style={{ scrollMarginTop: "5rem" }}
              className={`border rounded-lg p-8 transition-colors ${
                isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {typeof project.title === 'string' ? project.title : (isKorean ? project.title.ko : project.title.en)}
                  </h3>
                  {project.links && (
                    <div className="flex gap-3 mt-1 mb-1">
                      {project.links.map((l: { label: string; url: string }, i: number) => (
                        <a
                          key={i}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                          style={{ color: "#C3E41D" }}
                        >
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                  <p className={`text-sm ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                    {typeof project.company === 'string' ? project.company : (isKorean ? project.company.ko : project.company.en)} | {typeof project.team === 'string' ? project.team : (isKorean ? project.team.ko : project.team.en)}
                  </p>
                </div>
                <span className={`mt-2 md:mt-0 text-sm font-semibold whitespace-nowrap ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                  {project.period}
                </span>
              </div>

              <p className={`text-base mb-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                {typeof project.description === 'string' ? project.description : (isKorean ? project.description.ko : project.description.en)}
              </p>

              <div className="mb-6">
                <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                  {isKorean ? "주요 성과" : "KEY ACHIEVEMENTS"}
                </h4>
                <ul className="space-y-2">
                  {(Array.isArray(project.achievements) ? project.achievements : (isKorean ? project.achievements.ko : project.achievements.en)).map((achievement, i) => (
                    <li key={i} className="flex items-start">
                      <span className={isDark ? "text-green-400" : "text-green-600"} style={{ marginRight: "0.75rem" }}>▸</span>
                      <span className={`text-sm ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                  {isKorean ? "기술 스택" : "TECH STACK"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => {
                    const docUrl = techDocs[tech];
                    const className = `px-3 py-1 border rounded-full text-xs transition-colors ${
                      isDark ? "bg-neutral-900 border-neutral-800 hover:border-neutral-700" : "bg-neutral-100 border-neutral-300 hover:border-neutral-400"
                    }`;
                    return docUrl ? (
                      <a
                        key={i}
                        href={docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {tech} ↗
                      </a>
                    ) : (
                      <span key={i} className={className}>
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {projects.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                isDark
                  ? "bg-neutral-900 border-2 border-neutral-800 hover:border-neutral-700"
                  : "bg-neutral-100 border-2 border-neutral-300 hover:border-neutral-400"
              }`}
            >
              {showAll
                ? (isKorean ? "접기 ↑" : "Show Less ↑")
                : (isKorean ? `더보기 (${projects.length - 3}개 프로젝트) ↓` : `Show More (${projects.length - 3} more projects) ↓`)}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
