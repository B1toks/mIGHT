import Link from "next/link";

// Лейаут auth-екранів: без сайдбара, топбара й месенджера —
// користувач ще не в системі, йому нічого з цього не належить бачити.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-50 dark:bg-zinc-950">
      <Link href="/" className="mb-8 text-3xl font-bold tracking-tight">
        m<span className="text-blue-600">IGHT</span>
      </Link>
      {children}
    </div>
  );
}
