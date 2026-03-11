"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { activityLinks, companyLinks } from "@/data/links";

type LocalizedText = {
  en: string;
  ko: string;
};

type ExperienceEntry = {
  company: string;
  role: LocalizedText;
  period: string;
  type: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedText[];
  tech: string[];
  logoSrc: string;
  logoFallback: string;
  link?: string;
};

type ActivityEntry = {
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  link?: string;
};

const ACCENT_COLOR = "#C3E41D";

const experiences: ExperienceEntry[] = [
  {
    company: "FilledU",
    role: {
      en: "AI/Backend Contract Engineer",
      ko: "AI/백엔드 계약직",
    },
    period: "2025.03 - 2025.08",
    type: {
      en: "Educational AI Startup",
      ko: "교육 AI 스타트업",
    },
    description: {
      en: "Built a LangChain and FFmpeg based automation system for learning content generation and audio processing.",
      ko: "LangChain과 FFmpeg 기반 학습 콘텐츠 생성 및 음원 처리 자동화 시스템 개발",
    },
    highlights: [
      {
        en: "Automated audio editing end-to-end, reducing annual outsourcing costs by KRW 2 million",
        ko: "음원 편집 전 과정을 자동화해 연간 외주비 200만 원 절감",
      },
      {
        en: "Introduced validation logic that detected and improved 204 defective content items",
        ko: "검증 로직을 도입해 불량 콘텐츠 204건을 발견하고 개선",
      },
      {
        en: "Built a custom problem generation pipeline tailored to the company curriculum with LangChain",
        ko: "LangChain으로 사내 커리큘럼에 맞춘 맞춤형 문제 생성 파이프라인 구축",
      },
      {
        en: "Developed an automated English listening-test audio splitting workflow",
        ko: "영어 듣기평가용 음원 자동 분할 워크플로우 개발",
      },
    ],
    tech: ["Python", "LangChain", "FFmpeg", "Whisper", "PostgreSQL", "Linux"],
    logoSrc: "/company-logos/filled-u.svg",
    logoFallback: "FU",
    link: companyLinks["FilledU"],
  },
  {
    company: "TurbineCrew",
    role: {
      en: "International Business Development",
      ko: "해외사업개발 계약직",
    },
    period: "2024.09",
    type: {
      en: "Energy Tech Startup",
      ko: "에너지 테크 스타트업",
    },
    description: {
      en: "Led technical demonstrations and business development for SmartPole at Vietnam ELECS 2024.",
      ko: "베트남 ELECS 2024에서 SmartPole 기술 시연과 사업 개발을 주도",
    },
    highlights: [
      {
        en: "Closed MOUs with three Vietnamese companies during the exhibition",
        ko: "전시 기간 중 베트남 현지 기업 3곳과 MOU 체결",
      },
      {
        en: "Ran product demonstrations for local buyers and partners",
        ko: "현지 바이어와 파트너사를 대상으로 제품 기술 시연 진행",
      },
      {
        en: "Provided Korean-English interpretation in technical and commercial meetings",
        ko: "기술 및 사업 미팅에서 한영 통역 수행",
      },
      {
        en: "Supported technical sales conversations from product explanation to follow-up discussion",
        ko: "제품 설명부터 후속 논의까지 기술 영업 커뮤니케이션 지원",
      },
    ],
    tech: ["SmartPole", "Technical Sales", "Business Development", "English", "Demo Operations"],
    logoSrc: "/company-logos/turbine-crew.png",
    logoFallback: "TC",
    link: companyLinks["TurbineCrew"],
  },
  {
    company: "TurbineCrew",
    role: {
      en: "AI/IoT Engineer Intern",
      ko: "AI/IoT Engineer 인턴",
    },
    period: "2024.01 - 2024.02",
    type: {
      en: "Energy Tech Startup",
      ko: "에너지 테크 스타트업",
    },
    description: {
      en: "Built a real-time IoT data collection and processing pipeline on AWS infrastructure.",
      ko: "AWS 기반 실시간 IoT 데이터 수집 및 처리 파이프라인 구축",
    },
    highlights: [
      {
        en: "Automated storage for more than 1,000 sensor records per day",
        ko: "일 1,000건 이상의 센서 데이터를 자동 적재",
      },
      {
        en: "Implemented a real-time IoT sensor data ingestion workflow",
        ko: "실시간 IoT 센서 데이터 수집 워크플로우 구현",
      },
      {
        en: "Built AWS based transfer and database loading pipeline",
        ko: "AWS 기반 전송 및 DB 적재 파이프라인 구축",
      },
      {
        en: "Received an outstanding intern recognition for execution quality",
        ko: "실행 품질을 인정받아 우수 인턴 평가 획득",
      },
    ],
    tech: ["Python", "AWS", "IoT", "PostgreSQL", "Data Pipeline"],
    logoSrc: "/company-logos/turbine-crew.png",
    logoFallback: "TC",
    link: companyLinks["TurbineCrew"],
  },
];

