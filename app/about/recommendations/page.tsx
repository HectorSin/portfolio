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
        ko: "추천서 전문을 바로 열람할 수 있도록 공개했고, 각 추천서의 발급 주체와 맥락도 함께 확인할 수 있게 구성했습니다.",
        en: "The full recommendation letters are now available directly, with issuer context and supporting summaries presented alongside them.",
      }}
      backHref="/about"
      backLabel={{ ko: "About 허브로 돌아가기", en: "Back to about hub" }}
      items={recommendationItems}
    />
  );
}
