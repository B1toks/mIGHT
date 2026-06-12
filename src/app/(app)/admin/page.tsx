import { Users, GraduationCap, BookOpen, CalendarCheck } from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";
import ScheduleCalendar from "@/components/ScheduleCalendar";
import { ADMIN_STATS, NOTIFICATIONS } from "@/data/mock";

// Адмін-дашборд за структурною картою (Календар, к-сть студентів,
// к-сть викладачів, активні курси, відвідуваність, сповіщення).
// Hi-fi макета немає — заглушка у стилі mIGHT.
// TODO(role): доступ лише адміну кафедри.

const STATS = [
  { icon: Users, label: "Студентів", value: ADMIN_STATS.students, accent: "bg-blue-50 text-[var(--color-brand)]" },
  { icon: GraduationCap, label: "Викладачів", value: ADMIN_STATS.teachers, accent: "bg-lime-50 text-lime-600" },
  { icon: BookOpen, label: "Активних курсів", value: ADMIN_STATS.activeCourses, accent: "bg-amber-50 text-amber-600" },
  { icon: CalendarCheck, label: "Відвідуваність тижня", value: `${ADMIN_STATS.attendance}%`, accent: "bg-emerald-50 text-emerald-600" },
];

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Адміністрування</h1>
      <AdminNav />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ icon: Icon, label, value, accent }) => (
          <div key={label} className="bg-card rounded-2xl border p-5">
            <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent} dark:bg-zinc-800`}>
              <Icon className="w-5 h-5" />
            </span>
            <p className="text-3xl font-bold mt-3">{value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4 items-start">
        <ScheduleCalendar />

        <div className="bg-card rounded-2xl border p-5">
          <h2 className="font-semibold mb-3">Останні сповіщення</h2>
          <div className="divide-y">
            {NOTIFICATIONS.map((n) => (
              <div key={n.id} className="py-3 flex gap-2">
                <span
                  className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                    n.unread ? "bg-[var(--color-brand)]" : "bg-gray-300 dark:bg-zinc-700"
                  }`}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{n.text}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
