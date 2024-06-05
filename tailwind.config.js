/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "text": "#FECFD7",
        "background": "#0D0001",
        "background2": "#1C0206",
        "primary": "#fb6c81",
        "secondary": "#2a9f05",
        "accent": "#1df969",
        "blue": "#0019FF"
      }
    },
  },
  plugins: [],
}