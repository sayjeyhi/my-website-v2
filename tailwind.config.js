/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e5a04c',
        secondary: '#65a30c'
      },
      animation: {
        fall: 'fall 0.5s ease-in-out'
      },
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(500px)' }
        }
      }
    }
  },
  plugins: []
}
