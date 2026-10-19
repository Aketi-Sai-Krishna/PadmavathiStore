/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fffaf1",
        ink: "#20251e",
        brandOrange: "#f47735",
        brandGreen: "#356a43",
        brandYellow: "#ffd45d",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};