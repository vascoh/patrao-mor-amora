/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" }
    ]
  },
  async headers() {
    const isDev = process.env.NODE_ENV === "development";

    const cspDirectives = [
      "default-src 'self'",
      // Scripts: self + inline (Next.js requires unsafe-inline for hydration) + trusted CDNs
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      // Styles: self + inline (Tailwind)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + data URIs + supabase + analytics + hub external images
      "img-src 'self' data: blob: https://*.supabase.co https://www.google-analytics.com https://www.patraomor.pt https://patrao-mor-amora.vercel.app",
      // Connect: self + supabase + analytics
      `connect-src 'self' https://*.supabase.co https://www.google-analytics.com${isDev ? " ws://localhost:* http://localhost:*" : ""}`,
      // Frames: none
      "frame-src 'none'",
      "frame-ancestors 'none'",
      // Object: none
      "object-src 'none'",
      // Base URI
      "base-uri 'self'",
      // Form action: self only
      "form-action 'self'",
      // Upgrade insecure in production
      ...(isDev ? [] : ["upgrade-insecure-requests"])
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          { key: "Content-Security-Policy", value: cspDirectives },
          { key: "X-DNS-Prefetch-Control", value: "on" }
        ]
      },
      {
        // Cache static assets aggressively
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      },
      {
        // Cache public images
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }
        ]
      }
    ];
  }
};

export default nextConfig;
