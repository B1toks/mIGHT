"use client";

import { useState } from "react";
import { Search, Plus, ArrowRight, MoreHorizontal } from "lucide-react";
import PillTabs from "@/components/PillTabs";
import AdminNav from "@/components/admin/AdminNav";
import AddUserDialog from "@/components/admin/AddUserDialog";
import { ADMIN_USERS, type AdminRole } from "@/data/mock";

// Адмінка «Користувачі» — структура з вайрфрейму (users_students/
// teachers/admins), оформлення приведене до стилю mIGHT.
// TODO(role): доступ лише адміну кафедри (guard на беку).

const TABS: { label: string; role: AdminRole }[] = [
  { label: "Студенти", role: "student" },
  { label: "Викладачі", role: "teacher" },
  { label: "Адміністратори", role: "admin" },
];

function UserAvatar({ name }: { name: string }) {
  const hues = [
    "from-pink-400 to-rose-500",
    "from-blue-400 to-indigo-500",
    "from-amber-300 to-orange-400",
    "from-emerald-300 to-teal-500",
    "from-violet-400 to-purple-500",
  ];
  return (
    <div
      className={`w-9 h-9 rounded-full bg-gradient-to-br ${hues[name.length % hues.length]} shrink-0`}
    />
  );
}

export default function AdminUsersPage() {
  const [tab, setTab] = useState(TABS[0].label);
  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const role = TABS.find((t) => t.label === tab)!.role;
  const users = ADMIN_USERS[role].filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Адміністрування</h1>
      <AdminNav />

      <PillTabs tabs={TABS.map((t) => t.label)} active={tab} onChange={setTab} />

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук"
            className="bg-card border rounded-full pl-4 pr-9 py-1.5 text-sm w-56 focus:outline-none focus:border-[var(--color-brand)]"
          />
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <button
          onClick={() => setAddOpen(true)}
          className="px-4 py-1.5 rounded-full bg-[var(--color-brand)] text-white text-xs font-medium hover:brightness-110 transition flex items-center gap-1.5"
        >
          Додати користувача <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="grid grid-cols-1 md:grid-cols-[1.6fr_0.7fr_1.2fr_1.1fr_auto_auto] gap-4 items-center bg-card rounded-2xl border px-5 py-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <UserAvatar name={u.name} />
              <p className="text-sm font-medium truncate">{u.name}</p>
            </div>
            <span className="text-xs text-muted-foreground">{u.detail}</span>
            <span className="text-xs text-muted-foreground truncate">{u.email}</span>
            <span className="text-xs text-muted-foreground">{u.phone}</span>
            <button className="px-4 py-1.5 rounded-full border text-xs font-medium hover:border-[var(--color-brand)] transition flex items-center gap-1.5">
              Переглянути <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button className="text-gray-400 hover:text-foreground transition" aria-label="Дії">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        ))}

        {users.length === 0 && (
          <div className="bg-card rounded-2xl border p-10 text-center text-muted-foreground">
            Нікого не знайдено
          </div>
        )}
      </div>

      <AddUserDialog role={role} open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
