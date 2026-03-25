import type { Metadata } from "next";
import AboutActivitiesPage from "@/components/about/about-activities-page";
import { archiveSections } from "@/data/about-detail";

export const metadata: Metadata = {
  title: "Volunteer Work | Jaehyun Sin",
  description: "Volunteer experiences centered on care, interpretation, and practical support.",
};

export default function VolunteerPage() {
  const section = archiveSections.volunteer;

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
