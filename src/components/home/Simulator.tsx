"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Use = "recreio" | "costa" | "oceano" | "profissional";

interface Result {
  title: string;
  desc: string;
  slug: string;
}

function resultFor(use: Use): Result {
  if (use === "oceano")
    return {
      title: "🚢 Patrão de Alto Mar",
      desc: "Para travessias oceânicas, o Patrão de Alto Mar é a habilitação certa. Permite navegar sem limitações de distância e inclui técnicas avançadas.",
      slug: "alto-mar"
    };
  if (use === "costa")
    return {
      title: "🗺️ Patrão de Costa",
      desc: "Para exploração costeira alargada, o Patrão de Costa permite navegar até 20 milhas e é ideal para viagens mais longas ao longo da costa.",
      slug: "patrao-costa"
    };
  if (use === "profissional")
    return {
      title: "⚙️ Patrão Local + Costa",
      desc: "Para uso profissional, recomendamos começar com o Patrão Local e evoluir para o Patrão de Costa. Fala connosco para um plano de formação personalizado.",
      slug: "patrao-local"
    };
  return {
    title: "🚤 Patrão Local",
    desc: "Para lazer e recreio familiar, o Patrão Local é a escolha perfeita. É a habilitação mais procurada e permite navegar com total legalidade e segurança.",
    slug: "patrao-local"
  };
}

const STEP_1: { value: Use; icon: string; label: string }[] = [
  { value: "recreio", icon: "🏖️", label: "Lazer e recreio pessoal / familiar" },
  { value: "costa", icon: "🗺️", label: "Exploração costeira e viagens curtas" },
  { value: "oceano", icon: "🌊", label: "Travessias oceânicas e alto mar" },
  { value: "profissional", icon: "⚙️", label: "Uso profissional / transporte" }
];
const STEP_2 = [
  { icon: "🆕", label: "Não, sou completamente novo nisto" },
  { icon: "⚓", label: "Tenho carta de Marinheiro" },
  { icon: "🚤", label: "Tenho Patrão Local" },
  { icon: "🗺️", label: "Tenho Patrão de Costa" }
];
const STEP_3 = [
  { icon: "⏰", label: "Pouca — só fins de semana" },
  { icon: "📅", label: "Média — 2–3 noites por semana" },
  { icon: "🚀", label: "Bastante — quero terminar rápido" }
];

export function Simulator() {
  const [step, setStep] = useState(1);
  const [use, setUse] = useState<Use | null>(null);
  const result = use ? resultFor(use) : null;

  function next(s: number) {
    setTimeout(() => setStep(s), 250);
  }

  function reset() {
    setStep(1);
    setUse(null);
  }

  const progress = step === 4 ? 100 : ((step - 1) / 3) * 100;

  return (
    <section id="simulador" className="section-pad bg-[var(--bg-card)] relative overflow-hidden">
      {/* Subtle nautical backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
        <Image
          src="/images/about/marina.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-[0.04]"
          sizes="100vw"
          quality={40}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-card)]/60 via-transparent to-[var(--bg-card)]/60" />
      </div>
      <div className="container-page relative z-[1]">
        <div className="mx-auto max-w-xl text-center">
          <span className="section-number">04 / Simulador</span>
          <div className="tag mx-auto">🧭 Ferramenta Gratuita</div>
          <h2 className="section-title mt-3">Qual Carta Preciso?</h2>
          <p className="section-sub mx-auto">
            Responde a 3 perguntas simples e descobre qual o curso náutico ideal
            para ti.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-[20px] border border-[var(--border)] bg-[var(--bg)] p-8">
          <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
            <div
              className="h-full bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {step === 1 ? (
            <Step
              question="Para que queres usar a embarcação?"
              options={STEP_1.map((o) => ({
                icon: o.icon,
                label: o.label,
                onClick: () => {
                  setUse(o.value);
                  next(2);
                }
              }))}
            />
          ) : null}

          {step === 2 ? (
            <Step
              question="Já tens alguma habilitação náutica?"
              options={STEP_2.map((o) => ({
                ...o,
                onClick: () => next(3)
              }))}
            />
          ) : null}

          {step === 3 ? (
            <Step
              question="Qual a tua disponibilidade semanal?"
              options={STEP_3.map((o) => ({
                ...o,
                onClick: () => next(4)
              }))}
            />
          ) : null}

          {step === 4 && result ? (
            <div className="text-center">
              <div className="mb-3 text-5xl">🎯</div>
              <h3 className="font-serif text-3xl text-[var(--accent-light)]">
                {result.title}
              </h3>
              <p className="mx-auto mt-4 max-w-md text-sm text-[var(--text-muted)]">
                {result.desc}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href={`/cursos/${result.slug}`} className="btn btn-primary">
                  Ver Curso e Inscrever →
                </Link>
                <button type="button" onClick={reset} className="btn btn-outline">
                  Recomeçar
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Step({
  question,
  options
}: {
  question: string;
  options: { icon: string; label: string; onClick: () => void }[];
}) {
  return (
    <div>
      <p className="mb-5 font-serif text-2xl">{question}</p>
      <div className="grid gap-3">
        {options.map((o) => (
          <button
            key={o.label}
            type="button"
            onClick={o.onClick}
            className="flex items-center gap-3 rounded-[12px] border border-[var(--border)] bg-[var(--bg-card)] p-4 text-left text-sm transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[rgba(201,168,76,0.05)]"
          >
            <span className="text-xl">{o.icon}</span>
            <span>{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
