"use client";

import React from "react";
import { useTheme } from "@/contexts/theme-context";
import { profileData, t } from "@/data/profile";

export default function About() {
  const { isDark, isKorean } = useTheme();
  const firstEducation = profileData.education[0];

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
        <h2
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-tight text-balance"
          style={{ color: "#C3E41D" }}
        >
          {isKorean ? "소개" : "ABOUT"}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                {isKorean ? "학력" : "Education"}
              </h3>
              <div className="space-y-2">
                <p className="text-xl font-semibold">{t(firstEducation.school, isKorean)}</p>
                <p className={isDark ? "text-neutral-500" : "text-neutral-700"}>
                  {t(firstEducation.degree, isKorean)}
                </p>
                <p className={isDark ? "text-neutral-500" : "text-neutral-700"}>
                  {t(firstEducation.graduation, isKorean)}
                </p>
              </div>
            </div>

            <div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                {isKorean ? "언어" : "Languages"}
              </h3>
              <div className="space-y-2">
                {profileData.languages.map((language) => (
                  <div key={language.name.en} className="flex justify-between items-center">
                    <span className="text-lg">{t(language.name, isKorean)}</span>
                    <span className={isDark ? "text-neutral-500" : "text-neutral-700"}>
                      {t(language.level, isKorean)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
              {isKorean ? "소개" : "Bio"}
            </h3>
            <div className={`space-y-4 text-lg leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
              {profileData.bio.map((paragraph, index) => (
                <p key={index}>{t(paragraph, isKorean)}</p>
              ))}
              <p className={`italic ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                &ldquo;{t(profileData.quote, isKorean)}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
