import { getServerClient } from "@/lib/supabase/server";

export interface Testimonial {
  id: string;
  text: string;
  course: string;
  author: string;
  info: string;
  avatar: string;
  stars: number;
  display_order: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  display_order: number;
}

export interface Partner {
  id: string;
  name: string;
  icon: string;
  url: string | null;
  display_order: number;
}

export interface SiteStat {
  key: string;
  value: string;
  label: string;
  display_order: number;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, text, course, author, info, avatar, stars, display_order")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  if (error) {
    console.error("[getTestimonials]", error.message);
    return [];
  }
  return (data ?? []) as Testimonial[];
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("faq_items")
    .select("id, question, answer, display_order")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  if (error) {
    console.error("[getFaqItems]", error.message);
    return [];
  }
  return (data ?? []) as FaqItem[];
}

export async function getPartners(): Promise<Partner[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("partners")
    .select("id, name, icon, url, display_order")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  if (error) {
    console.error("[getPartners]", error.message);
    return [];
  }
  return (data ?? []) as Partner[];
}

export async function getSiteStats(): Promise<SiteStat[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("site_stats")
    .select("key, value, label, display_order")
    .order("display_order", { ascending: true });
  if (error) {
    console.error("[getSiteStats]", error.message);
    return [];
  }
  return (data ?? []) as SiteStat[];
}
