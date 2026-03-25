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

export interface AboutArchiveSection {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  items: AboutActivityItem[];
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

export const clubItems: AboutActivityItem[] = [
  {
    title: {
      ko: "아주대학교 A.va 활동",
      en: "Ajou University A.va",
    },
    organizer: {
      ko: "아주대학교 A.va",
      en: "Ajou University A.va",
    },
    dateRange: "2024.03 ~ 현재",
    summary: {
      ko: "더빙 및 성우 연기 동아리에서 더빙 콘텐츠를 기획·제작하며, 공연 연출과 외부 협업, 특강 섭외까지 주도적으로 맡고 있습니다.",
      en: "An on-campus dubbing and voice-acting club where I help plan and produce dubbing content, lead stage direction, and coordinate external collaborations and guest lectures.",
    },
    imageSrc: "/about/clubs/에이바_동아리.png",
    highlights: [
      {
        ko: "정기 공연 '울림제' 연출 담당으로 무대 기획과 팀 리허설을 총괄",
        en: "Directed the annual performance 'Ullimje,' overseeing stage planning and full-team rehearsals.",
      },
      {
        ko: "인하대학교 더빙 동아리와의 연합 활동을 기획하고 진행",
        en: "Planned and ran a joint collaboration program with Inha University's dubbing club.",
      },
      {
        ko: "현직 성우 이광수 성우 특강 섭외를 주도",
        en: "Led outreach and coordination for a guest lecture by voice actor Lee Kwang-soo.",
      },
    ],
  },
  {
    title: {
      ko: "아주대학교 Friends 회장",
      en: "President of Ajou University Friends",
    },
    organizer: {
      ko: "아주대학교 Friends",
      en: "Ajou University Friends",
    },
    dateRange: "2018.06 ~ 2024.02",
    summary: {
      ko: "한국인과 외국인 유학생의 언어·문화 교류를 위한 글로벌 커뮤니티를 운영하며, 조직 확대와 대형 교류 행사 기획을 이끌었습니다.",
      en: "Led a global language and cultural exchange community for Korean and international students, scaling operations and organizing large cross-cultural events.",
    },
    imageSrc: "/about/clubs/프렌즈_동아리.webp",
    highlights: [
      {
        ko: "8명 규모에서 130명 규모로 성장하도록 홍보 시스템을 개편하고 운영 기반을 정비",
        en: "Rebuilt the club's promotion system and operating model, helping it grow from 8 members to about 130.",
      },
      {
        ko: "교내 교환학생 공식 단체 AGA(Ajou Global Ambassador)와 연합 활동 기획",
        en: "Planned joint programs with AGA (Ajou Global Ambassador), the official exchange-student organization on campus.",
      },
      {
        ko: "경복궁 투어, International Day, Halloween Party 등 대형 연합 행사를 진행",
        en: "Ran large-scale community events including a Gyeongbokgung tour, International Day, and a Halloween Party.",
      },
    ],
  },
  {
    title: {
      ko: "Cryming Crew 동호회활동",
      en: "Cryming Crew",
    },
    organizer: {
      ko: "Cryming Crew",
      en: "Cryming Crew",
    },
    dateRange: "2025.04 ~ 현재",
    summary: {
      ko: "클라이밍 중심 운동 커뮤니티에서 정기적인 모임과 교류 행사를 통해 도전 정신과 체력을 함께 키우고 있습니다.",
      en: "An exercise community centered on climbing, where I build consistency, challenge mindset, and peer connection through regular sessions and trips.",
    },
    imageSrc: "/about/clubs/클라이밍_동호회.jpg",
    highlights: [
      {
        ko: "주 1회 정기 모임에 참여하며 볼더링 문제 해결을 통해 도전 정신을 함양",
        en: "Join weekly sessions and build resilience through repeated bouldering problem solving.",
      },
      {
        ko: "타 지역 암장 원정과 볼더링 파티 등 교류 행사를 기획",
        en: "Plan exchange events such as visits to climbing gyms in other regions and bouldering parties.",
      },
      {
        ko: "꾸준한 운동으로 체력을 유지하고 스트레스를 관리",
        en: "Use consistent training to maintain fitness and manage stress over time.",
      },
    ],
  },
] as const;

export const volunteerItems: AboutActivityItem[] = [
  {
    title: {
      ko: "아주대학교 미유미유 길고양이 급식 및 환경정화",
      en: "Ajou University Miyumiyu Cat Feeding and Campus Cleanup",
    },
    organizer: {
      ko: "아주대학교 미유미유",
      en: "Ajou University Miyumiyu",
    },
    dateRange: "2022.03 ~ 2022.08",
    summary: {
      ko: "교내 길고양이 급식 활동과 주변 환경 정화를 병행하며, 건강 상태 확인과 TNR 연계 정보 공유까지 수행했습니다.",
      en: "Supported campus stray-cat feeding and environmental cleanup work, while also tracking cat health conditions and sharing information linked to TNR efforts.",
    },
    imageSrc: "/about/volunteer/miyumiyu-volunteer.jpg",
    highlights: [
      {
        ko: "정기 급식 활동으로 교내 길고양이 건강 관리를 지원",
        en: "Supported the health of campus stray cats through regular feeding activities.",
      },
      {
        ko: "고양이 개체 수와 건강 상태를 파악하고 지속적으로 모니터링",
        en: "Tracked cat populations and monitored health conditions over time.",
      },
      {
        ko: "TNR(중성화) 활동 연계를 위한 정보 수집과 공유를 수행",
        en: "Collected and shared information to support TNR (trap-neuter-return) coordination.",
      },
    ],
  },
  {
    title: {
      ko: "수원연극축제 해외 공연단 통역 활동",
      en: "Interpreter for Overseas Performance Teams at the Suwon Theater Festival",
    },
    organizer: {
      ko: "수원연극축제",
      en: "Suwon Theater Festival",
    },
    dateRange: "2019.05",
    summary: {
      ko: "해외 공연단과 축제 운영진 사이에서 공연 준비와 체류 전반을 지원하는 현장 통역 역할을 맡았습니다.",
      en: "Provided on-site interpretation between overseas performance teams and festival staff, supporting both stage operations and day-to-day logistics.",
    },
    imageSrc: "/about/volunteer/suwon-theater-festival.jpg",
    highlights: [
      {
        ko: "해외 공연단과 축제 운영진 간 실시간 통역 지원",
        en: "Provided live interpretation between overseas performers and the festival operations team.",
      },
      {
        ko: "공연 리허설과 무대 세팅 과정에서 현장 통역 수행",
        en: "Handled on-site interpretation during rehearsals and stage setup.",
      },
      {
        ko: "숙소, 식사, 이동 등 체류 기간 생활 지원까지 담당",
        en: "Supported lodging, meals, and transportation throughout the troupe's stay.",
      },
    ],
  },
  {
    title: {
      ko: "나눔공동체 시설청소 및 장애우 놀이 활동",
      en: "Nanum Community Facility Cleanup and Recreation Support",
    },
    organizer: {
      ko: "나눔공동체",
      en: "Nanum Community",
    },
    dateRange: "2016.04 ~ 2016.10",
    summary: {
      ko: "정기 시설 정리와 놀이 활동 보조를 통해 생활 환경 개선과 정서적 교류를 함께 지원했습니다.",
      en: "Contributed to both facility upkeep and participant support through recurring cleanup work, assisted recreation programs, and everyday interaction.",
    },
    imageSrc: "/about/volunteer/nanum-community.jpg",
    highlights: [
      {
        ko: "정기적인 시설 청소와 환경 정리 봉사를 수행",
        en: "Handled recurring facility cleanup and environment maintenance tasks.",
      },
      {
        ko: "장애우 대상 놀이 활동 프로그램을 보조 진행",
        en: "Assisted with recreation programs for participants with disabilities.",
      },
      {
        ko: "일상 생활 지원과 정서적 교류 활동에 참여",
        en: "Participated in daily support tasks and relational, emotional care activities.",
      },
    ],
  },
] as const;

export const archiveSections = {
  activities: {
    eyebrow: { ko: "활동 아카이브", en: "Activity archive" },
    title: { ko: "교내외 활동", en: "Campus & External Activities" },
    description: {
      ko: "프로젝트 외부에서 쌓아 온 프로그램, 대회, 학습 경험을 한곳에 정리한 기록입니다.",
      en: "This page collects programs, hackathons, and study experiences outside formal project work in a compact timeline.",
    },
    items: activityItems,
  },
  clubs: {
    eyebrow: { ko: "커뮤니티 아카이브", en: "Community archive" },
    title: { ko: "동아리 및 동호회 활동", en: "Clubs & Communities" },
    description: {
      ko: "공동체 운영, 연합 행사 기획, 정기 참여 경험을 중심으로 리더십과 협업의 흐름을 정리했습니다.",
      en: "A timeline of club leadership, community building, and recurring participation across campus and personal communities.",
    },
    items: clubItems,
  },
  volunteer: {
    eyebrow: { ko: "봉사 아카이브", en: "Volunteer archive" },
    title: { ko: "봉사활동", en: "Volunteer Work" },
    description: {
      ko: "돌봄, 통역, 환경 정화처럼 꾸준함과 현장 대응이 필요한 봉사 경험을 모아두었습니다.",
      en: "A record of volunteer work centered on consistency, care, interpretation, and practical on-site support.",
    },
    items: volunteerItems,
  },
} as const satisfies Record<"activities" | "clubs" | "volunteer", AboutArchiveSection>;

export function pickLocalizedText(text: LocalizedText, isKorean: boolean): string {
  return isKorean ? text.ko : text.en;
}
