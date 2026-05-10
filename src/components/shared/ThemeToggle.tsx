"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title="Alternar tema"
      aria-label="Alternar tema"
      className="grid size-9 place-items-center rounded-md border border-[var(--border)] bg-white/5 text-[var(--text-muted)] transition hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
    >
      {/* suppressHydrationWarning prevents mismatch if localStorage theme differs from default */}
      <span aria-hidden suppressHydrationWarning>
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
