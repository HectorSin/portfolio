"use client";

import React from "react";
import { useTheme } from "@/contexts/theme-context";

const experiences = [
  {
    company: "FilledU",
    role: "AI Service Contract",
    period: "2024",
    type: "Educational AI Startup",
    description: "Led LLM automation initiatives resulting in significant cost and time savings.",
    highlights: [
      "100% cost reduction through Gemini API integration",
      "50% reduction in content production time",
      "Implemented multi-step refinement pipeline with automated QA"
    ]
  },
  {
    company: "TurbineCrew",
    role: "AI Service Contract",
    period: "2024",
    type: "Energy Tech Startup",
    description: "Architected IoT-to-ML infrastructure for wind power prediction systems.",
    highlights: [
      "Built end-to-end AWS IoT Core pipeline",
      "Contributed to 3 MOUs at Vietnam ELECS 2024",
      "Lambda-based real-time data processing"
    ]
  }
];

const activities = [
  {
    title: "Competitive Programming",
    description: "Active on Baekjoon Online Judge",
    icon: "💻"
  },
  {
    title: "Open Ko-LLM Leaderboard",
    description: "Season 3 Participant",
    icon: "🏆"
  },
  {
    title: "LinkedIn Content Creator",
    description: "Covering AI Agents, RAG, and LLM trends",
    icon: "✍️"
  },
  {
    title: "Cultural Exchange Leadership",
    description: "Grew club from 4 to 130 members",
    icon: "🌍"
  }
];

export default function Experience() {
  const { isDark } = useTheme();

  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-tight" style={{ color: "#C3E41D" }}>
          EXPERIENCE
        </h2>

        {/* Professional Experience */}
        <div className="mb-16">
          <h3 className={`text-3xl font-bold mb-8 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Professional</h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`border rounded-lg p-8 transition-colors ${
                  isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h4 className="text-2xl font-bold mb-1">{exp.company}</h4>
                    <p className={isDark ? "text-neutral-500" : "text-neutral-600"}>{exp.type}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <p className="font-semibold">{exp.role}</p>
                    <p className={isDark ? "text-neutral-500" : "text-neutral-600"}>{exp.period}</p>
                  </div>
                </div>

                <p className={`text-lg mb-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>{exp.description}</p>

                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className={isDark ? "text-green-400" : "text-green-600"} style={{ marginRight: "0.75rem" }}>▸</span>
                      <span className={isDark ? "text-neutral-300" : "text-neutral-700"}>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Activities & Achievements */}
        <div>
          <h3 className={`text-3xl font-bold mb-8 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Activities & Achievements</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {activities.map((activity, index) => (
              <div
                key={index}
                className={`border rounded-lg p-6 transition-colors ${
                  isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
                }`}
              >
                <div className="text-4xl mb-4">{activity.icon}</div>
                <h4 className="text-xl font-bold mb-2">{activity.title}</h4>
                <p className={isDark ? "text-neutral-400" : "text-neutral-600"}>{activity.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Currently Seeking */}
        <div className={`mt-12 border rounded-lg p-8 ${
          isDark ? "border-neutral-800 bg-neutral-900/30" : "border-neutral-300 bg-neutral-100"
        }`}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: "#C3E41D" }}>
            Currently Seeking
          </h3>
          <p className={`text-lg ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
            AI/ML Engineer, LLM Service Engineer, or Data Engineer positions
          </p>
          <p className={`mt-2 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            Focused on production-ready LLM applications with measurable ROI and advanced RAG systems
          </p>
        </div>
      </div>
    </section>
  );
}
