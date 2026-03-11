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
  identity: {
    title: {
      ko: "AI Systems Engineer",
      en: "AI Systems Engineer",
    },
    keywords: ["LLM", "RAG", "Automation"] as const,
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
      ko: "LLM 기반 AI 시스템과 애플리케이션을 설계하고 운영하는 엔지니어입니다.",
      en: "I design and operate LLM-based AI systems and applications.",
    },
    {
      ko: "multi-LLM orchestration과 RAG 시스템,\n확장 가능한 백엔드 아키텍처를 중심으로 AI 서비스를 구축합니다.",
      en: "I build AI services around multi-LLM orchestration and RAG systems,\nand scalable backend architecture.",
    },
    {
      ko: "교육과 에너지 스타트업 환경에서 비용 절감과 운영 효율을 만드는 엔드투엔드 AI 솔루션을\n실제 서비스에 배포했습니다.",
      en: "I shipped end-to-end AI solutions\ninto production for education and energy startups, improving cost efficiency and operations.",
    },
    {
      ko: "LLM 기반 콘텐츠 생성 파이프라인을 구축해\n콘텐츠 제작 기간을 6주에서 2주로 단축하고 연간 약 200만 원의 외주 비용을 절감했습니다.",
      en: "I built an LLM-based content generation pipeline,\ncut content production time from 6 weeks to 2 weeks and reduced outsourced production costs by about KRW 2 million annually.",
    },
  ] as LocalizedText[],
  quote: {
    ko: "최신 AI 연구를 현실 비즈니스 가치로 연결합니다.",
    en: "Bridging the latest AI research with real business value.",
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
