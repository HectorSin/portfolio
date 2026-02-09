"use client";

import React from "react";
import { useTheme } from "@/contexts/theme-context";

export default function Contact() {
  const { isDark } = useTheme();

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <div className="max-w-4xl w-full">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 tracking-tight" style={{ color: "#C3E41D" }}>
          CONTACT
        </h2>

        <div className="space-y-8">
          <p className={`text-2xl leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
            I'm always open to discussing new opportunities, collaborations, or innovative AI projects.
          </p>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {/* Email */}
            <a
              href="mailto:jaehyunkkang15634@gmail.com"
              className={`border rounded-lg p-8 transition-all hover:scale-105 ${
                isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
              }`}
            >
              <div className="mb-4">
                <svg
                  className={`w-12 h-12 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className={`break-all ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>jaehyunkkang15634@gmail.com</p>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/%EC%9E%AC%ED%98%84-%EC%8B%A0-b26183272/"
              target="_blank"
              rel="noopener noreferrer"
              className={`border rounded-lg p-8 transition-all hover:scale-105 ${
                isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
              }`}
            >
              <div className="mb-4">
                <svg
                  className={`w-12 h-12 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">LinkedIn</h3>
              <p className={isDark ? "text-neutral-400" : "text-neutral-600"}>Connect with me</p>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/HectorSin"
              target="_blank"
              rel="noopener noreferrer"
              className={`border rounded-lg p-8 transition-all hover:scale-105 ${
                isDark ? "border-neutral-800 hover:border-neutral-700" : "border-neutral-300 hover:border-neutral-400"
              }`}
            >
              <div className="mb-4">
                <svg
                  className={`w-12 h-12 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">GitHub</h3>
              <p className={isDark ? "text-neutral-400" : "text-neutral-600"}>Check out my code</p>
            </a>

            {/* Location */}
            <div className={`border rounded-lg p-8 ${isDark ? "border-neutral-800" : "border-neutral-300"}`}>
              <div className="mb-4">
                <svg
                  className={`w-12 h-12 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className={isDark ? "text-neutral-400" : "text-neutral-600"}>South Korea</p>
              <p className={`text-sm mt-1 ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>Open to remote opportunities</p>
            </div>
          </div>

          {/* Footer Note */}
          <div className={`mt-16 text-center border-t pt-8 ${isDark ? "border-neutral-800" : "border-neutral-300"}`}>
            <p className={isDark ? "text-neutral-500" : "text-neutral-600"}>
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
            <p className={`mt-2 ${isDark ? "text-neutral-600" : "text-neutral-500"}`}>
              © 2026 Sin Jaehyun. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
