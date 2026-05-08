"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "pm_promo_closed";
const TITLE_ID = "promo-popup-title";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function diffParts(deadline: number) {
  const now = Date.now();
  const diff = Math.max(0, deadline - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);
  return { days, hours, mins, secs };
}

export function PromoPopup() {
  const [open, setOpen] = useState(false);
  const [parts, setParts] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // Delay show
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 4500);
    return () => clearTimeout(t);
  }, []);

  // Auto-focus close button + save/restore focus
  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement as HTMLElement;
      // Wait for render then focus
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      prevFocusRef.current?.focus();
    }
  }, [open]);

  // Countdown timer
  useEffect(() => {
    if (!open) return;
    const deadline = Date.now() + 8 * 86_400_000 + 14 * 3_600_000;
    const tick = () => setParts(diffParts(deadline));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [open]);

  // Focus trap + Escape key
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const el = dialogRef.current;
      if (!el) return;
      const nodes = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!nodes.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function close() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={TITLE_ID}
      className="fixed inset-0 z-[1200] grid place-items-center bg-[rgba(3,8,15,0.85)] px-4 backdrop-blur-md"
    >
      <div className="card-base relative w-full max-w-lg overflow-hidden">
        <div className="relative bg-gradient-to-br from-[#0e2040] via-[#152e5a] to-[#0a1628] p-8 text-center">
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Fechar oferta especial"
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            ✕
          </button>
          <div className="mb-3 text-5xl" aria-hidden="true">🎉</div>
          <h3 id={TITLE_ID} className="font-serif text-3xl">
            Oferta Especial de Verão
          </h3>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Inscrições até 15 de Junho com desconto exclusivo
          </p>
        </div>

        <div className="space-y-5 p-6">
          <div className="rounded-[12px] border border-[var(--border-strong)] bg-[rgba(201,168,76,0.08)] p-5 text-center">
            <strong className="block font-serif text-3xl text-[var(--accent-light)]">
              15% de desconto
            </strong>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Em qualquer curso inscrito até 15 de Junho 2025. Usa o código{" "}
              <strong>VERAO2025</strong> na inscrição.
            </p>
          </div>

          <div
            className="grid grid-cols-4 gap-2"
            aria-label="Contagem decrescente até ao fim da oferta"
          >
            {[
              { v: parts.days, l: "Dias" },
              { v: parts.hours, l: "Horas" },
              { v: parts.mins, l: "Min" },
              { v: parts.secs, l: "Seg" }
            ].map((u) => (
              <div
                key={u.l}
                className="rounded-md border border-[var(--border)] bg-[var(--bg)] py-3 text-center"
              >
                <div
                  className="font-mono text-2xl font-bold text-[var(--accent-light)]"
                  aria-label={`${u.v} ${u.l.toLowerCase()}`}
                >
                  {String(u.v).padStart(2, "0")}
                </div>
                <div
                  aria-hidden="true"
                  className="text-[0.65rem] uppercase tracking-[0.1em] text-[var(--text-subtle)]"
                >
                  {u.l}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/#contacto"
              onClick={close}
              className="btn btn-primary !w-full !justify-center"
            >
              <span aria-hidden="true">🚀</span> Aproveitar Oferta
            </Link>
            <button
              type="button"
              onClick={close}
              className="btn btn-ghost text-xs !text-[var(--text-subtle)]"
            >
              Fechar sem aproveitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
