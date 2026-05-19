import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B2545",       // Treasury Ink
        "ink-deep": "#07182f", // deeper Ink for atmospheric strips
        "ink-raised": "#16335c",
        strate: "#2D6A4F",    // Strate Green
        foil: "#C9A961",      // Foil Gold
        "foil-deep": "#B89545",
        parchment: "#F5F1E8", // Parchment background
        "parchment-aged": "#EDE6D3",
        ledger: "#1A1A1A",    // Ledger body
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(56px, 9vw, 112px)", { lineHeight: "0.96", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(44px, 6.5vw, 80px)", { lineHeight: "1.02", letterSpacing: "-0.018em" }],
        "display-md": ["clamp(32px, 4.5vw, 56px)", { lineHeight: "1.08", letterSpacing: "-0.012em" }],
        "figure-xl": ["clamp(48px, 9vw, 96px)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
      },
      fontFeatureSettings: {
        tabular: '"tnum"',
      },
      maxWidth: {
        certificate: "880px",
        prose: "65ch",
      },
      transitionTimingFunction: {
        tear: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        letterpress: "inset 0 1px 0 rgba(11,37,69,0.18), 0 1px 0 rgba(255,255,255,0.55)",
        emboss:
          "0 1px 0 rgba(255,255,255,0.65) inset, 0 -1px 0 rgba(11,37,69,0.08) inset, 0 12px 32px -16px rgba(11,37,69,0.18)",
        foil: "0 2px 0 rgba(201,169,97,0.35), 0 8px 24px -12px rgba(201,169,97,0.55)",
        "tear-l": "-10px 6px 28px -8px rgba(11,37,69,0.12)",
        "tear-r": "10px 6px 28px -8px rgba(45,106,79,0.12)",
        certificate:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 -1px 0 rgba(11,37,69,0.05) inset, 0 24px 60px -28px rgba(11,37,69,0.45), 0 12px 24px -20px rgba(11,37,69,0.30)",
      },
      keyframes: {
        "draw-curve": { "0%": { strokeDashoffset: "1200" }, "100%": { strokeDashoffset: "0" } },
        "stamp-down": {
          "0%": { transform: "translateY(-16px) rotate(-12deg) scale(1.4)", opacity: "0" },
          "60%": { transform: "translateY(2px) rotate(-7deg) scale(0.98)", opacity: "1" },
          "100%": { transform: "translateY(0) rotate(-8deg) scale(1)", opacity: "1" },
        },
        grain: {
          "0%,100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-4px,3px)" },
          "40%": { transform: "translate(3px,-2px)" },
          "60%": { transform: "translate(-2px,-3px)" },
          "80%": { transform: "translate(2px,4px)" },
        },
        "blur-in": {
          "0%": { opacity: "0", filter: "blur(12px)", transform: "translateY(12px)" },
          "100%": { opacity: "1", filter: "blur(0)", transform: "translateY(0)" },
        },
      },
      animation: {
        "draw-curve": "draw-curve 1400ms cubic-bezier(0.65,0,0.35,1) forwards",
        "stamp-down": "stamp-down 320ms cubic-bezier(0.34,1.56,0.64,1) forwards",
        grain: "grain 1.2s steps(5) infinite",
        "blur-in": "blur-in 700ms cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
