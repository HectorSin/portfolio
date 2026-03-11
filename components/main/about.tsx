"use client";

import React from "react";
import { useTheme } from "@/contexts/theme-context";
import { profileData, t } from "@/data/profile";

export default function About() {
  const { isDark, isKorean } = useTheme();
  const firstEducation = profileData.education[0];
  const sectionTitleClass = `text-2xl font-bold mb-4 ${isDark ? "text-neutral-400" : "text-neutral-600"}`;
  const secondaryTextClass = isDark ? "text-neutral-500" : "text-neutral-700";

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

        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:gap-16">
          <div className="space-y-8 lg:space-y-10">
            <div>
              <h3 className={sectionTitleClass}>{isKorean ? "학력" : "Education"}</h3>
              <div className="space-y-2">
                <p className="text-xl font-semibold">{t(firstEducation.school, isKorean)}</p>
                <p className={secondaryTextClass}>{t(firstEducation.degree, isKorean)}</p>
                <p className={secondaryTextClass}>{t(firstEducation.graduation, isKorean)}</p>
              </div>
            </div>

            <div>
              <h3 className={sectionTitleClass}>{isKorean ? "언어" : "Languages"}</h3>
              <div className="space-y-3">
                {profileData.languages.map((language) => (
                  <div
                    key={language.name.en}
                    className={`grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 border-b pb-3 ${
                      isDark ? "border-neutral-900" : "border-neutral-200"
                    }`}
                  >
                    <span className="text-lg">{t(language.name, isKorean)}</span>
                    <span className={`text-right ${secondaryTextClass}`}>{t(language.level, isKorean)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="max-w-[600px]">
            <p
              className={`text-sm font-semibold uppercase tracking-[0.24em] ${
                isDark ? "text-neutral-500" : "text-neutral-600"
              }`}
            >
              {t(profileData.identity.title, isKorean)}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {profileData.identity.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className={`rounded-full border px-4 py-2 text-sm uppercase tracking-[0.18em] ${
                    isDark
                      ? "border-neutral-800 bg-neutral-950 text-neutral-300"
                      : "border-neutral-300 bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <h3 className={sectionTitleClass}>{isKorean ? "소개" : "Bio"}</h3>
              <div className={`space-y-5 text-lg leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                {profileData.bio.map((paragraph, index) => (
                  <p key={index}>{t(paragraph, isKorean)}</p>
                ))}
              </div>
              <p className={`mt-8 border-l-2 pl-5 text-base italic ${isDark ? "border-neutral-800 text-neutral-500" : "border-neutral-300 text-neutral-600"}`}>
                &ldquo;{t(profileData.quote, isKorean)}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
