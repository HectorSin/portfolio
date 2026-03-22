import type { Metadata } from "next";
import AboutHubPage from "@/components/about/about-hub-page";

export const metadata: Metadata = {
  title: "About | Jaehyun Sin",
  description: "Detailed profile hub with recommendations, awards, activities, and personal highlights.",
  openGraph: {
    title: "About | Jaehyun Sin",
    description: "Detailed profile hub with recommendations, awards, activities, and personal highlights.",
  },
};

export default function AboutPage() {
  return <AboutHubPage />;
}
