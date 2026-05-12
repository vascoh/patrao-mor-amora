"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/services/content";

const FALLBACK: Testimonial[] = [
  { id: "1", text: "Fiz o curso de Patrão Local na Patrão Mor e foi uma experiência fantástica. Os instrutores são extremamente competentes e o método de ensino é muito eficaz. Passei à primeira tentativa!", course: "Patrão Local", author: "João Pinto", info: "Aluno 2024 · Almada", avatar: "JP", stars: 5, display_order: 0, is_active: true, created_at: "" },
  { id: "2", text: "Escola de excelência. Fiz aqui o Patrão de Costa após ter feito o Local noutro sítio, e a diferença é enorme. A qualidade dos materiais, a dedicação dos professores e o apoio até ao exame são incomparáveis.", course: "Patrão de Costa", author: "Rita Santos", info: "Aluna 2024 · Seixal", avatar: "RS", stars: 5, display_order: 1, is_active: true, created_at: "" },
  { id: "3", text: "O curso de mergulho PADI foi incrível! A instrutora foi paciente e muito profissional. Sinto-me completamente preparado para mergulhar em qualquer parte do mundo.", course: "PADI Open Water", author: "Miguel Costa", info: "Aluno 2025 · Setúbal", avatar: "MC", stars: 5, display_order: 2, is_active: true, created_at: "" },
  { id: "4", text: "Sonhei durante anos em obter o Patrão de Alto Mar. A Patrão Mor tornou isso possível com um programa bem estruturado e professores que transmitem conhecimento e paixão pelo mar em igual medida.", course: "Patrão de Alto Mar", author: "Ana Ferreira", info: "Aluna 2023 · Lisboa", avatar: "AF", stars: 5, display_order: 3, is_active: true, created_at: "" },
  { id: "5", text: "Excelente formação em segurança marítima. Aprendi coisas que nunca aprendi nos outros cursos e que me vão certamente salvar a vida um dia. Muito prático e orientado para o mundo real.", course: "Segurança no Mar", author: "Tiago Lopes", info: "Aluno 2025 · Amora", avatar: "TL", stars: 4, display_order: 4, is_active: true, created_at: "" }
];

interface Props {
  items?: Testimonial[];
}

export function Testimonials({ items }: Props) {
  const testimonials = items && items.length > 0 ? items : FALLBACK;
  const [active, setActive] = useState(0);
  const [hasFocus, setHasFocus] = useState(false);

  const prev = () => setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((i) => (i + 1) % testimonials.length);

  useEffect(() => {
    if (!hasFocus) return;
    const len = testimonials.length;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") { e.preventDefault(); setActive((i) => (i - 1 + len) % len); }
      if (e.key === "ArrowRight") { e.preventDefault(); setActive((i) => (i + 1) % len); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasFocus, testimonials.length]);

  return (
    <section
      id="testemunhos"
      className="section-pad relative overflow-hidden"
      aria-label="Testemunhos dos alunos"
      onFocus={() => setHasFocus(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setHasFocus(false);
        }
      }}
    >
      {/* Subtle nautical backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
        <Image
          src="/images/hero/sailboat-sunset.jpg"
          alt=""
          fill
          className="object-cover object-[50%_55%] opacity-[0.03]"
          sizes="100vw"
          quality={35}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/80 via-transparent to-[var(--bg)]/80" />
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Testemunho {active + 1} de {testimonials.length}:{" "}
        {testimonials[active].author} — {testimonials[active].course}.{" "}
        {testimonials[active].text}
      </p>

      <div className="container-page relative z-[1]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="section-number">05 / Testemunhos</span>
            <div className="tag">
              <span aria-hidden="true">⭐</span> +4.9 no Google
            </div>
            <h2 className="section-title mt-3">
              O que dizem
              <br />
              os nossos alunos
            </h2>
          </div>
          <div className="text-center">
            <div
              className="font-serif text-5xl font-bold text-[var(--accent-light)]"
              aria-label="Classificação: 4.9 estrelas"
            >
              4.9
            </div>
            <div className="text-[var(--accent-light)]" aria-hidden="true">★★★★★</div>
            <div className="text-xs text-[var(--text-subtle)]">147 avaliações</div>
          </div>
        </div>

        <p className="sr-only" id="carousel-hint">
          Use as teclas de seta esquerda e direita para navegar entre testemunhos.
        </p>

        <div className="mt-10 overflow-hidden" aria-describedby="carousel-hint">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <article
                key={t.id}
                aria-hidden={i !== active}
                className="w-full shrink-0 rounded-[20px] border border-[var(--border)] bg-[var(--bg-card)] p-8 md:p-12"
              >
                <div
                  className="font-serif text-7xl leading-none text-[var(--accent)]/30"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <div
                  className="mb-2 text-[var(--accent-light)]"
                  aria-label={`${t.stars} estrelas de 5`}
                >
                  <span aria-hidden="true">
                    {"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}
                  </span>
                </div>
                <p className="font-serif text-xl italic text-[var(--text)] md:text-2xl">
                  {t.text}
                </p>
                <div className="mt-3 inline-flex rounded-full border border-[var(--border-strong)] bg-[rgba(201,168,76,0.06)] px-3 py-1 text-[0.7rem] uppercase tracking-[0.1em] text-[var(--accent)]">
                  {t.course}
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div
                    aria-hidden="true"
                    className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] font-serif text-lg font-bold text-[#060e1a]"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <strong className="block">{t.author}</strong>
                    <span className="text-xs text-[var(--text-subtle)]">{t.info}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Testemunho anterior"
            className="grid size-11 place-items-center rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-lg transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <span aria-hidden="true">←</span>
          </button>

          <div role="tablist" aria-label="Selecionar testemunho" className="flex gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Testemunho de ${item.author}`}
                onClick={() => setActive(i)}
                className={`rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                  i === active ? "h-2 w-6 bg-[var(--accent)]" : "size-2 bg-[var(--border-strong)]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Próximo testemunho"
            className="grid size-11 place-items-center rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-lg transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
