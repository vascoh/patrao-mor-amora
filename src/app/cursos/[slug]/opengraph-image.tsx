import { ImageResponse } from "next/og";
import { getCourseBySlug } from "@/services/courses";

export const alt = "Curso Náutico Certificado — Patrão Mor Amora";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const categoryLabel: Record<string, string> = {
  carta: "Carta de Navegador",
  vela: "Vela",
  seguranca: "Segurança no Mar",
  mergulho: "Mergulho PADI",
  formacao: "Formação",
};

const levelLabel: Record<string, string> = {
  iniciante: "Iniciante",
  intermedio: "Intermédio",
  avancado: "Avançado",
  profissional: "Profissional",
};

export default async function OGImage({
  params,
}: {
  params: { slug: string };
}) {
  const course = await getCourseBySlug(params.slug);

  const title = course?.name ?? "Curso Náutico";
  const description = course
    ? course.description.slice(0, 110) + (course.description.length > 110 ? "…" : "")
    : "Formação certificada pela DGRM em Amora, Seixal.";
  const price = course ? `€ ${Number(course.price).toFixed(0)}` : null;
  const category = course ? (categoryLabel[course.category] ?? course.category) : null;
  const level = course ? (levelLabel[course.level] ?? course.level) : null;
  const duration = course?.duration ?? null;
  const location = course?.location ?? "Amora";

  const pills = [price, duration, location].filter(Boolean) as string[];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #060e1a 0%, #0a1628 55%, #152e5a 100%)",
          position: "relative",
        }}
      >
        {/* Top gold line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #c9a84c 25%, #e8c97a 50%, #c9a84c 75%, transparent)",
          }}
        />

        {/* Left gold stripe */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            background: "linear-gradient(180deg, transparent, #c9a84c 30%, #e8c97a 50%, #c9a84c 70%, transparent)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "56px 72px",
          }}
        >
          {/* School header */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 12,
                background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              ⚓
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#f8f9fa", fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>
                Patrão Mor Amora
              </span>
              <span style={{ color: "#8892a4", fontSize: 13, letterSpacing: "0.1em" }}>
                ESCOLA NÁUTICA · DGRM · DESDE 1981
              </span>
            </div>
          </div>

          {/* Main content — vertically centered */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 24,
            }}
          >
            {/* Category + level badge */}
            {category && (
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <div
                  style={{
                    background: "rgba(201, 168, 76, 0.12)",
                    border: "1px solid rgba(201, 168, 76, 0.4)",
                    color: "#e8c97a",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "5px 14px",
                    borderRadius: 100,
                    letterSpacing: "0.08em",
                  }}
                >
                  {category}
                </div>
                {level && (
                  <div
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#c8cdd8",
                      fontSize: 13,
                      fontWeight: 500,
                      padding: "5px 14px",
                      borderRadius: 100,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {level}
                  </div>
                )}
              </div>
            )}

            {/* Course title */}
            <div
              style={{
                color: "#f8f9fa",
                fontSize: title.length > 22 ? 58 : 72,
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: 20,
                maxWidth: 900,
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                color: "#8892a4",
                fontSize: 20,
                lineHeight: 1.5,
                maxWidth: 800,
              }}
            >
              {description}
            </div>
          </div>

          {/* Bottom pills */}
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            {pills.map((pill) => (
              <div
                key={pill}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(201, 168, 76, 0.25)",
                  color: "#c8cdd8",
                  fontSize: 17,
                  fontWeight: 600,
                  padding: "10px 20px",
                  borderRadius: 10,
                }}
              >
                {pill}
              </div>
            ))}
            <div
              style={{
                marginLeft: "auto",
                background: "rgba(201, 168, 76, 0.1)",
                border: "1px solid rgba(201, 168, 76, 0.35)",
                color: "#e8c97a",
                fontSize: 14,
                fontWeight: 600,
                padding: "10px 18px",
                borderRadius: 10,
                letterSpacing: "0.05em",
              }}
            >
              CERTIFICADO DGRM
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
