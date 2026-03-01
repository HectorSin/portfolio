import { projects } from "@/data/projects";

function toEnglishTitle(index: number): string {
  const title = projects[index]?.title;
  if (!title) {
    return `project-${index}`;
  }
  return typeof title === "string" ? title : title.en;
}

function slugify(value: string): string {
  const normalized = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return normalized || "project";
}

export function getAllProjectAnchorIds(): string[] {
  const counts = new Map<string, number>();

  return projects.map((_, index) => {
    const base = `project-${slugify(toEnglishTitle(index))}`;
    const next = (counts.get(base) ?? 0) + 1;
    counts.set(base, next);
    return next === 1 ? base : `${base}-${next}`;
  });
}

export function getProjectAnchorIdByIndex(index: number): string {
  const ids = getAllProjectAnchorIds();
  return ids[index] ?? `project-${index}`;
}

export function getTechProjectAnchorMap(): Record<string, string> {
  const ids = getAllProjectAnchorIds();
  const map: Record<string, string> = {};

  projects.forEach((project, index) => {
    project.tech.forEach((tech) => {
      if (!(tech in map)) {
        map[tech] = ids[index];
      }
    });
  });

  return map;
}
