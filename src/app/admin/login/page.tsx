"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { getBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectedFrom = params.get("redirectedFrom") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = getBrowserClient();
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.replace(redirectedFrom);
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(ellipse_at_top,_#0e2040,_#03080f)] px-4">
      <div className="w-full max-w-md rounded-[20px] border border-[var(--border-strong)] bg-[var(--bg-card)] p-10 shadow-[0_24px_80px_rgba(0,0,0,0.8)]">
        <div className="text-center">
          <div className="text-4xl">🔐</div>
          <h1 className="mt-3 font-serif text-3xl">Área Administrativa</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Acesso restrito. Entra com as tuas credenciais Supabase.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="field-label">Email</span>
            <input
              type="email"
              autoComplete="username"
              required
              className="field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="field-label">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error ? (
            <p className="rounded-md border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary !w-full !justify-center !py-4 disabled:opacity-60"
          >
            {loading ? "A entrar..." : "Entrar"}
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 block text-center text-xs text-[var(--text-subtle)] hover:text-[var(--accent)]"
        >
          ← Voltar ao site
        </Link>
      </div>
    </main>
  );
}
