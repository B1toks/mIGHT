"use client";

import { Home, GraduationCap, SquarePen, TrendingUp, Users, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, href: "/main", tooltip: "Головна" },
  { icon: GraduationCap, href: "/courses", tooltip: "Мої курси" },
  { icon: SquarePen, href: "/tasks", tooltip: "Мої завдання" },
  { icon: TrendingUp, href: "/progress", tooltip: "Успішність" },
  // TODO(role): пункт «Журнал» — тільки для викладача
  { icon: Users, href: "/journal", tooltip: "Журнал" },
  // TODO(role): пункт «Адмін» — тільки для адміністратора кафедри
  { icon: Settings, href: "/admin", tooltip: "Адміністрування" },
];

// Сайдбар з макета: вузька біла колонка, аватар згори,
// активний пункт — лаймова «пігулка» за темною іконкою.
const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-16 bg-white dark:bg-zinc-900 border-r flex flex-col items-center py-4 gap-3 shrink-0">
      <Link href="/profile" aria-label="Особистий кабінет">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 mb-4 cursor-pointer ring-2 ring-transparent hover:ring-[var(--color-brand)] transition" />
      </Link>

      {navItems.map(({ icon: Icon, href, tooltip }) => {
        const active = pathname.startsWith(href);
        return (
          <Link key={href} href={href} className="group relative">
            <span
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
                active
                  ? "bg-[var(--color-lime-soft)] text-gray-900"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
              )}
            >
              <Icon className="w-5 h-5" />
            </span>
            <span className="absolute z-50 left-14 top-1/2 -translate-y-1/2 text-sm bg-zinc-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
              {tooltip}
            </span>
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;
