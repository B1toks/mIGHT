import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ScheduleCalendar from "@/components/ScheduleCalendar";
import { DASHBOARD } from "@/data/mock";

// Головна студента. Server Component: вся статика рендериться на сервері,
// інтерактивний тільки календар (лінія поточного часу).

function SemesterGauge() {
  // Півколо-шкала з макета: градієнтна дуга на синій картці.
  return (
    <svg viewBox="0 0 200 110" className="w-44 mx-auto">
      <defs>
        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d9f99d" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>
      <path
        d="M 20 100 A 80 80 0 0 1 180 100"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M 20 100 A 80 80 0 0 1 100 20"
        fill="none"
        stroke="url(#gaugeGrad)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <text
        x="100"
        y="95"
        textAnchor="middle"
        className="fill-white"
        fontSize="44"
        fontWeight="700"
      >
        {DASHBOARD.semesterDaysLeft}
      </text>
    </svg>
  );
}

function StatCard({
  value,
  label,
  href,
}: {
  value: number;
  label: string;
  href: string;
}) {
  return (
    <div className="bg-card rounded-2xl border p-5 flex items-start justify-between">
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      </div>
      <Link
        href={href}
        className="w-10 h-10 rounded-full bg-[var(--color-lime)] flex items-center justify-center text-white hover:brightness-95 transition"
        aria-label={label}
      >
        <ArrowUpRight className="w-5 h-5" />
      </Link>
    </div>
  );
}

export default function MainPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Головна</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_1fr] gap-4">
        <div className="bg-[var(--color-brand)] rounded-2xl p-5 text-white row-span-2">
          <p className="font-medium">До кінця семестру</p>
          <div className="mt-4">
            <SemesterGauge />
            <p className="text-center text-xs text-blue-100 mt-1">
              {DASHBOARD.semesterCountdown}
            </p>
          </div>
        </div>

        <StatCard value={DASHBOARD.coursesCount} label="Мої курси" href="/courses" />
        <StatCard value={DASHBOARD.undoneTasks} label="Невиконаних завдань" href="/tasks" />

        <div className="bg-card rounded-2xl border p-4 lg:col-span-2 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-200 to-orange-400 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{DASHBOARD.announcement.author}</p>
            <p className="text-sm text-muted-foreground truncate">
              {DASHBOARD.announcement.text}
            </p>
          </div>
          <Link
            href="/news"
            className="w-10 h-10 rounded-full bg-[var(--color-brand)] flex items-center justify-center text-white shrink-0 hover:brightness-110 transition"
            aria-label="Перейти до новин"
          >
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <ScheduleCalendar />
    </div>
  );
}
