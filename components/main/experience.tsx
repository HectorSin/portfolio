"use client";

import React from "react";
import { useTheme } from "@/contexts/theme-context";
import { companyLinks, activityLinks } from "@/data/links";

const experiences = [
  {
    company: "FilledU",
    role: {
      en: "AI/BE Contract Employee",
      ko: "AI/BE 계약직 사원"
    },
    period: "2025.03 ~ 2025.08",
    type: {
      en: "Educational AI Startup",
      ko: "교육 AI 스타트업"
    },
    description: {
      en: "Developed automated learning content generation and audio processing systems using LangChain and ffmpeg.",
      ko: "LangChain과 ffmpeg를 활용한 맞춤형 학습 콘텐츠 자동 생성 및 음원 처리 시스템 개발"
    },
    highlights: {
      en: [
        "100% automation of audio editing, saving 2M KRW annually in outsourcing costs",
        "Discovered and improved 204 defective content items through validation logic",
        "Built custom learning problem generation system with LangChain",
        "Developed automated audio splitting system for English listening tests",
        "Structured unstructured data (text/audio) and designed/operated databases"
      ],
      ko: [
        "음원 편집 100% 자동화로 연간 외주비 200만원 절감",
        "검증 로직 도입으로 불량 콘텐츠 204건 발견 및 개선",
        "LangChain 활용 맞춤형 학습 문제 자동 생성 시스템 개발",
        "영어 듣기평가 음원 자동 분할 시스템 개발",
        "비정형 데이터(텍스트/음성) 구조화 및 DB 설계/운영"
      ]
    },
    link: companyLinks["FilledU"]
  },
  {
    company: "TurbineCrew",
    role: {
      en: "International Business Development",
      ko: "해외사업개발 계약직 사원"
    },
    period: "2024.09",
    type: {
      en: "Energy Tech Startup",
      ko: "에너지 테크 스타트업"
    },
    description: {
      en: "Led technical demonstrations and business development at Vietnam ELECS 2024 exhibition.",
      ko: "베트남 ELECS 2024 전시회에서 기술 시연 및 사업 개발 주도"
    },
    highlights: {
      en: [
        "Successfully closed 3 MOUs with Vietnamese companies",
        "Conducted SmartPole solution technical demonstrations",
        "Performed Korean-English interpretation for local buyers",
        "Led business meetings and technical sales support"
      ],
      ko: [
        "베트남 현지 기업 3곳과 MOU 체결 성사",
        "스마트폴 솔루션 기술 시연 담당",
        "현지 바이어 대상 한-영 통역 수행",
        "비즈니스 미팅 주도 및 기술 영업 지원"
      ]
    },
    link: companyLinks["TurbineCrew"]
  },
  {
    company: "TurbineCrew",
    role: {
      en: "AI/IoT Engineer",
      ko: "AI/IoT Engineer 계약직 사원"
    },
    period: "2024.01 ~ 2024.02",
    type: {
      en: "Energy Tech Startup",
      ko: "에너지 테크 스타트업"
    },
    description: {
      en: "Built real-time IoT data collection and processing pipeline on AWS infrastructure.",
      ko: "AWS 인프라 기반 실시간 IoT 데이터 수집 및 처리 파이프라인 구축"
    },
    highlights: {
      en: [
        "Automated storage of 1,000+ sensor data points daily",
        "Built real-time IoT sensor data collection system",
        "Developed AWS cloud transmission and DB loading pipeline",
        "Automated data preprocessing for power generation prediction models",
        "Awarded Outstanding Employee recognition"
      ],
      ko: [
        "일 1,000건+ 센서 데이터 자동 적재",
        "실시간 IoT 센서 데이터 수집 시스템 구축",
        "AWS 클라우드 전송 및 DB 적재 파이프라인 개발",
        "발전량 예측 모델 재학습을 위한 데이터 전처리 자동화",
        "우수사원상 수상"
      ]
    },
    link: companyLinks["TurbineCrew"]
  }
];

