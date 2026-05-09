import { NextResponse, type NextRequest } from "next/server";
import { getServerClient } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";
import { notifyAdmin } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const limited = checkRateLimit(req);
  if (limited) return limited;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Dados inválidos",
        details: parsed.error.flatten().fieldErrors
      },
      { status: 422 }
    );
  }

  // Honeypot — se preenchido, finge sucesso para o bot
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const supabase = getServerClient();
  const { error } = await supabase.from("leads").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    message: parsed.data.message || null,
    course_interest: parsed.data.course_interest || null,
    user_agent: req.headers.get("user-agent")
  });

  if (error) {
    console.error("[leads.insert]", error.message);
    return NextResponse.json(
      { error: "Não foi possível registar o pedido. Tenta novamente." },
      { status: 500 }
    );
  }

  void notifyAdmin({
    type: "lead",
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    course_interest: parsed.data.course_interest || undefined,
    message: parsed.data.message || undefined
  });

  return NextResponse.json({ ok: true });
}
