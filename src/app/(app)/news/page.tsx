import { NEWS_POSTS } from "@/data/mock";

// «Новини» з макета: стрічка постів — автор, посада, час, текст,
// опційне зображення. Server Component.
export default function NewsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Новини</h1>

      <div className="space-y-4">
        {NEWS_POSTS.map((post) => (
          <article
            key={post.id}
            className="bg-card rounded-2xl border p-6"
          >
            <header className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-300 to-indigo-400 shrink-0" />
              <div>
                <p className="font-semibold leading-tight">{post.author}</p>
                <p className="text-xs text-muted-foreground">{post.role}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{post.timeAgo}</p>
              </div>
            </header>

            {post.hasImage && (
              <div className="mt-4 h-64 rounded-xl bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-950" />
            )}

            <p className="mt-4 text-sm leading-relaxed">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
