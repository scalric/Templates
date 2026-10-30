import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        script: ['Caveat', 'cursive'],
      },
      colors: {
        brand: {
          50: '#eef3ff', 100: '#dce6ff', 200: '#bccfff', 300: '#8fb0ff', 400: '#5b86fb',
          500: '#2456f0', 600: '#0b3fdb', 700: '#0b33b5', 800: '#0a2a92', 900: '#081f6e',
        },
        paper: { DEFAULT: '#faf7f2', dark: '#f1ece3' },
        ink: { DEFAULT: '#17130f', soft: '#4a443c' },
      },
      boxShadow: {
        soft: '0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px -10px rgb(15 23 42 / 0.12)',
        lift: '0 2px 4px rgb(15 23 42 / 0.05), 0 28px 56px -20px rgb(15 23 42 / 0.28)',
      },
    },
  },
  plugins: [],
} satisfies Config
