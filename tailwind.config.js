/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--color-primary) / <alpha-value>)",
        canvas: "hsl(var(--color-canvas) / <alpha-value>)",
        surface: "hsl(var(--color-surface) / <alpha-value>)",
        "surface-raised": "hsl(var(--color-surface-raised) / <alpha-value>)",
        ink: "hsl(var(--color-ink) / <alpha-value>)",
        muted: "hsl(var(--color-muted) / <alpha-value>)",
        line: "hsl(var(--color-line) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)"],
      },
      fontSize: {
        display: ["clamp(2.75rem, 6.5vw, 5.6rem)", { lineHeight: "0.98", letterSpacing: "-0.055em" }],
      },
      spacing: {
        unit: "var(--space-unit)",
        page: "var(--space-layout)",
      },
      borderRadius: {
        control: "var(--radius-control)",
        card: "var(--radius-card)",
        window: "var(--radius-window)",
      },
      transitionDuration: {
        fast: "var(--motion-fast)",
        base: "var(--motion-base)",
        route: "var(--motion-route)",
      },
      boxShadow: {
        card: "0 14px 40px -34px hsl(var(--color-ink) / 0.45)",
        window: "var(--shadow-window)",
      },
    },
  },
  plugins: [],
};
