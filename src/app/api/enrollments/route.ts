import { NextResponse, type NextRequest } from "next/server";
import { getServerClient } from "@/lib/supabase/server";
import { enrollmentSchema } from "@/lib/validation";
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

  const parsed = enrollmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Dados inválidos",
        details: parsed.error.flatten().fieldErrors
      },
      { status: 422 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const supabase = getServerClient();

  const { error } = await supabase.from("enrollments").insert({
    course_id: parsed.data.course_id ?? null,
    course_date_id: parsed.data.course_date_id ?? null,
    user_name: parsed.data.user_name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    message: parsed.data.message || null,
    status: "pending"
  });

  if (error) {
    console.error("[enrollments.insert]", error.message);
    return NextResponse.json(
      { error: "Não foi possível registar a inscrição. Tenta novamente." },
      { status: 500 }
    );
  }

  void notifyAdmin({
    type: "enrollment",
    user_name: parsed.data.user_name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    message: parsed.data.message || undefined
  });

  return NextResponse.json({ ok: true });
}
