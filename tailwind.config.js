export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#FFF1F5",
          100: "#FFE0EB",
          200: "#FFD0E1",
          300: "#FFC2D7",
          400: "#FF6BA9",
          500: "#F63F8D",
          600: "#E02479",
          700: "#C01466",
          800: "#9E0E54",
          900: "#7C0A43",
        },
        rose: {
          50: "#FFF1F5",
          100: "#FFE0EB",
          200: "#FFD0E1",
          300: "#FFC2D7",
          400: "#FF6BA9",
          500: "#F63F8D",
          600: "#E02479",
          700: "#C01466",
          800: "#9E0E54",
          900: "#7C0A43",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["DM Sans", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}