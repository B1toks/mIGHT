"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Підменю адмін-консолі. У макеті адмінка має власну навігацію
// (структурна карта administrator user structure) — hi-fi ще немає,
// тому тримаємось загального стилю pill-табів.
const ITEMS = [
  { href: "/admin", label: "Дашборд" },
  { href: "/admin/users", label: "Користувачі" },
  { href: "/admin/courses", label: "Курси" },
  { href: "/admin/schedule", label: "Розклад" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {ITEMS.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              active
                ? "px-5 py-1.5 rounded-full text-sm font-medium bg-[var(--color-brand)] text-white"
                : "px-5 py-1.5 rounded-full text-sm font-medium bg-white dark:bg-zinc-900 border text-gray-700 dark:text-gray-300 hover:border-[var(--color-brand)] transition-colors"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
