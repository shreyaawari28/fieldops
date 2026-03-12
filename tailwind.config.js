/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F5A800',
        dark: '#1A1A1A',
        surface: '#242424',
        'light-bg': '#F9F6F0',
        accent: '#E8E8E8',
      },
      boxShadow: {
        panel: '0 24px 60px rgba(26, 26, 26, 0.12)',
      },
      fontFamily: {
        sans: ['"Archivo"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        grid:
          'linear-gradient(rgba(26,26,26,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
