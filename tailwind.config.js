/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#F7F5F0',
          100: '#F0EDE6',
          200: '#E8E4DC',
          300: '#DDD8CE',
          400: '#D5D0C5',
          500: '#C8C2B5',
        },
        forest: {
          50:  '#EAF2EA',
          100: '#C5DCC5',
          200: '#8CB88C',
          300: '#5A9A5A',
          400: '#2D5A2D',
          500: '#1C3A1C',
          600: '#122612',
          700: '#0A180A',
        },
        olive: {
          400: '#7A7A5A',
          500: '#5A5A4A',
          600: '#3A3A2A',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
