/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nemesis: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d6fe",
          300: "#a4bafc",
          400: "#7b93f8",
          500: "#5b6cf1",
          600: "#4a4de5",
          700: "#3d3cca",
          800: "#3434a3",
          900: "#303181",
          950: "#1e1d4b",
        },
        dark: {
          50: "#f6f6f7",
          100: "#e2e3e5",
          200: "#c5c6cb",
          300: "#a0a2aa",
          400: "#7c7f88",
          500: "#61646d",
          600: "#4d4f57",
          700: "#3f4147",
          800: "#36373c",
          900: "#1a1b1e",
          950: "#0d0e10",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cal Sans", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(91, 108, 241, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(91, 108, 241, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "url('/images/hero-bg.svg')",
      },
    },
  },
  plugins: [],
};
