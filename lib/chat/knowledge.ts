import { projects } from "@/data/projects";
import { contactLinks, projectLinks } from "@/data/links";
import { techDocs } from "@/data/tech-docs";
import { profileData } from "@/data/profile";

export interface KnowledgeSnippet {
  id: string;
  title: string;
  content: string;
  tags: string[];
  source: string;
}

function toEnglish(value: string | { en: string; ko: string } | undefined): string {
  if (!value) {
    return "";
  }
  return typeof value === "string" ? value : value.en;
}

function toEnglishArray(value: string[] | { en: string[]; ko: string[] } | undefined): string[] {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : value.en;
}

const profileSnippet: KnowledgeSnippet = {
  id: "profile",
  title: "Candidate Profile",
  source: "data/profile.ts",
  tags: ["profile", "education", "language", "target-role", "bio"],
  content: [
    `Name: ${profileData.name}`,
    `Role: ${profileData.role.en}`,
    `Education: ${profileData.education
      .map((entry) => `${entry.school.en}, ${entry.degree.en}, ${entry.graduation.en}`)
      .join(" / ")}`,
    `Languages: ${profileData.languages
      .map((entry) => `${entry.name.en} (${entry.level.en})`)
      .join(", ")}`,
    `Currently seeking: ${profileData.currentlySeeking.en}.`,
    `Focus: ${profileData.focus.en}.`,
  ].join(" "),
};

const contactSnippet: KnowledgeSnippet = {
  id: "contact",
  title: "Contact Information",
  source: "contact section",
  tags: ["contact", "email", "github", "linkedin", "location"],
  content: [
    `Email: ${contactLinks.email.replace("mailto:", "")}`,
    `LinkedIn: ${contactLinks.linkedin}`,
    `GitHub: ${contactLinks.github}`,
    "Location: South Korea (open to remote opportunities).",
  ].join(" "),
};

const projectSnippets: KnowledgeSnippet[] = projects.map((project, index) => {
  const title = toEnglish(project.title);
  const company = toEnglish(project.company);
  const team = toEnglish(project.team);
  const description = toEnglish(project.description);
  const achievements = toEnglishArray(project.achievements).join(" ");
  const tech = project.tech.join(", ");
  const links = (project.links ?? [])
    .map((link) => `${link.label}: ${link.url}`)
    .join(" | ");

  return {
    id: `project-${index + 1}`,
    title: `Project: ${title}`,
    source: "data/projects.ts",
    tags: [title, company, ...project.tech].map((value) => value.toLowerCase()),
    content: [
      `Title: ${title}`,
      `Period: ${project.period}`,
      `Company: ${company}`,
      `Team: ${team}`,
      `Description: ${description}`,
      `Achievements: ${achievements}`,
      `Tech: ${tech}`,
      links ? `Links: ${links}` : "",
    ]
      .filter(Boolean)
      .join(" "),
  };
});

const linksSnippet: KnowledgeSnippet = {
  id: "links",
  title: "External References",
  source: "data/links.ts",
  tags: ["external", "references", "links"],
  content: Object.entries(projectLinks)
    .map(([name, url]) => `${name}: ${url}`)
    .join(" "),
};

const techDocsSnippet: KnowledgeSnippet = {
  id: "tech-docs",
  title: "Technology Documentation Links",
  source: "data/tech-docs.ts",
  tags: ["tech", "docs", "references"],
  content: Object.entries(techDocs)
    .map(([name, url]) => `${name}: ${url}`)
    .join(" "),
};

export const knowledgeBase: KnowledgeSnippet[] = [
  profileSnippet,
  contactSnippet,
  ...projectSnippets,
  linksSnippet,
  techDocsSnippet,
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

function scoreSnippet(queryTokens: string[], snippet: KnowledgeSnippet): number {
  const haystack = `${snippet.title} ${snippet.content} ${snippet.tags.join(" ")}`.toLowerCase();
  let score = 0;

  for (const token of queryTokens) {
    if (snippet.tags.some((tag) => tag.includes(token))) {
      score += 4;
      continue;
    }
    if (snippet.title.toLowerCase().includes(token)) {
      score += 3;
      continue;
    }
    if (haystack.includes(token)) {
      score += 1;
    }
  }

  return score;
}

export function getRelevantKnowledge(query: string, limit = 4): KnowledgeSnippet[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    return knowledgeBase.slice(0, limit);
  }

  const ranked = knowledgeBase
    .map((snippet) => ({ snippet, score: scoreSnippet(queryTokens, snippet) }))
    .sort((a, b) => b.score - a.score);

  const relevant = ranked.filter((entry) => entry.score > 0).map((entry) => entry.snippet);
  if (relevant.length >= limit) {
    return relevant.slice(0, limit);
  }

  return [...relevant, ...knowledgeBase].slice(0, limit);
}

export function buildKnowledgeContext(query: string, limit = 4): string {
  const snippets = getRelevantKnowledge(query, limit);
  return snippets
    .map((snippet, index) => `${index + 1}. [${snippet.title}] ${snippet.content}`)
    .join("\n");
}
