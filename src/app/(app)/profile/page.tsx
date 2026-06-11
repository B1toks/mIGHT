"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PillTabs from "@/components/PillTabs";
import { STUDENT_PROFILE } from "@/data/mock";

// «Особистий кабінет» з макета: таби Інформація / Налаштування / Безпека.
// Повністю перемальований таб «Інформація»; решта — наступні екрани макета.

const TABS = ["Інформація", "Налаштування", "Безпека"];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold mt-0.5">{value}</p>
    </div>
  );
}

export default function ProfilePage() {
  const [tab, setTab] = useState(TABS[0]);
  const p = STUDENT_PROFILE;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Особистий кабінет</h1>

      <div className="flex items-center gap-3">
        <Link
          href="/main"
          className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border flex items-center justify-center hover:border-[var(--color-brand)] transition"
          aria-label="Назад"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PillTabs tabs={TABS} active={tab} onChange={setTab} />
      </div>

      {tab === "Інформація" && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border p-6 space-y-4">
          <h2 className="text-lg font-semibold">Персональна інформація</h2>

          <div className="rounded-xl border p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{p.fullName}</p>
              <p className="text-sm text-muted-foreground">{p.roleLabel}</p>
              <p className="text-xs text-muted-foreground">{p.email}</p>
            </div>
            {/* TODO(backend): signOut + редірект на /login */}
            <button className="px-5 py-2 rounded-full bg-[var(--color-brand)] text-white text-sm font-medium hover:brightness-110 transition shrink-0">
              Вийти з акаунту
            </button>
          </div>

          <div className="rounded-xl border p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
            <Field label="Ім'я" value={p.firstName} />
            <Field label="Прізвище" value={p.lastName} />
            <Field label="По батькові" value={p.middleName} />
            <Field label="Email" value={p.email} />
            <Field label="Номер телефону" value={p.phone} />
            <Field label="Спеціальність" value={p.speciality} />
            <Field label="Група" value={p.group} />
            <Field label="Зареєстрована з" value={p.registeredAt} />
          </div>
        </div>
      )}

      {tab === "Налаштування" && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border p-10 text-center text-muted-foreground">
          Налаштування (тема, сповіщення) — наступний екран макета.
        </div>
      )}

      {tab === "Безпека" && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border p-10 text-center text-muted-foreground">
          Безпека (пароль, 2-етапна перевірка) — наступний екран макета.
        </div>
      )}
    </div>
  );
}
