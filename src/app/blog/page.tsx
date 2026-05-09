import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBlogPosts } from "@/services/blog";
import { blogPosts as staticPosts } from "@/lib/blog";
import { buildBreadcrumbJsonLd, siteConfig } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog Náutico — Artigos e Dicas de Navegação",
  description:
    "Artigos sobre navegação, meteorologia marítima, preparação para exames DGRM e dicas para navegadores. Publicado pela Escola Náutica Patrão Mor Amora.",
  keywords: [
    "blog náutico",
    "dicas navegação",
    "meteorologia marítima",
    "exame patrão local",
    "carta náutica",
    "escola náutica blog",
    "DGRM exames"
  ],
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "Blog Náutico — Patrão Mor Amora",
    description:
      "Artigos, guias e dicas práticas sobre navegação e preparação para os exames da DGRM.",
    type: "website",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    locale: "pt_PT"
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Náutico — Patrão Mor Amora",
    description: "Artigos sobre navegação, meteorologia marítima e exames DGRM.",
    site: "@patraomor"
  }
};

export default async function BlogPage() {
  const dbPosts = await getBlogPosts();
  const posts = dbPosts.length > 0 ? dbPosts : staticPosts;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />
      <main id="main-content" className="pt-28 md:pt-36">
        <section className="container-page pb-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-xs text-[var(--text-subtle)]">
              <li>
                <Link href="/" className="hover:text-[var(--accent)]">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-[var(--accent)]" aria-current="page">
                Blog
              </li>
            </ol>
          </nav>

          <div className="mt-8">
            <div className="tag">📖 Conhecimento Náutico</div>
            <h1 className="section-title mt-3">Blog Náutico</h1>
            <p className="mt-4 max-w-2xl text-base text-[var(--text-muted)]">
              Artigos, guias e dicas práticas sobre navegação, meteorologia marítima e
              preparação para os exames da DGRM. Escrito pelos instrutores da Escola Patrão Mor.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => {
              const dateFormatted = new Date(p.published_at + "T00:00:00").toLocaleDateString("pt-PT", {
                day: "numeric", month: "short", year: "numeric"
              });
              return (
                <article
                  key={p.slug}
                  className="overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-[var(--border-strong)]"
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
                    <h2 className="mt-2 font-serif text-xl">
                      <Link
                        href={`/blog/${p.slug}`}
                        className="hover:text-[var(--accent)]"
                      >
                        {p.title}
                      </Link>
                    </h2>
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
        </section>
      </main>
      <Footer />
    </>
  );
}
