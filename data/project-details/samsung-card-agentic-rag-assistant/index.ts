import type { ProjectDetail } from "@/data/project-detail-types";

export const samsungCardAgenticRagAssistantDetail: ProjectDetail = {
  overview: {
    ko: "삼성카드 임직원이 사내 상담 지식을 빠르고 신뢰성 있게 탐색할 수 있도록, 제한된 검색 인터페이스 위에 다중 검색어 생성·병렬 검색·RRF 융합을 적용한 Agentic RAG 어시스턴트를 구축했습니다.",
    en: "Built an Agentic RAG assistant for Samsung Card employees, layering multi-query generation, parallel retrieval, and RRF fusion over a constrained enterprise search interface.",
  },
  summary: {
    ko: "검색 시스템 자체를 직접 튜닝할 수 없는 제약을 애플리케이션 계층의 검색 전략으로 보완하고, 평가부터 배포·모니터링까지 이어지는 개선 루프를 구축했습니다.",
    en: "Compensated for an untunable search backend with application-level retrieval strategies and built a continuous improvement loop spanning evaluation, deployment, and monitoring.",
  },
  highlightMetrics: [
    {
      value: { ko: "핵심 역할", en: "Core role" },
      label: {
        ko: "내부 임직원용 챗봇의 설계·검색·평가·운영",
        en: "Design, retrieval, evaluation, and operations for the internal employee chatbot",
      },
    },
    {
      value: { ko: "7명", en: "7 people" },
      label: { ko: "고객사·협력 업체와 함께한 프로젝트 팀", en: "Cross-company project team" },
    },
    {
      value: { ko: "RRF", en: "RRF" },
      label: { ko: "병렬 검색 결과의 순위 기반 융합", en: "Rank-based fusion of parallel retrieval results" },
    },
    {
      value: { ko: "E2E", en: "E2E" },
      label: { ko: "평가·배포·모니터링 개선 루프", en: "Evaluation, deployment, and monitoring loop" },
    },
  ],
  sections: [
    {
      key: "context",
      title: { ko: "프로젝트 배경과 역할", en: "Context and Role" },
      paragraphs: [
        {
          ko: "제논 소속으로 삼성카드 AI 플랫폼 구축 프로젝트에 참여해, 플랫폼 내 여러 챗봇 중 삼성카드 임직원의 상담 업무를 지원하는 사내 전용 챗봇을 담당했습니다. 7명 팀에서 선임의 지속적인 설계 검토와 피드백을 받으며 담당 영역의 개발을 주도했습니다.",
          en: "As a GenON engineer on the Samsung Card AI Platform project, I was responsible for an internal employee assistant within the platform's broader chatbot portfolio. I led development within my assigned scope as part of a seven-person team, with continuous senior design review and feedback.",
        },
        {
          ko: "담당 범위는 프롬프트와 대화 흐름 설계, 검색어 증강, 병렬 검색과 RRF 융합, LLM-as-a-Judge 평가 자동화, 현업 피드백 반영, 운영 배포와 모니터링까지였습니다.",
          en: "My scope covered prompt and conversation design, query expansion, parallel retrieval and RRF fusion, automated LLM-as-a-Judge evaluation, employee feedback integration, production deployment, and monitoring.",
        },
      ],
    },
    {
      key: "retrieval-constraints",
      title: { ko: "검색 시스템의 제약", en: "Retrieval Constraints" },
      paragraphs: [
        {
          ko: "문서 적재와 파싱·임베딩·청크 검색을 서로 다른 협력 업체가 담당하는 구조였습니다. 어시스턴트가 검색 시스템에 전달할 수 있는 값은 검색어와 일부 청크 관련 설정으로 제한돼, 특정 키워드 부스팅이나 검색엔진 내부 리랭킹처럼 일반적인 검색 품질 개선 방식을 직접 적용하기 어려웠습니다.",
          en: "Document ingestion and parsing, embedding, and chunk retrieval were owned by separate partner systems. The assistant could control only the search query and limited chunk-related settings, making techniques such as keyword boosting or search-engine-level reranking unavailable.",
        },
        {
          ko: "이 제약을 외부 시스템 변경 요청에만 의존하지 않고, 어시스턴트가 제어할 수 있는 애플리케이션 계층에서 보완하는 것을 핵심 문제로 정의했습니다.",
          en: "The central challenge was therefore to improve retrieval within the application layer the assistant could control, without depending solely on changes to external systems.",
        },
      ],
    },
    {
      key: "retrieval-strategy",
      title: { ko: "다중 검색어와 RRF 기반 검색 전략", en: "Multi-query and RRF Retrieval Strategy" },
      paragraphs: [
        {
          ko: "사용자 질문을 분석해 관점이 다른 복수의 검색어를 생성하고 각 검색을 병렬로 실행했습니다. 이후 개별 검색 결과의 점수 체계가 달라도 안정적으로 결합할 수 있도록 Reciprocal Rank Fusion(RRF)을 적용해 상위 근거 문서를 선별했습니다.",
          en: "The assistant analyzes each question, generates multiple queries from different perspectives, and runs them in parallel. Reciprocal Rank Fusion (RRF) then combines the ranked lists without assuming comparable raw scores and selects the strongest evidence for answer generation.",
        },
        {
          ko: "이 방식은 단일 검색어가 놓칠 수 있는 표현 차이와 상담 용어를 보완했습니다. 동시에 검색 결과 증가가 곧 품질 향상을 의미하지는 않으므로, 근거의 양과 후속 처리 비용을 함께 관리하도록 흐름을 설계했습니다.",
          en: "This approach improved coverage for terminology and phrasing that a single query could miss. Because more retrieved documents do not automatically produce better answers, the workflow also controls evidence volume and downstream processing cost.",
        },
      ],
    },
    {
      key: "bottlenecks",
      title: { ko: "검색 확장으로 발생한 병목 대응", en: "Managing Retrieval-induced Bottlenecks" },
      paragraphs: [
        {
          ko: "병렬 검색을 도입하자 더 많은 문서가 유입되면서 입력 토큰 한도를 초과하거나, 로그 비식별화 시스템의 처리 부하가 증가해 응답 경로에 병목이 생기는 새로운 문제가 나타났습니다. 검색 재현율뿐 아니라 전체 요청 경로의 지연과 안정성을 함께 관찰하며 근거 수와 처리 흐름을 조정했습니다.",
          en: "Parallel retrieval introduced new operational costs: larger evidence sets could exceed input token limits, while additional traffic increased load on the log-de-identification system and created latency bottlenecks. I tuned evidence volume and request flow while monitoring end-to-end latency and reliability, not retrieval coverage alone.",
        },
        {
          ko: "평균 응답 시간과 TTFT를 함께 추적해 어느 구간에서 사용자 체감 지연이 발생하는지 확인하고, 운영 로그와 모니터링 결과를 다음 개선 실험으로 연결했습니다.",
          en: "Average response time and time to first token (TTFT) were tracked together to locate user-visible delays, with operational logs and monitoring results feeding the next improvement cycle.",
        },
      ],
    },
    {
      key: "oversized-html",
      title: { ko: "26만 토큰 초과 HTML 문서 처리", en: "Handling HTML Documents Over 260K Tokens" },
      paragraphs: [
        {
          ko: "일부 근거 문서는 반복적인 색상·글자 크기 스타일 값 때문에 내용에 비해 HTML이 비정상적으로 커져 약 26만 토큰을 초과했습니다. 원문 HTML을 그대로 모델에 전달하는 대신, 상담 답변에 필요한 텍스트 구조를 보존하면서 Markdown으로 정규화해 입력 크기를 줄였습니다.",
          en: "Some evidence documents exceeded roughly 260K tokens because repetitive color and font-size styling made the HTML disproportionately large. Instead of sending the raw HTML to the model, I normalized it into Markdown while preserving the textual structure needed for consultation answers.",
        },
        {
          ko: "변환 과정에서는 색상이나 글자 크기처럼 시각적 의미를 가진 정보가 제외될 수 있어, 상담 답변에 필요한 제목·문단·목록과 본문 텍스트를 우선 보존했습니다. 이 방식으로 입력 크기를 줄여 토큰 한도 초과 문제를 처리했습니다.",
          en: "Because normalization can omit visual semantics such as color and font size, the transformation prioritized headings, paragraphs, lists, and body text needed for consultation answers. This reduced input size and addressed the token-limit failure.",
        },
      ],
    },
    {
      key: "evaluation-operations",
      title: { ko: "평가 자동화와 운영 개선 루프", en: "Automated Evaluation and Operations Loop" },
      paragraphs: [
        {
          ko: "검색 전략과 프롬프트 변경을 동일한 기준으로 비교할 수 있도록 LLM-as-a-Judge 기반 평가 흐름을 자동화했습니다. 평균 응답 시간과 TTFT도 함께 측정해 답변 품질만 높고 사용성이 떨어지는 변경을 구분했습니다.",
          en: "I automated an LLM-as-a-Judge workflow so retrieval and prompt changes could be compared under consistent criteria. Average response time and TTFT were evaluated alongside answer quality to identify changes that improved scores at the expense of usability.",
        },
        {
          ko: "평가 결과뿐 아니라 삼성카드 임직원의 현업 피드백, 운영 모니터링, 배포 후 발견된 예외를 다음 실험에 반영했습니다. 이를 통해 개발 환경의 단발성 성능이 아니라 실제 업무 환경에서 지속적으로 개선 가능한 체계를 만드는 데 집중했습니다.",
          en: "Evaluation results were combined with employee feedback, production monitoring, and post-deployment edge cases. The goal was not a one-off benchmark gain, but a system that could continue improving in real consultation workflows.",
        },
      ],
    },
  ],
  qna: [
    {
      question: { ko: "왜 일반적인 리랭커 대신 RRF를 사용했나요?", en: "Why use RRF instead of a conventional reranker?" },
      answer: {
        ko: "검색 시스템 내부의 키워드 부스팅이나 리랭킹 모델을 직접 제어할 수 없었습니다. RRF는 서로 다른 검색 결과의 원점수를 직접 비교하지 않고 순위를 기준으로 결합할 수 있어, 제한된 인터페이스에서도 적용 가능한 현실적인 선택이었습니다.",
        en: "The search backend did not expose keyword boosting or reranking controls. RRF combines result lists by rank rather than requiring directly comparable raw scores, making it practical within the interface available to the assistant.",
      },
    },
    {
      question: { ko: "병렬 검색의 가장 큰 트레이드오프는 무엇이었나요?", en: "What was the main tradeoff of parallel retrieval?" },
      answer: {
        ko: "검색 범위는 넓어졌지만 근거 문서와 후속 요청이 증가했습니다. 그 결과 토큰 한도 초과와 비식별화 처리 병목이 발생할 수 있어, 검색 품질·근거량·TTFT를 함께 관리해야 했습니다.",
        en: "It increased retrieval coverage but also expanded evidence volume and downstream traffic. That created risks around token limits and de-identification latency, so retrieval quality, evidence size, and TTFT had to be balanced together.",
      },
    },
    {
      question: { ko: "HTML을 Markdown으로 바꾸면서 정보가 손실되지 않았나요?", en: "Did converting HTML to Markdown lose useful information?" },
      answer: {
        ko: "색상과 글자 크기 같은 시각 정보는 변환 대상에서 제외될 수 있습니다. 대신 상담 답변에 필요한 제목·문단·목록과 본문 텍스트를 우선 보존하고, 입력 크기를 줄여 토큰 한도 초과를 방지했습니다.",
        en: "Visual information such as color and font size may be omitted during conversion. The transformation instead prioritizes headings, paragraphs, lists, and answer-relevant text while reducing input size to avoid token-limit failures.",
      },
    },
  ],
  umlImages: [
    {
      src: "/projects/samsung-card-agentic-rag-assistant/uml-system-architecture.svg",
      alt: {
        ko: "삼성카드 임직원용 Agentic RAG 어시스턴트의 일반화된 아키텍처",
        en: "Generalized architecture of the Samsung Card employee Agentic RAG assistant",
      },
      caption: {
        ko: "기밀 시스템명과 내부 인프라 정보를 제외하고, 공개 가능한 수준으로 일반화한 검색·평가·운영 흐름입니다.",
        en: "A public-safe view of the retrieval, evaluation, and operations flow with confidential system and infrastructure details removed.",
      },
    },
  ],
};
