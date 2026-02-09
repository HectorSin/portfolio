"use client";

import React from "react";
import { useTheme } from "@/contexts/theme-context";

export default function About() {
  const { isDark, isKorean } = useTheme();

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-tight" style={{ color: "#C3E41D" }}>
          {isKorean ? "소개" : "ABOUT"}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                {isKorean ? "학력" : "Education"}
              </h3>
              <div className="space-y-2">
                <p className="text-xl font-semibold">{isKorean ? "아주대학교" : "Ajou University"}</p>
                <p className={isDark ? "text-neutral-500" : "text-neutral-700"}>
                  {isKorean ? "경영인텔리전스학과 (주전공)" : "B.S. in e-Business (Major)"}
                </p>
                <p className={isDark ? "text-neutral-500" : "text-neutral-700"}>
                  {isKorean ? "인공지능융합학과 (복수전공)" : "B.S. in AI Convergence (Double Major)"}
                </p>
                <p className={isDark ? "text-neutral-500" : "text-neutral-700"}>
                  {isKorean ? "2026년 2월 졸업" : "February 2026"}
                </p>
              </div>
            </div>

            <div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                {isKorean ? "언어" : "Languages"}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg">{isKorean ? "한국어" : "Korean"}</span>
                  <span className={isDark ? "text-neutral-500" : "text-neutral-700"}>
                    {isKorean ? "모국어" : "Native"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg">{isKorean ? "영어" : "English"}</span>
                  <span className={isDark ? "text-neutral-500" : "text-neutral-700"}>
                    {isKorean ? "유창함" : "Fluent"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg">{isKorean ? "스페인어" : "Spanish"}</span>
                  <span className={isDark ? "text-neutral-500" : "text-neutral-700"}>
                    {isKorean ? "중급" : "Intermediate"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
              {isKorean ? "소개" : "Bio"}
            </h3>
            <div className={`space-y-4 text-lg leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
              <p>
                {isKorean
                  ? "LLM 기반 시스템과 프로덕션 AI 애플리케이션을 전문으로 하는 AI 서비스 엔지니어입니다."
                  : "AI Service Engineer specializing in LLM-based systems and production-ready AI applications."}
              </p>
              <p>
                {isKorean
                  ? "멀티 LLM 오케스트레이션, RAG 시스템, 확장 가능한 백엔드 아키텍처를 통해 최첨단 AI 모델을 측정 가능한 비즈니스 임팩트로 전환하는 데 집중하고 있습니다."
                  : "Currently focused on transforming cutting-edge AI models into measurable business impact through multi-LLM orchestration, RAG systems, and scalable backend architectures."}
              </p>
              <p>
                {isKorean
                  ? "교육 및 에너지 분야 스타트업에서 상당한 비용 절감과 효율성 개선을 달성한 엔드투엔드 AI 솔루션 배포 경험이 있습니다."
                  : "Experienced in deploying end-to-end AI solutions that have achieved significant cost reductions and efficiency improvements for startups in education and energy sectors."}
              </p>
              <p className={`italic ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                {isKorean
                  ? '"최첨단 AI 연구와 실제 비즈니스 가치를 연결합니다"'
                  : '"Bridging cutting-edge AI research with real-world business value"'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
