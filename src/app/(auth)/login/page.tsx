"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/store/authSlice";
import { USERS } from "@/lib/constants";
import { loginSchema, type LoginValues } from "@/lib/validation/auth";

// Логін з макетів «registration student» (світла картка, рожева
// ілюстрація) та «registration teacher» (темна картка, зелена) —
// одна сторінка з перемикачем ролі, що міняє варіант оформлення.

type RoleVariant = "student" | "teacher";

const VARIANT = {
  student: {
    page: "bg-rose-100 dark:bg-rose-950",
    blobA: "bg-rose-200 dark:bg-rose-900",
    blobB: "bg-pink-300/60 dark:bg-pink-800/60",
    emoji: "👩‍🎓",
    card: "bg-white text-gray-900",
    input: "border-gray-200 placeholder-gray-400",
    divider: "text-gray-400",
    registerHref: "/register/student",
  },
  teacher: {
    page: "bg-lime-100 dark:bg-lime-950",
    blobA: "bg-lime-200 dark:bg-lime-900",
    blobB: "bg-green-300/60 dark:bg-green-800/60",
    emoji: "👨‍🏫",
    card: "bg-[#101a30] text-white",
    input: "border-zinc-600 placeholder-zinc-500",
    divider: "text-zinc-400",
    registerHref: "/register/teacher",
  },
} as const;

export default function LoginPage() {
  const [role, setRole] = useState<RoleVariant>("student");
  const [formError, setFormError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const v = VARIANT[role];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: "", password: "" },
  });

  const onSubmit = (values: LoginValues) => {
    setFormError(null);
    // TODO(backend): Supabase Auth / NestJS. Демо-міст: student/student,
    // teacher/teacher, admin/admin (логін без домену).
    const username = values.login.split("@")[0];
    const user = USERS[username as keyof typeof USERS];
    if (user && user.password === values.password) {
      dispatch(login({ username, role: user.role }));
      router.push("/dashboard");
    } else {
      setFormError("Невірний логін або пароль.");
    }
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${v.page}`}>
      {/* Ілюстрація — плейсхолдер до експорту графіки з Figma.
          TODO(assets): експортнути ілюстрації з фреймів registration_*  */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        <div className={`absolute w-96 h-96 rounded-full blur-3xl opacity-70 -top-10 -left-10 ${v.blobA}`} />
        <div className={`absolute w-72 h-72 rounded-full blur-3xl opacity-70 bottom-10 right-16 ${v.blobB}`} />
        <span className="text-[10rem] relative select-none">{v.emoji}</span>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className={`w-full max-w-md rounded-2xl shadow-xl p-8 transition-colors duration-300 ${v.card}`}>
          <p className="text-center text-2xl font-black italic text-[var(--color-brand)] tracking-tight select-none">
            MIGHT
            <span className="text-[10px] font-bold not-italic align-sub ml-0.5">LMS</span>
          </p>

          <h1 className="text-center text-2xl font-bold mt-5">
            Ласкаво просимо назад!
          </h1>

          <div className="flex justify-center gap-2 mt-4">
            {(
              [
                ["student", "Я студент"],
                ["teacher", "Я викладач"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setRole(key)}
                className={
                  role === key
                    ? "px-4 py-1 rounded-full text-xs font-medium bg-[var(--color-brand)] text-white"
                    : "px-4 py-1 rounded-full text-xs font-medium border border-current/30 opacity-60 hover:opacity-100 transition"
                }
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            {formError && (
              <p className="text-center text-sm text-red-500">{formError}</p>
            )}

            <div>
              <input
                placeholder="Логін"
                autoComplete="username"
                {...register("login")}
                className={`w-full rounded-full border px-5 py-2.5 text-sm bg-transparent focus:outline-none focus:border-[var(--color-brand)] ${v.input}`}
              />
              {errors.login && (
                <p className="text-xs text-red-500 mt-1 ml-4">{errors.login.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Пароль"
                autoComplete="current-password"
                {...register("password")}
                className={`w-full rounded-full border px-5 py-2.5 text-sm bg-transparent focus:outline-none focus:border-[var(--color-brand)] ${v.input}`}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 ml-4">{errors.password.message}</p>
              )}
              <div className="text-right mt-1.5">
                <Link
                  href="/forgot-password"
                  className={`text-xs hover:underline ${v.divider}`}
                >
                  Забули пароль?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-full bg-[var(--color-brand)] text-white font-medium hover:brightness-110 transition"
            >
              Увійти
            </button>
          </form>

          <p className={`text-center text-xs mt-5 ${v.divider}`}>або продовжити з</p>

          {/* TODO(backend): OAuth Google/Facebook через auth-провайдера */}
          <div className="flex justify-center gap-3 mt-3">
            <button
              className="w-10 h-10 rounded-full bg-blue-50 dark:bg-zinc-800 flex items-center justify-center text-sm font-bold text-[var(--color-brand)] hover:brightness-95 transition"
              aria-label="Увійти через Google"
            >
              G
            </button>
            <button
              className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-zinc-800 flex items-center justify-center text-sm font-bold text-[var(--color-brand)] hover:brightness-95 transition"
              aria-label="Увійти через Facebook"
            >
              f
            </button>
          </div>

          <p className={`text-center text-xs mt-6 ${v.divider}`}>
            Ще не маєте акаунту?{" "}
            <Link
              href={v.registerHref}
              className="text-[var(--color-lime)] font-medium hover:underline"
            >
              Зареєструватись
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
