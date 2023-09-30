/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: ({
        'cold': "url('/cold.jpg')",
        'hot': "url('/hot.jpg')",
       })
    },
  },
  plugins: [],
}