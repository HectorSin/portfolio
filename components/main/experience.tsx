"use client";

import React from "react";
import { useTheme } from "@/contexts/theme-context";

const experiences = [
  {
    company: "FilledU",
    role: "AI/BE Contract Employee",
    period: "2025.03 ~ 2025.08",
    type: "Educational AI Startup",
    description: "Developed automated learning content generation and audio processing systems using LangChain and ffmpeg.",
    highlights: [
      "100% automation of audio editing, saving 2M KRW annually in outsourcing costs",
      "Discovered and improved 204 defective content items through validation logic",
      "Built custom learning problem generation system with LangChain",
      "Developed automated audio splitting system for English listening tests",
      "Structured unstructured data (text/audio) and designed/operated databases"
    ],
    link: "https://filledyou.com/pages/intro-pulda"
  },
  {
    company: "TurbineCrew",
    role: "International Business Development",
    period: "2024.09",
    type: "Energy Tech Startup",
    description: "Led technical demonstrations and business development at Vietnam ELECS 2024 exhibition.",
    highlights: [
      "Successfully closed 3 MOUs with Vietnamese companies",
      "Conducted SmartPole solution technical demonstrations",
      "Performed Korean-English interpretation for local buyers",
      "Led business meetings and technical sales support"
    ],
    link: "https://turbinecrew.co.kr/"
  },
  {
    company: "TurbineCrew",
    role: "AI/IoT Engineer",
    period: "2024.01 ~ 2024.02",
    type: "Energy Tech Startup",
    description: "Built real-time IoT data collection and processing pipeline on AWS infrastructure.",
    highlights: [
      "Automated storage of 1,000+ sensor data points daily",
      "Built real-time IoT sensor data collection system",
      "Developed AWS cloud transmission and DB loading pipeline",
      "Automated data preprocessing for power generation prediction models",
      "Awarded Outstanding Employee recognition"
    ],
    link: "https://turbinecrew.co.kr/"
  }
];

const activities = [
  {
    title: "Competitive Programming",
    description: "Active on Baekjoon Online Judge",
    icon: "💻",
    link: "https://github.com/HectorSin/CodingTestPrepare"
  },
  {
    title: "Cognee Open Source Contribution",
    description: "Contributing to knowledge graph framework",
    icon: "🏆",
    link: "https://github.com/HectorSin/cognee"
  },
  {
    title: "LinkedIn Content Creator",
    description: "Covering AI Agents, RAG, and LLM trends",
    icon: "✍️",
    link: "https://www.linkedin.com/in/%EC%9E%AC%ED%98%84-%EC%8B%A0-b26183272/recent-activity/all/"
  },
  {
    title: "Cultural Exchange Leadership",
    description: "Grew club from 4 to 130 members",
    icon: "🌍",
    link: "https://www.instagram.com/ajou_friends_club/"
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
                    {exp.link ? (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl font-bold mb-1 hover:underline inline-block"
                        style={{ color: "#C3E41D" }}
                      >
                        {exp.company} ↗
                      </a>
                    ) : (
                      <h4 className="text-2xl font-bold mb-1">{exp.company}</h4>
                    )}
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
            {activities.map((activity, index) => {
              const content = (
                <>
                  <div className="text-4xl mb-4">{activity.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{activity.title}</h4>
                  <p className={isDark ? "text-neutral-400" : "text-neutral-600"}>{activity.description}</p>
                </>
              );

              const className = `border rounded-lg p-6 transition-colors ${
                isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
              } ${activity.link ? "cursor-pointer hover:scale-105" : ""}`;

              return activity.link ? (
                <a
                  key={index}
                  href={activity.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <div key={index} className={className}>
                  {content}
                </div>
              );
            })}
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
