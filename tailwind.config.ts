import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#023632",
        ivory: "#f5efe3",
        gold: "#b89555",
        brass: "#d6ba74",
        smoke: "#e8dfd0"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "Arial", "sans-serif"]
      },
      boxShadow: {
        editorial: "0 26px 80px rgba(7, 16, 16, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
