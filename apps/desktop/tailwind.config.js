/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/renderer/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark": {
          "950": "#0a0a0a",
          "900": "#0f0f0f",
          "850": "#1a1a1a",
          "800": "#262626",
          "700": "#404040",
          "600": "#525252",
          "500": "#737373",
          "400": "#a3a3a3",
          "300": "#d4d4d4",
        },
        "nemesis": {
          "400": "#10b981",
          "500": "#059669",
        },
        "minecraft": {
          "redstone": "#ff0000",
        },
      },
      fontFamily: {
        minecraft: ['"Arial"', 'sans-serif'],
      },
      boxShadow: {
        minecraft: '0 8px 16px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
};
