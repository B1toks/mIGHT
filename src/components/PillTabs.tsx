"use client";

// Пігулкові таби з макета: активна — синя заливка, решта — білі з бордером.
export default function PillTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={
            tab === active
              ? "px-5 py-1.5 rounded-full text-sm font-medium bg-[var(--color-brand)] text-white"
              : "px-5 py-1.5 rounded-full text-sm font-medium bg-white dark:bg-zinc-900 border text-gray-700 dark:text-gray-300 hover:border-[var(--color-brand)] transition-colors"
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
