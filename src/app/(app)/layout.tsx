import Messenger from "@/components/Messenger/MessengerApp";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

// Оболонка для залогінених розділів: сайдбар + топбар + плаваючий месенджер.
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
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
          {children}
        </main>
      </div>
      <Messenger />
    </div>
  );
}
