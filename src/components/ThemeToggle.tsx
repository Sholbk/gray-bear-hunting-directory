"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-text-inverse/70 hover:text-white transition-colors"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="material-symbols-outlined text-xl">
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
