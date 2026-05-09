import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { createBlogPost } from "../actions";

export default function AdminBlogNovoPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-4xl">Novo Artigo</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Cria um novo artigo para o blog da escola.
        </p>
      </header>

      <section className="rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)] p-6 md:p-8">
        <BlogPostForm action={createBlogPost} />
      </section>
    </div>
  );
}
