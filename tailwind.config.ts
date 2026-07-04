import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "var(--clr-bg-base)",
        "bg-surface": "var(--clr-bg-surface)",
        "bg-elevated": "var(--clr-bg-elevated)",

        primary: {
          DEFAULT: "var(--clr-primary)",
          dark: "var(--clr-primary-dark)",
          hover: "var(--clr-primary-hover)",
          subtle: "var(--clr-primary-subtle)",
        },

        route: {
          DEFAULT: "var(--clr-route)",
          dark: "var(--clr-route-dark)",
          subtle: "var(--clr-route-subtle)",
        },

        live: {
          DEFAULT: "var(--clr-live)",
          subtle: "var(--clr-live-subtle)",
        },

        "text-100": "var(--clr-text-100)",
        "text-60": "var(--clr-text-60)",
        "text-40": "var(--clr-text-40)",
        "text-20": "var(--clr-text-20)",

        border: {
          DEFAULT: "var(--clr-border)",
          hover: "var(--clr-border-hover)",
          primary: "var(--clr-border-primary)",
          route: "var(--clr-border-route)",
        },
      },

      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm)", "sans-serif"],
      },

      blur: {
        "4xl": "120px",
        "3xl": "96px",
      },

      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
