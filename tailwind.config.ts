import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f1115",
        panel: "#151922",
        border: "#252a34",
        foreground: "#f5f7fa",
        muted: "#98a2b3",
        accent: "#2dd4bf"
      }
    },
  },
  plugins: [],
};

export default config;
