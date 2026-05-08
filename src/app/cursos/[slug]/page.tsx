import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/shared/WhatsAppFloat";
import { EnrollmentForm } from "@/components/forms/EnrollmentForm";
import { getCourseBySlug, getCourseSlugs } from "@/services/courses";
import { getDatesForCourse } from "@/services/courseDates";
import { whatsappForCourse } from "@/lib/whatsapp";
import {
  buildCourseJsonLd,
  buildBreadcrumbJsonLd,
  siteConfig
} from "@/lib/seo";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);
  if (!course) return { title: "Curso não encontrado" };

  const { url } = siteConfig;
  const courseUrl = `${url}/cursos/${params.slug}`;
  const title = `${course.name} — Curso Náutico Certificado DGRM`;

  return {
    title,
    description: course.description,
    keywords: [
      course.name,
      `curso ${course.name.toLowerCase()}`,
      `${course.name} DGRM`,
      `curso náutico ${course.category}`,
      `escola náutica Seixal`,
      `carta náutica Portugal`,
      course.location ?? "Amora"
    ],
    alternates: { canonical: courseUrl },
    openGraph: {
      title,
      description: course.description,
      type: "article",
      url: courseUrl,
      siteName: siteConfig.name,
      locale: "pt_PT"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: course.description,
      site: "@patraomor"
    }
  };
}

export default async function CourseDetailPage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { date?: string };
}) {
  const course = await getCourseBySlug(params.slug);
  if (!course) notFound();

  const dates = await getDatesForCourse(course.id);
  const totalSlots = dates.reduce((s, d) => s + d.available_slots, 0);

  const courseJsonLd = buildCourseJsonLd(course, dates);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Início", url: siteConfig.url },
    { name: "Cursos", url: `${siteConfig.url}/#cursos` },
    { name: course.name, url: `${siteConfig.url}/cursos/${course.slug}` }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
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
              <li>
                <Link href="/#cursos" className="hover:text-[var(--accent)]">
                  Cursos
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="text-[var(--accent)]" aria-current="page">
                {course.name}
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid size-14 place-items-center rounded-[14px] bg-gradient-to-br from-[#0e2040] to-[#152e5a] text-3xl">
                  {course.icon ?? "⚓"}
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
                    {course.category} · {course.level}
                  </span>
                  <h1 className="font-serif text-4xl md:text-5xl">{course.name}</h1>
                </div>
              </div>

              <p className="mt-6 text-base text-[var(--text-muted)]">
                {course.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat label="Duração" value={course.duration} />
                <Stat label="Idade mín." value={`+${course.age_min ?? 0} anos`} />
                <Stat label="Local" value={course.location ?? "—"} />
                <Stat label="Preço" value={`€ ${Number(course.price).toFixed(0)}`} />
              </div>

              {course.highlights.length ? (
                <div className="mt-8">
                  <h2 className="font-serif text-2xl">O que está incluído</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {course.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm"
                      >
                        <span className="mt-0.5 text-[var(--accent)]">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {dates.length ? (
                <div className="mt-10">
                  <h2 className="font-serif text-2xl">Próximas datas</h2>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    Vagas totais disponíveis: <strong>{totalSlots}</strong>
                  </p>
                  <div className="mt-4 grid gap-3">
                    {dates.map((d) => (
                      <div
                        key={d.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-[var(--border)] bg-[var(--bg-card)] p-4 text-sm"
                      >
                        <div>
                          <strong className="block">
                            {new Date(d.start_date).toLocaleDateString("pt-PT", {
                              weekday: "long",
                              day: "2-digit",
                              month: "long",
                              year: "numeric"
                            })}
                          </strong>
                          <span className="text-[var(--text-muted)]">
                            {d.schedule} · {d.location}
                          </span>
                        </div>
                        <span
                          className={`status-pill ${
                            d.status === "few"
                              ? "status-few"
                              : d.status === "full"
                                ? "status-full"
                                : "status-available"
                          }`}
                        >
                          {d.available_slots} vagas
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={whatsappForCourse(course.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa"
                >
                  💬 Perguntar no WhatsApp
                </a>
                <Link href="/#contacto" className="btn btn-outline">
                  Pedir mais info
                </Link>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <EnrollmentForm
                courseId={course.id}
                courseName={course.name}
                dates={dates}
                initialDateId={searchParams.date}
              />
            </aside>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)] p-4">
      <div className="text-[0.65rem] uppercase tracking-[0.12em] text-[var(--text-subtle)]">
        {label}
      </div>
      <div className="mt-1 text-base font-semibold">{value}</div>
    </div>
  );
}
