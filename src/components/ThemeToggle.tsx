"use client";

import { useTheme } from "./ThemeProvider";
import Icon from "@/components/Icon";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-white/70 hover:text-white transition-colors lg:text-white/70 lg:hover:text-white"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Icon name={theme === "dark" ? "light_mode" : "dark_mode"} className="w-5 h-5" />
    </button>
  );
}
