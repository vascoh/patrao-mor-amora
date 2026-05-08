"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const links = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#cursos", label: "Cursos" },
  { href: "/#calendario", label: "Calendário" },
  { href: "/#simulador", label: "Qual Carta?" },
  { href: "/#testemunhos", label: "Alunos" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contacto", label: "Contacto" }
];

const MENU_ID = "mobile-nav-menu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape key closes menu
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus management: move focus into menu on open, back to trigger on close
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      requestAnimationFrame(() => {
        menuRef.current?.querySelector<HTMLElement>("a")?.focus();
      });
    } else if (wasOpenRef.current) {
      hamburgerRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      <nav
        aria-label="Navegação principal"
        className={`fixed inset-x-0 top-0 z-[900] transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--border)] bg-[rgba(6,14,26,0.96)] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl"
            : "py-5"
        }`}
      >
        <div className="container-page flex items-center justify-between gap-5">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div
              aria-hidden="true"
              className="grid size-11 place-items-center rounded-[10px] bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] font-serif text-xl font-bold text-[#060e1a]"
            >
              ⚓
            </div>
            <div className="leading-tight">
              <strong className="block font-serif text-[1.15rem] font-bold">
                Patrão Mor
              </strong>
              <span className="text-[0.65rem] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Escola Náutica · Amora
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 text-sm font-medium lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3.5 py-2 text-[var(--text-muted)] transition hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Link
              href="/#contacto"
              className="btn btn-primary hidden md:inline-flex !px-5 !py-2.5 !text-sm"
            >
              Inscrever-me
            </Link>
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls={MENU_ID}
              className="grid size-10 place-items-center rounded-md border border-[var(--border)] bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] lg:hidden"
            >
              <span className="flex flex-col gap-1.5" aria-hidden="true">
                <span
                  className={`block h-px w-5 bg-[var(--text)] transition ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-5 bg-[var(--text)] transition ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-px w-5 bg-[var(--text)] transition ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {open ? (
        <div
          ref={menuRef}
          id={MENU_ID}
          role="dialog"
          aria-label="Menu de navegação"
          aria-modal="true"
          className="fixed inset-0 z-[800] flex flex-col gap-2 bg-[var(--bg)] px-6 pb-10 pt-24 lg:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-[10px] border border-[var(--border)] px-5 py-4 text-lg font-medium text-[var(--text-muted)] transition hover:bg-[rgba(201,168,76,0.06)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contacto"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-4 w-full !justify-center"
          >
            Inscrever-me
          </Link>
        </div>
      ) : null}
    </>
  );
}
