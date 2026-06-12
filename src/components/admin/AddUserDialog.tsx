"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { AdminRole } from "@/data/mock";

// Модалка «Додати користувача» за вайрфреймами add_user_student/
// teacher/admin: спільні поля + рольове (група / кафедра / права).
// TODO(backend): POST /users + запрошення на email.

const ROLE_FIELD: Record<AdminRole, { label: string; placeholder: string }> = {
  student: { label: "Група", placeholder: "Напр. 1Д-21" },
  teacher: { label: "Кафедра", placeholder: "Напр. Кафедра дизайну" },
  admin: { label: "Зона відповідальності", placeholder: "Напр. Кафедра дизайну" },
};

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full mt-1 rounded-xl border px-3 py-2 text-sm bg-transparent focus:outline-none focus:border-[var(--color-brand)]"
      />
    </div>
  );
}

export default function AddUserDialog({
  role,
  open,
  onClose,
}: {
  role: AdminRole;
  open: boolean;
  onClose: () => void;
}) {
  const [saved, setSaved] = useState(false);
  if (!open) return null;

  const roleField = ROLE_FIELD[role];
  const roleTitle =
    role === "student" ? "студента" : role === "teacher" ? "викладача" : "адміністратора";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-card rounded-2xl border shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Додати {roleTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-foreground transition"
            aria-label="Закрити"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {saved ? (
          <div className="py-10 text-center space-y-3">
            <p className="font-medium">Користувача додано (демо)</p>
            <p className="text-sm text-muted-foreground">
              З беком тут буде створення акаунта і лист-запрошення.
            </p>
            <button
              onClick={() => {
                setSaved(false);
                onClose();
              }}
              className="px-5 py-2 rounded-full bg-[var(--color-brand)] text-white text-sm font-medium hover:brightness-110 transition"
            >
              Готово
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Ім'я" placeholder="Введіть ім'я" />
              <Field label="Прізвище" placeholder="Введіть прізвище" />
              <Field label="По батькові" placeholder="Введіть по батькові" />
              <Field label="Email" placeholder="example@gmail.com" type="email" />
              <Field label="Номер телефону" placeholder="+380 00 000 00 00" />
              <Field label={roleField.label} placeholder={roleField.placeholder} />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full border text-sm font-medium hover:border-[var(--color-brand)] transition"
              >
                Скасувати
              </button>
              <button
                onClick={() => setSaved(true)}
                className="px-5 py-2 rounded-full bg-[var(--color-brand)] text-white text-sm font-medium hover:brightness-110 transition"
              >
                Додати
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
