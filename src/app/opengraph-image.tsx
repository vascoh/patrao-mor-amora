import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const alt = "Patrão Mor Amora — Escola Náutica Certificada DGRM desde 1981";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const stats = [
    { num: "44+", label: "Anos" },
    { num: "2800+", label: "Alunos" },
    { num: "94%", label: "Aprovação" },
    { num: "9", label: "Certs." },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #060e1a 0%, #0a1628 60%, #152e5a 100%)",
          padding: "0",
          position: "relative",
        }}
      >
        {/* Gold top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent 0%, #c9a84c 30%, #e8c97a 50%, #c9a84c 70%, transparent 100%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "60px 72px",
          }}
        >
          {/* School header */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
              }}
            >
              ⚓
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#f8f9fa", fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>
                Patrão Mor Amora
              </span>
              <span style={{ color: "#8892a4", fontSize: 14, letterSpacing: "0.1em" }}>
                ESCOLA NÁUTICA CERTIFICADA · DGRM
              </span>
            </div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {/* Badge */}
            <div style={{ display: "flex", marginBottom: 20 }}>
              <div
                style={{
                  background: "rgba(201, 168, 76, 0.12)",
                  border: "1px solid rgba(201, 168, 76, 0.4)",
                  color: "#e8c97a",
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "6px 16px",
                  borderRadius: 100,
                  letterSpacing: "0.1em",
                }}
              >
                ESCOLA NÁUTICA · AMORA · SEIXAL · MARGEM SUL
              </div>
            </div>

            {/* Headline */}
            <div
              style={{
                color: "#f8f9fa",
                fontSize: 68,
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: 18,
              }}
            >
              Aprende a Navegar
              <br />
              <span style={{ color: "#e8c97a" }}>com Segurança</span>
            </div>

            {/* Subheadline */}
            <div style={{ color: "#8892a4", fontSize: 22, lineHeight: 1.5 }}>
              {siteConfig.description}
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(201, 168, 76, 0.2)",
                  borderRadius: 12,
                  padding: "14px 24px",
                }}
              >
                <span style={{ color: "#e8c97a", fontSize: 32, fontWeight: 800, lineHeight: 1 }}>
                  {s.num}
                </span>
                <span style={{ color: "#8892a4", fontSize: 13, marginTop: 4, letterSpacing: "0.08em" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gold bottom accent line */}
        <div
          style={{
            height: 4,
            background: "linear-gradient(90deg, transparent 0%, #c9a84c 30%, #e8c97a 50%, #c9a84c 70%, transparent 100%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
