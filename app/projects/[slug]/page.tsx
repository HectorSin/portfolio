import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailPage from "@/components/main/project-detail-page";
import { getAllProjects, getProjectBySlug, hasProjectDetail } from "@/lib/projects";

function toEnglish(value: string | { en: string; ko: string }): string {
  return typeof value === "string" ? value : value.en;
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjects()
    .filter((project) => hasProjectDetail(project))
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !hasProjectDetail(project)) {
    return {
      title: "Project Detail",
      description: "Project detail page",
    };
  }

  const title = toEnglish(project.title);
  const description = toEnglish(project.description);

  return {
    title: `${title} | Project Detail`,
    description,
    openGraph: {
      title: `${title} | Project Detail`,
      description,
    },
  };
}

export default async function ProjectDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !hasProjectDetail(project)) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}

