import Link from "next/link";
import type { BlogPost } from "@/types/database";
import { blogPosts as staticPosts } from "@/lib/blog";

interface Props {
  posts?: BlogPost[];
}

export function Blog({ posts }: Props) {
  const items = posts && posts.length > 0 ? posts : staticPosts;

  return (
    <section id="blog" className="section-pad bg-[var(--bg-card)]">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="section-number">08 / Blog &amp; SEO</span>
            <div className="tag">📖 Conhecimento Náutico</div>
            <h2 className="section-title mt-3">Artigos &amp; Dicas</h2>
          </div>
          <Link href="/blog" className="btn btn-outline">
            Ver todos os artigos →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => {
            const dateFormatted = new Date(p.published_at + "T00:00:00").toLocaleDateString("pt-PT", {
              day: "numeric", month: "short", year: "numeric"
            });
            return (
              <article
                key={p.slug}
                className="overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--bg)] shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-[var(--border-strong)]"
              >
                <div className="relative grid h-44 place-items-center bg-gradient-to-br from-[#0a2040] to-[#152e5a] text-5xl">
                  {p.icon}
                  <span className="absolute left-4 top-4 inline-flex rounded-full bg-black/40 px-3 py-1 text-xs font-semibold">
                    {p.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="text-xs text-[var(--text-subtle)]">
                    <time dateTime={p.published_at}>📅 {dateFormatted}</time>
                    {" · "}⏱️ {p.read_time} de leitura
                  </div>
                  <h3 className="mt-2 font-serif text-xl">
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    {p.excerpt}
                  </p>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)]"
                  >
                    Ler artigo →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