const activities = [
  {
    title: {
      en: "Competitive Programming",
      ko: "알고리즘 문제 풀이"
    },
    description: {
      en: "Active on Baekjoon Online Judge",
      ko: "백준 온라인 저지 활동"
    },
    icon: "💻",
    link: activityLinks["Competitive Programming"]
  },
  {
    title: {
      en: "Cognee Open Source Contribution",
      ko: "Cognee 오픈소스 기여"
    },
    description: {
      en: "Contributing to knowledge graph framework",
      ko: "지식 그래프 프레임워크 기여"
    },
    icon: "🏆",
    link: activityLinks["Cognee Open Source Contribution"]
  },
  {
    title: {
      en: "LinkedIn Content Creator",
      ko: "LinkedIn 콘텐츠 크리에이터"
    },
    description: {
      en: "Covering AI Agents, RAG, and LLM trends",
      ko: "AI 에이전트, RAG, LLM 트렌드 다루기"
    },
    icon: "✍️",
    link: activityLinks["LinkedIn Content Creator"]
  },
  {
    title: {
      en: "Cultural Exchange Leadership",
      ko: "문화 교류 동아리 리더십"
    },
    description: {
      en: "Grew club from 4 to 130 members",
      ko: "동아리 회원 4명에서 130명으로 성장"
    },
    icon: "🌍",
    link: activityLinks["Cultural Exchange Leadership"]
  }
];

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
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-tight" style={{ color: "#C3E41D" }}>
          {isKorean ? "경력" : "EXPERIENCE"}
        </h2>

        {/* Professional Experience */}
        <div className="mb-16">
          <h3 className={`text-3xl font-bold mb-8 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            {isKorean ? "경력 사항" : "Professional"}
          </h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`border rounded-lg p-8 transition-colors ${
                  isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    {exp.link ? (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl font-bold mb-1 hover:underline inline-block"
                        style={{ color: "#C3E41D" }}
                      >
                        {exp.company} ↗
                      </a>
                    ) : (
                      <h4 className="text-2xl font-bold mb-1">{exp.company}</h4>
                    )}
                    <p className={isDark ? "text-neutral-500" : "text-neutral-600"}>
                      {typeof exp.type === 'string' ? exp.type : (isKorean ? exp.type.ko : exp.type.en)}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <p className="font-semibold">
                      {typeof exp.role === 'string' ? exp.role : (isKorean ? exp.role.ko : exp.role.en)}
                    </p>
                    <p className={isDark ? "text-neutral-500" : "text-neutral-600"}>{exp.period}</p>
                  </div>
                </div>

                <p className={`text-lg mb-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                  {typeof exp.description === 'string' ? exp.description : (isKorean ? exp.description.ko : exp.description.en)}
                </p>

                <ul className="space-y-2">
                  {(Array.isArray(exp.highlights) ? exp.highlights : (isKorean ? exp.highlights.ko : exp.highlights.en)).map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className={isDark ? "text-green-400" : "text-green-600"} style={{ marginRight: "0.75rem" }}>▸</span>
                      <span className={isDark ? "text-neutral-300" : "text-neutral-700"}>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Activities & Achievements */}
        <div>
          <h3 className={`text-3xl font-bold mb-8 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            {isKorean ? "활동 및 성과" : "Activities & Achievements"}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {activities.map((activity, index) => {
              const content = (
                <>
                  <div className="text-4xl mb-4">{activity.icon}</div>
                  <h4 className="text-xl font-bold mb-2">
                    {typeof activity.title === 'string' ? activity.title : (isKorean ? activity.title.ko : activity.title.en)}
                  </h4>
                  <p className={isDark ? "text-neutral-400" : "text-neutral-600"}>
                    {typeof activity.description === 'string' ? activity.description : (isKorean ? activity.description.ko : activity.description.en)}
                  </p>
                </>
              );

              const className = `border rounded-lg p-6 transition-colors ${
                isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
              } ${activity.link ? "cursor-pointer hover:scale-105" : ""}`;

              return activity.link ? (
                <a
                  key={index}
                  href={activity.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <div key={index} className={className}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        {/* Currently Seeking */}
        <div className={`mt-12 border rounded-lg p-8 ${
          isDark ? "border-neutral-800 bg-neutral-900/30" : "border-neutral-300 bg-neutral-100"
        }`}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: "#C3E41D" }}>
            {isKorean ? "구직 중" : "Currently Seeking"}
          </h3>
          <p className={`text-lg ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
            {isKorean
              ? "AI/ML 엔지니어, LLM 서비스 엔지니어, 또는 데이터 엔지니어 포지션"
              : "AI/ML Engineer, LLM Service Engineer, or Data Engineer positions"}
          </p>
          <p className={`mt-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            {isKorean
              ? "측정 가능한 ROI를 갖춘 프로덕션 LLM 애플리케이션 및 고급 RAG 시스템에 중점"
              : "Focused on production-ready LLM applications with measurable ROI and advanced RAG systems"}
          </p>
        </div>
      </div>
    </section>
  );
}