const activities: ActivityEntry[] = [
  {
    title: {
      en: "Competitive Programming",
      ko: "알고리즘 문제 해결",
    },
    description: {
      en: "Actively solving problems on Baekjoon Online Judge",
      ko: "백준 온라인 저지에서 꾸준히 문제 해결",
    },
    icon: "⌘",
    link: activityLinks["Competitive Programming"],
  },
  {
    title: {
      en: "Cognee Open Source Contribution",
      ko: "Cognee 오픈소스 기여",
    },
    description: {
      en: "Contributing to a knowledge graph framework",
      ko: "지식 그래프 프레임워크에 기여",
    },
    icon: "◎",
    link: activityLinks["Cognee Open Source Contribution"],
  },
  {
    title: {
      en: "LinkedIn Content Creator",
      ko: "LinkedIn 콘텐츠 발행",
    },
    description: {
      en: "Writing about AI agents, RAG, and LLM trends",
      ko: "AI Agent, RAG, LLM 트렌드 관련 글 발행",
    },
    icon: "↗",
    link: activityLinks["LinkedIn Content Creator"],
  },
  {
    title: {
      en: "Cultural Exchange Leadership",
      ko: "문화 교류 동아리 운영",
    },
    description: {
      en: "Scaled the club from 4 to 130 members",
      ko: "동아리를 4명에서 130명 규모로 확장",
    },
    icon: "◇",
    link: activityLinks["Cultural Exchange Leadership"],
  },
];

function t(text: LocalizedText, isKorean: boolean): string {
  return isKorean ? text.ko : text.en;
}

