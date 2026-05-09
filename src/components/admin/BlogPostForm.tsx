"use client";

import { useState } from "react";
import type { BlogPost } from "@/types/database";

interface Props {
  post?: BlogPost;
  action: (formData: FormData) => Promise<{ error: string } | void>;
}

export function BlogPostForm({ post, action }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await action(formData);
    if (result && "error" in result) {
      setError(result.error);
    }
    setPending(false);
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-md border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-1">
          <label className="field-label" htmlFor="title">Título *</label>
          <input
            id="title"
            name="title"
            required
            defaultValue={post?.title}
            className="field-input"
            placeholder="Ex: Como Ler uma Carta Náutica"
          />
        </div>
        <div className="space-y-1">
          <label className="field-label" htmlFor="slug">Slug *</label>
          <input
            id="slug"
            name="slug"
            required
            defaultValue={post?.slug}
            className="field-input font-mono"
            placeholder="como-ler-carta-nautica"
            pattern="[a-z0-9-]+"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-1">
          <label className="field-label" htmlFor="tag">Tag</label>
          <input
            id="tag"
            name="tag"
            defaultValue={post?.tag ?? "Náutica"}
            className="field-input"
            placeholder="Ex: Navegação"
          />
        </div>
        <div className="space-y-1">
          <label className="field-label" htmlFor="icon">Ícone (emoji)</label>
          <input
            id="icon"
            name="icon"
            defaultValue={post?.icon ?? "📝"}
            className="field-input"
            placeholder="📝"
          />
        </div>
        <div className="space-y-1">
          <label className="field-label" htmlFor="read_time">Tempo de leitura</label>
          <input
            id="read_time"
            name="read_time"
            defaultValue={post?.read_time ?? "5 min"}
            className="field-input"
            placeholder="5 min"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-1">
          <label className="field-label" htmlFor="published_at">Data de publicação</label>
          <input
            id="published_at"
            name="published_at"
            type="date"
            defaultValue={post?.published_at ?? today}
            className="field-input"
          />
        </div>
        <div className="space-y-1">
          <label className="field-label" htmlFor="display_order">Ordem</label>
          <input
            id="display_order"
            name="display_order"
            type="number"
            min={0}
            defaultValue={post?.display_order ?? 0}
            className="field-input"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="field-label" htmlFor="excerpt">Excerto *</label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={3}
          defaultValue={post?.excerpt}
          className="field-input resize-none"
          placeholder="Breve descrição do artigo para a listagem e SEO..."
        />
      </div>

      <div className="space-y-1">
        <label className="field-label" htmlFor="content">Conteúdo * (Markdown)</label>
        <textarea
          id="content"
          name="content"
          required
          rows={16}
          defaultValue={post?.content}
          className="field-input resize-y font-mono text-xs"
          placeholder="Conteúdo completo do artigo em Markdown..."
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="is_published"
          name="is_published"
          type="checkbox"
          defaultChecked={post?.is_published ?? true}
          className="size-4 rounded border-[var(--border)] bg-[var(--bg)] accent-[var(--accent)]"
        />
        <label htmlFor="is_published" className="text-sm text-[var(--text-muted)]">
          Publicado (visível no site)
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary"
        >
          {pending ? "A guardar…" : post ? "Guardar alterações" : "Criar artigo"}
        </button>
        <a href="/admin/blog" className="btn">Cancelar</a>
      </div>
    </form>
  );
}
