import {
  SUBJECT_GRADES,
  RECENT_GRADES,
  RECENT_GRADES_RANGE,
  ASSESSMENT_MARKERS,
  type CalendarMarker,
} from "@/data/mock";

// «Успішність» з макета: картки предметів зі шкалою, останні оцінки
// кружечками, міні-календар ДЗ/тестів/екзаменів. Server Component.

const SEGMENTS = 14;

function SubjectCard({
  subject,
  teacher,
  score,
  max,
  progress,
}: (typeof SUBJECT_GRADES)[number]) {
  const filled = Math.round((progress / 100) * SEGMENTS);
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold">{subject}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Викладач: {teacher}</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[var(--color-brand)] text-white text-xs font-semibold shrink-0">
          {score}/{max}
        </span>
      </div>

      <div className="flex items-center gap-3 mt-4">
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
        <span className="text-xs text-muted-foreground w-8 text-right">{progress}%</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">Прогрес</p>
    </div>
  );
}

const MARKER_STYLE: Record<CalendarMarker, string> = {
  hw: "bg-[var(--color-lime)] text-white",
  test: "bg-emerald-700 text-white",
  exam: "bg-[var(--color-brand)] text-white",
};

function AssessmentCalendar() {
  // Лютий 2025: 1-ше — субота (індекс 5 при тижні з Пн).
  const firstDayOffset = 5;
  const daysInMonth = 28;
  const cells: (number | null)[] = [
    ...Array.from({ length: firstDayOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      <h3 className="font-semibold mb-3">Домашні завдання та тести</h3>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((d) => (
          <span key={d} className="text-xs font-medium text-muted-foreground py-1">
            {d}
          </span>
        ))}
        {cells.map((day, i) => (
          <span
            key={i}
            className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-xs ${
              day && ASSESSMENT_MARKERS[day]
                ? MARKER_STYLE[ASSESSMENT_MARKERS[day]]
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {day ?? ""}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-lime)]" /> Домашнє завдання
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" /> Тест
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand)]" /> Екзамен
        </span>
      </div>
    </div>
  );
}

export default function ProgressPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Успішність</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-4 items-start">
        <div className="space-y-4">
          {SUBJECT_GRADES.map((g) => (
            <SubjectCard key={g.id} {...g} />
          ))}
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold">Останні оцінки</h3>
              <span className="px-3 py-1 rounded-full bg-lime-100 text-lime-800 text-xs font-medium">
                {RECENT_GRADES_RANGE}
              </span>
            </div>

            <div className="flex items-start gap-3 mt-5 flex-wrap">
              {RECENT_GRADES.map((g, i) => (
                <div key={i} className="text-center w-14">
                  <span
                    className={`mx-auto flex items-center justify-center rounded-full font-semibold ${
                      g.highlighted
                        ? "w-12 h-12 bg-[var(--color-brand)] text-white text-base"
                        : "w-10 h-10 mt-1 bg-blue-100 text-[var(--color-brand)] text-sm"
                    }`}
                  >
                    {g.value}
                  </span>
                  <p className="text-[10px] text-[var(--color-brand)] mt-1.5 leading-tight">
                    {g.subject}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <AssessmentCalendar />
        </div>
      </div>
    </div>
  );
}
