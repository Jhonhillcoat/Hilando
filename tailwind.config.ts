import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "serif"],
        nunito: ["var(--font-nunito)", "sans-serif"],
        caveat: ["var(--font-caveat)", "cursive"],
        heading: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-nunito)", "sans-serif"],
      },
      colors: {
        terracota: {
          DEFAULT: "#C8553D",
          dark: "#A8412E",
          deep: "#7A2E20",
        },
        durazno: {
          DEFAULT: "#E8B298",
          light: "#F2D2BC",
        },
        mostaza: {
          DEFAULT: "#D4A574",
          deep: "#B8864E",
        },
        crema: {
          DEFAULT: "#F8F1E7",
          warm: "#F2E6D3",
          deep: "#EAD9C0",
        },
        madera: {
          DEFAULT: "#3D2817",
          soft: "#5C3A28",
          mute: "#8B6F5C",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "12px",
        container: "16px",
        cta: "24px",
      },
      boxShadow: {
        hilando: "0 8px 24px rgba(61, 40, 23, 0.08)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
