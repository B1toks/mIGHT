import Messenger from "@/components/Messenger/MessengerApp";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

// Оболонка для залогінених розділів: сайдбар (≥md) + топбар +
// нижня навігація (<md) + плаваючий месенджер.
// Route group (app) не впливає на URL — /courses лишається /courses.
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 animate-fade-in bg-[var(--color-page)] dark:bg-background">
          {children}
        </main>
      </div>
      <Messenger />
      <MobileNav />
    </div>
  );
}
