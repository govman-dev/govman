"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(mode: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", mode === "dark");
}

function getInitialTheme(): Theme {
  try {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function saveTheme(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // ignore storage errors
  }
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const theme = getInitialTheme();
    applyTheme(theme);
    setIsDark(theme === "dark");
    setMounted(true);
  }, []);

  const toggle = () => {
    const nextTheme: Theme = isDark ? "light" : "dark";
    applyTheme(nextTheme);
    saveTheme(nextTheme);
    setIsDark(!isDark);
  };

  if (!mounted) return <div className="h-12 w-12" />; // Prevent hydration mismatch

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="group relative h-12 w-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 p-1 shadow-lg shadow-gray-300/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-400/50 focus:outline-none focus:ring-4 focus:ring-blue-500/30 active:scale-95 dark:from-gray-700 dark:to-gray-800 dark:shadow-gray-900/50 dark:hover:shadow-gray-900/80"
    >
      {/* Animated background gradient overlay */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 ${
          isDark
            ? "from-indigo-500 via-purple-500 to-pink-500 opacity-20"
            : "from-amber-300 via-orange-300 to-yellow-300 opacity-20"
        }`}
      />

      {/* Icon container */}
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        {/* Sun icon */}
        <div
          className={`absolute flex items-center justify-center transition-all duration-500 ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        >
          <svg
            className="h-6 w-6 text-amber-500 drop-shadow-lg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        </div>

        {/* Moon icon */}
        <div
          className={`absolute flex items-center justify-center transition-all duration-500 ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        >
          <svg
            className="h-6 w-6 text-indigo-400 drop-shadow-lg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Sparkle effect on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute right-1 top-1 h-1 w-1 rounded-full bg-yellow-400 blur-[1px] dark:bg-blue-400" />
          <div className="absolute bottom-2 left-2 h-1 w-1 rounded-full bg-yellow-400 blur-[1px] dark:bg-purple-400" />
        </div>
      </div>
    </button>
  );
}