function CompanyLogo({
  company,
  logoSrc,
  fallback,
}: {
  company: string;
  logoSrc: string;
  fallback: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold tracking-[0.2em]"
        style={{
          borderColor: "rgba(195, 228, 29, 0.28)",
          backgroundColor: "rgba(195, 228, 29, 0.1)",
          color: ACCENT_COLOR,
        }}
        aria-label={`${company} logo fallback`}
      >
        {fallback}
      </div>
    );
  }

  return (
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)] dark:border-neutral-800 dark:bg-neutral-950">
      <Image
        src={logoSrc}
        alt={`${company} logo`}
        fill
        sizes="48px"
        className="object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export default function Experience() {
  const { isDark, isKorean } = useTheme();

  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <div className="max-w-6xl w-full">
        <h2
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-tight text-balance"
          style={{ color: ACCENT_COLOR }}
        >
          {isKorean ? "경력" : "EXPERIENCE"}
        </h2>

        <div className="mb-16">
          <h3 className={`text-3xl font-bold mb-8 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            {isKorean ? "실무 경험" : "Professional Experience"}
          </h3>

          <div className="space-y-8">
            {experiences.map((exp) => (
              <article
                key={`${exp.company}-${exp.period}`}
                className={`group rounded-[1.5rem] border p-6 md:p-8 transition-all duration-300 motion-reduce:transform-none ${
                  isDark
                    ? "border-neutral-800 hover:border-neutral-600 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                    : "border-neutral-300 hover:border-neutral-400 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
                } hover:-translate-y-0.5`}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-4">
                      <CompanyLogo company={exp.company} logoSrc={exp.logoSrc} fallback={exp.logoFallback} />

                      <div className="min-w-0">
                        {exp.link ? (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-2xl font-bold tracking-tight hover:underline"
                            style={{ color: ACCENT_COLOR }}
                          >
                            <span>{exp.company}</span>
                            <ArrowUpRight size={18} strokeWidth={2.1} aria-hidden="true" />
                          </a>
                        ) : (
                          <h4 className="text-2xl font-bold tracking-tight" style={{ color: ACCENT_COLOR }}>
                            {exp.company}
                          </h4>
                        )}
                        <p className={`mt-1 text-sm md:text-base ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                          {t(exp.type, isKorean)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 md:pl-6 md:text-right">
                    <p className="text-lg font-semibold leading-tight">
                      {t(exp.role, isKorean)}
                    </p>
                    <p className={`mt-2 text-sm tracking-[0.16em] uppercase ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                      {exp.period}
                    </p>
                  </div>
                </div>

                <p className={`mt-6 max-w-4xl text-lg leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                  {t(exp.description, isKorean)}
                </p>

                <div className="mt-6">
                  <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                    {isKorean ? "Key Outcomes" : "Key Outcomes"}
                  </p>
                  <ul className="space-y-3">
                    {exp.highlights.map((highlight) => (
                      <li key={highlight.en} className="flex items-start gap-3">
                        <span
                          className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: isDark ? "rgba(195, 228, 29, 0.9)" : "rgba(120, 150, 0, 0.9)" }}
                          aria-hidden="true"
                        />
                        <span className={`leading-7 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                          {t(highlight, isKorean)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.18em] ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={`${exp.company}-${exp.period}-${tech}`}
                        className={`rounded-full border px-3 py-1.5 text-sm ${
                          isDark
                            ? "border-neutral-800 bg-neutral-950 text-neutral-300"
                            : "border-neutral-300 bg-white text-neutral-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`text-3xl font-bold mb-8 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            {isKorean ? "활동 및 기타 성과" : "Activities & Achievements"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {activities.map((activity) => {
              const content = (
                <>
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border text-xl ${
                      isDark ? "border-neutral-800 bg-neutral-950 text-neutral-300" : "border-neutral-300 bg-white text-neutral-700"
                    }`}
                  >
                    {activity.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-2">
                    {t(activity.title, isKorean)}
                  </h4>
                  <p className={isDark ? "text-neutral-400" : "text-neutral-600"}>
                    {t(activity.description, isKorean)}
                  </p>
                </>
              );

              const className = `border rounded-[1.25rem] p-6 transition-all duration-300 ${
                isDark
                  ? "border-neutral-800 hover:border-neutral-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
                  : "border-neutral-300 hover:border-neutral-400 hover:shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
              } ${activity.link ? "cursor-pointer hover:-translate-y-0.5 motion-reduce:transform-none" : ""}`;

              return activity.link ? (
                <a
                  key={activity.title.en}
                  href={activity.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <div key={activity.title.en} className={className}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`mt-12 rounded-[1.5rem] border p-8 ${
            isDark ? "border-neutral-800 bg-neutral-900/30" : "border-neutral-300 bg-neutral-100"
          }`}
        >
          <h3 className="text-2xl font-bold mb-4" style={{ color: ACCENT_COLOR }}>
            {isKorean ? "현재 찾고 있는 역할" : "Currently Seeking"}
          </h3>
          <p className={`text-lg ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
            {isKorean
              ? "AI/ML Engineer, LLM Service Engineer, Data Engineer 포지션"
              : "AI/ML Engineer, LLM Service Engineer, or Data Engineer positions"}
          </p>
          <p className={`mt-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            {isKorean
              ? "측정 가능한 ROI를 만드는 프로덕션 LLM 애플리케이션과 고도화된 RAG 시스템에 집중하고 있습니다."
              : "Focused on production-ready LLM applications with measurable ROI and advanced RAG systems."}
          </p>
        </div>
      </div>
    </section>
  );
}
