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
  result: LocalizedText;
  organizer: LocalizedText;
  date: string;
}

export interface AboutActivityItem {
  title: LocalizedText;
  organizer: LocalizedText;
  dateRange: string;
  summary: LocalizedText;
  highlights: LocalizedText[];
  imageSrc?: string;
}

export interface AboutGalleryItem {
  src: string;
  alt: LocalizedText;
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
      ko: "대회, 프로그램, 인턴십에서 받은 성과를 시기순으로 확인할 수 있는 아카이브입니다.",
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
      ko: "경기 청년 갭이어, 데이터 해커톤, 동계 모각소까지 프로젝트 밖에서 쌓아온 학습과 실행 경험을 모아두었습니다.",
      en: "A compact archive of learning and execution outside project work, from the Youth Gap Year program to a data hackathon and winter study group.",
    },
    eyebrow: {
      ko: "실전 경험 아카이브",
      en: "Hands-on archive",
    },
    accent: "#0F766E",
    stat: {
      ko: "이미지 포함 3건",
      en: "3 entries with images",
    },
    href: "/about/activities",
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
      ko: "포트폴리오 경진대회",
      en: "Portfolio Competition",
    },
    result: {
      ko: "우수상",
      en: "Excellence Award",
    },
    organizer: {
      ko: "㈜ HR브라운",
      en: "HRBrown Co., Ltd.",
    },
    date: "2026.01.29",
  },
  {
    title: {
      ko: "우수사원",
      en: "Outstanding Employee",
    },
    result: {
      ko: "우수사원",
      en: "Outstanding Employee",
    },
    organizer: {
      ko: "㈜ 터빈크루",
      en: "TurbineCrew Co., Ltd.",
    },
    date: "2024.02.26",
  },
  {
    title: {
      ko: "학교장추천 장학 및 일반장학금 2회",
      en: "Principal's Recommendation Scholarship and General Scholarship (twice)",
    },
    result: {
      ko: "장학금 수혜",
      en: "Scholarship Recipient",
    },
    organizer: {
      ko: "아주대학교",
      en: "Ajou University",
    },
    date: "2018.12 ~ 2023.06",
  },
  {
    title: {
      ko: "경영대학 학술제",
      en: "College of Business Administration Academic Festival",
    },
    result: {
      ko: "금상 · 2위",
      en: "Gold Prize · 2nd Place",
    },
    organizer: {
      ko: "아주대학교",
      en: "Ajou University",
    },
    date: "2018.10.15",
  },
  {
    title: {
      ko: "영역별 토론대회",
      en: "Debate Competition by Category",
    },
    result: {
      ko: "최우수상 · 1위",
      en: "Grand Prize · 1st Place",
    },
    organizer: {
      ko: "대구외국어고등학교",
      en: "Daegu Foreign Language High School",
    },
    date: "2016.07.19",
  },
  {
    title: {
      ko: "대구외국어고등학교 모의 UN",
      en: "Daegu Foreign Language High School Model UN",
    },
    result: {
      ko: "은상 · 3위",
      en: "Silver Prize · 3rd Place",
    },
    organizer: {
      ko: "대구외국어고등학교",
      en: "Daegu Foreign Language High School",
    },
    date: "2016.01.12",
  },
  {
    title: {
      ko: "대구외국어고등학교 모의 UN",
      en: "Daegu Foreign Language High School Model UN",
    },
    result: {
      ko: "동상 · 4위",
      en: "Bronze Prize · 4th Place",
    },
    organizer: {
      ko: "대구외국어고등학교",
      en: "Daegu Foreign Language High School",
    },
    date: "2015.09.01",
  },
  {
    title: {
      ko: "STUDENT OF THE MONTH 수상",
      en: "Student of the Month",
    },
    result: {
      ko: "최우수상 · 1위",
      en: "Top Honor · 1st Place",
    },
    organizer: {
      ko: "Lincoln 국제학교",
      en: "Lincoln International School",
    },
    date: "2012.08.31",
  },
  {
    title: {
      ko: "국제 수학 경시대회",
      en: "International Math Competition",
    },
    result: {
      ko: "세계 상위 400위 이내",
      en: "Ranked within the Global Top 400",
    },
    organizer: {
      ko: "Purple Comet! Math Meet",
      en: "Purple Comet! Math Meet",
    },
    date: "2011.07.16",
  },
  {
    title: {
      ko: "교내 수학경시대회",
      en: "School Mathematics Competition",
    },
    result: {
      ko: "장려상",
      en: "Encouragement Award",
    },
    organizer: {
      ko: "대구대진초등학교",
      en: "Daegu Daejin Elementary School",
    },
    date: "2009.12.22",
  },
  {
    title: {
      ko: "교내디자인대회 생산디자인부분",
      en: "School Design Competition, Product Design Division",
    },
    result: {
      ko: "우수상",
      en: "Excellence Award",
    },
    organizer: {
      ko: "대구대진초등학교",
      en: "Daegu Daejin Elementary School",
    },
    date: "2008.05.19",
  },
  {
    title: {
      ko: "교내 과학의 날 경진대회",
      en: "School Science Day Competition",
    },
    result: {
      ko: "은상",
      en: "Silver Prize",
    },
    organizer: {
      ko: "대구대진초등학교",
      en: "Daegu Daejin Elementary School",
    },
    date: "2008.04.21",
  },
  {
    title: {
      ko: "교내 독서토론 활동",
      en: "School Reading Discussion Activity",
    },
    result: {
      ko: "우수상",
      en: "Excellence Award",
    },
    organizer: {
      ko: "대구대진초등학교",
      en: "Daegu Daejin Elementary School",
    },
    date: "2007.12.29",
  },
  {
    title: {
      ko: "대진문예축제한마당 장치 입체디자인",
      en: "Daejin Literary Festival, Installation 3D Design",
    },
    result: {
      ko: "장려상",
      en: "Encouragement Award",
    },
    organizer: {
      ko: "대구대진초등학교",
      en: "Daegu Daejin Elementary School",
    },
    date: "2007.10.22",
  },
  {
    title: {
      ko: "교내 과학의 날 경진대회",
      en: "School Science Day Competition",
    },
    result: {
      ko: "금상",
      en: "Gold Prize",
    },
    organizer: {
      ko: "대구대진초등학교",
      en: "Daegu Daejin Elementary School",
    },
    date: "2007.04.23",
  },
  {
    title: {
      ko: "대진독서축제한마당 잔치 독서 감상화",
      en: "Daejin Reading Festival, Book Appreciation Painting",
    },
    result: {
      ko: "장려상",
      en: "Encouragement Award",
    },
    organizer: {
      ko: "대구대진초등학교",
      en: "Daegu Daejin Elementary School",
    },
    date: "2006.10.23",
  },
  {
    title: {
      ko: "교내 동시짓기 대회",
      en: "School Poetry Writing Contest",
    },
    result: {
      ko: "장려상",
      en: "Encouragement Award",
    },
    organizer: {
      ko: "대구대진초등학교",
      en: "Daegu Daejin Elementary School",
    },
    date: "2006.04.24",
  },
] as const;

