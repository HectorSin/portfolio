"use client";

import Image from "next/image";
import Link from "next/link";
import { type Project } from "@/data/projects";
import { useTheme } from "@/contexts/theme-context";

interface ProjectDetailPageProps {
  project: Project;
}

function toLocalized(value: string | { en: string; ko: string }, isKorean: boolean): string {
  if (typeof value === "string") {
    return value;
  }
  return isKorean ? value.ko : value.en;
}

function toLocalizedArray(value: string[] | { en: string[]; ko: string[] }, isKorean: boolean): string[] {
  if (Array.isArray(value)) {
    return value;
  }
  return isKorean ? value.ko : value.en;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const { isDark, isKorean } = useTheme();

  if (!project.detail) {
    return null;
  }

  return (
    <main
      className="min-h-screen px-6 py-16"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/#projects" className="text-sm hover:underline" style={{ color: "#C3E41D" }}>
            {isKorean ? "프로젝트 목록으로" : "Back to projects"}
          </Link>
        </div>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{toLocalized(project.title, isKorean)}</h1>
          <p className={`text-sm mb-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>{project.period}</p>
          <p className={`text-sm mb-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            {toLocalized(project.company, isKorean)} | {toLocalized(project.team, isKorean)}
          </p>
          <p className={`text-base leading-7 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
            {toLocalized(project.detail.overview, isKorean)}
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{isKorean ? "핵심 성과" : "Key Achievements"}</h2>
          <ul className="space-y-2">
            {toLocalizedArray(project.achievements, isKorean).map((achievement, index) => (
              <li key={`${project.id}-achievement-${index}`} className={`text-sm leading-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                - {achievement}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{isKorean ? "상세 설명" : "Detailed Notes"}</h2>
          <div className="space-y-8">
            {project.detail.sections.map((section) => (
              <article key={section.key} className={`border rounded-lg p-6 ${isDark ? "border-neutral-800" : "border-neutral-300"}`}>
                <h3 className="text-lg font-semibold mb-3">{isKorean ? section.title.ko : section.title.en}</h3>
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${section.key}-${paragraphIndex}`} className={`text-sm leading-7 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                      {isKorean ? paragraph.ko : paragraph.en}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {project.detail.umlImages && project.detail.umlImages.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">{isKorean ? "UML 다이어그램" : "UML Diagrams"}</h2>
            <div className="space-y-8">
              {project.detail.umlImages.map((diagram, index) => (
                <figure
                  key={`${project.id}-uml-${index}`}
                  className={`mx-auto max-w-3xl border rounded-2xl p-4 md:p-5 ${
                    isDark ? "border-neutral-800 bg-neutral-950/60" : "border-neutral-300 bg-white"
                  }`}
                >
                  <div className={`rounded-xl p-2 md:p-4 ${isDark ? "bg-neutral-900" : "bg-neutral-50"}`}>
                    <Image
                      src={diagram.src}
                      alt={isKorean ? diagram.alt.ko : diagram.alt.en}
                      width={1280}
                      height={720}
                      sizes="(max-width: 768px) 100vw, 896px"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  {diagram.caption && (
                    <figcaption className={`text-xs mt-3 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                      {isKorean ? diagram.caption.ko : diagram.caption.en}
                    </figcaption>
                  )}
                  <div className="mt-3">
                    <a
                      href={diagram.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs hover:underline"
                      style={{ color: "#C3E41D" }}
                    >
                      {isKorean ? "원본 다이어그램 보기" : "Open full-size diagram"}
                    </a>
                  </div>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">{isKorean ? "기술 스택" : "Tech Stack"}</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={`${project.id}-${tech}`}
                className={`px-3 py-1 border rounded-full text-xs ${
                  isDark ? "bg-neutral-900 border-neutral-800" : "bg-neutral-100 border-neutral-300"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {project.links && project.links.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">{isKorean ? "관련 링크" : "Related Links"}</h2>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={`${project.id}-${link.label}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                  style={{ color: "#C3E41D" }}
                >
                  {link.label} (ext)
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}


