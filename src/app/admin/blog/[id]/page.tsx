import { notFound } from "next/navigation";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { getBlogPostByIdForAdmin } from "@/services/blog";
import { updateBlogPost } from "../actions";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function AdminBlogEditPage({ params }: Props) {
  const post = await getBlogPostByIdForAdmin(params.id);
  if (!post) notFound();

  async function update(formData: FormData) {
    "use server";
    return updateBlogPost(params.id, formData);
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-4xl">Editar Artigo</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          {post.icon} {post.title}
        </p>
      </header>

      <section className="rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)] p-6 md:p-8">
        <BlogPostForm post={post} action={update} />
      </section>
    </div>
  );
}
