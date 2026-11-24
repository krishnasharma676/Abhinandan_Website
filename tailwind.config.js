/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chely: {
          purple: '#8A67B7',
          'purple-dark': '#694DA1',
          'purple-light': '#9B78C7',
          lilac: '#C9C1D9',
          pink: '#FFA6B6',
          'pink-hover': '#FF8E9E',
          berry: '#A31352',
          yellow: '#FFCF3A',
          footer: '#E4E0ED',
          bg: '#FAF8FC',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FAF9F6',
          200: '#F5F4F0',
          300: '#EAE8E2',
          400: '#D8D4CC',
        },
        champagne: {
          light: '#FBF9F4',
          DEFAULT: '#F3EDE0',
          dark: '#DECDB0',
        },
        rose: {
          blush: '#FAF3F2',
          pastel: '#F6E5E2',
          muted: '#C48682',
          deep: '#8E3E39',
        },
        gold: {
          light: '#DFCA8F',
          DEFAULT: '#FFA6B6', // mapped to chely-pink for primary highlights
          dark: '#A31352',
          shimmer: '#FFCF3A',
        },
        burgundy: {
          DEFAULT: '#A31352',
          deep: '#694DA1',
          dark: '#2A080E',
        },
        chocolate: {
          light: '#68585F',
          DEFAULT: '#212529',
          dark: '#1F1A24',
        },
      },
      fontFamily: {
        serif: ['"Abril Fatface"', 'Georgia', 'serif'],
        display: ['"Abril Fatface"', 'Georgia', 'serif'],
        sans: ['"Sen"', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'elevated': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'luxury': '0 12px 36px rgba(0, 0, 0, 0.08)',
        'gold-glow': '0 0 20px rgba(184, 134, 11, 0.2)',
      },
    },
  },
  plugins: [],
};
