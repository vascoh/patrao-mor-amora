"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Course, CourseCategory } from "@/types/database";
import { whatsappForCourse, whatsappLink } from "@/lib/whatsapp";

const FILTERS: { key: CourseCategory | "all"; label: string }[] = [
  { key: "all", label: "Todos os Cursos" },
  { key: "carta", label: "Cartas de Navegador" },
  { key: "formacao", label: "Marinheiro" }
];

const CATEGORY_PHOTOS: Record<CourseCategory, string> = {
  carta: "/images/courses/carta.jpg",
  vela: "/images/courses/vela.jpg",
  seguranca: "/images/courses/seguranca.jpg",
  mergulho: "/images/courses/mergulho.jpg",
  formacao: "/images/courses/formacao.jpg"
};

function levelDots(level: Course["level"]) {
  const map: Record<Course["level"], number> = {
    iniciante: 1,
    intermedio: 2,
    avancado: 3,
    profissional: 4
  };
  const active = map[level];
  return Array.from({ length: 4 }, (_, i) => i < active);
}

export function Courses({ courses }: { courses: Course[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const visible =
    filter === "all" ? courses : courses.filter((c) => c.category === filter);

  return (
    <section id="cursos" className="section-pad bg-[var(--bg-card)] relative overflow-hidden">
      {/* Atmospheric nautical backdrop — very subtle */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
        <Image
          src="/images/shared/sea-bg.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-[0.035]"
          sizes="100vw"
          quality={40}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-card)]/60 via-transparent to-[var(--bg-card)]/60" />
      </div>
      <div className="container-page relative z-[1]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="section-number">02 / Cursos</span>
            <div className="tag">Certificados DGRM &amp; PADI</div>
            <h2 className="section-title mt-3">Os Nossos Cursos</h2>
            <p className="section-sub">
              Formação náutica completa para todos os níveis, da estreia ao alto
              mar.
            </p>
          </div>
          <Link href="/amora#contacto" className="btn btn-primary">
            Pedir Informações
          </Link>
        </div>

        {/* Category filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition ${
                filter === f.key
                  ? "border-[var(--accent)] bg-[rgba(201,168,76,0.12)] text-[var(--accent-light)]"
                  : "border-[var(--border)] bg-transparent text-[var(--text-muted)] hover:border-[var(--border-strong)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Course cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((course) => (
            <article
              key={course.id}
              className="group flex flex-col overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--bg)] shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-gold)]"
            >
              {/* Photo header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={CATEGORY_PHOTOS[course.category] ?? CATEGORY_PHOTOS.carta}
                  alt={course.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03080f]/72 via-[#0a1628]/22 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#060e1a]/25 to-transparent" />

                {/* Course icon badge */}
                <div className="absolute bottom-4 left-4 grid size-11 place-items-center rounded-xl border border-[rgba(201,168,76,0.3)] bg-[rgba(6,14,26,0.7)] text-xl backdrop-blur-sm shadow-lg">
                  {course.icon ?? "⚓"}
                </div>

                {/* Featured / badge */}
                <div className="absolute left-4 top-4 flex gap-1.5">
                  {course.is_featured ? (
                    <span className="badge badge-hot">{course.badge ?? "Mais Procurado"}</span>
                  ) : course.badge ? (
                    <span className="badge badge-dgrm">{course.badge}</span>
                  ) : null}
                </div>

                {/* Level dots */}
                <div className="absolute right-4 top-4 flex gap-1">
                  {levelDots(course.level).map((on, i) => (
                    <span
                      key={i}
                      className={`size-2 rounded-full ${
                        on ? "bg-[var(--accent-light)]" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
                    {labelForCategory(course.category)}
                  </span>
                  <h3 className="mt-1 font-serif text-2xl">{course.name}</h3>
                </div>
                <p className="line-clamp-3 text-sm text-[var(--text-muted)]">
                  {course.description}
                </p>

                <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-[var(--text-muted)]">
                  <li>{course.duration}</li>
                  <li>+{course.age_min ?? 0} anos</li>
                  <li>{course.location}</li>
                  <li>{labelForLevel(course.level)}</li>
                </ul>

                <div className="mt-auto flex items-end justify-between gap-3 border-t border-[var(--border)] pt-4">
                  <div>
                    <div className="font-serif text-3xl font-bold text-[var(--accent-light)]">
                      € {Number(course.price).toFixed(0)}
                    </div>
                    <div className="text-[0.65rem] uppercase tracking-[0.1em] text-[var(--text-subtle)]">
                      Preço total
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/cursos/${course.slug}`}
                      className="btn btn-primary !px-4 !py-2 !text-xs"
                    >
                      Inscrever-me →
                    </Link>
                    <a
                      href={whatsappForCourse(course.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-xs font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                    >
                      Perguntar
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {visible.length === 0 ? (
            <div className="col-span-full rounded-[20px] border border-[var(--border)] bg-[var(--bg)] px-8 py-14 text-center">
              <div className="mx-auto mb-6 grid size-14 place-items-center rounded-xl border border-[var(--border-strong)] bg-[rgba(201,168,76,0.06)] text-[var(--accent)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
                  <circle cx="12" cy="5" r="3" />
                  <line x1="12" y1="22" x2="12" y2="8" />
                  <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
                </svg>
              </div>
              <p className="font-serif text-xl text-[var(--text)]">
                Próximas turmas a ser publicadas
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Contacta-nos para saber datas disponíveis
              </p>
              <a
                href={whatsappLink(
                  "Olá! Gostaria de saber as próximas datas disponíveis para os cursos."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa mx-auto mt-6 inline-flex"
              >
                Consultar Datas via WhatsApp
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function labelForCategory(c: CourseCategory) {
  return {
    carta: "Carta de Navegador",
    vela: "Vela",
    seguranca: "Segurança",
    mergulho: "Mergulho",
    formacao: "Formação"
  }[c];
}

function labelForLevel(l: Course["level"]) {
  return {
    iniciante: "Iniciante",
    intermedio: "Intermédio",
    avancado: "Avançado",
    profissional: "Profissional"
  }[l];
}
