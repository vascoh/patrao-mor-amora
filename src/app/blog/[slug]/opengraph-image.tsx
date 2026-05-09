import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const dynamic = "force-dynamic";
export const alt = "Artigo — Blog Náutico Patrão Mor Amora";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  const title = post?.title ?? "Blog Náutico";
  const excerpt = post
    ? post.excerpt.slice(0, 120) + (post.excerpt.length > 120 ? "…" : "")
    : "Artigos sobre navegação, meteorologia e exames DGRM.";
  const tag = post?.tag ?? "Náutica";
  const date = post?.date ?? "";
  const read = post?.read ?? "";
  const icon = post?.icon ?? "📖";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #060e1a 0%, #0e2040 60%, #152e5a 100%)",
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

        {/* Article icon — large decorative */}
        <div
          style={{
            position: "absolute",
            right: 72,
            top: "50%",
            fontSize: 200,
            opacity: 0.06,
            transform: "translateY(-50%)",
            display: "flex",
          }}
        >
          {icon}
        </div>

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
              <span style={{ color: "#f8f9fa", fontSize: 20, fontWeight: 700 }}>
                Patrão Mor Amora
              </span>
              <span style={{ color: "#8892a4", fontSize: 13, letterSpacing: "0.1em" }}>
                BLOG NÁUTICO
              </span>
            </div>
          </div>

          {/* Main — vertically centered */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: 860,
            }}
          >
            {/* Tag + meta */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
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
                {tag}
              </div>
              {date && (
                <span style={{ color: "#5a6a7e", fontSize: 15 }}>
                  {date}
                </span>
              )}
              {read && (
                <span style={{ color: "#5a6a7e", fontSize: 15 }}>
                  · {read} de leitura
                </span>
              )}
            </div>

            {/* Title */}
            <div
              style={{
                color: "#f8f9fa",
                fontSize: title.length > 50 ? 48 : 60,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 22,
              }}
            >
              {title}
            </div>

            {/* Excerpt */}
            <div
              style={{
                color: "#8892a4",
                fontSize: 20,
                lineHeight: 1.6,
              }}
            >
              {excerpt}
            </div>
          </div>

          {/* Bottom footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 28,
              borderTop: "1px solid rgba(201, 168, 76, 0.15)",
              paddingTop: 20,
            }}
          >
            <span style={{ color: "#5a6a7e", fontSize: 15 }}>
              patraomor.pt/blog
            </span>
            <div
              style={{
                background: "rgba(201, 168, 76, 0.1)",
                border: "1px solid rgba(201, 168, 76, 0.3)",
                color: "#e8c97a",
                fontSize: 14,
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: 8,
                letterSpacing: "0.05em",
              }}
            >
              CONHECIMENTO NÁUTICO
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
