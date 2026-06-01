/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"PT Serif"', "Georgia", "serif"],
        sans: ['"Source Sans 3"', "system-ui", "sans-serif"],
      },
      colors: {
        navy: { DEFAULT: "#0a0f1e", light: "#0e1730" },
        gold: { DEFAULT: "#c9a227", light: "#e8c547" },
      },
    },
  },
  plugins: [],
};
