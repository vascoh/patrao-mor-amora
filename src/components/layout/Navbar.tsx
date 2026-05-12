"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const links = [
  { href: "/amora#sobre", label: "Sobre" },
  { href: "/amora#cursos", label: "Cursos" },
  { href: "/amora#calendario", label: "Calendário" },
  { href: "/amora#simulador", label: "Qual Carta?" },
  { href: "/amora#testemunhos", label: "Alunos" },
  { href: "/amora#blog", label: "Blog" },
  { href: "/amora#contacto", label: "Contacto" }
];

const MENU_ID = "mobile-nav-menu";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  setMounted(true);
}, []);

useEffect(() => {
  if (!mounted) return;

  const onScroll = () => {
    setScrolled(window.scrollY > 80);
  };

  onScroll();

  window.addEventListener("scroll", onScroll, {
    passive: true,
  });

  return () => window.removeEventListener("scroll", onScroll);
}, [mounted]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

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

  // Only apply scroll-dependent styles after mount to prevent SSR/client mismatch
  const isScrolled = mounted && scrolled;

  return (
    <>
      <nav
        aria-label="Navegação principal"
        className={`fixed inset-x-0 top-0 z-[900] transition-all duration-300 ${
          isScrolled
            ? "border-b border-[var(--border)] bg-[var(--nav-scrolled-bg)] py-3 shadow-[0_4px_24px_rgba(13,30,53,0.14)] backdrop-blur-xl"
            : "py-5"
        }`}
      >
        <div className="container-page flex items-center justify-between gap-5">

          {/* Logo */}
          <Link href="/amora" className="flex shrink-0 items-center gap-3">
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

          {/* Desktop nav links */}
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

          {/* Right side actions */}
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />

            <Link
              href="/amora#contacto"
              className="btn btn-primary hidden md:inline-flex !px-5 !py-2.5 !text-sm"
            >
              Inscrever-me
            </Link>

            {/* Admin — subtle, desktop only */}
            <Link
              href="/admin"
              aria-label="Área de Administração"
              title="Administração"
              className="hidden size-8 place-items-center rounded-md text-[var(--text-subtle)] opacity-25 transition hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] lg:grid"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </Link>

            {/* Hamburger */}
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
          className="fixed inset-0 z-[800] flex flex-col gap-2 overflow-y-auto bg-[var(--bg)] px-6 pb-10 pt-24 lg:hidden"
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
            href="/amora#contacto"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-4 w-full !justify-center"
          >
            Inscrever-me
          </Link>

          {/* Admin — bottom of mobile menu, very subtle */}
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="mt-auto flex items-center gap-2 py-3 text-xs text-[var(--text-subtle)] opacity-35 transition hover:opacity-65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Administração
          </Link>
        </div>
      ) : null}
    </>
  );
}
