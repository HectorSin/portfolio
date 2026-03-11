"use client";

import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Boxes,
  Database,
  Gauge,
  Server,
  Workflow,
  Wrench,
} from "lucide-react";
import { useMemo } from "react";
import { useTheme } from "@/contexts/theme-context";
import { techDocs } from "@/data/tech-docs";
import { getTechProjectAnchorMap } from "@/lib/project-anchors";

type TechGroup = {
  title: string;
  items: string[];
};

type TechCategory = {
  title: string;
  icon: LucideIcon;
  items?: string[];
  groups?: TechGroup[];
};

const techStack: TechCategory[] = [
  {
    title: "LLM & AI Services",
    icon: Workflow,
    groups: [
      {
        title: "LLM Frameworks",
        items: ["LangChain", "LangGraph", "RAG"],
      },
      {
        title: "Model APIs",
        items: ["OpenAI GPT-4", "Claude API", "Gemini API", "Perplexity API", "OpenAI Embeddings"],
      },
      {
        title: "Deployment",
        items: ["Ollama"],
      },
      {
        title: "Ops / Media",
        items: ["Prompt Engineering", "Sentence Transformers", "Comet", "Clova TTS", "FFmpeg"],
      },
    ],
  },
  {
    title: "Machine Learning",
    icon: Gauge,
    items: ["PyTorch", "TensorFlow", "scikit-learn", "NumPy", "Pandas", "Transformers"],
  },
  {
    title: "Observability & Evaluation",
    icon: BarChart3,
    items: ["LangSmith", "Weights & Biases", "RAG Evaluation", "LLM Evals"],
  },
  {
    title: "Backend & Infrastructure",
    icon: Server,
    items: ["Python", "FastAPI", "Flask", "Docker", "GCP", "AWS", "GitHub Actions", "Linux"],
  },
  {
    title: "Databases",
    icon: Database,
    items: ["Chroma", "FAISS", "PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    title: "Tools & Collaboration",
    icon: Wrench,
    items: ["Git", "Notion", "Slack", "Figma"],
  },
];

const coreExpertise = {
  ko: [
    "멀티 LLM 오케스트레이션 및 API 통합",
    "Production RAG 시스템 및 콘텐츠 생성 파이프라인",
    "클라우드 기반 AI 서비스 아키텍처 (GCP, AWS)",
    "LLM 비용 최적화 및 토큰 관리 전략",
    "IoT · ML 데이터 파이프라인 설계 및 구축",
  ],
  en: [
    "Multi-LLM orchestration and API integration",
    "Production RAG systems and content generation pipelines",
    "Cloud-based AI service architecture (GCP, AWS)",
    "LLM cost optimization and token management strategies",
    "IoT and ML data pipeline design and development",
  ],
};

type TechBadgeProps = {
  isDark: boolean;
  label: string;
  techProjectMap: Record<string, string>;
};

function TechBadge({ isDark, label, techProjectMap }: TechBadgeProps) {
  const projectAnchorId = techProjectMap[label];
  const docUrl = techDocs[label];
  const isClickable = projectAnchorId !== undefined || Boolean(docUrl);
  const className = `px-4 py-2 border rounded-lg text-sm transition-colors ${
    isClickable ? "cursor-pointer" : ""
  } ${
    isDark
      ? "bg-neutral-950 border-neutral-800 hover:border-neutral-700"
      : "bg-neutral-100 border-neutral-300 hover:border-neutral-400"
  }`;

  if (projectAnchorId !== undefined) {
    return (
      <a href={`#${projectAnchorId}`} className={className}>
        {label}
      </a>
    );
  }

  if (docUrl) {
    return (
      <a href={docUrl} target="_blank" rel="noopener noreferrer" className={className}>
        {label} ↗
      </a>
    );
  }

  return <span className={className}>{label}</span>;
}

export default function TechStack() {
  const { isDark, isKorean } = useTheme();
  const techProjectMap = useMemo(() => getTechProjectAnchorMap(), []);

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
        <h2
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-tight text-balance"
          style={{ color: "#C3E41D" }}
        >
          {isKorean ? "기술 스택" : "TECH STACK"}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {techStack.map((category) => {
            const Icon = category.icon;
            const isLlm = category.title === "LLM & AI Services";
            const isMachineLearning = category.title === "Machine Learning";
            const isTools = category.title === "Tools & Collaboration";

            return (
              <div
                key={category.title}
                className={`border rounded-lg p-6 transition-colors ${
                  isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
                } ${isLlm || isTools ? "md:col-span-2" : ""}`}
              >
                <div className={`flex items-center gap-3 ${isLlm ? "mb-4" : "mb-6"}`}>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                      isDark ? "border-neutral-800 bg-neutral-950 text-neutral-200" : "border-neutral-300 bg-white text-neutral-700"
                    }`}
                  >
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <h3 className={`text-2xl font-semibold ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                    {category.title}
                  </h3>
                </div>

                {category.groups ? (
                  <div className="grid gap-3 md:grid-cols-2 md:gap-x-3 md:gap-y-3">
                    {category.groups.map((group) => (
                      <div key={group.title}>
                        <p className={`mb-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                          isDark ? "text-neutral-500" : "text-neutral-500"
                        }`}>
                          {group.title}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {group.items.map((item) => (
                            <TechBadge
                              key={item}
                              isDark={isDark}
                              label={item}
                              techProjectMap={techProjectMap}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={isMachineLearning ? "grid content-start grid-cols-2 gap-2 sm:grid-cols-3" : "flex flex-wrap gap-2"}>
                    {category.items?.map((item) => (
                      <TechBadge
                        key={item}
                        isDark={isDark}
                        label={item}
                        techProjectMap={techProjectMap}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={`mt-12 border rounded-lg p-8 ${isDark ? "border-neutral-800" : "border-neutral-300"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                isDark ? "border-neutral-800 bg-neutral-950 text-neutral-200" : "border-neutral-300 bg-white text-neutral-700"
              }`}
            >
              <Boxes size={18} strokeWidth={2.2} />
            </div>
            <h3 className={`text-2xl font-bold ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
              {isKorean ? "핵심 전문 분야" : "Core Expertise"}
            </h3>
          </div>

          <ul className={`space-y-3 text-lg ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
            {(isKorean ? coreExpertise.ko : coreExpertise.en).map((item) => (
              <li key={item} className="flex items-start">
                <span className={`${isDark ? "text-green-400" : "text-green-600"} mr-3`}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
