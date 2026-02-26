/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Minecraft-inspired palette
        minecraft: {
          grass: "#5D9B47",      // Grass block green
          dirt: "#8B5A2B",       // Dirt brown
          stone: "#7F7F7F",      // Stone gray
          diamond: "#4AEDD9",    // Diamond cyan
          emerald: "#17DD62",    // Emerald green
          gold: "#FCDB05",       // Gold yellow
          redstone: "#FF0000",   // Redstone red
          obsidian: "#1B1B2E",   // Obsidian dark purple
          endstone: "#DBDE8E",   // End stone yellow
          nether: "#8F3D3D",     // Netherrack red
        },
        // Nemesis brand colors (emerald-based)
        nemesis: {
          50: "#edfff4",
          100: "#d5ffe6",
          200: "#aeffcd",
          300: "#70ffa8",
          400: "#2bfd7b",
          500: "#17DD62",        // Primary - Emerald
          600: "#0ab34a",
          700: "#0d8c3d",
          800: "#106e34",
          900: "#0f5b2d",
          950: "#013316",
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
          800: "#27282c",
          900: "#1a1b1e",
          950: "#0f1012",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cal Sans", "Inter", "system-ui", "sans-serif"],
        minecraft: ["Minecraft", "monospace"],  // If custom font loaded
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "pixel-float": "pixelFloat 3s steps(8) infinite",
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
          "0%": { boxShadow: "0 0 20px rgba(23, 221, 98, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(23, 221, 98, 0.6)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(23, 221, 98, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(23, 221, 98, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pixelFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "minecraft-grid": "url('/grid-minecraft.svg')",
      },
      boxShadow: {
        "minecraft": "4px 4px 0px 0px rgba(0, 0, 0, 0.3)",
        "minecraft-lg": "6px 6px 0px 0px rgba(0, 0, 0, 0.3)",
        "glow-emerald": "0 0 30px rgba(23, 221, 98, 0.5)",
      },
    },
  },
  plugins: [],
};

