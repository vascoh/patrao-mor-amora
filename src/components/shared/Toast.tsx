"use client";

import { useEffect, useState } from "react";

export type ToastVariant = "success" | "error" | "info";

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose?: () => void;
}

const variantStyles: Record<ToastVariant, string> = {
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  error: "border-rose-500/40 bg-rose-500/10 text-rose-300",
  info: "border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text)]"
};

const variantIcons: Record<ToastVariant, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ"
};

export function Toast({
  message,
  variant = "info",
  duration = 4000,
  onClose
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`fixed bottom-20 left-1/2 z-[999] -translate-x-1/2 transition-all duration-300 md:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div
        className={`flex items-center gap-3 rounded-xl border px-5 py-3 text-sm font-medium shadow-xl backdrop-blur-sm ${variantStyles[variant]}`}
      >
        <span className="font-bold" aria-hidden="true">
          {variantIcons[variant]}
        </span>
        {message}
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            setTimeout(() => onClose?.(), 300);
          }}
          aria-label="Fechar notificação"
          className="ml-2 opacity-60 hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  );
}