export const awardGalleryItems: AboutGalleryItem[] = [] as const;

export const activityItems: AboutActivityItem[] = [
  {
    title: {
      ko: "경기도일자리재단 경기 청년 갭이어",
      en: "Gyeonggi Job Foundation Youth Gap Year Program",
    },
    organizer: {
      ko: "경기도일자리재단",
      en: "Gyeonggi Job Foundation",
    },
    dateRange: "2024.04 ~ 2024.12",
    summary: {
      ko: "경기도 지원 청년 직무역량 강화 프로그램에 참여하며 AI 서비스 기획과 모델 활용 역량을 실전형으로 확장했습니다.",
      en: "Joined a Gyeonggi-do supported youth upskilling program focused on hands-on AI service planning and model application.",
    },
    imageSrc: "/about/activities/경기청년갭이어.png",
    highlights: [
      {
        ko: "초등학생 그림을 AI로 완성하는 'AI 스케치북' 서비스 기획 및 개발",
        en: "Planned and developed the 'AI Sketchbook' service that completes elementary students' drawings with AI.",
      },
      {
        ko: "ControlNet 활용 스케치-일러스트 변환 파이프라인 구축",
        en: "Built a ControlNet-based sketch-to-illustration conversion pipeline.",
      },
      {
        ko: "현업 멘토링을 통해 서비스 관점의 AI 모델 튜닝 역량 심화",
        en: "Deepened AI model tuning skills through industry mentoring with a product and service perspective.",
      },
    ],
  },
  {
    title: {
      ko: "아주대학교 인공지능융합학과 Data 해커톤",
      en: "Ajou University AI Convergence Department Data Hackathon",
    },
    organizer: {
      ko: "아주대학교 인공지능융합학과",
      en: "Department of AI Convergence, Ajou University",
    },
    dateRange: "2023.03 ~ 2023.03",
    summary: {
      ko: "경찰청 범죄 통계 데이터를 활용해 차년도 검거율을 예측하고 치안 전략을 제안하는 경진대회에 참여했습니다.",
      en: "Participated in a competition that predicted next-year arrest rates from police crime statistics and proposed policing strategies.",
    },
    imageSrc: "/about/activities/데이터해커톤.jpg",
    highlights: [
      {
        ko: "범죄 발생·검거 공공 데이터 전처리 및 탐색적 데이터 분석(EDA) 수행",
        en: "Preprocessed public crime occurrence and arrest datasets and conducted exploratory data analysis.",
      },
      {
        ko: "시계열 회귀 분석 모델을 설계해 미래 검거율 예측",
        en: "Designed a time-series regression model to forecast future arrest rates.",
      },
      {
        ko: "예측 결과를 바탕으로 범죄 취약점 분석 및 치안 전략 제안",
        en: "Used the predictions to analyze crime vulnerabilities and suggest public safety strategies.",
      },
    ],
  },
  {
    title: {
      ko: "아주대학교 SW 융합교육원 2022년 동계 모각소",
      en: "Ajou University SW Convergence Institute 2022 Winter Group Study",
    },
    organizer: {
      ko: "아주대학교 SW 융합교육원",
      en: "SW Convergence Institute, Ajou University",
    },
    dateRange: "2022.12 ~ 2023.03",
    summary: {
      ko: "방학 기간 자기주도적 그룹 스터디로 머신러닝과 딥러닝 기초를 체계적으로 심화한 활동입니다.",
      en: "A self-directed winter group study that strengthened core machine learning and deep learning foundations during the break.",
    },
    imageSrc: "/about/activities/모각소.jpg",
    highlights: [
      {
        ko: "Pandas, Scikit-learn 활용 ML/DL 기초 알고리즘 심화 스터디",
        en: "Studied core ML and DL algorithms in depth using Pandas and Scikit-learn.",
      },
      {
        ko: "캐글·데이콘 예제 데이터 활용 전처리 및 모델링 실습",
        en: "Practiced preprocessing and modeling with example datasets from Kaggle and Dacon.",
      },
      {
        ko: "주 1회 정기 모임에서 코드 리뷰 및 피어 러닝 수행",
        en: "Ran weekly meetings centered on code review and peer learning.",
      },
    ],
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
      ko: "더빙 작업",
      en: "Dubbing Work",
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
