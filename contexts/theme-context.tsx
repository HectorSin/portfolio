"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  isKorean: boolean;
  toggleLanguage: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [isKorean, setIsKorean] = useState(true);

  useEffect(() => {
    // Initialize theme
    document.documentElement.classList.remove("dark");
    document.body.style.backgroundColor = "hsl(0 0% 98%)";
    document.body.style.color = "hsl(0 0% 10%)";
  }, []);

  useEffect(() => {
    // Update theme when isDark changes
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
      document.body.style.backgroundColor = "hsl(0 0% 0%)";
      document.body.style.color = "hsl(0 0% 100%)";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
      document.body.style.backgroundColor = "hsl(0 0% 98%)";
      document.body.style.color = "hsl(0 0% 10%)";
    }
    // Update theme-color meta tag
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)");
  }, [isDark]);

  useEffect(() => {
    // Update html lang attribute
    document.documentElement.lang = isKorean ? "ko" : "en";
  }, [isKorean]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const toggleLanguage = useCallback(() => {
    setIsKorean((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({ isDark, toggleTheme, isKorean, toggleLanguage }),
    [isDark, isKorean, toggleTheme, toggleLanguage]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
