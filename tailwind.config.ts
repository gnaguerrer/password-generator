import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "ebony-clay": {
          "50": "#f2f6fc",
          "100": "#e2eaf7",
          "200": "#ccdbf1",
          "300": "#aac4e6",
          "400": "#81a5d9",
          "500": "#6388ce",
          "600": "#4f6fc1",
          "700": "#455db0",
          "800": "#3d4d90",
          "900": "#354373",
          "950": "#20263f",
        },
        "cloud-burst": {
          "50": "#f3f5fb",
          "100": "#e3eaf6",
          "200": "#cddbf0",
          "300": "#abc2e5",
          "400": "#82a3d8",
          "500": "#6585cc",
          "600": "#516cbf",
          "700": "#475bae",
          "800": "#3e4c8f",
          "900": "#364272",
          "950": "#282e4d",
        },
        "deep-ocean": {
          darkBlue: "#001F3E",
          mediumBlue: "#006092",
          lightCyan: "#CBFDFE",
        },
      },
    },
  },
  plugins: [],
};
export default config;
