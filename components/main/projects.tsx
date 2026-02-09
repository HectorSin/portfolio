"use client";

import React from "react";
import { useTheme } from "@/contexts/theme-context";

const projects = [
  {
    title: "FilledU",
    role: "AI Service Contract",
    type: "Educational AI Startup",
    description: "Implemented Gemini API integration with multi-step refinement pipeline and automated quality assurance.",
    achievements: [
      "100% cost reduction through LLM automation",
      "50% time savings in content production",
      "Multi-step refinement pipeline implementation"
    ],
    tech: ["Gemini API", "Python", "LangChain", "Prompt Engineering"]
  },
  {
    title: "TurbineCrew",
    role: "AI Service Contract",
    type: "Energy Tech Startup",
    description: "Architected AWS IoT Core infrastructure and Lambda-based data processing for wind power prediction.",
    achievements: [
      "Built end-to-end IoT-to-ML pipeline",
      "Contributed to 3 MOUs at Vietnam ELECS 2024",
      "Real-time data processing system"
    ],
    tech: ["AWS IoT Core", "AWS Lambda", "Python", "Machine Learning"]
  },
  {
    title: "SnackCast",
    role: "Lead Developer",
    type: "Capstone Project",
    description: "Deployed production AI news-to-podcast automation on GCP with multi-API orchestration.",
    achievements: [
      "End-to-end automation pipeline",
      "Multi-API orchestration system",
      "Production deployment on GCP"
    ],
    tech: ["Perplexity API", "Gemini API", "Naver Clova TTS", "GCP Cloud Run"]
  }
];

export default function Projects() {
  const { isDark } = useTheme();

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
          {projects.map((project, index) => (
            <div
              key={index}
              className={`border rounded-lg p-8 hover:border-neutral-500 transition-colors ${
                isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                  <p className={`text-lg ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>{project.type}</p>
                </div>
                <span className={`mt-2 md:mt-0 font-semibold ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>{project.role}</span>
              </div>

              <p className={`text-lg mb-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>{project.description}</p>

              <div className="mb-6">
                <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>KEY ACHIEVEMENTS</h4>
                <ul className="space-y-2">
                  {project.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start">
                      <span className={isDark ? "text-green-400" : "text-green-600"} style={{ marginRight: "0.75rem" }}>▸</span>
                      <span className={isDark ? "text-neutral-300" : "text-neutral-700"}>{achievement}</span>
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
                      className={`px-3 py-1 border rounded-full text-sm ${
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
      </div>
    </section>
  );
}
