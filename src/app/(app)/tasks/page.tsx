"use client";

import { useMemo, useState } from "react";
import { Check, Clock, ChevronDown } from "lucide-react";
import PillTabs from "@/components/PillTabs";
import { TASKS, SUBJECT_CHIP, type TaskRow, type TaskStatus } from "@/data/mock";

// «Мої завдання» з макета: пігулкові таби-фільтри за статусом,
// фільтр за предметом, рядки-картки з оцінками і статусом.

const TABS = ["Усі", "До виконання", "На перевірці", "Виконані"] as const;

const TAB_FILTER: Record<(typeof TABS)[number], (s: TaskStatus) => boolean> = {
  "Усі": () => true,
  "До виконання": (s) => s === "not_done" || s === "rework",
  "На перевірці": (s) => s === "checking",
  "Виконані": (s) => s === "done",
};

function ScorePill({ value }: { value: string }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-brand)] text-white text-xs font-semibold">
      {value}
    </span>
  );
}

function StatusCell({ task }: { task: TaskRow }) {
  switch (task.status) {
    case "done":
      return (
        <span className="flex items-center gap-2 text-sm">
          <span className="w-5 h-5 rounded bg-[var(--color-lime)] flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-white" />
          </span>
          Виконано
        </span>
      );
    case "not_done":
      return (
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-5 h-5 rounded border-2 border-gray-300" />
          Не виконано
        </span>
      );
    case "checking":
      return (
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          На перевірці
        </span>
      );
    case "rework":
      return (
        <span className="text-sm">
          <span className="block text-muted-foreground text-xs">Дедлайн до:</span>
          <span className="font-semibold">{task.deadline}</span>
        </span>
      );
  }
}

export default function TasksPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Усі");
  const [subject, setSubject] = useState<string>("Обрати предмет");

  const subjects = useMemo(
    () => [...new Set(TASKS.map((t) => t.subject))],
    []
  );

  const rows = TASKS.filter(
    (t) =>
      TAB_FILTER[tab](t.status) &&
      (subject === "Обрати предмет" || t.subject === subject)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Мої завдання</h1>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <PillTabs tabs={[...TABS]} active={tab} onChange={(t) => setTab(t as typeof TABS[number])} />

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

      <div>
        <div className="grid grid-cols-[1.8fr_0.8fr_1fr_0.7fr_1fr] gap-4 px-5 pb-2 text-xs text-muted-foreground">
          <span>Заняття</span>
          <span>Дата</span>
          <span>Домашнє завдання</span>
          <span>Тест</span>
          <span>Статус</span>
        </div>

        <div className="space-y-3">
          {rows.map((task) => (
            <div
              key={task.id}
              className="grid grid-cols-[1.8fr_0.8fr_1fr_0.7fr_1fr] gap-4 items-center bg-white dark:bg-zinc-900 rounded-2xl border p-5"
            >
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-medium ${SUBJECT_CHIP[task.color]}`}
                >
                  {task.subject}
                </span>
                <p className="font-medium mt-1.5 text-sm">{task.title}</p>
              </div>

              <span className="text-sm text-muted-foreground">{task.date}</span>

              <span>
                {task.needsRework ? (
                  <button className="px-4 py-1.5 rounded-full bg-[var(--color-brand)] text-white text-xs font-medium hover:brightness-110 transition">
                    Допрацювати
                  </button>
                ) : task.homework ? (
                  <ScorePill value={task.homework} />
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </span>

              <span>
                {task.test ? (
                  <ScorePill value={task.test} />
                ) : (
                  <span className="inline-block w-8 border-t border-gray-300" />
                )}
              </span>

              <StatusCell task={task} />
            </div>
          ))}

          {rows.length === 0 && (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border p-10 text-center text-muted-foreground">
              Завдань у цій категорії немає
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
