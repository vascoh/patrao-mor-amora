import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#03080f",
          900: "#060e1a",
          800: "#0a1628",
          700: "#0e2040",
          600: "#152e5a",
          500: "#1e4080"
        },
        gold: {
          400: "#e8c97a",
          500: "#c9a84c",
          600: "#a8882e"
        },
        teal: { brand: "#1a7a8a" },
        ink: {
          DEFAULT: "#f8f9fa",
          muted: "#c8cdd8",
          subtle: "#8892a4"
        },
        bg: {
          DEFAULT: "var(--bg)",
          card: "var(--bg-card)",
          card2: "var(--bg-card2)"
        },
        text: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
          subtle: "var(--text-subtle)"
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)"
        },
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)"
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ["Outfit", "sans-serif"],
        mono: ['"DM Mono"', "monospace"]
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "20px"
      },
      boxShadow: {
        elev: "0 8px 40px rgba(0,0,0,0.6)",
        gold: "0 0 40px rgba(201,168,76,0.15)"
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        },
        pulseRing: {
          "0%": { transform: "scale(0.95)", opacity: "0.5" },
          "70%": { transform: "scale(1.4)", opacity: "0" },
          "100%": { transform: "scale(0.95)", opacity: "0" }
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        pulseRing: "pulseRing 2.4s cubic-bezier(0.455,0.03,0.515,0.955) infinite",
        fadeUp: "fadeUp 0.7s ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
