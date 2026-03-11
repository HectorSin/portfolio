import { appStoreLinks, projectLinks } from "@/data/links";
import { projectDetailsBySlug } from "@/data/project-details";
import type { LocalizedList, LocalizedText, ProjectDetail, ProjectLink } from "@/data/project-detail-types";

export type { LocalizedList, LocalizedText, ProjectDetail, ProjectLink } from "@/data/project-detail-types";

export interface Project {
  id: string;
  slug: string;
  isFeatured: boolean;
  title: string | LocalizedText;
  featuredSubtitle?: string | LocalizedText;
  featuredResult?: string | LocalizedText;
  featuredResultLabel?: string | LocalizedText;
  keyContributions?: string[] | LocalizedList;
  previewImageSrc?: string;
  previewImageAlt?: string | LocalizedText;
  period: string;
  company: string | LocalizedText;
  team: string | LocalizedText;
  description: string | LocalizedText;
  achievements: string[] | LocalizedList;
  tech: string[];
  links?: ProjectLink[];
  detail?: ProjectDetail;
}

const baseProjects: Omit<Project, "id" | "slug" | "detail">[] = [
  {
    isFeatured: true,
    title: {
      en: "LLM-based Educational Content Auto-Generation Pipeline",
      ko: "LLM 기반 교육 콘텐츠 자동 생성 파이프라인",
    },
    featuredSubtitle: {
      en: "Production pipeline that automated education content generation and validation",
      ko: "교육 콘텐츠 생성과 검증을 자동화한 프로덕션 파이프라인",
    },
    featuredResultLabel: {
      en: "Result",
      ko: "대표 성과",
    },
    featuredResult: {
      en: "Google Play Education category #2",
      ko: "Google Play 교육 카테고리 2위",
    },
    keyContributions: {
      en: [
        "Designed a LangChain-based multi-LLM generation pipeline",
        "Built RAG and vector-database validation for curriculum alignment",
        "Created an n8n workflow interface for non-technical operators",
      ],
      ko: [
        "LangChain 기반 멀티 LLM 생성 파이프라인 설계",
        "RAG 및 벡터 데이터베이스 기반 문맥 검증 체계 구축",
        "비개발자 운영을 위한 n8n 워크플로 인터페이스 설계",
      ],
    },
    previewImageSrc: "/projects/llm-education-content-pipeline/uml-overview.svg",
    previewImageAlt: {
      en: "Pipeline overview diagram",
      ko: "파이프라인 개요 다이어그램",
    },
    period: "2025.05 ~ 2025.08",
    company: "FilledU",
    team: {
      en: "6 members (Dev-60%, DB Design-40%, Planning-30%)",
      ko: "6명 (개발 60%, DB 설계 40%, 기획 30%)",
    },
    description: {
      en: "Replaced an outsourcing-heavy content production workflow with an LLM-based generation pipeline, improving both speed and cost structure.",
      ko: "외주 중심으로 운영되던 교육 콘텐츠 제작 프로세스를 LLM 기반 자동 생성 파이프라인으로 전환해 제작 속도와 비용 구조를 동시에 개선했습니다.",
    },
    achievements: {
      en: [
        "Automatically generated more than 5,000 educational content items",
        "Reduced production lead time from 4 months to 1 month",
        "Saved about KRW 10 million in annual outsourcing costs",
        "Applied to a live service that reached #2 in Google Play Education",
      ],
      ko: [
        "교육 콘텐츠 5,000개 이상 자동 생성",
        "콘텐츠 제작 기간 4개월에서 1개월로 단축",
        "외주 비용 연간 약 1,000만 원 절감",
        "실서비스 적용 후 Google Play 교육 카테고리 2위 달성",
      ],
    },
    tech: ["Python", "LangChain", "Gemini API", "Claude", "ChatGPT", "Flask", "PostgreSQL", "Linux", "n8n", "Vector Database"],
    links: appStoreLinks,
  },
  {
    isFeatured: true,
    title: {
      en: "Automated MP3 Splitting for Listening Assessments",
      ko: "듣기평가 MP3 문항별 자동 분할",
    },
    featuredSubtitle: {
      en: "Audio automation workflow for assessment production",
      ko: "듣기평가 제작을 위한 음원 자동화 워크플로",
    },
    featuredResultLabel: {
      en: "Result",
      ko: "대표 성과",
    },
    featuredResult: {
      en: "206 files processed with zero errors, 100% outsourcing cost reduction",
      ko: "206개 파일 무오류 처리, 외주 비용 100% 절감",
    },
    keyContributions: {
      en: [
        "Implemented Whisper-based timestamp extraction and FFmpeg splitting",
        "Built problem-number recognition and validation pipeline",
        "Automated the full editing flow to remove recurring manual work",
      ],
      ko: [
        "Whisper 기반 타임스탬프 추출 및 FFmpeg 자동 분할 구현",
        "문항 번호 인식 및 검증 파이프라인 구축",
        "반복 편집 작업 전체를 자동화해 수작업 제거",
      ],
    },
    period: "2025.03 ~ 2025.06",
    company: "FilledU",
    team: {
      en: "3 members (Dev-90%)",
      ko: "3명 (개발 90%)",
    },
    description: {
      en: "Automated audio splitting system for listening assessments, processed 206 files with zero errors and 100% cost reduction.",
      ko: "듣기평가 음원 자동 분할 시스템을 구축해 206개 파일을 무오류 처리하고 비용을 100% 절감했습니다.",
    },
    achievements: {
      en: [
        "100% automation of audio editing, saving 2M KRW annually",
        "Implemented timestamp extraction using Whisper STT and FFmpeg-based MP3 splitting",
        "Developed LangChain-based problem number recognition pipeline and quality validation",
        "Processed 206 files with zero errors and reduced outsourcing costs by 100%",
      ],
      ko: [
        "음원 편집 100% 자동화로 연간 200만 원 절감",
        "Whisper STT 기반 타임스탬프 추출 및 FFmpeg 자동 분할 구현",
        "LangChain 기반 문항 번호 인식 및 품질 검증 파이프라인 개발",
        "206개 파일 무오류 처리 및 외주 비용 100% 절감",
      ],
    },
    tech: ["Python", "FFmpeg", "Whisper", "LangChain", "Linux"],
    links: appStoreLinks,
  },
  {
    isFeatured: false,
    title: {
      en: "Vietnam ELECS 2024 Tech Sales & MOU Execution",
      ko: "베트남 ELECS 2024 기술 영업 및 MOU 체결",
    },
    period: "2024.09 ~ 2024.10",
    company: "TurbineCrew",
    team: {
      en: "3 members (Planning-60%, Operations-40%)",
      ko: "3명 (기획 60%, 운영 40%)",
    },
    description: {
      en: "Participated in Vietnam ELECS 2024 exhibition, conducted technical demonstrations and closed 3 MOUs with local companies.",
      ko: "베트남 ELECS 2024 전시회에서 기술 시연과 비즈니스 미팅을 진행해 현지 기업 3곳과 MOU를 체결했습니다.",
    },
    achievements: {
      en: [
        "Successfully closed 3 MOUs with Vietnamese companies",
        "Conducted technical presentations and Korean-English interpretation",
        "Operated exhibition booth and supported MOU execution",
      ],
      ko: [
        "베트남 현지 기업 3곳과 MOU 체결",
        "기술 발표 및 한-영 통역 지원",
        "전시 부스 운영 및 체결 실무 지원",
      ],
    },
    tech: ["Notion", "PowerPoint"],
    links: [{ label: "News", url: projectLinks["Vietnam ELECS 2024 Tech Sales & MOU Execution"] }],
  },
  {
    isFeatured: false,
    title: {
      en: "SmartPole IoT Sensor Data Collection & Cloud System",
      ko: "스마트폴 IoT 센서 데이터 수집 및 클라우드 전송 시스템",
    },
    period: "2024.01 ~ 2024.02",
    company: "TurbineCrew",
    team: {
      en: "4 members (Dev-60%, HW-70%)",
      ko: "4명 (개발 60%, 하드웨어 70%)",
    },
    description: {
      en: "Built real-time IoT sensor data collection and AWS cloud transmission pipeline for SmartPole infrastructure.",
      ko: "SmartPole 인프라를 위한 IoT 센서 데이터 실시간 수집 및 AWS 전송 파이프라인을 구축했습니다.",
    },
    achievements: {
      en: [
        "Automated storage of 1,000+ sensor data points daily",
        "Developed Raspberry Pi-based sensor data collection module",
        "Built AWS (EC2, S3) cloud transmission pipeline and automation",
        "Awarded Outstanding Employee recognition",
      ],
      ko: [
        "일일 1,000건 이상 센서 데이터 자동 적재",
        "Raspberry Pi 기반 센서 수집 모듈 개발",
        "AWS(EC2, S3) 전송 파이프라인 및 자동화 구축",
        "우수사원 표창 수상",
      ],
    },
    tech: ["Python", "Raspberry Pi", "Jetson Nano", "AWS", "Linux"],
  },
  {
    isFeatured: false,
    title: {
      en: "Cognee Open Source Project Contribution",
      ko: "Cognee 오픈소스 프로젝트 기여",
    },
    period: "2025.12 ~ Present",
    company: "Cognee",
    team: {
      en: "Open Source Contributor",
      ko: "오픈소스 컨트리뷰터",
    },
    description: {
      en: "Knowledge Graph-based memory management open-source library for LLM applications.",
      ko: "LLM 애플리케이션을 위한 Knowledge Graph 기반 메모리 관리 오픈소스 라이브러리에 기여했습니다.",
    },
    achievements: {
      en: [
        "Contributed Korean translation of development documentation",
        "Fixed simple code errors including Pydantic errors and bug patches",
        "Active participation in open-source community",
      ],
      ko: [
        "개발 문서 한국어 번역 기여",
        "Pydantic 관련 오류 등 코드 버그 수정",
        "오픈소스 커뮤니티 활동 지속",
      ],
    },
    tech: ["Python", "Git", "Markdown", "Linux", "Windows"],
    links: [
      { label: "GitHub", url: projectLinks["Cognee Open Source Project Contribution"] },
      { label: "Cognee", url: projectLinks["Cognee Docs"] },
    ],
  },
  {
    isFeatured: false,
    title: {
      en: "ControlNet-based Illustration Conversion AI Model",
      ko: "ControlNet 기반 일러스트 변환 AI 모델",
    },
    period: "2024.04 ~ 2024.10",
    company: {
      en: "ModuLabs, Gyeonggi Youth Gap Year",
      ko: "모두랩스, 경기청년 갭이어",
    },
    team: {
      en: "4 members (AI Model Design-70%, Dev-50%)",
      ko: "4명 (AI 모델 설계 70%, 개발 50%)",
    },
    description: {
      en: "AI image generation model that converts children's drawings into fairy tale illustration style.",
      ko: "아동의 그림을 동화풍 일러스트 스타일로 변환하는 AI 이미지 생성 모델을 개발했습니다.",
    },
    achievements: {
      en: [
        "Fine-tuned ControlNet model and collected/preprocessed datasets",
        "Developed API server and prompt engineering",
        "Successfully converted children's drawings to professional illustration style",
      ],
      ko: [
        "ControlNet 모델 파인튜닝 및 데이터셋 수집/전처리",
        "API 서버 개발 및 프롬프트 엔지니어링",
        "아동 그림의 상업용 수준 일러스트 스타일 변환 구현",
      ],
    },
    tech: ["Python", "Stable Diffusion", "ControlNet", "OpenAI GPT-4", "Linux"],
  },
  {
    isFeatured: false,
    title: {
      en: "SnackCast - AI-based News Podcast Auto-Generation",
      ko: "SnackCast - AI 기반 뉴스 팟캐스트 자동 생성",
    },
    period: "2025.08 ~ 2025.12",
    company: {
      en: "Ajou University Capstone Project",
      ko: "아주대학교 캡스톤 프로젝트",
    },
    team: {
      en: "4 members (Dev-70%, Infra-100%)",
      ko: "4명 (개발 70%, 인프라 100%)",
    },
    description: {
      en: "AI podcast service: Perplexity news crawling, Gemini summarization, and TTS audio generation.",
      ko: "Perplexity 뉴스 수집, Gemini 요약, TTS 생성을 연결한 AI 뉴스 팟캐스트 자동화 서비스를 구현했습니다.",
    },
    achievements: {
      en: [
        "Designed FastAPI backend server, containerized with Docker, deployed on GCP",
        "Built multi-API pipeline (Perplexity, Gemini, Clova TTS)",
        "Integrated PostgreSQL and implemented end-to-end automation",
      ],
      ko: [
        "FastAPI 백엔드 설계, Docker 컨테이너화, GCP 배포",
        "Perplexity, Gemini, Clova TTS 멀티 API 파이프라인 구축",
        "PostgreSQL 연동 및 엔드투엔드 자동화 구현",
      ],
    },
    tech: ["Python", "LangChain", "Perplexity API", "FastAPI", "PostgreSQL", "Docker", "GCP", "Clova TTS"],
  },
  {
    isFeatured: false,
    title: {
      en: "Personalized Travel Route Recommendation Service",
      ko: "개인 맞춤형 여행 경로 추천 서비스",
    },
    period: "2023.08 ~ 2023.12",
    company: {
      en: "Ajou University Capstone Project",
      ko: "아주대학교 캡스톤 프로젝트",
    },
    team: {
      en: "5 members (Dev-100%, Planning-20%)",
      ko: "5명 (개발 100%, 기획 20%)",
    },
    description: {
      en: "LLM-based personalized travel route recommendation web service with SEO optimization.",
      ko: "LLM 기반 개인 맞춤형 여행 경로 추천 웹 서비스를 개발하고 SEO 최적화를 적용했습니다.",
    },
    achievements: {
      en: [
        "Developed travel route generation logic using ChatGPT-3.5 API",
        "Implemented SEO-friendly page structure and content generation",
        "Created personalized recommendations based on user preferences",
      ],
      ko: [
        "ChatGPT-3.5 API 기반 여행 경로 생성 로직 개발",
        "SEO 친화적 페이지 구조 및 콘텐츠 생성 구현",
        "사용자 선호 기반 개인화 추천 제공",
      ],
    },
    tech: ["Python", "OpenAI GPT-4", "HTML", "CSS", "JavaScript", "Linux"],
  },
];

const projectSlugs = [
  "llm-education-content-pipeline",
  "automated-mp3-splitting-listening-assessments",
  "vietnam-elecs-2024-tech-sales-mou",
  "smartpole-iot-sensor-cloud-system",
  "cognee-open-source-contribution",
  "controlnet-illustration-conversion-model",
  "snackcast-ai-news-podcast",
  "personalized-travel-route-recommendation",
] as const;

export const projects: Project[] = baseProjects.map((project, index) => {
  const slug = projectSlugs[index];
  return {
    ...project,
    id: `project-${index + 1}`,
    slug: slug ?? `project-${index + 1}`,
    detail: slug ? projectDetailsBySlug[slug] : undefined,
  };
});

export function getTechProjectMap(): Record<string, number> {
  const map: Record<string, number> = {};
  projects.forEach((project, index) => {
    project.tech.forEach((tech) => {
      if (!(tech in map)) {
        map[tech] = index;
      }
    });
  });
  return map;
}
