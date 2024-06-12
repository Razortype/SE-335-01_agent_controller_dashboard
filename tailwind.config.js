/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "text": "#fff",
        "black": "#131313",
        "pink": "#FE637A",
        "light-pink": "#FAD7E1",
        "light-blue": "#C8D8EE",
        "light-green": "#FAEFCC"
      }
    },
  },
  plugins: [],
}