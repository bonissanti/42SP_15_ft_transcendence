/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
      boxShadow: {
        'retro': '0 0 20px rgba(255, 255, 255, 0.5)',
        'retro-hover': '0 4px 10px rgba(79, 70, 229, 0.5)',
      },
    },
  },
  plugins: [],
}