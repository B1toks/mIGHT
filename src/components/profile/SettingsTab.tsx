"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { applyTheme, getStoredTheme, type ThemeMode } from "@/lib/theme";
import { STUDENT_PROFILE, NOTIFICATION_SETTINGS } from "@/data/mock";

// Таб «Налаштування» кабінету (account setting student user):
// персональна інформація, вибір теми, сповіщення.

function Input({
  label,
  placeholder,
  defaultValue,
}: {
  label: string;
  placeholder: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full mt-1 rounded-xl border px-3 py-2 text-sm bg-transparent focus:outline-none focus:border-[var(--color-brand)]"
      />
    </div>
  );
}

const THEMES = ["Системна", "Світла", "Темна"] as const;

const THEME_MODE: Record<(typeof THEMES)[number], ThemeMode> = {
  "Системна": "system",
  "Світла": "light",
  "Темна": "dark",
};

const MODE_LABEL: Record<ThemeMode, (typeof THEMES)[number]> = {
  system: "Системна",
  light: "Світла",
  dark: "Темна",
};

function ThemePreview({ name }: { name: (typeof THEMES)[number] }) {
  // Мініатюра «вікна» як у макеті: світла/темна/розділена навпіл.
  const body =
    name === "Темна"
      ? "bg-zinc-800"
      : name === "Світла"
        ? "bg-gray-100"
        : "bg-gradient-to-r from-gray-100 from-50% to-zinc-800 to-50%";
  return (
    <div className={`h-20 rounded-lg overflow-hidden border ${body}`}>
      <div className="h-4 bg-white/60 dark:bg-zinc-700/60 border-b flex items-center gap-1 px-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
      </div>
    </div>
  );
}

export default function SettingsTab() {
  const [theme, setTheme] = useState<(typeof THEMES)[number]>("Світла");

  useEffect(() => {
    setTheme(MODE_LABEL[getStoredTheme()]);
  }, []);
  const [notifications, setNotifications] = useState<boolean[]>(
    NOTIFICATION_SETTINGS.map(() => true)
  );
  const p = STUDENT_PROFILE;

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-2xl border p-6">
        <h2 className="text-lg font-semibold mb-4">Персональна інформація</h2>

        <div className="flex items-center gap-4 mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[var(--color-lime)] border-2 border-white dark:border-zinc-900" />
          </div>
          {/* TODO(backend): завантаження аватара у storage */}
          <button className="px-4 py-1.5 rounded-full bg-[var(--color-brand)] text-white text-xs font-medium hover:brightness-110 transition">
            Змінити фото
          </button>
          <button className="px-4 py-1.5 rounded-full border text-xs font-medium hover:border-red-400 hover:text-red-500 transition">
            Видалити
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Ім'я" placeholder="Введіть ваше ім'я" defaultValue={p.firstName} />
          <Input label="Прізвище" placeholder="Введіть ваше прізвище" defaultValue={p.lastName} />
          <Input label="По батькові" placeholder="Введіть ваше по батькові" defaultValue={p.middleName} />
          <Input label="Email" placeholder="example@gmail.com" defaultValue={p.email} />
          <Input label="Номер телефону" placeholder="+380 00 000 00 00" defaultValue={p.phone} />
        </div>
      </div>

      <div className="bg-card rounded-2xl border p-6">
        <h2 className="text-lg font-semibold">Налаштування теми</h2>
        <p className="text-xs text-muted-foreground mt-0.5 mb-4">
          Оберіть тему інтерфейсу
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-2xl">
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTheme(t);
                applyTheme(THEME_MODE[t]);
              }}
              className="text-left"
            >
              <div
                className={`rounded-xl p-1 border-2 transition ${
                  theme === t ? "border-[var(--color-brand)]" : "border-transparent"
                }`}
              >
                <div className="relative">
                  <ThemePreview name={t} />
                  {theme === t && (
                    <span className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-[var(--color-brand)] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs mt-1.5 ml-1">{t}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl border p-6">
        <h2 className="text-lg font-semibold mb-3">Налаштування сповіщень</h2>
        <div className="divide-y">
          {NOTIFICATION_SETTINGS.map((label, i) => (
            <label
              key={label}
              className="flex items-center justify-between py-3 text-sm cursor-pointer"
            >
              {label}
              <input
                type="checkbox"
                checked={notifications[i]}
                onChange={() =>
                  setNotifications((prev) =>
                    prev.map((v, j) => (j === i ? !v : v))
                  )
                }
                className="w-4 h-4 accent-[var(--color-brand)]"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
