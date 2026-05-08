import { getServerClient } from "@/lib/supabase/server";
import type { Lead } from "@/types/database";

export async function getLeads(limit = 200): Promise<Lead[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[getLeads]", error.message);
    return [];
  }
  return (data ?? []) as Lead[];
}

export async function getLeadStats() {
  const supabase = getServerClient();
  const since = new Date();
  since.setDate(since.getDate() - 30);
  const { count: last30 } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .gte("created_at", since.toISOString());
  const { count: total } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });
  return { last30: last30 ?? 0, total: total ?? 0 };
}
