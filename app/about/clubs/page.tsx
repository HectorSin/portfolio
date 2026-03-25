import type { Metadata } from "next";
import AboutActivitiesPage from "@/components/about/about-activities-page";
import { archiveSections } from "@/data/about-detail";

export const metadata: Metadata = {
  title: "Clubs & Communities | Jaehyun Sin",
  description: "Club leadership, community building, and personal communities collected in one timeline.",
};

export default function ClubsPage() {
  const section = archiveSections.clubs;

  return (
    <AboutActivitiesPage
      eyebrow={section.eyebrow}
      title={section.title}
      description={section.description}
      backHref="/about"
      backLabel={{ ko: "About 허브로 돌아가기", en: "Back to about hub" }}
      items={section.items}
    />
  );
}
