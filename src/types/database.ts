export type CourseCategory =
  | "carta"
  | "vela"
  | "seguranca"
  | "mergulho"
  | "formacao";

export type CourseLevel =
  | "iniciante"
  | "intermedio"
  | "avancado"
  | "profissional";

export type DateStatus = "available" | "few" | "full" | "cancelled";

export type EnrollmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface Course {
  id: string;
  slug: string;
  name: string;
  category: CourseCategory;
  description: string;
  price: number;
  level: CourseLevel;
  duration: string;
  age_min: number | null;
  location: string | null;
  badge: string | null;
  icon: string | null;
  highlights: string[];
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseDate {
  id: string;
  course_id: string;
  start_date: string;
  end_date: string | null;
  schedule: string | null;
  location: string | null;
  total_slots: number;
  available_slots: number;
  status: DateStatus;
  notes: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  course_interest: string | null;
  source: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface Enrollment {
  id: string;
  course_id: string | null;
  course_date_id: string | null;
  user_name: string;
  email: string;
  phone: string;
  message: string | null;
  status: EnrollmentStatus;
  created_at: string;
}

export interface Testimonial {
  id: string;
  text: string;
  course: string;
  author: string;
  info: string;
  avatar: string;
  stars: number;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Partner {
  id: string;
  name: string;
  icon: string;
  url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface SiteStat {
  id: string;
  key: string;
  value: string;
  label: string;
  display_order: number;
}

export interface CourseDateWithCourse extends CourseDate {
  course: Pick<Course, "id" | "slug" | "name" | "category" | "icon"> | null;
}

type TableShape<TRow, TInsertRequired extends keyof TRow = never> = {
  Row: TRow;
  Insert: Partial<TRow> & Pick<TRow, TInsertRequired>;
  Update: Partial<TRow>;
  Relationships: [];
};

export interface Database {
  public: {
    Tables: {
      courses: TableShape<Course, "name" | "slug" | "description" | "price" | "duration">;
      course_dates: TableShape<CourseDate, "course_id" | "start_date">;
      leads: TableShape<Lead, "name" | "email" | "phone">;
      enrollments: TableShape<Enrollment, "user_name" | "email" | "phone">;
      testimonials: TableShape<Testimonial, "text" | "course" | "author" | "info" | "avatar">;
      faq_items: TableShape<FaqItem, "question" | "answer">;
      partners: TableShape<Partner, "name">;
      site_stats: TableShape<SiteStat, "key" | "value" | "label">;
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: {
      course_level: CourseLevel;
      date_status: DateStatus;
      enrollment_status: EnrollmentStatus;
      course_category: CourseCategory;
    };
    CompositeTypes: { [_ in never]: never };
  };
}
