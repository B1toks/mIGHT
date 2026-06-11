import { redirect } from "next/navigation";

// Server Component: рішення "куди вести з кореня" приймається на сервері,
// до того як браузер отримає хоч один байт UI.
// TODO(backend): коли підключимо auth — читати сесію і вести
// залогінених одразу на /dashboard.
export default function Home() {
  redirect("/login");
}
