import Link from "next/link";
import type { Course } from "@/data/mock";

// Картка курсу з макета: назва, викладач, сегментований прогрес-бар + %.
const SEGMENTS = 10;

export default function CourseCard({ course }: { course: Course }) {
  const filled = Math.round((course.progress / 100) * SEGMENTS);

  return (
    <Link
      href={`/courses/${course.id}`}
      className="block bg-white dark:bg-zinc-900 rounded-2xl border p-5 hover:shadow-md hover:border-[var(--color-brand)]/40 transition"
    >
      <h3 className="font-semibold text-lg leading-snug">{course.title}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Викладач: {course.teacher}
      </p>

      <div className="mt-5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 flex-1">
            {Array.from({ length: SEGMENTS }, (_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i < filled ? "bg-[var(--color-lime)]" : "bg-gray-200 dark:bg-zinc-700"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground w-9 text-right">
            {course.progress}%
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">Прогрес</p>
      </div>
    </Link>
  );
}
