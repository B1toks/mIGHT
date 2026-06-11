"use client";

import Link from "next/link";
import { Bell, MessageCircle } from "lucide-react";

// Топбар з макета: логотип mIGHT зліва, дзвіночок і чат справа
// з синіми крапками-індикаторами непрочитаного.
const Topbar = () => {
  return (
    <header className="h-16 bg-white dark:bg-zinc-900 border-b flex items-center justify-between px-8 shrink-0">
      <Link href="/main" className="select-none">
        <span className="text-2xl font-black italic text-[var(--color-brand)] tracking-tight">
          MIGHT
          <span className="text-[10px] font-bold not-italic align-sub ml-0.5">LMS</span>
        </span>
      </Link>

      <div className="flex items-center gap-5">
        <button
          className="relative text-gray-700 dark:text-gray-300 hover:text-[var(--color-brand)] transition-colors"
          aria-label="Сповіщення"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--color-brand)]" />
        </button>
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
