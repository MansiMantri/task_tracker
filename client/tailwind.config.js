/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navbarDark: '#0f172a',
        bodyDark: '#111827',
      },
    },
  },
    plugins: [],
  }