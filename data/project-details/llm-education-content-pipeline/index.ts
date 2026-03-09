import type { ProjectDetail } from "@/data/project-detail-types";

export const llmEducationContentPipelineDetail: ProjectDetail = {
  overview: {
    ko: "외주 중심으로 운영되던 교육 콘텐츠 제작 과정을 LLM 기반 자동 생성 파이프라인으로 전환해 제작 속도와 비용 구조를 동시에 개선했습니다.",
    en: "Replaced a manual outsourcing workflow with an LLM-based content generation pipeline, improving both production speed and cost structure.",
  },

  sections: [
    {
      key: "problem",
      title: {
        ko: "문제 정의",
        en: "Problem Statement",
      },
      paragraphs: [
        {
          ko: "교육 콘텐츠는 외부 교사에게 개념서, OX 문제, 빈칸 문제 등을 의뢰하는 방식으로 제작되고 있었습니다. 그러나 문제 생성과 검수 과정이 모두 수작업으로 진행되어 제작 기간이 길어지고 일정 지연이 반복되었습니다.",
          en: "Educational content such as concept explanations, OX questions, and fill-in-the-blank exercises were outsourced to external teachers. The fully manual creation and review process caused long production cycles and repeated schedule delays.",
        },
        {
          ko: "또한 교사마다 제작 비용 편차가 커 비용 산정 기준이 불안정했으며, 새로운 교육과정이 도입될 때 기존 문제를 대부분 폐기하고 다시 제작해야 하는 구조적 문제가 있었습니다.",
          en: "Pricing varied significantly between instructors, making cost estimation inconsistent. When the curriculum changed, most existing content had to be discarded and recreated from scratch.",
        },
        {
          ko: "결과적으로 콘텐츠 제작은 높은 비용과 긴 제작 기간을 요구하는 구조였고, 새로운 교육과정에 맞춘 문제를 빠르게 공급하는 것이 어려운 상황이었습니다.",
          en: "This resulted in a costly and slow production process that struggled to supply updated content quickly when new curricula were introduced.",
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
          ko: "LangChain을 기반으로 Gemini, ChatGPT, Claude를 선택적으로 활용할 수 있는 교육 콘텐츠 자동 생성 파이프라인을 설계했습니다. 서버에 축적된 기존 교육 데이터를 입력으로 활용해 문제 생성 품질을 높였습니다.",
          en: "Designed a LangChain-based generation pipeline that can selectively use Gemini, ChatGPT, and Claude models. Existing educational data stored on the server was used as structured input to improve generation quality.",
        },
        {
          ko: "콘텐츠 품질 검증을 위해 RAG 구조를 도입하고 벡터 데이터베이스를 구축했습니다. 생성된 문제는 교육 데이터와의 유사도 및 문맥 검증을 통해 자동 평가되도록 설계했습니다.",
          en: "Introduced a RAG-based validation workflow with a vector database. Generated content was automatically evaluated against educational references to verify semantic relevance and correctness.",
        },
        {
          ko: "또한 MCP(Model Context Protocol)를 활용해 추가적인 평가 도구를 구축하여 문제 형식, 난이도, 교육 기준 충족 여부를 다단계로 검증하도록 구성했습니다.",
          en: "Additional evaluation tools were implemented using MCP (Model Context Protocol) to assess question format, difficulty level, and compliance with educational standards.",
        },
        {
          ko: "콘텐츠 운영 담당자가 비개발자였기 때문에 n8n 기반 워크플로 인터페이스를 구축해 파이프라인 상태를 시각적으로 확인하고 프롬프트를 수정할 수 있도록 설계했습니다.",
          en: "Since the content manager was a non-developer, an n8n-based workflow interface was built to visualize pipeline states and allow prompt adjustments without engineering support.",
        },
        {
          ko: "이를 통해 콘텐츠 생성, 검증, 저장까지 이어지는 전체 제작 과정을 자동화된 파이프라인으로 전환했습니다.",
          en: "This resulted in a fully automated pipeline covering generation, validation, and persistence of educational content.",
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
          ko: "기존 외주 방식에서는 콘텐츠 제작과 검수에 약 4개월 이상이 필요했지만, 자동화 파이프라인 도입 이후 약 1개월 이내에 콘텐츠 생성과 검수를 완료할 수 있게 되었습니다.",
          en: "The traditional outsourced workflow required more than four months for content creation and review, while the automated pipeline reduced the entire process to under one month.",
        },
        {
          ko: "콘텐츠 제작 속도 향상뿐 아니라 제작 비용 구조도 안정화되어 교육과정 변경에 빠르게 대응할 수 있는 제작 환경을 구축했습니다.",
          en: "Beyond accelerating production speed, the pipeline stabilized content generation costs and enabled rapid adaptation to curriculum updates.",
        },
        {
          ko: "약 5,000개 이상의 문제를 자동 생성했으며, 외주 비용을 연간 1,000만 원 이상 절감했습니다.",
          en: "Automatically generated over 5,000 questions and reduced outsourcing costs by more than KRW 10 million per year.",
        },
        {
          ko: "이 파이프라인은 실제 서비스 운영 환경에 적용되어 콘텐츠 제작 효율을 높였고, 서비스는 Google Play 교육 카테고리 2위를 달성했습니다.",
          en: "The pipeline was deployed in the production workflow and contributed to the service reaching #2 in the Google Play Education category.",
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
        ko: "요청 입력부터 콘텐츠 생성, 검증, 저장까지 이어지는 파이프라인 구조",
        en: "Pipeline architecture from request intake to generation, validation, and persistence",
      },
    },
  ],
};

