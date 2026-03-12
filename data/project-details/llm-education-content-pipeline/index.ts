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

  qna: [
    {
      question: {
        ko: "전체 파이프라인은 어떤 구조로 동작했나요?",
        en: "How did the overall pipeline work end to end?",
      },
      answer: {
        ko: "콘텐츠 생성 요청이 들어오면 먼저 데이터베이스와 서버에서 교과서, 문제집, 개념서, 기존 콘텐츠 등 관련 참고 자료를 수집합니다. 이후 PDF와 문서를 바로 LLM에 넣지 않고, 문서 레이아웃 분석과 텍스트 추출 과정을 거쳐 LLM이 읽기 쉬운 형태로 전처리했습니다. 그 다음 정제된 데이터를 chunk 단위로 분할하고 retrieval 가능한 구조로 구성한 뒤, 각 콘텐츠 유형에 맞는 프롬프트와 참조 데이터를 함께 사용해 생성 파이프라인을 실행했습니다. 생성 결과는 자동 검증과 휴먼 검수를 함께 거쳐 최종 반영되도록 설계했습니다.",
        en: "When a content generation request came in, the pipeline first collected relevant reference materials such as textbooks, workbooks, concept books, and existing content from the database and servers. Instead of sending raw PDFs and documents directly into the LLM, it ran document layout analysis and text extraction first so the inputs were easier for the model to read. The cleaned data was then split into chunks, organized into a retrieval-ready structure, and passed into generation flows with prompts and reference data tailored to each content type. Final outputs were designed to go through both automated validation and human review before release.",
      },
    },
    {
      question: {
        ko: "왜 RAG 방식을 사용했나요?",
        en: "Why did you use a RAG-based approach?",
      },
      answer: {
        ko: "교육 콘텐츠는 창의성보다 정확성과 기준 일치가 더 중요했기 때문입니다. 기존 자료와 평가 기준이 이미 존재하는 상황에서, 모든 컨텍스트를 한 번에 넣는 방식은 오히려 출력 품질을 불안정하게 만들었습니다. 그래서 필요한 자료만 검색해 주입하는 RAG 구조를 적용했고, 이를 통해 hallucination을 줄이고 교육과정 기준에 맞는 일관된 출력을 유도했습니다.",
        en: "Because educational content depends more on accuracy and standards alignment than on open-ended creativity. Since the source materials and evaluation criteria already existed, trying to inject all context at once actually made output quality less stable. A RAG structure let the system retrieve only the relevant references, which reduced hallucinations and produced more consistent outputs aligned with the curriculum.",
      },
    },
    {
      question: {
        ko: "왜 여러 LLM을 함께 사용했나요?",
        en: "Why did you use multiple LLMs together?",
      },
      answer: {
        ko: "모델마다 강점이 다르다고 판단했기 때문입니다. 긴 문맥을 바탕으로 자연스러운 설명을 만드는 데 강한 모델이 있었고, 수학적 로직이나 계산 문제 생성에 더 적합한 모델도 있었습니다. 또 어떤 모델은 문장을 더 사람답고 부드럽게 다듬는 데 장점이 있었습니다. 그래서 하나의 모델만 고정적으로 쓰기보다, 콘텐츠 유형과 작업 성격에 따라 모델을 다르게 활용해 전체 품질을 높였습니다.",
        en: "Because different models had different strengths. Some were better at producing natural explanations over long contexts, others were better suited for math logic or calculation-based question generation, and some were stronger at polishing phrasing so it sounded more natural. Instead of locking the system to one model, the pipeline selected models based on content type and task characteristics to improve overall quality.",
      },
    },
    {
      question: {
        ko: "PDF를 바로 LLM에 넣지 않고 별도 전처리를 한 이유는 무엇인가요?",
        en: "Why didn’t you feed PDFs directly into the LLM?",
      },
      answer: {
        ko: "실제 문서에는 표, 단 분리, 제목 구조, 번호 체계처럼 텍스트 외의 레이아웃 정보가 많이 포함되어 있습니다. 이런 문서를 그대로 넣으면 LLM이 문맥을 잘못 읽거나 필요한 정보를 놓치는 경우가 생겼습니다. 그래서 문서 레이아웃을 먼저 인식하고, 그 구조 안에서 필요한 텍스트를 추출해 정제한 뒤 LLM 입력으로 사용했습니다. 이 전처리 단계가 전체 생성 품질에 꽤 큰 영향을 주었습니다.",
        en: "Real documents contain a lot of layout information beyond plain text, such as tables, multi-column structure, headings, and numbering systems. If those files are passed through as-is, the LLM can misread the context or miss important details. The pipeline first analyzed document layout, extracted the necessary text within that structure, and cleaned it before using it as model input. That preprocessing step had a significant impact on generation quality.",
      },
    },
    {
      question: {
        ko: "생성된 콘텐츠의 품질은 어떻게 검증했나요?",
        en: "How did you validate the quality of generated content?",
      },
      answer: {
        ko: "품질 검증은 세 단계로 운영했습니다. 먼저 LLM self-critique 방식으로 형식이나 내용의 이상 여부를 자동 점검했고, 그 다음 알고리즘 기반 evaluation metric으로 구조적 오류를 탐지했습니다. 마지막으로 실제 운영에서는 콘텐츠팀이 휴먼 인 더 루프 형태로 결과를 확인했습니다. 여러 방법을 함께 사용했지만, 실제로는 알고리즘 기반 검증이 가장 안정적으로 동작했습니다.",
        en: "Quality validation was run in three stages. First, the system used LLM self-critique to automatically check for issues in structure or content. Next, it used algorithm-based evaluation metrics to detect structural errors. Finally, in production, the content team reviewed outputs in a human-in-the-loop process. Multiple methods were used together, but in practice the algorithm-based validation turned out to be the most stable.",
      },
    },
    {
      question: {
        ko: "API 호출량이나 비용 문제는 어떻게 관리했나요?",
        en: "How did you manage API usage and cost?",
      },
      answer: {
        ko: "가장 중요한 원칙은 필요한 데이터만 넣는 것이었습니다. 참고 자료가 많다고 해서 모두 넣기보다, retrieval을 통해 관련성이 높은 데이터만 선택해 입력했습니다. 또 반복적으로 재사용되는 결과는 캐싱했고, 생성 작업은 batch 단위로 나누어 처리했습니다. 이렇게 해서 비용을 줄이는 동시에 rate limit 문제도 완화할 수 있었습니다.",
        en: "The main principle was to send only the data that was actually needed. Instead of including every available reference, the system used retrieval to select only the most relevant materials. It also cached repeatedly reused results and processed generation jobs in batches. That reduced cost while also easing rate-limit pressure.",
      },
    },
    {
      question: {
        ko: "장애가 발생했을 때는 어떻게 대응했나요?",
        en: "How did you handle failures in the pipeline?",
      },
      answer: {
        ko: "전체 파이프라인을 무조건 다시 실행하는 구조는 비효율적이기 때문에, 각 생성 단계와 결과물 단위로 로그를 남기고 실패 지점을 추적할 수 있게 했습니다. 예를 들어 여러 콘텐츠 유형 중 하나만 실패한 경우에는 전체를 재실행하지 않고, 해당 데이터만 제거하거나 다시 생성하는 방식으로 대응했습니다. 또 외부 LLM API 상태가 불안정할 때는 즉시 재시도하기보다 대기 시간을 두고 재처리하도록 설계했습니다.",
        en: "Re-running the entire pipeline for every issue would have been inefficient, so the system logged each generation stage and output unit in a way that made failure points traceable. For example, if only one content type failed, the team could remove or regenerate only that part instead of re-running everything. When external LLM APIs were unstable, the pipeline also used delayed reprocessing instead of immediate retries.",
      },
    },
    {
      question: {
        ko: "왜 Airflow 대신 n8n(또는 경량 자동화 구조)을 선택했나요?",
        en: "Why did you choose n8n or a lightweight automation flow instead of Airflow?",
      },
      answer: {
        ko: "이 프로젝트의 핵심은 대규모 데이터 파이프라인 그 자체보다, 비개발자도 운영 가능한 콘텐츠 생성 구조를 만드는 것이었습니다. Airflow는 강력하지만 상대적으로 무겁고, 이 프로젝트 규모에서는 운영 비용이 더 커질 수 있다고 판단했습니다. 반면 n8n 기반 구조는 콘텐츠팀이 흐름을 이해하고 제어하기 더 쉬웠고, 반복 작업을 빠르게 조정하는 데 유리했습니다. 즉, 기술적으로 가장 무거운 도구보다 실제 운영 조직에 맞는 도구를 선택한 것입니다.",
        en: "The core goal of this project was not to build the heaviest possible data pipeline, but to create a content-generation workflow that non-developers could actually operate. Airflow is powerful, but it is also relatively heavy, and at this project scale it would likely have increased operational cost. An n8n-based flow was easier for the content team to understand and control, and it made repetitive workflow adjustments faster. In short, the choice prioritized fit with the operating team over using the biggest orchestration tool.",
      },
    },
    {
      question: {
        ko: "이 프로젝트를 다시 만든다면 무엇을 더 개선하고 싶나요?",
        en: "If you rebuilt this project, what would you improve further?",
      },
      answer: {
        ko: "현재 구조는 생성과 검증을 안정적으로 자동화하는 데 초점이 맞춰져 있었기 때문에, 앞으로는 품질 평가 체계를 더 정량화하고 싶습니다. 예를 들어 콘텐츠 유형별 평가 지표를 더 세분화하고, 모델 선택이나 프롬프트 전략도 실험 결과에 따라 자동으로 조정되는 구조로 발전시킬 수 있습니다. 또 API 장애나 품질 저하를 더 빠르게 감지할 수 있도록 모니터링 체계도 강화하고 싶습니다.",
        en: "The current system was focused on making generation and validation reliably automated, so the next improvement would be to make quality evaluation more quantitative. For example, evaluation metrics could be refined by content type, and model selection or prompt strategy could evolve into a system that adjusts automatically based on experiment results. I would also strengthen monitoring so API failures or quality degradation could be detected more quickly.",
      },
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

