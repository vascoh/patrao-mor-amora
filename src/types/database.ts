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

export interface CourseDateWithCourse extends CourseDate {
  course: Pick<Course, "id" | "slug" | "name" | "category" | "icon"> | null;
}

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: Course;
        Insert: Partial<Course> & Pick<Course, "name" | "slug" | "description" | "price" | "duration">;
        Update: Partial<Course>;
      };
      course_dates: {
        Row: CourseDate;
        Insert: Partial<CourseDate> & Pick<CourseDate, "course_id" | "start_date">;
        Update: Partial<CourseDate>;
      };
      leads: {
        Row: Lead;
        Insert: Partial<Lead> & Pick<Lead, "name" | "email" | "phone">;
        Update: Partial<Lead>;
      };
      enrollments: {
        Row: Enrollment;
        Insert: Partial<Enrollment> & Pick<Enrollment, "user_name" | "email" | "phone">;
        Update: Partial<Enrollment>;
      };
    };
  };
}
