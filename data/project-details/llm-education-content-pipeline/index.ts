import type { ProjectDetail } from "@/data/project-detail-types";

export const llmEducationContentPipelineDetail: ProjectDetail = {
  overview: {
    ko: "외주 중심으로 운영되던 교육 콘텐츠 제작 프로세스를 LLM 기반 자동 생성 파이프라인으로 전환해 제작 속도와 비용 구조를 동시에 개선했습니다.",
    en: "Replaced an outsourcing-heavy educational content workflow with an LLM-based generation pipeline, improving both production speed and cost structure.",
  },
  summary: {
    ko: "LLM 기반 콘텐츠 생성 파이프라인 구축으로\n제작 기간 4개월 -> 1개월 단축\n연간 외주 비용 약 1,000만 원 절감",
    en: "Built an LLM-driven content generation pipeline\nReduced production lead time from 4 months to 1 month\nSaved about KRW 10 million in annual outsourcing costs",
  },
  highlightMetrics: [
    {
      value: {
        ko: "5,000+",
        en: "5,000+",
      },
      label: {
        ko: "자동 생성 콘텐츠",
        en: "Auto-generated content items",
      },
    },
    {
      value: {
        ko: "4개월 -> 1개월",
        en: "4 months -> 1 month",
      },
      label: {
        ko: "제작 기간",
        en: "Production lead time",
      },
    },
    {
      value: {
        ko: "연 1,000만 원",
        en: "KRW 10M / year",
      },
      label: {
        ko: "외주 비용 절감",
        en: "Outsourcing cost savings",
      },
    },
    {
      value: {
        ko: "Google Play 2위",
        en: "Google Play #2",
      },
      label: {
        ko: "교육 카테고리",
        en: "Education category",
      },
    },
  ],

  sections: [
    {
      key: "problem",
      title: {
        ko: "문제 정의",
        en: "Problem Statement",
      },
      paragraphs: [
        {
          ko: "기존 콘텐츠 제작 프로세스는 외주 기반 수작업으로 진행되었습니다. 기획팀이 교육 과정을 정의한 뒤 외부 교사에게 문제 제작을 의뢰하고, 결과물을 내부 검수 후 서비스에 반영하는 구조였습니다.",
          en: "The existing content production process was outsourcing-driven and highly manual. Planners defined the curriculum, external teachers created the questions, and the team manually reviewed and deployed the results.",
        },
        {
          ko: "콘텐츠 제작과 검수에는 약 4개월이 소요됐고, 외부 교사마다 비용 편차가 커 비용 구조도 불안정했습니다.",
          en: "Content production and review took roughly four months, and pricing variance between instructors made the cost structure unstable.",
        },
        {
          ko: "교육과정이 개편되면 기존 문제를 대부분 폐기하고 다시 제작해야 했기 때문에, 새로운 기준에 맞는 콘텐츠를 빠르게 공급하기 어려웠습니다.",
          en: "Curriculum revisions also forced the team to rebuild most question sets, making it difficult to ship updated content quickly.",
        },
      ],
    },

    {
      key: "solution",
      title: {
        ko: "해결 방식",
        en: "Solution",
      },
      paragraphs: [
        {
          ko: "LangChain 기반 LLM 콘텐츠 생성 파이프라인을 설계했습니다. Gemini, ChatGPT, Claude를 선택적으로 활용할 수 있게 구성해 문제 유형과 운영 상황에 따라 생성 전략을 조정했습니다.",
          en: "Designed a LangChain-based LLM content generation pipeline. Gemini, ChatGPT, and Claude could be selected by use case so generation strategy could adapt to question type and operating constraints.",
        },
        {
          ko: "문제 생성에는 교과서 텍스트, 교육 과정 문서, 기존 문제 데이터베이스, 개념 설명 데이터를 활용했습니다. 기존 교육 데이터를 생성 입력으로 연결해 문제 품질과 교육 기준 적합도를 높였습니다.",
          en: "Generation used textbook text, curriculum documents, the existing question database, and concept explanation data. Connecting historical education data as structured input improved output quality and curriculum fit.",
        },
        {
          ko: "또한 RAG 기반 검증 구조와 벡터 데이터베이스를 함께 구축해 생성 결과를 교육 데이터와 자동 대조할 수 있도록 설계했습니다.",
          en: "A RAG-based validation layer and vector database were also added so generated outputs could be automatically checked against educational references.",
        },
      ],
    },

    {
      key: "architecture",
      title: {
        ko: "시스템 아키텍처",
        en: "System Architecture",
      },
      paragraphs: [
        {
          ko: "파이프라인은 교육 과정 입력, LLM 기반 문제 생성, RAG 기반 문맥 검증, 다단계 평가, DB 저장, 서비스 반영의 흐름으로 구성했습니다.",
          en: "The pipeline was structured around curriculum input, LLM-based generation, RAG-driven context validation, multi-stage evaluation, database persistence, and service delivery.",
        },
        {
          ko: "생성과 검증, 저장 단계를 하나의 연속된 시스템으로 묶어 외주 의존도가 높던 제작 구조를 내부 운영 가능한 생산 시스템으로 전환했습니다.",
          en: "Generation, validation, and persistence were connected into one continuous system, replacing an outsourcing-heavy workflow with an internally operable production pipeline.",
        },
      ],
    },

    {
      key: "validation",
      title: {
        ko: "콘텐츠 검증 시스템",
        en: "Content Validation System",
      },
      paragraphs: [
        {
          ko: "LLM이 생성한 문제의 품질을 확보하기 위해 다단계 평가 시스템을 구축했습니다. 핵심 목표는 문제 형식 오류를 줄이고, 교육 기준과 문맥 일치 여부를 자동으로 판단하는 것이었습니다.",
          en: "A multi-stage evaluation system was built to secure the quality of LLM-generated questions. The main goal was to reduce structural errors and automatically judge alignment with educational standards and source context.",
        },
        {
          ko: "첫 단계에서는 LLM Self-Critique를 적용해 모델이 생성 결과를 다시 평가하도록 구성했습니다. 문제 형식, 개념 적합성, 문항 완성도를 1차적으로 점검했습니다.",
          en: "The first stage used LLM self-critique so the model could re-evaluate its own output. It checked question format, concept fit, and overall completeness as the first filter.",
        },
        {
          ko: "두 번째 단계에서는 Rule Validation을 적용해 OX, 빈칸, 객관식 등 문제 형식에 맞는 구조인지 규칙 기반 로직으로 자동 검사했습니다.",
          en: "The second stage applied rule validation to verify whether each item matched its expected structure, including true-or-false, fill-in-the-blank, and multiple-choice formats.",
        },
        {
          ko: "세 번째 단계에서는 Embedding Similarity 평가를 통해 벡터 데이터베이스와의 유사도를 비교했습니다. 이를 통해 문맥 불일치와 교육 기준 이탈 문제를 최소화했습니다.",
          en: "The third stage compared embedding similarity against the vector database. This minimized context mismatches and reduced drift from curriculum requirements.",
        },
      ],
    },

    {
      key: "operations",
      title: {
        ko: "운영 인터페이스",
        en: "Operations Interface",
      },
      paragraphs: [
        {
          ko: "콘텐츠 운영 담당자가 비개발자였기 때문에 n8n 기반 워크플로 인터페이스를 구축했습니다. 운영자는 프롬프트 수정, 콘텐츠 생성 실행, 생성 결과 확인, 검증 결과 확인, 파이프라인 상태 모니터링을 직접 수행할 수 있었습니다.",
          en: "Because the content operator was a non-developer, an n8n-based workflow interface was introduced. Operators could edit prompts, run generation jobs, inspect outputs, review validation results, and monitor pipeline status directly.",
        },
        {
          ko: "이를 통해 자동 생성 파이프라인이 개발용 도구에 머무르지 않고 실제 운영 조직이 직접 사용하는 콘텐츠 생산 시스템으로 자리 잡도록 만들었습니다.",
          en: "This ensured the pipeline became a production system used directly by the operating team, not just an internal engineering tool.",
        },
      ],
    },

    {
      key: "impact",
      title: {
        ko: "성과",
        en: "Impact",
      },
      paragraphs: [
        {
          ko: "해당 파이프라인을 통해 교육 콘텐츠 5,000개 이상을 자동 생성했으며, 콘텐츠 제작 기간을 약 4개월에서 1개월로 단축했습니다.",
          en: "The pipeline automatically generated more than 5,000 educational content items and reduced the production cycle from roughly four months to one month.",
        },
        {
          ko: "외주 비용도 연간 약 1,000만 원 절감했으며, 교육과정 개편에 대응할 수 있는 콘텐츠 공급 속도를 크게 높였습니다.",
          en: "It also cut annual outsourcing costs by about KRW 10 million and significantly improved the team's ability to respond to curriculum changes.",
        },
        {
          ko: "실서비스 운영 환경에도 적용되어 외주 중심 제작 구조를 자동화된 AI 콘텐츠 생산 시스템으로 전환했고, 해당 서비스는 Google Play 교육 카테고리 2위를 달성했습니다.",
          en: "After being applied to the live production environment, it helped transform the organization from an outsourcing-based workflow into an AI-driven content production system, and the service reached #2 in the Google Play Education category.",
        },
      ],
    },
  ],

  umlImages: [
    {
      src: "/projects/llm-education-content-pipeline/uml-overview.svg",
      alt: {
        ko: "콘텐츠 자동 생성 파이프라인 UML 다이어그램",
        en: "UML diagram of the content auto-generation pipeline",
      },
      caption: {
        ko: "교육 과정 입력부터 문제 생성, 다단계 검증, DB 저장, 서비스 반영까지 이어지는 자동화 파이프라인 구조",
        en: "Automated pipeline from curriculum input through generation, multi-stage validation, persistence, and service delivery",
      },
    },
  ],
};

