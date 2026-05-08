"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { whatsappLink } from "@/lib/whatsapp";
import { leadSchema, type LeadInput } from "@/lib/validation";
import { trackEvent } from "@/lib/analytics";
import { FormField } from "./FormField";

interface ContactFormProps {
  defaultCourse?: string;
  courseOptions?: { value: string; label: string }[];
}

export function ContactForm({ defaultCourse, courseOptions }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      course_interest: defaultCourse ?? ""
    }
  });

  async function onSubmit(values: LeadInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Erro ao enviar o formulário");
      }
      trackEvent("lead_submit", { course: values.course_interest });
      setSubmitted(true);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Erro inesperado");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[20px] border border-[var(--border)] bg-[var(--bg)] p-10 text-center">
        <div className="text-5xl">✅</div>
        <h3 className="mt-3 font-serif text-2xl">Pré-Inscrição Enviada!</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-[var(--text-muted)]">
          Obrigado pelo teu interesse! Entraremos em contacto em menos de 24
          horas. Enquanto isso, podes falar connosco diretamente via WhatsApp.
        </p>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-wa mt-5"
        >
          💬 Continuar no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-[20px] border border-[var(--border)] bg-[var(--bg)] p-6 md:p-8"
    >
      <h3 className="font-serif text-2xl">Pré-Inscrição Rápida</h3>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        Preenche o formulário e entraremos em contacto em menos de 24 horas com
        toda a informação.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <FormField label="Nome Completo *" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            placeholder="O teu nome"
            className="field-input"
            {...register("name")}
          />
        </FormField>
        <FormField label="Telefone / WhatsApp *" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+351 9XX XXX XXX"
            className="field-input"
            {...register("phone")}
          />
        </FormField>
        <FormField
          className="md:col-span-2"
          label="Email *"
          error={errors.email?.message}
        >
          <input
            type="email"
            autoComplete="email"
            placeholder="email@exemplo.com"
            className="field-input"
            {...register("email")}
          />
        </FormField>
        {courseOptions ? (
          <FormField
            className="md:col-span-2"
            label="Curso Pretendido"
            error={errors.course_interest?.message}
          >
            <select className="field-input" {...register("course_interest")}>
              <option value="">Seleciona o curso...</option>
              {courseOptions.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
              <option value="indeciso">Não sei — preciso de ajuda</option>
            </select>
          </FormField>
        ) : (
          <input type="hidden" {...register("course_interest")} />
        )}
        <FormField
          className="md:col-span-2"
          label="Mensagem (opcional)"
          error={errors.message?.message}
        >
          <textarea
            rows={4}
            placeholder="Conta-nos mais sobre os teus objetivos, disponibilidade ou qualquer dúvida..."
            className="field-input resize-y"
            {...register("message")}
          />
        </FormField>

        {/* honeypot anti-spam — invisível para utilizadores reais */}
        <label className="hidden">
          Não preencher
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>

        <label className="md:col-span-2 flex items-start gap-3 text-xs text-[var(--text-muted)]">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
            {...register("privacy")}
          />
          <span>
            Aceito a{" "}
            <a href="/privacidade" className="text-[var(--accent)] underline">
              Política de Privacidade
            </a>{" "}
            e consinto o contacto por parte da Patrão Mor.
          </span>
        </label>
        {errors.privacy ? (
          <p className="field-error md:col-span-2">{errors.privacy.message}</p>
        ) : null}
      </div>

      {serverError ? (
        <p className="mt-4 rounded-md border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary mt-6 !w-full !justify-center !py-4 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "A enviar..." : "🚀 Enviar Pré-Inscrição"}
      </button>
      <p className="mt-3 text-center text-xs text-[var(--text-subtle)]">
        🔒 Os teus dados estão seguros e nunca são partilhados com terceiros.
      </p>
    </form>
  );
}
