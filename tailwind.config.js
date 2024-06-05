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
        "background": "#0A0A0A",
        "background2": "#232323",
        "primary": "#fb6c81",
        "secondary": "#2a9f05",
        "accent": "#2978AD",
        "blue": "#2978AD"
      }
    },
  },
  plugins: [],
}