import type { Metadata } from "next";
import AboutDetailPage from "@/components/about/about-detail-page";
import { recommendationItems } from "@/data/about-detail";

export const metadata: Metadata = {
  title: "Recommendations | Jaehyun Sin",
  description: "Recommendation previews and collaboration summaries.",
};

export default function RecommendationsPage() {
  return (
    <AboutDetailPage
      eyebrow={{ ko: "Recommendations", en: "Recommendations" }}
      title={{ ko: "추천서 원본 및 요약", en: "Recommendations" }}
      description={{
        ko: "실제 추천서 전문을 바로 공개하기보다, 먼저 협업 맥락과 핵심 내용을 요약해 볼 수 있도록 구성했습니다.",
        en: "This page focuses on context and concise takeaways first, while leaving room to connect full recommendation originals later.",
      }}
      backHref="/about"
      backLabel={{ ko: "About 허브로 돌아가기", en: "Back to about hub" }}
      items={recommendationItems}
      itemType="recommendation"
    />
  );
}
