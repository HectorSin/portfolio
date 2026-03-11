export interface LocalizedText {
  en: string;
  ko: string;
}

export interface LocalizedList {
  en: string[];
  ko: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectDetailSection {
  key: string;
  title: LocalizedText;
  paragraphs: LocalizedText[];
}

export interface ProjectUmlImage {
  src: string;
  alt: LocalizedText;
  caption?: LocalizedText;
}

export interface ProjectHighlightMetric {
  value: LocalizedText;
  label: LocalizedText;
}

export interface ProjectDetail {
  overview: LocalizedText;
  summary?: LocalizedText;
  highlightMetrics?: ProjectHighlightMetric[];
  sections: ProjectDetailSection[];
  umlImages?: ProjectUmlImage[];
}
