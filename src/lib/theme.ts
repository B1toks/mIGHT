// Єдине джерело правди для теми. Режим зберігається в localStorage,
// на <html> вішається/знімається клас .dark — далі все роблять
// CSS-токени з globals.css (.dark { --card: … }).

export type ThemeMode = "system" | "light" | "dark";

const KEY = "theme";

export function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "system";
  const v = localStorage.getItem(KEY);
  return v === "light" || v === "dark" ? v : "system";
}

export function isDarkApplied(mode: ThemeMode): boolean {
  if (mode === "dark") return true;
  if (mode === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyTheme(mode: ThemeMode) {
  localStorage.setItem(KEY, mode);
  document.documentElement.classList.toggle("dark", isDarkApplied(mode));
}

// Виклик при старті застосунку (ThemeToggle робить це в useEffect).
export function initTheme() {
  document.documentElement.classList.toggle(
    "dark",
    isDarkApplied(getStoredTheme())
  );
}
