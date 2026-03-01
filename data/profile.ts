export type LocalizedText = {
  ko: string;
  en: string;
};

export interface EducationEntry {
  school: LocalizedText;
  degree: LocalizedText;
  graduation: LocalizedText;
}

export interface LanguageEntry {
  name: LocalizedText;
  level: LocalizedText;
}

export const profileData = {
  name: "Jaehyun Sin",
  role: {
    ko: "LLM 기반 시스템 및 프로덕션 수준 AI 애플리케이션을 전문으로 하는 AI 서비스 엔지니어",
    en: "AI Service Engineer specializing in LLM-based systems and production-ready AI applications.",
  },
  education: [
    {
      school: {
        ko: "아주대학교",
        en: "Ajou University",
      },
      degree: {
        ko: "경영인텔리전스학과 (주전공), 인공지능융합학과 (복수전공)",
        en: "B.S. in e-Business (Major), B.S. in AI Convergence (Double Major)",
      },
      graduation: {
        ko: "2026년 2월 졸업",
        en: "Graduated: February 2026",
      },
    },
  ] as EducationEntry[],
  languages: [
    {
      name: { ko: "한국어", en: "Korean" },
      level: { ko: "원어민", en: "Native" },
    },
    {
      name: { ko: "영어", en: "English" },
      level: { ko: "유창", en: "Fluent" },
    },
    {
      name: { ko: "스페인어", en: "Spanish" },
      level: { ko: "초급", en: "Beginner" },
    },
  ] as LanguageEntry[],
  bio: [
    {
      ko: "LLM 기반 시스템과 프로덕션 수준 AI 애플리케이션을 설계하고 운영합니다.",
      en: "I build and operate LLM-based systems and production-grade AI applications.",
    },
    {
      ko: "multi-LLM 오케스트레이션, RAG 시스템, 확장 가능한 백엔드 아키텍처를 중심으로 비즈니스 임팩트를 만드는 데 집중합니다.",
      en: "I focus on multi-LLM orchestration, RAG systems, and scalable backend architecture that drives measurable business impact.",
    },
    {
      ko: "교육 및 에너지 영역의 스타트업에서 비용 절감과 운영 효율 향상을 만드는 엔드투엔드 AI 솔루션을 배포한 경험이 있습니다.",
      en: "I have shipped end-to-end AI solutions for education and energy startups that improved cost efficiency and operations.",
    },
  ] as LocalizedText[],
  quote: {
    ko: "최신 AI 연구를 현실 비즈니스 가치로 연결합니다.",
    en: "Bridging cutting-edge AI research with real-world business value",
  },
  currentlySeeking: {
    ko: "AI/ML 엔지니어, LLM 서비스 엔지니어, 데이터 엔지니어 포지션",
    en: "AI/ML Engineer, LLM Service Engineer, or Data Engineer positions",
  },
  focus: {
    ko: "측정 가능한 ROI를 만드는 프로덕션 LLM 서비스와 고도화된 RAG 시스템",
    en: "Production-ready LLM services with measurable ROI and advanced RAG systems",
  },
} as const;

export function t(text: LocalizedText, isKorean: boolean): string {
  return isKorean ? text.ko : text.en;
}
