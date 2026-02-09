"use client";

import React from "react";
import { useTheme } from "@/contexts/theme-context";

export default function About() {
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-tight" style={{ color: "#C3E41D" }}>
          ABOUT
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Education</h3>
              <div className="space-y-2">
                <p className="text-xl font-semibold">Ajou University</p>
                <p className={isDark ? "text-neutral-500" : "text-neutral-700"}>B.S. in e-Business (Major)</p>
                <p className={isDark ? "text-neutral-500" : "text-neutral-700"}>B.S. in AI Convergence (Double Major)</p>
                <p className={isDark ? "text-neutral-500" : "text-neutral-700"}>Graduating February 2026</p>
              </div>
            </div>

            <div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Languages</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Korean</span>
                  <span className={isDark ? "text-neutral-500" : "text-neutral-700"}>Native</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg">English</span>
                  <span className={isDark ? "text-neutral-500" : "text-neutral-700"}>Fluent</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg">Spanish</span>
                  <span className={isDark ? "text-neutral-500" : "text-neutral-700"}>Intermediate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Bio</h3>
            <div className={`space-y-4 text-lg leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
              <p>
                AI Service Engineer specializing in LLM-based systems and production-ready AI applications.
              </p>
              <p>
                Currently focused on transforming cutting-edge AI models into measurable business impact
                through multi-LLM orchestration, RAG systems, and scalable backend architectures.
              </p>
              <p>
                Experienced in deploying end-to-end AI solutions that have achieved significant cost
                reductions and efficiency improvements for startups in education and energy sectors.
              </p>
              <p className={`italic ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                "Bridging cutting-edge AI research with real-world business value"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
