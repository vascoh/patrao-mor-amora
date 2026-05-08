import { NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase/server";
import { toCsv } from "@/lib/csv";

export const runtime = "nodejs";

export async function GET() {
  const supabase = getServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Falha a obter leads" },
      { status: 500 }
    );
  }

  const csv = toCsv(data, [
    { key: "created_at", label: "Data" },
    { key: "name", label: "Nome" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Telefone" },
    { key: "course_interest", label: "Curso" },
    { key: "message", label: "Mensagem" },
    { key: "source", label: "Origem" }
  ]);

  const filename = `leads-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  });
}
