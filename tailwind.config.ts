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
        brand: {
          bg: "#07080F",
          surface: "#0D0F1E",
          elevated: "#131629",
          border: "#1A1D35",
          green: "#00FF88",
          purple: "#7C3AED",
          cyan: "#00D4FF",
          orange: "#F97316",
          text: "#E2E8F0",
          muted: "#8B95B0",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "glow-green": "0 0 20px rgba(0,255,136,0.15)",
        "glow-purple": "0 0 20px rgba(124,58,237,0.2)",
        card: "0 4px 24px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
