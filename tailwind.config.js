/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        "index" : "url(/bg.png)",
        "products" : "url(/about.svg)"
      }
    },
  },
  plugins: [],
}

