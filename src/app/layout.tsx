import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mIGHT — студентський кабінет",
  description: "Система для взаємодії студентів з навчальним процесом",
};

// Кореневий лейаут навмисно мінімальний: шрифти, глобальні стилі, провайдери.
// Оболонка застосунку (Sidebar/Topbar/Messenger) живе в (app)/layout.tsx,
// auth-екрани мають власний порожній лейаут у (auth)/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          bg-white text-gray-900
          dark:bg-black dark:text-white
          transition-all duration-300 ease-in-out
        `}
      >
        <Providers>
          {children}
          <ThemeToggle />
        </Providers>
      </body>
    </html>
  );
}
