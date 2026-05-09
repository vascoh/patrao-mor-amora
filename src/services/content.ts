import { getServerClient } from "@/lib/supabase/server";
import type { Testimonial, FaqItem, Partner, SiteStat } from "@/types/database";

export type { Testimonial, FaqItem, Partner, SiteStat };

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
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
    .select("*")
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
    .select("*")
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
    .select("*")
    .order("display_order", { ascending: true });
  if (error) {
    console.error("[getSiteStats]", error.message);
    return [];
  }
  return (data ?? []) as SiteStat[];
}
