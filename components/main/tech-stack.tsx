"use client";

import React from "react";
import { useTheme } from "@/contexts/theme-context";

const techStack = {
  "LLM & AI Services": [
    "LangChain",
    "LangGraph",
    "RAG",
    "Prompt Engineering",
    "OpenAI GPT-4",
    "Claude API",
    "Gemini API",
    "Perplexity API",
    "Ollama",
    "Comet",
    "Naver Clova TTS",
    "FFmpeg"
  ],
  "Machine Learning": [
    "PyTorch",
    "TensorFlow"
  ],
  "Backend & Infrastructure": [
    "Python",
    "FastAPI",
    "Flask",
    "Docker",
    "Google Cloud Platform",
    "AWS Lambda",
    "AWS IoT Core",
    "GitHub Actions",
    "Linux"
  ],
  "Databases": [
    "Chroma",
    "PostgreSQL",
    "MongoDB",
    "MySQL"
  ],
  "Tools & Collaboration": [
    "Git",
    "Claude Code",
    "Notion",
    "Slack",
    "Figma"
  ]
};

export default function TechStack() {
  const { isDark, isKorean } = useTheme();

  return (
    <section
      id="tech-stack"
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-tight" style={{ color: "#C3E41D" }}>
          {isKorean ? "기술 스택" : "TECH STACK"}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(techStack).map(([category, technologies]) => (
            <div
              key={category}
              className={`border rounded-lg p-6 transition-colors ${
                isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
              }`}
            >
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                      isDark
                        ? "bg-neutral-900 border-neutral-800 hover:border-neutral-700"
                        : "bg-neutral-100 border-neutral-300 hover:border-neutral-400"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 border rounded-lg p-8 ${isDark ? "border-neutral-800" : "border-neutral-300"}`}>
          <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            {isKorean ? "핵심 전문 분야" : "Core Expertise"}
          </h3>
          <ul className={`space-y-3 text-lg ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
            <li className="flex items-start">
              <span className={isDark ? "text-green-400" : "text-green-600"} style={{ marginRight: "0.75rem" }}>▸</span>
              <span>{isKorean ? "멀티 LLM 오케스트레이션 및 API 통합" : "Multi-LLM orchestration and API integration"}</span>
            </li>
            <li className="flex items-start">
              <span className={isDark ? "text-green-400" : "text-green-600"} style={{ marginRight: "0.75rem" }}>▸</span>
              <span>{isKorean ? "프로덕션 RAG 시스템 및 콘텐츠 생성 파이프라인" : "Production-ready RAG systems and content generation pipelines"}</span>
            </li>
            <li className="flex items-start">
              <span className={isDark ? "text-green-400" : "text-green-600"} style={{ marginRight: "0.75rem" }}>▸</span>
              <span>{isKorean ? "클라우드 네이티브 아키텍처 (GCP, AWS)" : "Cloud-native architecture (GCP, AWS)"}</span>
            </li>
            <li className="flex items-start">
              <span className={isDark ? "text-green-400" : "text-green-600"} style={{ marginRight: "0.75rem" }}>▸</span>
              <span>{isKorean ? "토큰 최적화 및 비용 효율적인 LLM 배포" : "Token optimization and cost-efficient LLM deployment"}</span>
            </li>
            <li className="flex items-start">
              <span className={isDark ? "text-green-400" : "text-green-600"} style={{ marginRight: "0.75rem" }}>▸</span>
              <span>{isKorean ? "엔드투엔드 IoT-to-ML 파이프라인 개발" : "End-to-end IoT-to-ML pipeline development"}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
