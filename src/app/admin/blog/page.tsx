import Link from "next/link";
import { getAllBlogPostsForAdmin } from "@/services/blog";
import { deleteBlogPost } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPostsForAdmin();

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl">Blog</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Gere artigos do blog da escola náutica.
          </p>
        </div>
        <Link href="/admin/blog/novo" className="btn btn-primary">
          + Novo Artigo
        </Link>
      </header>

      <section className="overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)]">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
            <tr>
              <th className="px-5 py-3 text-left">Artigo</th>
              <th className="px-5 py-3 text-left">Tag</th>
              <th className="px-5 py-3 text-left">Publicado</th>
              <th className="px-5 py-3 text-left">Estado</th>
              <th className="px-5 py-3 text-right">Acções</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-[var(--text-muted)]">
                  Sem artigos. Cria o primeiro com o botão acima.
                </td>
              </tr>
            ) : null}
            {posts.map((p) => (
              <tr key={p.id}>
                <td className="px-5 py-3">
                  <div className="font-medium">{p.icon} {p.title}</div>
                  <div className="text-xs text-[var(--text-subtle)]">/blog/{p.slug}</div>
                </td>
                <td className="px-5 py-3 text-[var(--text-muted)]">{p.tag}</td>
                <td className="px-5 py-3 text-[var(--text-muted)]">
                  {new Date(p.published_at + "T00:00:00").toLocaleDateString("pt-PT")}
                </td>
                <td className="px-5 py-3">
                  {p.is_published ? (
                    <span className="status-pill status-available">publicado</span>
                  ) : (
                    <span className="status-pill status-full">rascunho</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/blog/${p.id}`}
                      className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs hover:border-[var(--accent)]"
                    >
                      Editar
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteBlogPost(p.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="rounded-md border border-rose-500/40 px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-500/10"
                      >
                        Remover
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
