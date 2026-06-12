"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, getStoredTheme, isDarkApplied } from "@/lib/theme";

// Компактний тумблер світла/темна для топбара.
// Повний вибір (включно з «Системна») — у Кабінет → Налаштування.
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    applyTheme(next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="text-gray-700 dark:text-gray-300 hover:text-[var(--color-brand)] transition-colors"
      aria-label={dark ? "Світла тема" : "Темна тема"}
    >
      {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

// Ініціалізація теми при старті (рендерить нічого) — живе в кореневому
// лейауті, щоб тема застосовувалась і на auth-сторінках без топбара.
export function ThemeInit() {
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      isDarkApplied(getStoredTheme())
    );
  }, []);
  return null;
}
