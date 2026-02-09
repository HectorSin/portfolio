"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Initialize theme
    document.documentElement.classList.add("dark");
    document.body.style.backgroundColor = "hsl(0 0% 0%)";
    document.body.style.color = "hsl(0 0% 100%)";
  }, []);

  useEffect(() => {
    // Update theme when isDark changes
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "hsl(0 0% 0%)";
      document.body.style.color = "hsl(0 0% 100%)";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "hsl(0 0% 98%)";
      document.body.style.color = "hsl(0 0% 10%)";
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
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
