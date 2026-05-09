import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "geral@patraomor.pt";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "noreply@patraomor.pt";
const SITE_URL = Deno.env.get("NEXT_PUBLIC_SITE_URL") ?? "https://patraomor.pt";

interface EnrollmentPayload {
  type: "enrollment";
  user_name: string;
  email: string;
  phone: string;
  course_name?: string;
  message?: string;
}

interface LeadPayload {
  type: "lead";
  name: string;
  email: string;
  phone: string;
  course_interest?: string;
  message?: string;
}

type Payload = EnrollmentPayload | LeadPayload;

function buildEnrollmentHtml(d: EnrollmentPayload): string {
  return `
<!DOCTYPE html>
<html lang="pt">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:sans-serif;background:#060e1a;color:#f8f9fa;margin:0;padding:32px">
  <div style="max-width:560px;margin:0 auto;background:#0a1628;border-radius:16px;border:1px solid rgba(201,168,76,0.2);overflow:hidden">
    <div style="background:linear-gradient(135deg,#060e1a,#0a1628);padding:24px 32px;border-bottom:2px solid #c9a84c">
      <div style="display:flex;align-items:center;gap:12px">
        <span style="font-size:24px">⚓</span>
        <div>
          <strong style="font-size:18px;color:#f8f9fa">Patrão Mor Amora</strong><br>
          <span style="font-size:12px;color:#8892a4;letter-spacing:.1em">NOVA INSCRIÇÃO</span>
        </div>
      </div>
    </div>
    <div style="padding:28px 32px">
      <h2 style="margin:0 0 20px;color:#e8c97a;font-size:20px">Nova inscrição recebida</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr style="border-bottom:1px solid rgba(201,168,76,0.1)">
          <td style="padding:10px 0;color:#8892a4;font-size:13px;width:120px">Nome</td>
          <td style="padding:10px 0;font-weight:600">${d.user_name}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(201,168,76,0.1)">
          <td style="padding:10px 0;color:#8892a4;font-size:13px">Email</td>
          <td style="padding:10px 0"><a href="mailto:${d.email}" style="color:#c9a84c">${d.email}</a></td>
        </tr>
        <tr style="border-bottom:1px solid rgba(201,168,76,0.1)">
          <td style="padding:10px 0;color:#8892a4;font-size:13px">Telefone</td>
          <td style="padding:10px 0">${d.phone}</td>
        </tr>
        ${d.course_name ? `<tr style="border-bottom:1px solid rgba(201,168,76,0.1)"><td style="padding:10px 0;color:#8892a4;font-size:13px">Curso</td><td style="padding:10px 0;color:#c9a84c;font-weight:600">${d.course_name}</td></tr>` : ""}
        ${d.message ? `<tr><td style="padding:10px 0;color:#8892a4;font-size:13px;vertical-align:top">Mensagem</td><td style="padding:10px 0">${d.message}</td></tr>` : ""}
      </table>
      <div style="margin-top:28px">
        <a href="${SITE_URL}/admin/inscricoes"
           style="display:inline-block;background:linear-gradient(135deg,#c9a84c,#e8c97a);color:#060e1a;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px">
          Ver no painel admin →
        </a>
      </div>
    </div>
    <div style="padding:16px 32px;background:rgba(255,255,255,0.02);font-size:12px;color:#5a6a7e;text-align:center">
      Patrão Mor Amora — Escola Náutica Certificada DGRM · <a href="${SITE_URL}" style="color:#c9a84c">${SITE_URL}</a>
    </div>
  </div>
</body>
</html>`;
}

function buildLeadHtml(d: LeadPayload): string {
  return `
<!DOCTYPE html>
<html lang="pt">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:sans-serif;background:#060e1a;color:#f8f9fa;margin:0;padding:32px">
  <div style="max-width:560px;margin:0 auto;background:#0a1628;border-radius:16px;border:1px solid rgba(201,168,76,0.2);overflow:hidden">
    <div style="background:linear-gradient(135deg,#060e1a,#0a1628);padding:24px 32px;border-bottom:2px solid #c9a84c">
      <div style="display:flex;align-items:center;gap:12px">
        <span style="font-size:24px">⚓</span>
        <div>
          <strong style="font-size:18px;color:#f8f9fa">Patrão Mor Amora</strong><br>
          <span style="font-size:12px;color:#8892a4;letter-spacing:.1em">NOVO CONTACTO</span>
        </div>
      </div>
    </div>
    <div style="padding:28px 32px">
      <h2 style="margin:0 0 20px;color:#e8c97a;font-size:20px">Novo contacto recebido</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr style="border-bottom:1px solid rgba(201,168,76,0.1)">
          <td style="padding:10px 0;color:#8892a4;font-size:13px;width:120px">Nome</td>
          <td style="padding:10px 0;font-weight:600">${d.name}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(201,168,76,0.1)">
          <td style="padding:10px 0;color:#8892a4;font-size:13px">Email</td>
          <td style="padding:10px 0"><a href="mailto:${d.email}" style="color:#c9a84c">${d.email}</a></td>
        </tr>
        <tr style="border-bottom:1px solid rgba(201,168,76,0.1)">
          <td style="padding:10px 0;color:#8892a4;font-size:13px">Telefone</td>
          <td style="padding:10px 0">${d.phone}</td>
        </tr>
        ${d.course_interest ? `<tr style="border-bottom:1px solid rgba(201,168,76,0.1)"><td style="padding:10px 0;color:#8892a4;font-size:13px">Interesse</td><td style="padding:10px 0;color:#c9a84c">${d.course_interest}</td></tr>` : ""}
        ${d.message ? `<tr><td style="padding:10px 0;color:#8892a4;font-size:13px;vertical-align:top">Mensagem</td><td style="padding:10px 0">${d.message}</td></tr>` : ""}
      </table>
      <div style="margin-top:28px">
        <a href="${SITE_URL}/admin/leads"
           style="display:inline-block;background:linear-gradient(135deg,#c9a84c,#e8c97a);color:#060e1a;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px">
          Ver no painel admin →
        </a>
      </div>
    </div>
    <div style="padding:16px 32px;background:rgba(255,255,255,0.02);font-size:12px;color:#5a6a7e;text-align:center">
      Patrão Mor Amora — Escola Náutica Certificada DGRM · <a href="${SITE_URL}" style="color:#c9a84c">${SITE_URL}</a>
    </div>
  </div>
</body>
</html>`;
}

async function sendEmail(subject: string, html: string): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn("[notify-admin] RESEND_API_KEY not set — skipping email");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: `Patrão Mor <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject,
      html
    })
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[notify-admin] Resend error:", err);
    throw new Error(`Resend API error: ${res.status}`);
  }
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  try {
    if (payload.type === "enrollment") {
      await sendEmail(
        `🎓 Nova inscrição — ${payload.user_name}`,
        buildEnrollmentHtml(payload)
      );
    } else if (payload.type === "lead") {
      await sendEmail(
        `📋 Novo contacto — ${payload.name}`,
        buildLeadHtml(payload)
      );
    } else {
      return new Response("Unknown type", { status: 400 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("[notify-admin]", err);
    return new Response(JSON.stringify({ error: "Email failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
