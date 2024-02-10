import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./globals.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Monospace"],
      },
      height: {
        content: "716px",
        infoCard: "200px",
      },
      width: {
        welcomeMsg: "28ch",
      },
      fontSize: {
        google: "14px",
      },
      borderRadius: {
        infoCard: "10px",
      },
      animation: {
        typing: "typing 3s steps(30), blink .5s step-end infinite alternate",
      },
      keyframes: {
        typing: {
          from: {
            width: "0",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
