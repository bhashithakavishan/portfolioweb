/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#101010',
        panel: '#1a1a1a',
        brand: '#0066FF',
        line: '#2b2b2b',
        muted: '#9a9a9a',
      },
      fontFamily: {
        sans: [
          'Outfit',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
