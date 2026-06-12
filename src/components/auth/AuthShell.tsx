import Link from "next/link";

// Центрований контейнер для реєстрації та відновлення пароля.
export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-50 dark:bg-zinc-950">
      <Link href="/" className="mb-8 text-3xl font-black italic text-[var(--color-brand)] tracking-tight">
        MIGHT
        <span className="text-[11px] font-bold not-italic align-sub ml-0.5">LMS</span>
      </Link>
      {children}
    </div>
  );
}
