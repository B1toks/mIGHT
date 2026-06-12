"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Pencil,
  X,
} from "lucide-react";
import PillTabs from "@/components/PillTabs";
import {
  TEACHER_GROUPS,
  GROUP_STUDENTS,
  GRADE_TOPICS,
  GRADES_TABLE,
  ATTENDANCE_DATES,
  ATTENDANCE_RANGE,
  ATTENDANCE_TABLE,
} from "@/data/mock";

// Журнал групи (group1_list / group1_grades / group1_attendance):
// таби «Список / Оцінки / Відвідуваність».

const TABS = ["Список", "Оцінки", "Відвідуваність"];

function StudentAvatar({ name }: { name: string }) {
  const hues = [
    "from-pink-400 to-rose-500",
    "from-blue-400 to-indigo-500",
    "from-amber-300 to-orange-400",
    "from-emerald-300 to-teal-500",
    "from-violet-400 to-purple-500",
  ];
  return (
    <div
      className={`w-9 h-9 rounded-full bg-gradient-to-br ${hues[name.length % hues.length]} shrink-0`}
    />
  );
}

function ListTab() {
  return (
    <div className="space-y-3">
      {GROUP_STUDENTS.map((s) => (
        <div
          key={s.id}
          className="grid grid-cols-1 md:grid-cols-[1.6fr_0.8fr_1.2fr_1.1fr_auto] gap-4 items-center bg-card rounded-2xl border px-5 py-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <StudentAvatar name={s.name} />
            <p className="text-sm font-medium truncate">{s.name}</p>
          </div>
          <span className="text-xs text-muted-foreground">{s.speciality}</span>
          <span className="text-xs text-muted-foreground truncate">{s.email}</span>
          <span className="text-xs text-muted-foreground">{s.phone}</span>
          <button className="px-4 py-1.5 rounded-full bg-[var(--color-brand)] text-white text-xs font-medium hover:brightness-110 transition flex items-center gap-1.5">
            Повідомлення <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

function GradesTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button className="w-7 h-7 rounded-lg border bg-card flex items-center justify-center" aria-label="Попередній модуль">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 rounded-lg border bg-card text-sm">
            Змістовий модуль 1
          </span>
          <button className="w-7 h-7 rounded-lg border bg-card flex items-center justify-center" aria-label="Наступний модуль">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* TODO(backend): режим редагування -> PATCH grades */}
        <button className="px-4 py-1.5 rounded-full bg-[var(--color-brand)] text-white text-xs font-medium hover:brightness-110 transition flex items-center gap-1.5">
          Редагувати <Pencil className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="bg-card rounded-2xl border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <th className="text-left font-medium px-5 py-3">ПІБ Студента</th>
              {GRADE_TOPICS.map((t) => (
                <th key={t.title} className="font-medium px-3 py-3 whitespace-nowrap">
                  {t.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GROUP_STUDENTS.map((s) => (
              <tr key={s.id} className="border-b last:border-b-0">
                <td className="px-5 py-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <StudentAvatar name={s.name} />
                    <span className="truncate text-sm">{s.name}</span>
                  </div>
                </td>
                {GRADES_TABLE[s.id].map((score, i) => (
                  <td key={i} className="text-center px-3 py-2.5 whitespace-nowrap">
                    {score} / {GRADE_TOPICS[i].max}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AttendanceTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button className="w-7 h-7 rounded-lg border bg-card flex items-center justify-center" aria-label="Попередній період">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 rounded-lg border bg-card text-sm">
            {ATTENDANCE_RANGE}
          </span>
          <button className="w-7 h-7 rounded-lg border bg-card flex items-center justify-center" aria-label="Наступний період">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* TODO(backend): режим редагування -> PATCH attendance */}
        <button className="px-4 py-1.5 rounded-full bg-[var(--color-brand)] text-white text-xs font-medium hover:brightness-110 transition flex items-center gap-1.5">
          Редагувати <Pencil className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="bg-card rounded-2xl border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <th className="text-left font-medium px-5 py-3">ПІБ Студента</th>
              {ATTENDANCE_DATES.map((d) => (
                <th key={d} className="font-medium px-2 py-3 whitespace-nowrap">
                  {d.slice(0, 5)}
                  <br />
                  {d.slice(6)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GROUP_STUDENTS.map((s) => (
              <tr key={s.id} className="border-b last:border-b-0">
                <td className="px-5 py-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <StudentAvatar name={s.name} />
                    <span className="truncate text-sm">{s.name}</span>
                  </div>
                </td>
                {ATTENDANCE_TABLE[s.id].map((present, i) => (
                  <td key={i} className="text-center px-2 py-2.5">
                    {present ? (
                      <Check className="w-4 h-4 text-[var(--color-lime)] inline" />
                    ) : (
                      <X className="w-4 h-4 text-red-500 inline" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function GroupJournalPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = use(params);
  const [tab, setTab] = useState(TABS[0]);

  const group = TEACHER_GROUPS.find((g) => g.id === groupId) ?? TEACHER_GROUPS[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">
        {group.subject} ({group.name})
      </h1>

      <div className="flex items-center gap-3">
        <Link
          href="/journal"
          className="w-9 h-9 rounded-full bg-card border flex items-center justify-center hover:border-[var(--color-brand)] transition"
          aria-label="Назад до груп"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PillTabs tabs={TABS} active={tab} onChange={setTab} />
      </div>

      {tab === "Список" && <ListTab />}
      {tab === "Оцінки" && <GradesTab />}
      {tab === "Відвідуваність" && <AttendanceTab />}
    </div>
  );
}
