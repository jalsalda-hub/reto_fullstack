/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'hexa-dark': '#2a2a2a',
        'hexa-light': '#f3f3f3',
        'hexa-gray': '#aaaaaa',
        'hexa-accent': '#000000',
      }
    },
  },
  plugins: [],
}