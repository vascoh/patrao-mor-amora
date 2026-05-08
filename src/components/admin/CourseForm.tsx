"use client";

import { useState, useTransition } from "react";
import type { Course } from "@/types/database";

interface Props {
  course?: Course;
  action: (formData: FormData) => Promise<{ error?: string } | void>;
  submitLabel: string;
}

export function CourseForm({ course, action, submitLabel }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form action={handleSubmit} className="grid gap-4 md:grid-cols-2">
      <Field label="Slug *" name="slug" defaultValue={course?.slug} required />
      <Field label="Nome *" name="name" defaultValue={course?.name} required />

      <Select
        label="Categoria *"
        name="category"
        defaultValue={course?.category ?? "carta"}
        options={[
          { value: "carta", label: "Carta de Navegador" },
          { value: "vela", label: "Vela" },
          { value: "seguranca", label: "Segurança" },
          { value: "mergulho", label: "Mergulho" },
          { value: "formacao", label: "Formação" }
        ]}
      />
      <Select
        label="Nível *"
        name="level"
        defaultValue={course?.level ?? "iniciante"}
        options={[
          { value: "iniciante", label: "Iniciante" },
          { value: "intermedio", label: "Intermédio" },
          { value: "avancado", label: "Avançado" },
          { value: "profissional", label: "Profissional" }
        ]}
      />

      <Field
        label="Preço (€) *"
        name="price"
        type="number"
        step="0.01"
        defaultValue={course?.price?.toString()}
        required
      />
      <Field
        label="Duração *"
        name="duration"
        defaultValue={course?.duration}
        placeholder="3–4 meses"
        required
      />

      <Field
        label="Idade mínima"
        name="age_min"
        type="number"
        defaultValue={(course?.age_min ?? 0).toString()}
      />
      <Field
        label="Local"
        name="location"
        defaultValue={course?.location ?? ""}
        placeholder="Amora / Seixal"
      />

      <Field
        label="Badge"
        name="badge"
        defaultValue={course?.badge ?? ""}
        placeholder="DGRM"
      />
      <Field
        label="Ícone (emoji)"
        name="icon"
        defaultValue={course?.icon ?? ""}
        placeholder="🚤"
      />

      <Textarea
        label="Descrição *"
        name="description"
        defaultValue={course?.description}
        className="md:col-span-2"
        required
      />

      <Textarea
        label="Highlights (uma linha por item)"
        name="highlights"
        defaultValue={(course?.highlights ?? []).join("\n")}
        className="md:col-span-2"
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="is_featured"
          defaultChecked={course?.is_featured ?? false}
          className="size-4 accent-[var(--accent)]"
        />
        Destacar no site (badge "Mais Procurado")
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={course?.is_active ?? true}
          className="size-4 accent-[var(--accent)]"
        />
        Curso activo (visível ao público)
      </label>

      {error ? (
        <p className="md:col-span-2 rounded-md border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
          {error}
        </p>
      ) : null}

      <div className="md:col-span-2 flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary disabled:opacity-60"
        >
          {pending ? "A guardar..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input className="field-input" {...rest} />
    </label>
  );
}

function Textarea({
  label,
  className,
  ...rest
}: { label: string; className?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="field-label">{label}</span>
      <textarea rows={4} className="field-input resize-y" {...rest} />
    </label>
  );
}

function Select({
  label,
  options,
  ...rest
}: {
  label: string;
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <select className="field-input" {...rest}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
