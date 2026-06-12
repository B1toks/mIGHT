"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Link2,
  MoreHorizontal,
} from "lucide-react";
import PillTabs from "@/components/PillTabs";
import { COURSES, COURSE_DETAILS, COURSE_NEWS, TOPICS } from "@/data/mock";

// Сторінка курсу: таби «Про курс / Завдання / Новини» —
// усі три за макетами (course info / modules / news student user).

const TABS = ["Про курс", "Завдання", "Новини"];

function AccordionRow({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left font-medium hover:text-[var(--color-brand)] transition-colors"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="pb-4 text-sm text-muted-foreground">{content}</p>}
    </div>
  );
}

// Права колонка (викладач + консультації) — спільна для
// табів «Про курс» і «Новини», як у макеті.
function TeacherColumn({
  details,
}: {
  details: (typeof COURSE_DETAILS)["ux-ui-design"];
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border p-6 text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-200 to-amber-200 mx-auto" />
        <p className="font-semibold mt-4">{details.teacher.name}</p>

        <div className="flex justify-center gap-2 mt-4">
          {details.teacher.contacts.map((c) => (
            <button
              key={c}
              className="px-4 py-1.5 rounded-full border text-xs font-medium hover:border-[var(--color-brand)] transition"
            >
              {c}
            </button>
          ))}
        </div>

        <button className="w-full mt-4 py-2 rounded-full bg-[var(--color-brand)] text-white text-sm font-medium hover:brightness-110 transition">
          Повідомлення
        </button>
      </div>

      <div className="space-y-2">
        <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-[var(--color-lime)] text-white">
          Консультації
        </span>
        {details.consultations.map((c) => (
          <div
            key={c.kind}
            className="bg-white dark:bg-zinc-900 rounded-xl border p-4 flex items-start justify-between gap-2"
          >
            <div>
              <p className="text-sm font-semibold">{c.kind}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{c.text}</p>
            </div>
            {c.hasLink && (
              <button
                className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 hover:border-[var(--color-brand)] transition"
                aria-label="Посилання на зустріч"
              >
                <Link2 className="w-4 h-4 text-[var(--color-brand)]" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [tab, setTab] = useState(TABS[0]);

  const course = COURSES.find((c) => c.id === id);
  const details =
    COURSE_DETAILS[id as keyof typeof COURSE_DETAILS] ?? COURSE_DETAILS["ux-ui-design"];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">{course?.title ?? details.title}</h1>

      <div className="flex items-center gap-3">
        <Link
          href="/courses"
          className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border flex items-center justify-center hover:border-[var(--color-brand)] transition"
          aria-label="Назад до курсів"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PillTabs tabs={TABS} active={tab} onChange={setTab} />
      </div>

      {tab === "Про курс" && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 items-start">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border p-6">
            <h2 className="text-lg font-semibold">Інформація</h2>

            <div className="flex gap-2 mt-3 flex-wrap">
              {details.chips.map((chip) => (
                <span
                  key={chip.label}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${chip.className}`}
                >
                  {chip.label}
                </span>
              ))}
            </div>

            <div className="mt-4">
              {details.sections.map((s) => (
                <AccordionRow key={s.title} title={s.title} content={s.content} />
              ))}
            </div>
          </div>

          <TeacherColumn details={details} />
        </div>
      )}

      {tab === "Завдання" && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Теми курсу</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {TOPICS.map((t) => (
              <Link
                key={t.id}
                href={`/courses/${id}/topic/${t.id}`}
                className="flex items-center justify-between px-4 py-3 rounded-xl border hover:border-[var(--color-brand)] transition text-sm"
              >
                {t.title}
                {t.done && (
                  <span className="w-[18px] h-[18px] rounded bg-[var(--color-lime)] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {tab === "Новини" && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 items-start">
          <div className="space-y-4">
            {COURSE_NEWS.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl border p-6"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{post.title}</h3>
                  <button className="text-gray-400 hover:text-foreground transition shrink-0" aria-label="Дії">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-200 to-amber-200 shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    {post.author} · {post.timeAgo}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed">{post.body}</p>
              </article>
            ))}
          </div>

          <TeacherColumn details={details} />
        </div>
      )}
    </div>
  );
}
