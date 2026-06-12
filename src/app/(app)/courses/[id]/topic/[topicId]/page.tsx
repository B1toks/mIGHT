"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Paperclip,
  MonitorPlay,
  FileText,
  ClipboardList,
  Download,
  ArrowRight,
  Upload,
} from "lucide-react";
import {
  COURSES,
  TOPICS,
  TOPIC_MATERIALS,
  TOPIC_HOMEWORK,
  type Material,
} from "@/data/mock";

// Сторінка теми курсу з макета: зліва список тем із позначками,
// справа таби «Матеріали» (course materials student user) та
// «Завдання» (course homework student user).

const KIND_ICON = {
  file: Paperclip,
  video: MonitorPlay,
  text: FileText,
  test: ClipboardList,
};

function MaterialRow({ material }: { material: Material }) {
  const Icon = KIND_ICON[material.kind];
  return (
    <div className="flex items-center gap-3 border rounded-xl p-3">
      <span className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-zinc-800 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-[var(--color-brand)]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{material.title}</p>
        <p className="text-xs text-muted-foreground">{material.subtitle}</p>
      </div>
      {/* TODO(backend): реальні файли/посилання з таблиці materials */}
      <button className="px-4 py-1.5 rounded-full bg-[var(--color-brand)] text-white text-xs font-medium hover:brightness-110 transition flex items-center gap-1.5 shrink-0">
        {material.action === "import" ? (
          <>
            Імпортувати <Download className="w-3.5 h-3.5" />
          </>
        ) : (
          <>
            Переглянути <ArrowRight className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </div>
  );
}

export default function TopicPage({
  params,
}: {
  params: Promise<{ id: string; topicId: string }>;
}) {
  const { id, topicId } = use(params);
  const [tab, setTab] = useState<"Матеріали" | "Завдання">("Матеріали");
  const [comment, setComment] = useState("");

  const course = COURSES.find((c) => c.id === id);
  const topic = TOPICS.find((t) => String(t.id) === topicId) ?? TOPICS[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">
        {course?.title ?? "Курс"} / {topic.title}
      </h1>

      <div className="flex items-center gap-3">
        <Link
          href={`/courses/${id}`}
          className="w-9 h-9 rounded-full bg-card border flex items-center justify-center hover:border-[var(--color-brand)] transition"
          aria-label="Назад до курсу"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        {(["Матеріали", "Завдання"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              t === tab
                ? "px-5 py-1.5 rounded-full text-sm font-medium bg-[var(--color-brand)] text-white"
                : "px-5 py-1.5 rounded-full text-sm font-medium bg-card border hover:border-[var(--color-brand)] transition"
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 items-start">
        {/* Список тем */}
        <div className="bg-card rounded-2xl border p-2">
          {TOPICS.map((t) => (
            <Link
              key={t.id}
              href={`/courses/${id}/topic/${t.id}`}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition ${
                String(t.id) === topicId ? "bg-gray-50 dark:bg-zinc-800 font-medium" : ""
              }`}
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

        {tab === "Матеріали" ? (
          <div className="bg-card rounded-2xl border p-6">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="text-lg font-semibold">Матеріали</h2>
              <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition">
                <span className="w-[18px] h-[18px] rounded bg-[var(--color-lime)] flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </span>
                Все відмітити виконаним
              </button>
            </div>

            <div className="space-y-3">
              {TOPIC_MATERIALS.map((m) => (
                <MaterialRow key={m.id} material={m} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-card rounded-2xl border p-6">
              <h2 className="text-lg font-semibold mb-2">Домашнє завдання</h2>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {TOPIC_HOMEWORK.description}
              </p>
            </div>

            <div className="bg-card rounded-2xl border p-6">
              <h2 className="text-lg font-semibold">Завантажити файл</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Завантажте виконану роботу і додайте короткий опис:
              </p>
              <p className="text-sm font-medium mt-3">
                Максимальна кількість балів: {TOPIC_HOMEWORK.maxScore}
              </p>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Напишіть ваш коментар"
                rows={3}
                className="w-full mt-2 rounded-xl border p-3 text-sm bg-transparent resize-none focus:outline-none focus:border-[var(--color-brand)]"
              />

              <p className="text-sm font-medium mt-4 mb-2">Прикріпити файл:</p>
              {/* TODO(backend): завантаження у storage + запис у submissions */}
              <label className="block border-2 border-dashed rounded-xl p-8 text-center text-sm text-muted-foreground cursor-pointer hover:border-[var(--color-brand)] transition">
                <input type="file" className="hidden" />
                Додати файл
                <span className="block text-xs mt-1">
                  або перетягніть файл в це вікно
                </span>
              </label>

              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-muted-foreground">
                  Максимальна вага файлу: {TOPIC_HOMEWORK.maxFileSize}
                </p>
                <button className="px-5 py-2 rounded-full bg-[var(--color-brand)] text-white text-sm font-medium hover:brightness-110 transition flex items-center gap-2">
                  Відправити <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
