/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["emerald", "forest"],
  },
  plugins: [daisyui],
}

