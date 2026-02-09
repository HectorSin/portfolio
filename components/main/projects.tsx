"use client";

import React, { useState } from "react";
import { useTheme } from "@/contexts/theme-context";

const projects = [
  {
    title: {
      en: "LLM-based Educational Content Auto-Generation Pipeline",
      ko: "LLM 기반 교육 콘텐츠 자동 생성 파이프라인"
    },
    period: "2025.05 ~ 2025.08",
    company: "FilledU",
    team: {
      en: "6 members (Dev-60%, DB Design-40%, Planning-30%)",
      ko: "6명 (개발-60%, DB설계-40%, 기획-30%)"
    },
    description: {
      en: "LLM-based automated educational content generation system, achieved #2 ranking in Google Play Education category.",
      ko: "LLM 기반 교육 콘텐츠 자동 생성 시스템, Google Play 교육 카테고리 2위 달성"
    },
    achievements: {
      en: [
        "Designed and implemented content generation pipeline using LangChain + Gemini API",
        "Developed Flask backend API and PostgreSQL integration",
        "Achieved Google Play Education category #2 ranking"
      ],
      ko: [
        "LangChain + Gemini API 기반 콘텐츠 생성 파이프라인 설계 및 구현",
        "Flask 백엔드 API 개발 및 PostgreSQL 연동",
        "Google Play 교육 카테고리 2위 달성"
      ]
    },
    tech: ["Python", "LangChain", "Gemini API", "Flask", "PostgreSQL", "Linux"]
  },
  {
    title: {
      en: "Automated MP3 Splitting for Listening Assessments",
      ko: "평가원 듣기평가 MP3 문제별 분할 자동화"
    },
    period: "2025.03 ~ 2025.06",
    company: "FilledU",
    team: {
      en: "3 members (Dev-90%)",
      ko: "3명 (개발-90%)"
    },
    description: {
      en: "Automated audio splitting system for listening assessments, processed 206 files with zero errors and 100% cost reduction.",
      ko: "듣기평가 음원 자동 분할 시스템, 206개 파일 무오류 처리 및 외주 비용 100% 절감"
    },
    achievements: {
      en: [
        "100% automation of audio editing, saving 2M KRW annually",
        "Implemented timestamp extraction using Whisper STT and FFmpeg-based MP3 splitting",
        "Developed LangChain-based problem number recognition pipeline and quality validation",
        "Processed 206 files with zero errors"
      ],
      ko: [
        "음원 편집 100% 자동화로 연간 200만원 절감",
        "Whisper STT 기반 타임스탬프 추출 및 FFmpeg 활용 MP3 자동 분할 구현",
        "LangChain 기반 문제 번호 인식 파이프라인 개발 및 품질 검증 자동화",
        "206개 파일 무오류 처리"
      ]
    },
    tech: ["Python", "FFmpeg", "Whisper", "LangChain", "Linux"]
  },
  {
    title: {
      en: "Vietnam ELECS 2024 Tech Sales & MOU Execution",
      ko: "베트남 ELECS 2024 기술 영업 및 MOU 체결"
    },
    period: "2024.09 ~ 2024.10",
    company: "TurbineCrew",
    team: {
      en: "3 members (Planning-60%, Operations-40%)",
      ko: "3명 (기획-60%, 운영-40%)"
    },
    description: {
      en: "Participated in Vietnam ELECS 2024 exhibition, conducted technical demonstrations and closed 3 MOUs with local companies.",
      ko: "베트남 ELECS 2024 전시회 참가, 기술 시연 및 현지 기업 3곳 MOU 체결 성사"
    },
    achievements: {
      en: [
        "Successfully closed 3 MOUs with Vietnamese companies",
        "Conducted technical presentations and Korean-English interpretation",
        "Operated exhibition booth and supported MOU execution"
      ],
      ko: [
        "베트남 기업 3곳과 MOU 체결 성사",
        "기술 프레젠테이션 및 한-영 통역 지원",
        "전시 부스 운영 및 MOU 체결 지원"
      ]
    },
    tech: ["Notion", "PowerPoint"]
  },
  {
    title: {
      en: "SmartPole IoT Sensor Data Collection & Cloud System",
      ko: "스마트폴 센서 데이터 수집 및 클라우드 전송 시스템"
    },
    period: "2024.01 ~ 2024.02",
    company: "TurbineCrew",
    team: {
      en: "4 members (Dev-60%, HW-70%)",
      ko: "4명 (개발-60%, HW-70%)"
    },
    description: {
      en: "Built real-time IoT sensor data collection and AWS cloud transmission pipeline for SmartPole infrastructure.",
      ko: "스마트폴 IoT 센서 데이터의 실시간 수집 및 AWS 클라우드 전송 파이프라인 구축"
    },
    achievements: {
      en: [
        "Automated storage of 1,000+ sensor data points daily",
        "Developed Raspberry Pi-based sensor data collection module",
        "Built AWS (EC2, S3) cloud transmission pipeline and automation",
        "Awarded Outstanding Employee recognition"
      ],
      ko: [
        "일 1,000건+ 센서 데이터 자동 적재",
        "라즈베리파이 기반 센서 데이터 수집 모듈 개발",
        "AWS (EC2, S3) 클라우드 전송 파이프라인 구축 및 자동화",
        "우수사원상 수상"
      ]
    },
    tech: ["Python", "Raspberry Pi", "Jetson Nano", "AWS EC2", "AWS S3", "Linux"]
  },
  {
    title: {
      en: "Cognee Open Source Project Contribution",
      ko: "Cognee 오픈소스 프로젝트 기여"
    },
    period: "2025.12 ~ Present",
    company: "Open Source",
    team: {
      en: "Open Source Contributor",
      ko: "오픈소스 기여자"
    },
    description: {
      en: "Knowledge Graph-based memory management open-source library for LLM applications.",
      ko: "LLM 애플리케이션을 위한 Knowledge Graph 기반 메모리 관리 오픈소스 라이브러리"
    },
    achievements: {
      en: [
        "Contributed Korean translation of development documentation",
        "Fixed simple code errors including Pydantic errors and bug patches",
        "Active participation in open-source community"
      ],
      ko: [
        "개발 문서 한글 번역 작업 수행",
        "Pydantic 에러 등 단순 코드 오류 수정 및 버그 패치",
        "오픈소스 커뮤니티 활동"
      ]
    },
    tech: ["Python", "Git", "Markdown", "Linux", "Windows"],
    link: "https://github.com/HectorSin/cognee"
  },
  {
    title: {
      en: "ControlNet-based Illustration Conversion AI Model",
      ko: "ControlNet 기반 삽화 변환 AI 모델 개발"
    },
    period: "2024.04 ~ 2024.10",
    company: {
      en: "ModuLabs, Gyeonggi Youth Gap Year",
      ko: "모두의연구소, 경기청년갭이어"
    },
    team: {
      en: "4 members (AI Model Design-70%, Dev-50%)",
      ko: "4명 (AI 모델 설계-70%, 개발-50%)"
    },
    description: {
      en: "AI image generation model that converts children's drawings into fairy tale illustration style.",
      ko: "아동이 그린 그림을 동화 삽화 스타일로 변환하는 AI 이미지 생성 모델"
    },
    achievements: {
      en: [
        "Fine-tuned ControlNet model and collected/preprocessed datasets",
        "Developed API server and prompt engineering",
        "Successfully converted children's drawings to professional illustration style"
      ],
      ko: [
        "ControlNet 모델 파인튜닝 및 데이터셋 수집/전처리",
        "API 서버 개발 및 프롬프트 엔지니어링",
        "아동 그림을 전문 삽화 스타일로 성공적으로 변환"
      ]
    },
    tech: ["Python", "Stable Diffusion", "ControlNet", "OpenAI API", "Linux"]
  },
  {
    title: {
      en: "SnackCast - AI-based News Podcast Auto-Generation",
      ko: "SnackCast - AI 기반 뉴스 팟캐스트 자동 생성 서비스"
    },
    period: "2025.08 ~ 2025.12",
    company: {
      en: "Ajou University Capstone Project",
      ko: "아주대학교 졸업 프로젝트"
    },
    team: {
      en: "4 members (Dev-70%, Infra-100%)",
      ko: "4명 (개발-70%, Infra-100%)"
    },
    description: {
      en: "AI podcast service: Perplexity news crawling → Gemini summarization → TTS audio generation.",
      ko: "Perplexity 뉴스 크롤링 → Gemini로 요약 → TTS로 오디오 생성 AI 팟캐스트 서비스"
    },
    achievements: {
      en: [
        "Designed FastAPI backend server, containerized with Docker, deployed on GCP",
        "Built multi-API pipeline (Perplexity → Gemini → Clova TTS)",
        "Integrated PostgreSQL and implemented end-to-end automation"
      ],
      ko: [
        "FastAPI 백엔드 서버 설계 및 Docker 컨테이너화, GCP 배포",
        "멀티 API 파이프라인 구축 (Perplexity → Gemini → Clova TTS)",
        "PostgreSQL 연동 및 엔드투엔드 자동화 구현"
      ]
    },
    tech: ["Python", "LangChain", "FastAPI", "PostgreSQL", "Docker", "GCP", "Clova TTS"]
  },
  {
    title: {
      en: "Personalized Travel Route Recommendation Service",
      ko: "개인 맞춤형 여행 경로 추천 서비스"
    },
    period: "2023.08 ~ 2023.12",
    company: {
      en: "Ajou University Capstone Project",
      ko: "아주대학교 졸업 프로젝트"
    },
    team: {
      en: "5 members (Dev-100%, Planning-20%)",
      ko: "5명 (개발-100%, 기획-20%)"
    },
    description: {
      en: "LLM-based personalized travel route recommendation web service with SEO optimization.",
      ko: "LLM 기반 개인 맞춤형 여행 경로 추천 웹 서비스 (SEO 최적화 적용)"
    },
    achievements: {
      en: [
        "Developed travel route generation logic using ChatGPT-3.5 API",
        "Implemented SEO-friendly page structure and content generation",
        "Created personalized recommendations based on user preferences"
      ],
      ko: [
        "ChatGPT-3.5 API 활용 여행 경로 생성 로직 개발",
        "SEO 친화적 페이지 구조 및 콘텐츠 생성 구현",
        "사용자 선호도 기반 맞춤형 추천 생성"
      ]
    },
    tech: ["Python", "OpenAI GPT-3.5 API", "HTML", "CSS", "JavaScript", "Linux"]
  }
];

export default function Projects() {
  const { isDark, isKorean } = useTheme();
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

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
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-tight" style={{ color: "#C3E41D" }}>
          {isKorean ? "프로젝트" : "PROJECTS"}
        </h2>

        <div className="grid gap-8">
          {displayedProjects.map((project, index) => (
            <div
              key={index}
              className={`border rounded-lg p-8 transition-colors ${
                isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl md:text-3xl font-bold mb-2 hover:underline inline-block"
                      style={{ color: "#C3E41D" }}
                    >
                      {typeof project.title === 'string' ? project.title : (isKorean ? project.title.ko : project.title.en)} ↗
                    </a>
                  ) : (
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {typeof project.title === 'string' ? project.title : (isKorean ? project.title.ko : project.title.en)}
                    </h3>
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
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 border rounded-full text-xs ${
                        isDark ? "bg-neutral-900 border-neutral-800" : "bg-neutral-100 border-neutral-300"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
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
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
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
