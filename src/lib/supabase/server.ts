import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Клієнт ДЛЯ СЕРВЕРА (Server Components, Server Actions, Route Handlers).
// На сервері немає document.cookie — сесія живе в HTTP-куках запиту,
// тому ми вручну пояснюємо клієнту, ЯК читати й писати куки через
// next/headers. Викликати в кожному запиті заново — клієнт навмисно
// НЕ singleton, бо кожен запит має свої куки (свого користувача!).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component не має права писати куки (рендер уже
            // стрімиться клієнту, заголовки відправлені). Це не помилка:
            // оновлення токена в куку зробить middleware на наступному
            // запиті — див. src/lib/supabase/middleware.ts
          }
        },
      },
    }
  );
}
