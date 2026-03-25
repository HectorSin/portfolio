import { readdir } from "node:fs/promises";
import { join } from "node:path";
import type { Metadata } from "next";
import AboutAwardsPage from "@/components/about/about-awards-page";
import type { AboutAwardItem, AboutGalleryItem } from "@/data/about-detail";

export const metadata: Metadata = {
  title: "Awards | Jaehyun Sin",
  description: "Awards organized as a text-first timeline with a separate supporting image archive.",
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const awardItems: AboutAwardItem[] = [
  {
    title: { ko: "포트폴리오 경진대회", en: "Portfolio Competition" },
    result: { ko: "우수상", en: "Excellence Award" },
    organizer: { ko: "주식회사 HR브라운", en: "HRBrown Co., Ltd." },
    date: "2026.01.29",
  },
  {
    title: { ko: "우수사원", en: "Outstanding Employee" },
    result: { ko: "우수사원", en: "Outstanding Employee" },
    organizer: { ko: "터빈크루 주식회사", en: "TurbineCrew Co., Ltd." },
    date: "2024.02.26",
  },
  {
    title: { ko: "총장추천장학 및 일반장학금 2회", en: "Principal's Recommendation Scholarship and General Scholarship (twice)" },
    result: { ko: "장학금 수혜", en: "Scholarship Recipient" },
    organizer: { ko: "아주대학교", en: "Ajou University" },
    date: "2018.12 ~ 2023.06",
  },
  {
    title: { ko: "경영대학 학술제", en: "College of Business Administration Academic Festival" },
    result: { ko: "금상 · 2위", en: "Gold Prize · 2nd Place" },
    organizer: { ko: "아주대학교", en: "Ajou University" },
    date: "2018.10.15",
  },
  {
    title: { ko: "영역별 토론대회", en: "Debate Competition by Category" },
    result: { ko: "최우수상 · 1위", en: "Grand Prize · 1st Place" },
    organizer: { ko: "대구외국어고등학교", en: "Daegu Foreign Language High School" },
    date: "2016.07.19",
  },
  {
    title: { ko: "대구외국어고등학교 모의 UN", en: "Daegu Foreign Language High School Model UN" },
    result: { ko: "은상 · 3위", en: "Silver Prize · 3rd Place" },
    organizer: { ko: "대구외국어고등학교", en: "Daegu Foreign Language High School" },
    date: "2016.01.12",
  },
  {
    title: { ko: "대구외국어고등학교 모의 UN", en: "Daegu Foreign Language High School Model UN" },
    result: { ko: "동상 · 4위", en: "Bronze Prize · 4th Place" },
    organizer: { ko: "대구외국어고등학교", en: "Daegu Foreign Language High School" },
    date: "2015.09.01",
  },
  {
    title: { ko: "STUDENT OF THE MONTH 수상", en: "Student of the Month" },
    result: { ko: "최우수상 · 1위", en: "Top Honor · 1st Place" },
    organizer: { ko: "Lincoln 국제학교", en: "Lincoln International School" },
    date: "2012.08.31",
  },
  {
    title: { ko: "국제 수학 경시대회", en: "International Math Competition" },
    result: { ko: "세계 상위 400위 이내", en: "Ranked within the Global Top 400" },
    organizer: { ko: "Purple Comet! Math Meet", en: "Purple Comet! Math Meet" },
    date: "2011.07.16",
  },
  {
    title: { ko: "교내 수학경시대회", en: "School Mathematics Competition" },
    result: { ko: "장려상", en: "Encouragement Award" },
    organizer: { ko: "대구대진초등학교", en: "Daegu Daejin Elementary School" },
    date: "2009.12.22",
  },
  {
    title: { ko: "교내 디자인대회, 제품디자인부", en: "School Design Competition, Product Design Division" },
    result: { ko: "우수상", en: "Excellence Award" },
    organizer: { ko: "대구대진초등학교", en: "Daegu Daejin Elementary School" },
    date: "2008.05.19",
  },
  {
    title: { ko: "교내 과학의 날 경진대회", en: "School Science Day Competition" },
    result: { ko: "은상", en: "Silver Prize" },
    organizer: { ko: "대구대진초등학교", en: "Daegu Daejin Elementary School" },
    date: "2008.04.21",
  },
  {
    title: { ko: "교내 독서토론 활동", en: "School Reading Discussion Activity" },
    result: { ko: "우수상", en: "Excellence Award" },
    organizer: { ko: "대구대진초등학교", en: "Daegu Daejin Elementary School" },
    date: "2007.12.29",
  },
  {
    title: { ko: "대진문예체험한마당 설치 입체조형", en: "Daejin Literary Festival, Installation 3D Design" },
    result: { ko: "장려상", en: "Encouragement Award" },
    organizer: { ko: "대구대진초등학교", en: "Daegu Daejin Elementary School" },
    date: "2007.10.22",
  },
  {
    title: { ko: "교내 과학의 날 경진대회", en: "School Science Day Competition" },
    result: { ko: "금상", en: "Gold Prize" },
    organizer: { ko: "대구대진초등학교", en: "Daegu Daejin Elementary School" },
    date: "2007.04.23",
  },
  {
    title: { ko: "대진독서체험한마당 표지 독서 감상화", en: "Daejin Reading Festival, Book Appreciation Painting" },
    result: { ko: "장려상", en: "Encouragement Award" },
    organizer: { ko: "대구대진초등학교", en: "Daegu Daejin Elementary School" },
    date: "2006.10.23",
  },
  {
    title: { ko: "교내 동시짓기 대회", en: "School Poetry Writing Contest" },
    result: { ko: "장려상", en: "Encouragement Award" },
    organizer: { ko: "대구대진초등학교", en: "Daegu Daejin Elementary School" },
    date: "2006.04.24",
  },
];

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
