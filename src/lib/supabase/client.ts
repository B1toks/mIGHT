import { createBrowserClient } from "@supabase/ssr";

// Клієнт ДЛЯ БРАУЗЕРА (Client Components).
// createBrowserClient — singleton: скільки разів не виклич,
// під капотом повертається той самий інстанс, тому його безпечно
// викликати в будь-якому компоненті без useMemo.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
