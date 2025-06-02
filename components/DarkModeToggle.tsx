"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    // On mount, set initial state from localStorage or system
    const theme = localStorage.getItem("theme");
    if (theme) {
      setIsDark(theme === "dark");
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggleDarkMode}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid var(--border)",
        background: "var(--background)",
        color: "var(--foreground)",
        cursor: "pointer",
        margin: "1rem"
      }}
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
