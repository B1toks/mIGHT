import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Освіження сесії між запитами.
// Access token Supabase живе ~1 годину. Server Component не може
// записати оновлений токен у куку (заголовки вже відправлені),
// тому єдине місце, де токен можна оновити ДО рендеру, — middleware.
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Пишемо куки у ДВА місця:
          // 1) request — щоб Server Components цього ж запиту
          //    бачили вже свіжий токен;
          // 2) response — щоб браузер зберіг його для наступних запитів.
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // ВАЖЛИВО: getUser(), а не getSession().
  // getSession() просто декодує JWT з куки і ВІРИТЬ їй — підроблену куку
  // він не помітить. getUser() ходить на сервер Supabase Auth і валідує
  // токен криптографічно. У middleware та будь-якому серверному коді,
  // що приймає рішення про доступ, — тільки getUser().
  await supabase.auth.getUser();

  return supabaseResponse;
}
