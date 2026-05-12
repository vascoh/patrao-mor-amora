"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { CourseDateWithCourse, DateStatus } from "@/types/database";
import { whatsappForCourse, whatsappLink } from "@/lib/whatsapp";

const MONTHS_PT = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez"
];

const STATUS_LABEL: Record<DateStatus, { className: string; label: string }> = {
  available: { className: "status-available", label: "Vagas disponíveis" },
  few: { className: "status-few", label: "Poucas vagas" },
  full: { className: "status-full", label: "Lotado" },
  cancelled: { className: "status-full", label: "Cancelado" }
};

function formatGCalDate(date: string) {
  return date.replace(/-/g, "") + "T090000Z";
}

function gcalLink(d: CourseDateWithCourse) {
  const start = formatGCalDate(d.start_date);
  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", `Curso ${d.course?.name ?? "Náutico"} – Patrão Mor`);
  url.searchParams.set("dates", `${start}/${start}`);
  url.searchParams.set("location", d.location ?? "Amora, Seixal");
  url.searchParams.set(
    "details",
    `${d.schedule ?? ""}\n${d.notes ?? ""}\nReserva: https://patraomor.pt`
  );
  return url.toString();
}

export function Calendar({ dates }: { dates: CourseDateWithCourse[] }) {
  const [course, setCourse] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState<"" | "available" | "few">("");

  const courseOptions = useMemo(
    () =>
      Array.from(
        new Set(dates.map((d) => d.course?.name).filter(Boolean) as string[])
      ),
    [dates]
  );
  const locationOptions = useMemo(
    () =>
      Array.from(
        new Set(dates.map((d) => d.location).filter(Boolean) as string[])
      ),
    [dates]
  );

  const filtered = dates.filter((d) => {
    if (course && d.course?.name !== course) return false;
    if (location && d.location !== location) return false;
    if (availability && d.status !== availability) return false;
    return true;
  });

  return (
    <section id="calendario" className="section-pad relative overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/70 via-transparent to-[var(--bg)]/70" />
      </div>
      <div className="container-page relative z-[1]">
        <span className="section-number">03 / Calendário</span>
        <div className="tag">📅 Próximas Turmas</div>
        <h2 className="section-title mt-3">Calendário de Cursos</h2>
        <p className="section-sub">
          Encontra a data que melhor se adapta à tua agenda. Atualizado em tempo
          real.
        </p>

        <div className="mt-10 rounded-[20px] border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <div className="grid gap-3 md:grid-cols-3">
            <select
              className="field-input"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">Todos os Cursos</option>
              {courseOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              className="field-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Todas as Localizações</option>
              {locationOptions.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <select
              className="field-input"
              value={availability}
              onChange={(e) =>
                setAvailability(e.target.value as "" | "available" | "few")
              }
            >
              <option value="">Disponibilidade</option>
              <option value="available">Vagas disponíveis</option>
              <option value="few">Poucas vagas</option>
            </select>
          </div>

          <div className="mt-6 grid gap-4">
            {filtered.length === 0 ? (
              dates.length === 0 ? (
                /* No dates exist at all */
                <div className="rounded-[20px] border border-[var(--border)] bg-[var(--bg)] px-8 py-14 text-center">
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
              ) : (
                /* Dates exist but filters return nothing */
                <div className="rounded-[14px] border border-[var(--border)] bg-[var(--bg)] p-8 text-center">
                  <p className="text-sm text-[var(--text-muted)]">
                    Nenhuma data corresponde aos filtros seleccionados.
                  </p>
                </div>
              )
            ) : null}
            {filtered.map((d) => {
              const date = new Date(d.start_date);
              const day = String(date.getDate()).padStart(2, "0");
              const month = MONTHS_PT[date.getMonth()];
              const status = STATUS_LABEL[d.status];
              return (
                <article
                  key={d.id}
                  className="grid grid-cols-[88px_1fr] items-stretch gap-5 rounded-[14px] border border-[var(--border)] bg-[var(--bg)] p-4 sm:grid-cols-[100px_1fr]"
                >
                  <div className="grid place-items-center rounded-md border border-[var(--border)] bg-[var(--bg-card2)] text-center">
                    <div>
                      <div className="font-serif text-3xl font-bold text-[var(--accent)]">
                        {day}
                      </div>
                      <div className="text-xs uppercase tracking-[0.15em] text-[var(--text-subtle)]">
                        {month}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl">
                      {d.course?.icon} {d.course?.name ?? "Curso"}
                    </h4>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      {d.schedule} · {d.location} ·{" "}
                      <strong>{d.available_slots}</strong> vagas
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className={`status-pill ${status.className}`}>
                        {status.label}
                      </span>
                      <span className="status-pill bg-white/5 text-[var(--text-muted)]">
                        {d.location}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link
                        href={`/cursos/${d.course?.slug ?? ""}?date=${d.id}`}
                        className="btn btn-primary !px-4 !py-2 !text-xs"
                      >
                        Inscrever
                      </Link>
                      <a
                        href={gcalLink(d)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline !px-4 !py-2 !text-xs"
                      >
                        📅 Google Calendar
                      </a>
                      <a
                        href={whatsappForCourse(d.course?.name ?? "")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-wa !px-4 !py-2 !text-xs"
                      >
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
