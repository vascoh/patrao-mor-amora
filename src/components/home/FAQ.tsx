"use client";

import Image from "next/image";
import { useState } from "react";
import type { FaqItem } from "@/services/content";

const FALLBACK: FaqItem[] = [
  { id: "1", question: "Que documentos preciso para me inscrever?", answer: "Para todos os cursos precisas de: BI/Cartão de Cidadão, certificado médico de aptidão náutica (podemos ajudar a obtê-lo) e, para menores de 16 anos no Marinheiro Júnior, autorização do encarregado de educação. Trata de tudo na escola — orientamos-te em cada passo.", display_order: 0, is_active: true, created_at: "" },
  { id: "2", question: "Qual a diferença entre Patrão Local e Patrão de Costa?", answer: "O Patrão Local permite navegar até 3 milhas náuticas da costa e em águas interiores. O Patrão de Costa permite navegar até 20 milhas náuticas da costa e requer maiores conhecimentos técnicos em navegação, meteorologia e comunicações. É recomendado para quem pretende fazer viagens mais longas.", display_order: 1, is_active: true, created_at: "" },
  { id: "3", question: "Os cursos têm aulas online disponíveis?", answer: "Sim! A componente teórica pode ser complementada com os nossos materiais digitais e fichas de estudo. A componente prática — manobras, simulações e navegação real no Tejo — é sempre presencial e é onde a aprendizagem verdadeira acontece.", display_order: 2, is_active: true, created_at: "" },
  { id: "4", question: "Como funcionam os exames DGRM?", answer: "Os exames são realizados na sede da DGRM e dividem-se em prova escrita (teórica) e prova prática (manobras em embarcação). A nossa escola prepara-te completamente para ambas as componentes. Com 94% de taxa de aprovação, estás em boas mãos.", display_order: 3, is_active: true, created_at: "" },
  { id: "5", question: "Qual o prazo de validade das habilitações náuticas?", answer: "As habilitações DGRM não têm prazo de validade — são válidas para toda a vida. No entanto, o certificado médico de aptidão náutica tem de ser renovado periodicamente. Para embarcações profissionais há requisitos adicionais de atualização de formação.", display_order: 4, is_active: true, created_at: "" },
  { id: "6", question: "É possível pagar em prestações?", answer: "Sim! Oferecemos a possibilidade de pagar em 2 a 3 prestações sem juros para a maioria dos cursos. Entra em contacto connosco para discutir a melhor solução para o teu caso. Aceitamos MBWay, transferência bancária e cartão de crédito.", display_order: 5, is_active: true, created_at: "" },
  { id: "7", question: "Preciso de ter barco para fazer o curso?", answer: "Não! A escola disponibiliza as embarcações necessárias para a componente prática dos cursos. Não precisas de ter barco próprio para frequentar qualquer um dos nossos cursos.", display_order: 6, is_active: true, created_at: "" },
  { id: "8", question: "Qual a diferença entre Marinheiro Júnior e Marinheiro?", answer: "O Marinheiro Júnior é desenhado especificamente para jovens e é o ponto de partida ideal para quem começa a aprender a navegar desde cedo. O Marinheiro é a habilitação base para adultos e serve também como requisito de acesso ao Patrão Local. Ambos os cursos incluem teoria e prática no Tejo, com abordagens adaptadas ao perfil de cada aluno.", display_order: 7, is_active: true, created_at: "" }
];

interface Props {
  items?: FaqItem[];
}

export function FAQ({ items }: Props) {
  const faqItems = items && items.length > 0 ? items : FALLBACK;
  const [open, setOpen] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faq" className="section-pad relative overflow-hidden">
      {/* Subtle nautical backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
        <Image
          src="/images/shared/sea-bg.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-[0.03]"
          sizes="100vw"
          quality={40}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/80 via-transparent to-[var(--bg)]/80" />
      </div>
      <div className="container-page relative z-[1]">
        <div className="mx-auto max-w-xl text-center">
          <span className="section-number">07 / FAQ</span>
          <div className="tag mx-auto">
            <span aria-hidden="true">❓</span> Perguntas Frequentes
          </div>
          <h2 className="section-title mt-3">Tens Dúvidas?</h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-3">
          {faqItems.map((it) => {
            const isOpen = open === it.id;
            const btnId = `faq-btn-${it.id}`;
            const panelId = `faq-panel-${it.id}`;

            return (
              <div
                key={it.id}
                className="overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)]"
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    onClick={() => setOpen(isOpen ? null : it.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]"
                  >
                    <span>{it.question}</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                      className={`shrink-0 transition ${isOpen ? "rotate-180 text-[var(--accent)]" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  aria-hidden={!isOpen}
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-[var(--text-muted)]">
                      {it.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
