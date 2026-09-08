import type { Metadata } from "next";
import AboutActivitiesPage from "@/components/about/about-activities-page";
import { activityItems } from "@/data/about-detail";

export const metadata: Metadata = {
  title: "Activities | Jaehyun Sin",
  description: "Campus and external activities organized as a compact timeline.",
};

export default function ActivitiesPage() {
  return (
    <AboutActivitiesPage
      eyebrow={{ ko: "활동 기록", en: "Activity archive" }}
      title={{ ko: "교내·외 활동", en: "Campus & External Activities" }}
      description={{
        ko: "프로그램, 해커톤, 그룹 스터디에서 쌓은 학습과 실행 경험입니다.",
        en: "Learning and execution experience from programs, hackathons, and group studies.",
      }}
      backHref="/about"
      backLabel={{ ko: "About 허브로 돌아가기", en: "Back to about hub" }}
      items={activityItems}
    />
  );
}
