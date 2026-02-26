/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: "#f7f7f8",
          100: "#ececf1",
          200: "#d9d9e3",
          300: "#c5c5d2",
          400: "#acacbe",
          500: "#8e8ea0",
          600: "#565869",
          700: "#40414f",
          800: "#343541",
          900: "#202123",
          950: "#050509",
        },
        nemesis: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
      },
    },
  },
  plugins: [],
};
