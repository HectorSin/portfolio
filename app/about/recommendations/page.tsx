import type { Metadata } from "next";
import AboutDetailPage from "@/components/about/about-detail-page";
import { recommendationItems } from "@/data/about-detail";

export const metadata: Metadata = {
  title: "Recommendations | Jaehyun Sin",
  description: "Full recommendation letters with preview images and issuer context.",
};

export default function RecommendationsPage() {
  return (
    <AboutDetailPage
      eyebrow={{ ko: "Recommendations", en: "Recommendations" }}
      title={{ ko: "추천서", en: "Recommendations" }}
      description={{
        ko: "함께 연구하고 협업한 교수님들이 평가한 업무 태도와 성장 가능성을 담았습니다.",
        en: "Letters from professors I researched and collaborated with, covering my work ethic and growth potential.",
      }}
      backHref="/about"
      backLabel={{ ko: "About 허브로 돌아가기", en: "Back to about hub" }}
      items={recommendationItems}
    />
  );
}
