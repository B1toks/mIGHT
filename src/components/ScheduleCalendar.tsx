"use client";

import { useEffect, useState } from "react";
import { WEEK_LESSONS, SUBJECT_BLOCK, type Lesson } from "@/data/mock";

// Тижневий «Робочий календар» з макета: колонки Пн–Нд, вісь часу
// 08:00–16:00, кольорові блоки занять, червона лінія поточного часу.

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const DAY_START = 8 * 60; // 08:00 у хвилинах
const DAY_END = 16 * 60;
const PX_PER_MIN = 56 / 60; // 56px на годину

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

function LessonBlock({ lesson }: { lesson: Lesson }) {
  const top = (toMin(lesson.start) - DAY_START) * PX_PER_MIN;
  const height = (toMin(lesson.end) - toMin(lesson.start)) * PX_PER_MIN;
  return (
    <div
      className={`absolute left-1 right-1 rounded-lg px-2 py-1.5 overflow-hidden ${SUBJECT_BLOCK[lesson.color]}`}
      style={{ top, height: Math.max(height, 22) }}
    >
      <p className="text-[11px] font-semibold leading-tight truncate">{lesson.title}</p>
      {height > 34 && (
        <p className="text-[10px] opacity-70 leading-tight">
          {lesson.start} - {lesson.end}
        </p>
      )}
    </div>
  );
}

export default function ScheduleCalendar({ lessons = WEEK_LESSONS }: { lessons?: Lesson[] }) {
  // Поточний час — лише на клієнті, щоб уникнути hydration mismatch.
  const [now, setNow] = useState<{ day: number; min: number } | null>(null);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setNow({ day: (d.getDay() + 6) % 7, min: d.getHours() * 60 + d.getMinutes() });
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const hours = Array.from(
    { length: (DAY_END - DAY_START) / 60 + 1 },
    (_, i) => DAY_START + i * 60
  );
  const bodyHeight = (DAY_END - DAY_START) * PX_PER_MIN;

  return (
    <div className="bg-card rounded-2xl border p-6">
      <h2 className="text-lg font-semibold mb-4">Робочий календар</h2>

      <div className="overflow-x-auto">
      <div className="grid min-w-[640px]" style={{ gridTemplateColumns: "48px repeat(7, 1fr)" }}>
        <div />
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-sm font-medium text-[var(--color-brand)] pb-3 border-b"
          >
            {d}
          </div>
        ))}

        {/* Вісь часу */}
        <div className="relative" style={{ height: bodyHeight }}>
          {hours.map((m) => (
            <span
              key={m}
              className="absolute -translate-y-1/2 text-[11px] text-gray-400"
              style={{ top: (m - DAY_START) * PX_PER_MIN }}
            >
              {`${String(Math.floor(m / 60)).padStart(2, "0")}:00`}
            </span>
          ))}
        </div>

        {/* Колонки днів */}
        {DAYS.map((_, dayIdx) => (
          <div
            key={dayIdx}
            className="relative border-l first:border-l-0"
            style={{ height: bodyHeight }}
          >
            {hours.map((m) => (
              <div
                key={m}
                className="absolute left-0 right-0 border-t border-gray-100 dark:border-zinc-800"
                style={{ top: (m - DAY_START) * PX_PER_MIN }}
              />
            ))}

            {lessons
              .filter((l) => l.day === dayIdx)
              .map((l) => (
                <LessonBlock key={l.id} lesson={l} />
              ))}

            {now &&
              now.day === dayIdx &&
              now.min >= DAY_START &&
              now.min <= DAY_END && (
                <div
                  className="absolute left-0 right-0 z-10 pointer-events-none"
                  style={{ top: (now.min - DAY_START) * PX_PER_MIN }}
                >
                  <div className="h-px bg-red-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 -mt-1" />
                </div>
              )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
