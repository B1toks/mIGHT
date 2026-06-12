"use client";

import { useState } from "react";
import {
  MessageCircle,
  X,
  Search,
  ArrowLeft,
  MoreHorizontal,
  Paperclip,
  Smile,
} from "lucide-react";
import {
  CHAT_LIST,
  CHAT_MESSAGES,
  type ChatPreview,
} from "@/data/mock";

// Месенджер з макета (messager_main / messager_search / messager_chat):
// плаваюча темна панель у правому нижньому куті, три види —
// список чатів, пошук, відкритий чат.
// TODO(backend): live-повідомлення через WebSocket gateway (NestJS).

type View = "list" | "search" | "chat";

function Avatar({ name }: { name: string }) {
  // Детермінований градієнт за ім'ям — поки немає реальних фото.
  const hues = [
    "from-pink-400 to-rose-500",
    "from-blue-400 to-indigo-500",
    "from-amber-300 to-orange-400",
    "from-emerald-300 to-teal-500",
    "from-violet-400 to-purple-500",
  ];
  const h = hues[name.length % hues.length];
  return (
    <div
      className={`w-10 h-10 rounded-full bg-gradient-to-br ${h} shrink-0 flex items-center justify-center text-white text-sm font-semibold`}
    >
      {name[0]}
    </div>
  );
}

function ChatListView({
  onOpenChat,
  onOpenSearch,
}: {
  onOpenChat: (chat: ChatPreview) => void;
  onOpenSearch: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700">
        <h3 className="text-lg font-semibold text-white mx-auto">Повідомлення</h3>
        <button
          onClick={onOpenSearch}
          className="text-zinc-400 hover:text-white transition absolute right-4"
          aria-label="Пошук"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {CHAT_LIST.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onOpenChat(chat)}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition text-left"
          >
            <Avatar name={chat.name} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">{chat.name}</p>
              <p className="text-xs text-zinc-400 truncate">{chat.preview}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-[10px] text-zinc-500">{chat.time}</span>
              {chat.unread && (
                <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-brand)] text-white text-[10px] font-semibold flex items-center justify-center">
                  {chat.unread}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

function SearchView({
  onBack,
  onOpenChat,
}: {
  onBack: () => void;
  onOpenChat: (chat: ChatPreview) => void;
}) {
  const [query, setQuery] = useState("");
  const results = CHAT_LIST.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-700">
        <button onClick={onBack} className="text-zinc-400 hover:text-white transition" aria-label="Назад">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Пошук"
          className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
        />
      </div>

      {/* Недавні контакти — горизонтальний ряд як у макеті */}
      <div className="flex gap-3 px-4 py-3 overflow-x-auto border-b border-zinc-800">
        {CHAT_LIST.slice(0, 5).map((c) => (
          <button
            key={c.id}
            onClick={() => onOpenChat(c)}
            className="flex flex-col items-center gap-1 w-14 shrink-0"
          >
            <Avatar name={c.name} />
            <span className="text-[9px] text-zinc-400 truncate w-full text-center">
              {c.name.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>

      <p className="px-4 pt-3 pb-1 text-xs text-[var(--color-brand)]">Недавні</p>
      <div className="flex-1 overflow-y-auto">
        {results.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onOpenChat(chat)}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition text-left"
          >
            <Avatar name={chat.name} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">{chat.name}</p>
              <p className="text-xs text-zinc-400 truncate">{chat.preview}</p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

function ChatView({ chat, onBack }: { chat: ChatPreview; onBack: () => void }) {
  const [draft, setDraft] = useState("");
  const shortName = chat.name.split(" ").slice(0, 2).join(" ");

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-700">
        <button onClick={onBack} className="text-zinc-400 hover:text-white transition" aria-label="Назад">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <p className="flex-1 text-center text-sm font-semibold text-white truncate">
          {shortName}
        </p>
        <button className="text-zinc-400 hover:text-white transition" aria-label="Меню чату">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {CHAT_MESSAGES.map((m) => (
          <div key={m.id}>
            {m.dateChip && (
              <div className="flex justify-center my-2">
                <span className="px-3 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-[10px]">
                  {m.dateChip}
                </span>
              </div>
            )}
            <div className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                  m.mine
                    ? "bg-[var(--color-brand)] text-white rounded-br-sm"
                    : "bg-zinc-800 text-zinc-100 rounded-bl-sm"
                }`}
              >
                {m.text}
                <span
                  className={`ml-2 text-[9px] ${m.mine ? "text-blue-200" : "text-zinc-500"}`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-zinc-700">
        <button className="text-zinc-400 hover:text-white transition" aria-label="Прикріпити файл">
          <Paperclip className="w-4 h-4" />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Напишіть повідомлення..."
          className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
        />
        <button className="text-zinc-400 hover:text-white transition" aria-label="Емодзі">
          <Smile className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}

export default function MessengerApp() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("list");
  const [activeChat, setActiveChat] = useState<ChatPreview | null>(null);

  const openChat = (chat: ChatPreview) => {
    setActiveChat(chat);
    setView("chat");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[var(--color-brand)] text-white flex items-center justify-center shadow-lg hover:brightness-110 transition"
        aria-label={open ? "Закрити месенджер" : "Відкрити месенджер"}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] h-[600px] max-h-[calc(100vh-8rem)] bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-700 flex flex-col overflow-hidden">
          {view === "list" && (
            <ChatListView onOpenChat={openChat} onOpenSearch={() => setView("search")} />
          )}
          {view === "search" && (
            <SearchView onBack={() => setView("list")} onOpenChat={openChat} />
          )}
          {view === "chat" && activeChat && (
            <ChatView chat={activeChat} onBack={() => setView("list")} />
          )}
        </div>
      )}
    </>
  );
}
