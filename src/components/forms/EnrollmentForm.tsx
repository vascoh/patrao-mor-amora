"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { whatsappForCourse } from "@/lib/whatsapp";
import { enrollmentSchema, type EnrollmentInput } from "@/lib/validation";
import { trackEvent } from "@/lib/analytics";
import { FormField } from "./FormField";
import type { CourseDate } from "@/types/database";

interface Props {
  courseId: string;
  courseName: string;
  dates: CourseDate[];
  initialDateId?: string;
}

export function EnrollmentForm({
  courseId,
  courseName,
  dates,
  initialDateId
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<EnrollmentInput>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      course_id: courseId,
      course_date_id: initialDateId ?? dates[0]?.id ?? null
    }
  });

  async function onSubmit(values: EnrollmentInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Erro ao enviar a inscrição");
      }
      trackEvent("enrollment_submit", { course: courseName });
      setSubmitted(true);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Erro inesperado");
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[20px] border border-[var(--border)] bg-[var(--bg)] p-8 text-center">
        <div className="text-5xl">✅</div>
        <h3 className="mt-3 font-serif text-2xl">Inscrição recebida!</h3>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Vamos confirmar a tua vaga e contactar-te brevemente.
        </p>
        <a
          href={whatsappForCourse(courseName)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-wa mt-4"
        >
          💬 Falar no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-[20px] border border-[var(--border)] bg-[var(--bg)] p-6"
    >
      <input type="hidden" {...register("course_id")} />
      <h3 className="font-serif text-2xl">Inscrever-me em {courseName}</h3>

      {dates.length ? (
        <label className="block">
          <span className="field-label">Data preferida</span>
          <select className="field-input" {...register("course_date_id")}>
            {dates.map((d) => (
              <option key={d.id} value={d.id}>
                {new Date(d.start_date).toLocaleDateString("pt-PT", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric"
                })}{" "}
                — {d.location ?? ""} ({d.available_slots} vagas)
              </option>
            ))}
          </select>
        </label>
      ) : (
        <p className="rounded-md border border-dashed border-[var(--border)] p-3 text-sm text-[var(--text-muted)]">
          Sem datas calendarizadas — vamos contactar-te com a próxima turma
          disponível.
        </p>
      )}

      <FormField label="Nome Completo *" error={errors.user_name?.message}>
        <input className="field-input" {...register("user_name")} />
      </FormField>
      <FormField label="Email *" error={errors.email?.message}>
        <input
          type="email"
          autoComplete="email"
          className="field-input"
          {...register("email")}
        />
      </FormField>
      <FormField label="Telefone *" error={errors.phone?.message}>
        <input
          type="tel"
          autoComplete="tel"
          className="field-input"
          {...register("phone")}
        />
      </FormField>
      <FormField label="Mensagem (opcional)" error={errors.message?.message}>
        <textarea rows={3} className="field-input resize-y" {...register("message")} />
      </FormField>

      <label className="hidden">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </label>

      <label className="flex items-start gap-3 text-xs text-[var(--text-muted)]">
        <input
          type="checkbox"
          className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
          {...register("privacy")}
        />
        <span>
          Aceito a{" "}
          <a href="/privacidade" className="text-[var(--accent)] underline">
            Política de Privacidade
          </a>
          .
        </span>
      </label>
      {errors.privacy ? <p className="field-error">{errors.privacy.message}</p> : null}

      {serverError ? (
        <p className="rounded-md border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary !w-full !justify-center disabled:opacity-60"
      >
        {isSubmitting ? "A enviar..." : "🚀 Confirmar inscrição"}
      </button>
    </form>
  );
}

