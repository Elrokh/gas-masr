/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF3FF",
          100: "#DCE6FF",
          200: "#B9CDFF",
          300: "#8BAAFF",
          400: "#6287F0",
          500: "#4274D9",
          600: "#355DB5",
          700: "#2E4B91",
          800: "#293F78",
          900: "#293681",
          950: "#18204E"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(41, 54, 129, 0.14)",
        glow: "0 16px 45px rgba(66, 116, 217, 0.28)"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  plugins: []
};
