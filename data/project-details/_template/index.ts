import type { ProjectDetail } from "@/data/project-detail-types";

export const templateProjectDetail: ProjectDetail = {
  overview: {
    ko: "프로젝트 한 줄 요약",
    en: "One-line project summary",
  },
  sections: [
    {
      key: "problem",
      title: { ko: "문제 정의", en: "Problem Statement" },
      paragraphs: [
        {
          ko: "해결하려는 문제와 배경을 작성하세요.",
          en: "Describe the problem and background.",
        },
      ],
    },
    {
      key: "solution",
      title: { ko: "해결 방식", en: "Solution" },
      paragraphs: [
        {
          ko: "아키텍처, 구현 방식, 핵심 의사결정을 작성하세요.",
          en: "Describe architecture, implementation, and key decisions.",
        },
      ],
    },
    {
      key: "impact",
      title: { ko: "성과", en: "Impact" },
      paragraphs: [
        {
          ko: "지표, 결과, 배운 점을 작성하세요.",
          en: "Describe metrics, outcomes, and lessons learned.",
        },
      ],
    },
  ],
  umlImages: [
    {
      src: "/projects/your-project-slug/uml-overview.svg",
      alt: { ko: "UML 다이어그램", en: "UML diagram" },
      caption: { ko: "다이어그램 설명", en: "Diagram description" },
    },
  ],
};
