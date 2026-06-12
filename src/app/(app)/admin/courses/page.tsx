"use client";

import { useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";
import { COURSES } from "@/data/mock";

// Адмінка «Курси» — за вайрфреймом «Наявні курси -> Редагувати».
// Дії поки заглушки; підключаться до CRUD-ендпоінтів бека.

export default function AdminCoursesPage() {
  const [query, setQuery] = useState("");

  const courses = COURSES.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Адміністрування</h1>
      <AdminNav />

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук курсу"
            className="bg-card border rounded-full pl-4 pr-9 py-1.5 text-sm w-56 focus:outline-none focus:border-[var(--color-brand)]"
          />
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* TODO(backend): POST /courses */}
        <button className="px-4 py-1.5 rounded-full bg-[var(--color-brand)] text-white text-xs font-medium hover:brightness-110 transition flex items-center gap-1.5">
          Додати курс <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {courses.map((c) => (
          <div
            key={c.id}
            className="grid grid-cols-1 md:grid-cols-[1.6fr_1.2fr_auto_auto] gap-4 items-center bg-card rounded-2xl border px-5 py-4"
          >
            <p className="font-semibold">{c.title}</p>
            <span className="text-sm text-muted-foreground">
              Викладач: {c.teacher}
            </span>
            <button className="px-4 py-1.5 rounded-full border text-xs font-medium hover:border-[var(--color-brand)] transition flex items-center gap-1.5">
              Редагувати <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-500 transition"
              aria-label={`Видалити курс ${c.title}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {courses.length === 0 && (
          <div className="bg-card rounded-2xl border p-10 text-center text-muted-foreground">
            Курсів не знайдено
          </div>
        )}
      </div>
    </div>
  );
}
