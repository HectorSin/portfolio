export type LocalizedText = {
  ko: string;
  en: string;
};

export type AboutCategorySlug =
  | "recommendations"
  | "awards"
  | "activities"
  | "clubs"
  | "volunteer";

export interface AboutCategoryCard {
  slug: AboutCategorySlug;
  title: LocalizedText;
  subtitle: LocalizedText;
  summary: LocalizedText;
  eyebrow: LocalizedText;
  accent: string;
  stat: LocalizedText;
  href?: string;
}

export interface AboutDocumentItem {
  title: LocalizedText;
  issuer: LocalizedText;
  date: string;
  summary: LocalizedText;
  thumbnailLabel: LocalizedText;
  imageSrc?: string;
  assetUrl?: string;
}

export interface AboutAwardItem {
  title: LocalizedText;
  organizer: LocalizedText;
  date: string;
  description: LocalizedText;
  thumbnailLabel: LocalizedText;
  imageSrc?: string;
}

export interface PersonalHighlightItem {
  title: LocalizedText;
  description: LocalizedText;
  imageSrc?: string;
  linkLabel?: LocalizedText;
  linkUrl?: string;
}

export const aboutPageIntro = {
  title: {
    ko: "저를 더 입체적으로 보여주는 기록들",
    en: "Records that show a fuller picture of who I am",
  },
  description: {
    ko: "프로젝트 중심 포트폴리오에서 다 담지 못한 추천서, 수상, 활동, 그리고 개인적인 취미까지 한 곳에 정리한 공간입니다.",
    en: "A dedicated space for recommendations, awards, activities, and personal interests that do not fit neatly into the project-focused homepage.",
  },
} as const;

export const aboutCategoryCards: AboutCategoryCard[] = [
  {
    slug: "recommendations",
    title: {
      ko: "추천서 원본 및 요약",
      en: "Recommendations",
    },
    subtitle: {
      ko: "함께 일한 사람들의 평가와 협업 맥락",
      en: "How collaborators describe my work",
    },
    summary: {
      ko: "함께 일했던 분들의 추천 내용을 썸네일과 핵심 요약으로 먼저 보여주는 섹션입니다.",
      en: "A preview-first section for recommendation letters, with collaboration context and concise summaries.",
    },
    eyebrow: {
      ko: "신뢰와 협업",
      en: "Trust & collaboration",
    },
    accent: "#0F766E",
    stat: {
      ko: "가장 먼저 보기",
      en: "Start here",
    },
    href: "/about/recommendations",
  },
  {
    slug: "awards",
    title: {
      ko: "수상 경력",
      en: "Awards",
    },
    subtitle: {
      ko: "성과와 증빙을 한 번에 보는 아카이브",
      en: "Recognition and proof points in one view",
    },
    summary: {
      ko: "대회, 프로그램, 인턴십에서 받은 성과를 시기순으로 보고 증빙 자료와 함께 정리할 예정입니다.",
      en: "A compact timeline of awards and recognitions, designed to connect each item with supporting material.",
    },
    eyebrow: {
      ko: "성과와 증빙",
      en: "Recognition",
    },
    accent: "#0F766E",
    stat: {
      ko: "타임라인 구성",
      en: "Timeline ready",
    },
    href: "/about/awards",
  },
  {
    slug: "activities",
    title: {
      ko: "교내·외 활동",
      en: "Campus & External Activities",
    },
    subtitle: {
      ko: "프로그램, 행사, 대외활동 기록",
      en: "Programs, events, and external participation",
    },
    summary: {
      ko: "프로젝트 외적으로 참여했던 프로그램과 활동들을 정리할 예정입니다.",
      en: "A curated archive of academic and external programs will be added here next.",
    },
    eyebrow: {
      ko: "추가 예정",
      en: "Coming soon",
    },
    accent: "#0F766E",
    stat: {
      ko: "정리 중",
      en: "In progress",
    },
  },
  {
    slug: "clubs",
    title: {
      ko: "동아리 및 동호회",
      en: "Clubs & Communities",
    },
    subtitle: {
      ko: "운영 경험과 커뮤니티 활동",
      en: "Community building and leadership",
    },
    summary: {
      ko: "운영, 참여, 리더십 경험을 사진과 함께 정리할 예정입니다.",
      en: "Club operations, participation, and leadership moments will be organized with photos.",
    },
    eyebrow: {
      ko: "추가 예정",
      en: "Coming soon",
    },
    accent: "#0F766E",
    stat: {
      ko: "리더십 중심",
      en: "Leadership notes",
    },
  },
  {
    slug: "volunteer",
    title: {
      ko: "봉사 활동",
      en: "Volunteer Work",
    },
    subtitle: {
      ko: "지속성과 태도를 보여주는 기록",
      en: "A record of consistency and contribution",
    },
    summary: {
      ko: "지속적으로 해온 봉사 활동과 기록을 별도 섹션으로 확장할 예정입니다.",
      en: "Ongoing volunteer work and related records will be expanded in a dedicated section.",
    },
    eyebrow: {
      ko: "추가 예정",
      en: "Coming soon",
    },
    accent: "#0F766E",
    stat: {
      ko: "확장 예정",
      en: "To expand",
    },
  },
] as const;

