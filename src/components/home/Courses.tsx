"use client";

import Link from "next/link";
import { useState } from "react";
import type { Course, CourseCategory } from "@/types/database";
import { whatsappForCourse } from "@/lib/whatsapp";

const FILTERS: { key: CourseCategory | "all"; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "carta", label: "🏅 Cartas de Navegador" },
  { key: "vela", label: "⛵ Vela" },
  { key: "seguranca", label: "🛡️ Segurança" },
  { key: "mergulho", label: "🤿 Mergulho" },
  { key: "formacao", label: "📚 Formação" }
];

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
    <section id="cursos" className="section-pad bg-[var(--bg-card)]">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="section-number">02 / Cursos</span>
            <div className="tag">🎓 Certificados DGRM &amp; PADI</div>
            <h2 className="section-title mt-3">Os Nossos Cursos</h2>
            <p className="section-sub">
              Formação náutica completa para todos os níveis, da estreia ao alto
              mar.
            </p>
          </div>
          <Link href="/#contacto" className="btn btn-primary">
            Pedir Informações
          </Link>
        </div>

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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((course) => (
            <article
              key={course.id}
              className="group flex flex-col overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--bg)] shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-gold)]"
            >
              <div className="relative grid h-44 place-items-center overflow-hidden bg-gradient-to-br from-[#0e2040] to-[#152e5a] text-6xl">
                {course.icon ?? "⚓"}
                <div className="absolute left-4 top-4 flex gap-1.5">
                  {course.is_featured ? (
                    <span className="badge badge-hot">🔥 {course.badge ?? "Mais Procurado"}</span>
                  ) : course.badge ? (
                    <span className="badge badge-dgrm">{course.badge}</span>
                  ) : null}
                </div>
                <div className="absolute right-4 top-4 flex gap-1">
                  {levelDots(course.level).map((on, i) => (
                    <span
                      key={i}
                      className={`size-1.5 rounded-full ${
                        on ? "bg-[var(--accent-light)]" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

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
                  <li>⏱ {course.duration}</li>
                  <li>👤 +{course.age_min ?? 0} anos</li>
                  <li>📍 {course.location}</li>
                  <li>🎓 {labelForLevel(course.level)}</li>
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
                      className="text-center text-xs font-semibold text-[#25D366] underline-offset-4 hover:underline"
                    >
                      💬 Perguntar
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {visible.length === 0 ? (
            <p className="col-span-full rounded-[12px] border border-[var(--border)] bg-[var(--bg)] p-10 text-center text-sm text-[var(--text-muted)]">
              Sem cursos nesta categoria de momento.
            </p>
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
