"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, ArrowRight } from "lucide-react";
import { TEACHER_GROUPS } from "@/data/mock";

// «Мої групи» викладача (my groups teacher user): пошук, фільтр
// за предметом, рядки груп із чипами і кнопкою «Переглянути».
// TODO(role): роут доступний лише викладачу — закриється guard-ом.

export default function JournalPage() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("Обрати предмет");

  const subjects = [...new Set(TEACHER_GROUPS.map((g) => g.subject))];
  const groups = TEACHER_GROUPS.filter(
    (g) =>
      g.name.toLowerCase().includes(query.toLowerCase()) &&
      (subject === "Обрати предмет" || g.subject === subject)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Мої групи</h1>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук"
            className="bg-white dark:bg-zinc-900 border rounded-full pl-4 pr-9 py-1.5 text-sm w-56 focus:outline-none focus:border-[var(--color-brand)]"
          />
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="appearance-none bg-white dark:bg-zinc-900 border rounded-full pl-4 pr-9 py-1.5 text-sm cursor-pointer"
          >
            <option>Обрати предмет</option>
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
        </div>
      </div>

      <div className="space-y-3">
        {groups.map((g) => (
          <div
            key={g.id}
            className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1.3fr_auto] gap-4 items-center bg-white dark:bg-zinc-900 rounded-2xl border p-5"
          >
            <div>
              <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-medium ${g.chipClass}`}>
                {g.subject}
              </span>
              <p className="text-lg font-semibold mt-1">{g.name}</p>
            </div>

            <span className={`justify-self-start px-3 py-1 rounded-full text-xs font-medium ${g.membersChipClass}`}>
              {g.members} Учасники
            </span>

            <span className={`justify-self-start px-3 py-1 rounded-full text-xs font-medium ${g.membersChipClass}`}>
              {g.range}
            </span>

            <Link
              href={`/journal/${g.id}`}
              className="px-4 py-1.5 rounded-full bg-[var(--color-brand)] text-white text-xs font-medium hover:brightness-110 transition flex items-center gap-1.5"
            >
              Переглянути <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}

        {groups.length === 0 && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border p-10 text-center text-muted-foreground">
            Груп за цим фільтром немає
          </div>
        )}
      </div>
    </div>
  );
}
