"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, MessageCircle } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { NOTIFICATIONS } from "@/data/mock";

// Топбар з макета: логотип mIGHT зліва, дзвіночок (з дропдауном
// сповіщень, фрейм dropdown_header) і чат справа.
const Topbar = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasUnread = NOTIFICATIONS.some((n) => n.unread);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="h-16 bg-card border-b flex items-center justify-between px-4 md:px-8 shrink-0">
      <Link href="/main" className="select-none">
        <span className="text-2xl font-black italic text-[var(--color-brand)] tracking-tight">
          MIGHT
          <span className="text-[10px] font-bold not-italic align-sub ml-0.5">LMS</span>
        </span>
      </Link>

      <div className="flex items-center gap-5">
        <ThemeToggle />
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="relative text-gray-700 dark:text-gray-300 hover:text-[var(--color-brand)] transition-colors block"
            aria-label="Сповіщення"
          >
            <Bell className="w-5 h-5" />
            {hasUnread && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--color-brand)]" />
            )}
          </button>

          {open && (
            <div className="absolute right-0 top-9 z-50 w-80 bg-card rounded-2xl border shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <p className="font-semibold text-sm">Сповіщення</p>
                {/* TODO(backend): PATCH notifications/read-all */}
                <button className="text-xs text-[var(--color-brand)] hover:underline">
                  Прочитати всі
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y">
                {NOTIFICATIONS.map((n) => (
                  <div key={n.id} className="px-4 py-3 flex gap-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
                    <span
                      className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                        n.unread ? "bg-[var(--color-brand)]" : "bg-gray-300 dark:bg-zinc-700"
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.text}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          className="relative text-gray-700 dark:text-gray-300 hover:text-[var(--color-brand)] transition-colors"
          aria-label="Повідомлення"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--color-brand)]" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
