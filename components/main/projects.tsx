"use client";

import React, { useState } from "react";
import { useTheme } from "@/contexts/theme-context";

const projects = [
  {
    title: "LLM-based Educational Content Auto-Generation Pipeline",
    period: "2025.05 ~ 2025.08",
    company: "FilledU",
    team: "6 members (Dev-60%, DB Design-40%, Planning-30%)",
    description: "LLM-based automated educational content generation system, achieved #2 ranking in Google Play Education category.",
    achievements: [
      "Designed and implemented content generation pipeline using LangChain + Gemini API",
      "Developed Flask backend API and PostgreSQL integration",
      "Achieved Google Play Education category #2 ranking"
    ],
    tech: ["Python", "LangChain", "Gemini API", "Flask", "PostgreSQL", "Linux"]
  },
  {
    title: "Automated MP3 Splitting for Listening Assessments",
    period: "2025.03 ~ 2025.06",
    company: "FilledU",
    team: "3 members (Dev-90%)",
    description: "Automated audio splitting system for listening assessments, processed 206 files with zero errors and 100% cost reduction.",
    achievements: [
      "100% automation of audio editing, saving 2M KRW annually",
      "Implemented timestamp extraction using Whisper STT and FFmpeg-based MP3 splitting",
      "Developed LangChain-based problem number recognition pipeline and quality validation",
      "Processed 206 files with zero errors"
    ],
    tech: ["Python", "FFmpeg", "Whisper", "LangChain", "Linux"]
  },
  {
    title: "Vietnam ELECS 2024 Tech Sales & MOU Execution",
    period: "2024.09 ~ 2024.10",
    company: "TurbineCrew",
    team: "3 members (Planning-60%, Operations-40%)",
    description: "Participated in Vietnam ELECS 2024 exhibition, conducted technical demonstrations and closed 3 MOUs with local companies.",
    achievements: [
      "Successfully closed 3 MOUs with Vietnamese companies",
      "Conducted technical presentations and Korean-English interpretation",
      "Operated exhibition booth and supported MOU execution"
    ],
    tech: ["Notion", "PowerPoint"]
  },
  {
    title: "SmartPole IoT Sensor Data Collection & Cloud System",
    period: "2024.01 ~ 2024.02",
    company: "TurbineCrew",
    team: "4 members (Dev-60%, HW-70%)",
    description: "Built real-time IoT sensor data collection and AWS cloud transmission pipeline for SmartPole infrastructure.",
    achievements: [
      "Automated storage of 1,000+ sensor data points daily",
      "Developed Raspberry Pi-based sensor data collection module",
      "Built AWS (EC2, S3) cloud transmission pipeline and automation",
      "Awarded Outstanding Employee recognition"
    ],
    tech: ["Python", "Raspberry Pi", "Jetson Nano", "AWS EC2", "AWS S3", "Linux"]
  },
  {
    title: "Cognee Open Source Project Contribution",
    period: "2025.12 ~ Present",
    company: "Open Source",
    team: "Open Source Contributor",
    description: "Knowledge Graph-based memory management open-source library for LLM applications.",
    achievements: [
      "Contributed Korean translation of development documentation",
      "Fixed simple code errors including Pydantic errors and bug patches",
      "Active participation in open-source community"
    ],
    tech: ["Python", "Git", "Markdown", "Linux", "Windows"],
    link: "https://github.com/HectorSin/cognee"
  },
  {
    title: "ControlNet-based Illustration Conversion AI Model",
    period: "2024.04 ~ 2024.10",
    company: "ModuLabs, Gyeonggi Youth Gap Year",
    team: "4 members (AI Model Design-70%, Dev-50%)",
    description: "AI image generation model that converts children's drawings into fairy tale illustration style.",
    achievements: [
      "Fine-tuned ControlNet model and collected/preprocessed datasets",
      "Developed API server and prompt engineering",
      "Successfully converted children's drawings to professional illustration style"
    ],
    tech: ["Python", "Stable Diffusion", "ControlNet", "OpenAI API", "Linux"]
  },
  {
    title: "SnackCast - AI-based News Podcast Auto-Generation",
    period: "2025.08 ~ 2025.12",
    company: "Ajou University Capstone Project",
    team: "4 members (Dev-70%, Infra-100%)",
    description: "AI podcast service: Perplexity news crawling → Gemini summarization → TTS audio generation.",
    achievements: [
      "Designed FastAPI backend server, containerized with Docker, deployed on GCP",
      "Built multi-API pipeline (Perplexity → Gemini → Clova TTS)",
      "Integrated PostgreSQL and implemented end-to-end automation"
    ],
    tech: ["Python", "LangChain", "FastAPI", "PostgreSQL", "Docker", "GCP", "Clova TTS"]
  },
  {
    title: "Personalized Travel Route Recommendation Service",
    period: "2023.08 ~ 2023.12",
    company: "Ajou University Capstone Project",
    team: "5 members (Dev-100%, Planning-20%)",
    description: "LLM-based personalized travel route recommendation web service with SEO optimization.",
    achievements: [
      "Developed travel route generation logic using ChatGPT-3.5 API",
      "Implemented SEO-friendly page structure and content generation",
      "Created personalized recommendations based on user preferences"
    ],
    tech: ["Python", "OpenAI GPT-3.5 API", "HTML", "CSS", "JavaScript", "Linux"]
  }
];

export default function Projects() {
  const { isDark } = useTheme();
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-tight" style={{ color: "#C3E41D" }}>
          PROJECTS
        </h2>

        <div className="grid gap-8">
          {displayedProjects.map((project, index) => (
            <div
              key={index}
              className={`border rounded-lg p-8 transition-colors ${
                isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl md:text-3xl font-bold mb-2 hover:underline inline-block"
                      style={{ color: "#C3E41D" }}
                    >
                      {project.title} ↗
                    </a>
                  ) : (
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h3>
                  )}
                  <p className={`text-sm ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                    {project.company} | {project.team}
                  </p>
                </div>
                <span className={`mt-2 md:mt-0 text-sm font-semibold whitespace-nowrap ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                  {project.period}
                </span>
              </div>

              <p className={`text-base mb-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>{project.description}</p>

              <div className="mb-6">
                <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>KEY ACHIEVEMENTS</h4>
                <ul className="space-y-2">
                  {project.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start">
                      <span className={isDark ? "text-green-400" : "text-green-600"} style={{ marginRight: "0.75rem" }}>▸</span>
                      <span className={`text-sm ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>TECH STACK</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 border rounded-full text-xs ${
                        isDark ? "bg-neutral-900 border-neutral-800" : "bg-neutral-100 border-neutral-300"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {projects.length > 3 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                isDark
                  ? "bg-neutral-900 border-2 border-neutral-800 hover:border-neutral-700"
                  : "bg-neutral-100 border-2 border-neutral-300 hover:border-neutral-400"
              }`}
            >
              {showAll ? "Show Less ↑" : `Show More (${projects.length - 3} more projects) ↓`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
