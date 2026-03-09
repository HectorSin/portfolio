import { projects, type Project, type ProjectDetail } from "@/data/projects";

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function hasProjectDetail(project: Project): project is Project & { detail: ProjectDetail } {
  return Boolean(project.detail);
}

export function validateProjectCatalog(catalog: Project[]): void {
  const idSet = new Set<string>();
  const slugSet = new Set<string>();

  for (const project of catalog) {
    if (idSet.has(project.id)) {
      throw new Error(`Duplicate project id detected: ${project.id}`);
    }
    idSet.add(project.id);

    if (slugSet.has(project.slug)) {
      throw new Error(`Duplicate project slug detected: ${project.slug}`);
    }
    slugSet.add(project.slug);

    if (project.detail) {
      if (!project.detail.overview.en || !project.detail.overview.ko) {
        throw new Error(`Project detail overview is incomplete: ${project.slug}`);
      }

      for (const section of project.detail.sections) {
        if (!section.key) {
          throw new Error(`Project detail section key is missing: ${project.slug}`);
        }
        if (!section.title.en || !section.title.ko) {
          throw new Error(`Project detail section title is incomplete: ${project.slug} (${section.key})`);
        }
        if (section.paragraphs.length === 0) {
          throw new Error(`Project detail section has no paragraphs: ${project.slug} (${section.key})`);
        }
        section.paragraphs.forEach((paragraph, paragraphIndex) => {
          if (!paragraph.en || !paragraph.ko) {
            throw new Error(
              `Project detail paragraph is incomplete: ${project.slug} (${section.key}, paragraph ${paragraphIndex + 1})`
            );
          }
        });
      }

      project.detail.umlImages?.forEach((image, imageIndex) => {
        if (!image.src) {
          throw new Error(`Project UML image src is missing: ${project.slug} (#${imageIndex + 1})`);
        }
        if (!image.alt.en || !image.alt.ko) {
          throw new Error(`Project UML image alt text is incomplete: ${project.slug} (#${imageIndex + 1})`);
        }
      });
    }
  }
}

validateProjectCatalog(projects);

