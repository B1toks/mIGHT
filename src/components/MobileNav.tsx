"use client";

import { Home, GraduationCap, SquarePen, TrendingUp, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Нижня навігація для мобільних (<md). Макет існує лише для 1440px,
// тому це наше адаптивне рішення в стилі mIGHT: ті самі розділи,
// що в сайдбарі, + кабінет.
const items = [
  { icon: Home, href: "/main", label: "Головна" },
  { icon: GraduationCap, href: "/courses", label: "Курси" },
  { icon: SquarePen, href: "/tasks", label: "Завдання" },
  { icon: TrendingUp, href: "/progress", label: "Звіти" },
  { icon: User, href: "/profile", label: "Кабінет" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card border-t flex justify-around py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
      {items.map(({ icon: Icon, href, label }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px]",
              active
                ? "text-[var(--color-brand)]"
                : "text-gray-500 dark:text-gray-400"
            )}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
