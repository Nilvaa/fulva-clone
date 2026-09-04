/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6F0',
          200: '#F5EFE6',
          300: '#EAE1D3',
          400: '#DACDBD',
        },
        strawberry: {
          light: '#FF6B6B',
          DEFAULT: '#D63447',
          dark: '#B02035',
        },
        halwa: {
          light: '#E91E63',
          DEFAULT: '#C2185B',
          dark: '#880E4F',
        },
      },
    },
  },
  plugins: [],
}
