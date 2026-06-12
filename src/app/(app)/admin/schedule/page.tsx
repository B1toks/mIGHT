"use client";

import { ChevronDown, Plus } from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";
import ScheduleCalendar from "@/components/ScheduleCalendar";
import { TEACHER_GROUPS } from "@/data/mock";

// Адмінка «Управління розкладом» — за вайрфреймом. Календар той самий,
// що в студента; редагування занять підключиться до бека.

export default function AdminSchedulePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Адміністрування</h1>
      <AdminNav />

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative">
          <select className="appearance-none bg-white dark:bg-zinc-900 border rounded-full pl-4 pr-9 py-1.5 text-sm cursor-pointer">
            {TEACHER_GROUPS.map((g) => (
              <option key={g.id}>
                {g.name} — {g.subject}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
        </div>

        {/* TODO(backend): POST /lessons */}
        <button className="px-4 py-1.5 rounded-full bg-[var(--color-brand)] text-white text-xs font-medium hover:brightness-110 transition flex items-center gap-1.5">
          Додати заняття <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <ScheduleCalendar />
    </div>
  );
}
