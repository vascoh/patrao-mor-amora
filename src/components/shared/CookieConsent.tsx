"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "pm_cookie_consent";

type ConsentState = "granted" | "denied" | null;

function getStoredConsent(): ConsentState {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val === "granted" || val === "denied") return val;
  } catch {
    // SSR
  }
  return null;
}

function applyConsent(state: "granted" | "denied") {
  try {
    localStorage.setItem(STORAGE_KEY, state);
  } catch {
    // ignore
  }

  if (typeof window !== "undefined" && "gtag" in window) {
    const g = (window as { gtag?: (...args: unknown[]) => void }).gtag;
    if (g) {
      g("consent", "update", {
        analytics_storage: state,
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state
      });
    }
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored === null) {
      setVisible(true);
    } else {
      applyConsent(stored);
    }
  }, []);

  function accept() {
    applyConsent("granted");
    setVisible(false);
  }

  function deny() {
    applyConsent("denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-4 z-[9998] md:left-auto md:max-w-sm md:right-4"
    >
      <div className="rounded-[16px] border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow)]">
        <p className="text-sm text-[var(--text-muted)]">
          Usamos cookies analíticos para melhorar a experiência no site.{" "}
          <Link href="/privacidade" className="text-[var(--accent)] underline underline-offset-2">
            Saber mais
          </Link>
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={accept}
            className="flex-1 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#060e1a] transition hover:bg-[var(--accent-light)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={deny}
            className="flex-1 rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)] transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
}
