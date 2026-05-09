import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/shared/WhatsAppFloat";
import { getBlogPostBySlug } from "@/services/blog";
import { blogPosts as staticPosts, getPostBySlug as getStaticPost } from "@/lib/blog";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  siteConfig
} from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  return staticPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = (await getBlogPostBySlug(params.slug)) ?? getStaticPost(params.slug);
  if (!post) return { title: "Artigo não encontrado" };

  const { url } = siteConfig;
  const articleUrl = `${url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [
      post.tag,
      "navegação",
      "escola náutica",
      "patrão local",
      "DGRM",
      "náutica Portugal"
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    alternates: { canonical: articleUrl },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: articleUrl,
      siteName: siteConfig.name,
      locale: "pt_PT",
      publishedTime: post.published_at,
      authors: [siteConfig.name],
      tags: [post.tag, "náutica", "navegação"]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      site: "@patraomor"
    }
  };
}

export default async function BlogPostPage({
  params
}: {
  params: { slug: string };
}) {
  const post = (await getBlogPostBySlug(params.slug)) ?? getStaticPost(params.slug);
  if (!post) notFound();

  const { url } = siteConfig;
  const articleJsonLd = buildArticleJsonLd(post);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url },
    { name: "Blog", url: `${url}/blog` },
    { name: post.title, url: `${url}/blog/${post.slug}` }
  ]);

  const dateFormatted = new Date(post.published_at + "T00:00:00").toLocaleDateString("pt-PT", {
    day: "numeric", month: "long", year: "numeric"
  });

  const paragraphs = post.content.split("\n\n");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />
      <main id="main-content" className="pt-28 md:pt-36">
        <article className="container-page pb-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-xs text-[var(--text-subtle)]">
              <li>
                <Link href="/" className="hover:text-[var(--accent)]">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link href="/blog" className="hover:text-[var(--accent)]">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="truncate max-w-[240px] text-[var(--accent)]" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                {post.tag}
              </span>
              <time
                dateTime={post.published_at}
                className="text-xs text-[var(--text-subtle)]"
              >
                📅 {dateFormatted}
              </time>
              <span className="text-xs text-[var(--text-subtle)]">
                ⏱️ {post.read_time} de leitura
              </span>
            </div>

            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-6 text-lg text-[var(--text-muted)]">
              {post.excerpt}
            </p>

            <div className="mt-10 grid h-64 place-items-center rounded-[20px] bg-gradient-to-br from-[#0a2040] to-[#152e5a] text-7xl">
              {post.icon}
            </div>

            <div className="mt-10 space-y-6 text-base leading-relaxed text-[var(--text-muted)]">
              {paragraphs.map((block, i) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2 key={i} className="font-serif text-2xl text-[var(--text)] mt-10">
                      {block.slice(3)}
                    </h2>
                  );
                }
                if (block.startsWith("### ")) {
                  return (
                    <h3 key={i} className="font-serif text-xl text-[var(--text)] mt-6">
                      {block.slice(4)}
                    </h3>
                  );
                }
                if (block.startsWith("---")) {
                  return <hr key={i} className="border-[var(--border)]" />;
                }
                if (block.startsWith("- ")) {
                  const items = block.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={i} className="list-disc list-inside space-y-2">
                      {items.map((item, j) => (
                        <li key={j}>{item.slice(2)}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i}>{block}</p>;
              })}
            </div>

            {/* CTA */}
            <div className="mt-14 rounded-[20px] border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center">
              <div className="text-4xl">⚓</div>
              <h2 className="mt-3 font-serif text-2xl">
                Pronto para aprender a navegar?
              </h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Inscreve-te nos cursos certificados DGRM da Escola Náutica Patrão Mor Amora.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link href="/#cursos" className="btn btn-primary">
                  Ver cursos
                </Link>
                <Link href="/#contacto" className="btn btn-outline">
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
