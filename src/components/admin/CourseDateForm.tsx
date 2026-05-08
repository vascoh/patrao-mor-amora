"use client";

import { useState, useTransition } from "react";
import type { CourseDate, Course } from "@/types/database";

interface Props {
  courseDate?: CourseDate;
  courses: Pick<Course, "id" | "name" | "icon">[];
  action: (formData: FormData) => Promise<{ error?: string } | void>;
  submitLabel: string;
}

export function CourseDateForm({ courseDate, courses, action, submitLabel }: Props) {
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
      <label className="block md:col-span-2">
        <span className="field-label">Curso *</span>
        <select
          name="course_id"
          defaultValue={courseDate?.course_id ?? ""}
          required
          className="field-input"
        >
          <option value="" disabled>Seleciona um curso…</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon} {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="field-label">Data de Início *</span>
        <input
          type="date"
          name="start_date"
          defaultValue={courseDate?.start_date?.slice(0, 10) ?? ""}
          required
          className="field-input"
        />
      </label>

      <label className="block">
        <span className="field-label">Data de Fim</span>
        <input
          type="date"
          name="end_date"
          defaultValue={courseDate?.end_date?.slice(0, 10) ?? ""}
          className="field-input"
        />
      </label>

      <label className="block">
        <span className="field-label">Horário</span>
        <input
          type="text"
          name="schedule"
          defaultValue={courseDate?.schedule ?? ""}
          placeholder="Sábados 09h–13h"
          className="field-input"
        />
      </label>

      <label className="block">
        <span className="field-label">Local</span>
        <input
          type="text"
          name="location"
          defaultValue={courseDate?.location ?? ""}
          placeholder="Amora / Seixal"
          className="field-input"
        />
      </label>

      <label className="block">
        <span className="field-label">Total de vagas *</span>
        <input
          type="number"
          name="total_slots"
          defaultValue={(courseDate?.total_slots ?? 12).toString()}
          min="1"
          required
          className="field-input"
        />
      </label>

      <label className="block">
        <span className="field-label">Vagas disponíveis *</span>
        <input
          type="number"
          name="available_slots"
          defaultValue={(courseDate?.available_slots ?? 12).toString()}
          min="0"
          required
          className="field-input"
        />
      </label>

      <label className="block md:col-span-2">
        <span className="field-label">Notas</span>
        <textarea
          name="notes"
          defaultValue={courseDate?.notes ?? ""}
          rows={3}
          className="field-input resize-y"
          placeholder="Informação adicional para os alunos…"
        />
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