export const recommendationItems: AboutDocumentItem[] = [
  {
    title: {
      ko: "강민철 교수님 추천서",
      en: "Recommendation from Prof. Kang Mincheol",
    },
    issuer: {
      ko: "강민철 교수님",
      en: "Prof. Kang Mincheol",
    },
    date: "2025",
    summary: {
      ko: "강민철 교수님의 추천서 원본입니다. 실제 협업 맥락과 평가 포인트를 PDF 원본으로 바로 확인할 수 있습니다.",
      en: "Original recommendation letter from Prof. Kang Mincheol. The PDF opens the full context and evaluation directly.",
    },
    thumbnailLabel: {
      ko: "강민철 교수님 추천서 미리보기",
      en: "Prof. Kang Mincheol recommendation preview",
    },
    imageSrc: "/about/recommendations/recommendation-prof-kang-mincheol.png",
    assetUrl: "/about/recommendations/recommendation-prof-kang-mincheol.pdf",
  },
  {
    title: {
      ko: "최재영 교수님 추천서",
      en: "Recommendation from Prof. Choi Jaeyoung",
    },
    issuer: {
      ko: "최재영 교수님",
      en: "Prof. Choi Jaeyoung",
    },
    date: "2025",
    summary: {
      ko: "최재영 교수님의 추천서 원본입니다. 추천 내용은 페이지에서 요약하고, 원문은 PDF로 직접 열람할 수 있도록 연결했습니다.",
      en: "Original recommendation letter from Prof. Choi Jaeyoung. The page gives the overview, and the PDF provides the complete letter.",
    },
    thumbnailLabel: {
      ko: "최재영 교수님 추천서 미리보기",
      en: "Prof. Choi Jaeyoung recommendation preview",
    },
    imageSrc: "/about/recommendations/recommendation-prof-choi-jaeyoung.png",
    assetUrl: "/about/recommendations/recommendation-prof-choi-jaeyoung.pdf",
  },
] as const;

export const awardItems: AboutAwardItem[] = [
  {
    title: {
      ko: "우수 인턴 선정",
      en: "Outstanding Intern Recognition",
    },
    organizer: {
      ko: "TurbineCrew",
      en: "TurbineCrew",
    },
    date: "2024.02",
    description: {
      ko: "실시간 IoT 데이터 수집 및 적재 자동화 구현에 대한 실행력과 기여도를 인정받아 받은 성과입니다.",
      en: "Recognition received for execution quality and contribution while building an AWS-based IoT data pipeline.",
    },
    thumbnailLabel: {
      ko: "인턴 우수상 증빙 이미지 자리",
      en: "Outstanding intern certificate slot",
    },
  },
  {
    title: {
      ko: "수상 경력 샘플",
      en: "Award Sample",
    },
    organizer: {
      ko: "주최 기관명 추후 반영",
      en: "Organizer to be added",
    },
    date: "2025",
    description: {
      ko: "추후 실제 수상명, 주최, 설명, 사진 증빙을 연결할 수 있도록 마련한 카드입니다.",
      en: "A prepared card for an upcoming award entry with organizer, context, and supporting image.",
    },
    thumbnailLabel: {
      ko: "수상 이미지 자리",
      en: "Award image slot",
    },
  },
] as const;

export const personalHighlights: PersonalHighlightItem[] = [
  {
    title: {
      ko: "클라이밍",
      en: "Climbing",
    },
    description: {
      ko: "집중력과 반복 훈련이 필요한 활동이라 문제를 쪼개고 해결하는 제 성향과 잘 맞습니다. 추후 클라이밍 사진을 연결할 예정입니다.",
      en: "Climbing matches how I like to break down problems and improve through repetition. A photo slot is ready for future updates.",
    },
  },
  {
    title: {
      ko: "더빙과 보이스 작업",
      en: "Dubbing & Voice Work",
    },
    description: {
      ko: "발성, 전달력, 표현을 다루는 취미 활동입니다. 관련 사진이나 포트폴리오 링크를 연결할 수 있도록 구성했습니다.",
      en: "A personal interest centered on voice, delivery, and expression, with room for photos or external samples.",
    },
  },
] as const;

export function pickLocalizedText(text: LocalizedText, isKorean: boolean): string {
  return isKorean ? text.ko : text.en;
}
