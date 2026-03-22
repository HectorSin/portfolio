import type { Metadata } from "next";
import AboutDetailPage from "@/components/about/about-detail-page";
import { awardItems } from "@/data/about-detail";

export const metadata: Metadata = {
  title: "Awards | Jaehyun Sin",
  description: "Awards, recognitions, and supporting material previews.",
};

export default function AwardsPage() {
  return (
    <AboutDetailPage
      eyebrow={{ ko: "Recognition", en: "Recognition" }}
      title={{ ko: "수상 경력", en: "Awards" }}
      description={{
        ko: "대회, 프로그램, 인턴십 등에서의 성과를 카드 형태로 정리하고, 이후 실제 증빙 이미지나 사진을 연결할 수 있도록 준비했습니다.",
        en: "A structured awards page for recognitions across competitions, programs, and internships, with room for future supporting assets.",
      }}
      backHref="/about"
      backLabel={{ ko: "About 허브로 돌아가기", en: "Back to about hub" }}
      items={awardItems}
      itemType="award"
    />
  );
}
