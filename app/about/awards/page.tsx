import { readdir } from "node:fs/promises";
import { join } from "node:path";
import type { Metadata } from "next";
import AboutAwardsPage from "@/components/about/about-awards-page";
import type { AboutGalleryItem } from "@/data/about-detail";
import { awardItems } from "@/data/about-detail";

export const metadata: Metadata = {
  title: "Awards | Jaehyun Sin",
  description: "Awards organized as a text-first timeline with a separate supporting image archive.",
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

async function getAwardGalleryItems(): Promise<AboutGalleryItem[]> {
  const directory = join(process.cwd(), "public", "about", "awards");
  const files = await readdir(directory, { withFileTypes: true });

  return files
    .filter((file) => file.isFile())
    .map((file) => file.name)
    .filter((fileName) => {
      const extensionIndex = fileName.lastIndexOf(".");
      if (extensionIndex === -1) {
        return false;
      }

      return IMAGE_EXTENSIONS.has(fileName.slice(extensionIndex).toLowerCase());
    })
    .sort((left, right) => left.localeCompare(right, "ko"))
    .map((fileName) => ({
      src: `/about/awards/${encodeURIComponent(fileName)}`,
      alt: {
        ko: `수상 증빙 이미지 ${fileName}`,
        en: `Award supporting image ${fileName}`,
      },
    }));
}

export default async function AwardsPage() {
  const galleryItems = await getAwardGalleryItems();

  return (
    <AboutAwardsPage
      eyebrow={{ ko: "Recognition", en: "Recognition" }}
      title={{ ko: "수상 경력", en: "Awards" }}
      description={{ ko: "", en: "" }}
      backHref="/about"
      backLabel={{ ko: "About 허브로 돌아가기", en: "Back to about hub" }}
      items={awardItems}
      galleryItems={galleryItems}
    />
  );
}
