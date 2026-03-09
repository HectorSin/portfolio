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

export interface ProjectDetail {
  overview: LocalizedText;
  sections: ProjectDetailSection[];
  umlImages?: ProjectUmlImage[];
}
