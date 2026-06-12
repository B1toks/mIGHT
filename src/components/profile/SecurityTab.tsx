"use client";

import { CONNECTED_ACCOUNTS } from "@/data/mock";

// Таб «Безпека» кабінету (account security student user):
// зміна пароля з вимогами + 2-етапна аутентифікація.

function PasswordField({ label }: { label: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input
        type="password"
        placeholder="••••••••••••"
        className="w-full mt-1 rounded-xl border px-3 py-2 text-sm bg-transparent focus:outline-none focus:border-[var(--color-brand)]"
      />
    </div>
  );
}

export default function SecurityTab() {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border p-6">
        <h2 className="text-lg font-semibold">Пароль</h2>
        <p className="text-xs text-muted-foreground mt-0.5 mb-4">
          Змініть пароль, якщо вважаєте, що він міг бути скомпрометований
        </p>

        {/* TODO(backend): updateUser({ password }) після перевірки поточного */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <PasswordField label="Поточний пароль" />
          <div className="hidden sm:block" />
          <PasswordField label="Новий пароль" />
          <PasswordField label="Підтвердіть новий пароль" />
        </div>

        <ul className="mt-4 space-y-1 text-xs text-muted-foreground list-disc list-inside">
          <li>Принаймні 1 велика літера</li>
          <li>Принаймні 1 цифра</li>
          <li>Принаймні 8 символів</li>
        </ul>

        <button className="mt-4 px-5 py-2 rounded-full bg-[var(--color-brand)] text-white text-sm font-medium hover:brightness-110 transition">
          Зберегти зміни
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border p-6">
        <h2 className="text-lg font-semibold mb-4">2-етапна аутентифікація</h2>

        <div className="space-y-3 max-w-2xl">
          {CONNECTED_ACCOUNTS.map((acc) => (
            <div
              key={acc.id}
              className="flex items-center gap-3 border rounded-xl p-3"
            >
              <span className="w-9 h-9 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300 shrink-0">
                {acc.name[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{acc.name}</p>
                <p className="text-xs text-muted-foreground truncate">{acc.email}</p>
              </div>
              {acc.connected ? (
                <button className="px-4 py-1.5 rounded-full bg-[var(--color-brand)] text-white text-xs font-medium hover:brightness-110 transition shrink-0">
                  Відключити
                </button>
              ) : (
                <button className="px-4 py-1.5 rounded-full border text-xs font-medium hover:border-[var(--color-brand)] transition shrink-0">
                  Підключити
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
