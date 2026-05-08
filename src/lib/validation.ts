import { z } from "zod";

const phoneRegex = /^[+0-9 ()\-]{7,20}$/;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Indica o teu nome"),
  email: z.string().trim().email("Email inválido"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Telefone inválido")
    .min(7, "Telefone demasiado curto"),
  course_interest: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "Tens de aceitar a política de privacidade" })
  }),
  // honeypot anti-spam — tem de estar vazio
  website: z.string().max(0).optional().or(z.literal(""))
});

export type LeadInput = z.infer<typeof leadSchema>;

export const enrollmentSchema = z.object({
  course_id: z.string().uuid().optional().nullable(),
  course_date_id: z.string().uuid().optional().nullable(),
  user_name: z.string().trim().min(2, "Indica o teu nome"),
  email: z.string().trim().email("Email inválido"),
  phone: z.string().trim().regex(phoneRegex, "Telefone inválido"),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "Tens de aceitar a política de privacidade" })
  }),
  website: z.string().max(0).optional().or(z.literal(""))
});

export type EnrollmentInput = z.infer<typeof enrollmentSchema>;

export const courseSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Apenas letras minúsculas, números e hífens"),
  name: z.string().min(2),
  category: z.enum(["carta", "vela", "seguranca", "mergulho", "formacao"]),
  description: z.string().min(10),
  price: z.coerce.number().min(0),
  level: z.enum(["iniciante", "intermedio", "avancado", "profissional"]),
  duration: z.string().min(2),
  age_min: z.coerce.number().int().min(0).max(99).default(0),
  location: z.string().optional().nullable(),
  badge: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  highlights: z.array(z.string()).default([]),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true)
});

export type CourseInput = z.infer<typeof courseSchema>;

export const courseDateSchema = z.object({
  course_id: z.string().uuid(),
  start_date: z.string().min(8),
  end_date: z.string().optional().nullable(),
  schedule: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  total_slots: z.coerce.number().int().min(1).default(12),
  available_slots: z.coerce.number().int().min(0).default(12),
  notes: z.string().optional().nullable()
});

export type CourseDateInput = z.infer<typeof courseDateSchema>;
