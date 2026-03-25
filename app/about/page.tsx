import { readdir } from "node:fs/promises";
import { join } from "node:path";
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

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

async function getAwardPreviewImageSrc() {
  const directory = join(process.cwd(), "public", "about", "awards");
  const files = await readdir(directory, { withFileTypes: true });

  const previewFile = files
    .filter((file) => file.isFile())
    .map((file) => file.name)
    .filter((fileName) => {
      const extensionIndex = fileName.lastIndexOf(".");
      if (extensionIndex === -1) {
        return false;
      }

      return IMAGE_EXTENSIONS.has(fileName.slice(extensionIndex).toLowerCase());
    })
    .sort((left, right) => left.localeCompare(right, "ko"))[0];

  return previewFile ? `/about/awards/${encodeURIComponent(previewFile)}` : undefined;
}

export default async function AboutPage() {
  const awardPreviewImageSrc = await getAwardPreviewImageSrc();

  return <AboutHubPage awardPreviewImageSrc={awardPreviewImageSrc} />;
}
