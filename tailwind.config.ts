import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff007f',
          50: '#ffe0f0',
          100: '#ffb1d9',
          200: '#ff80c0',
          300: '#ff4fa8',
          400: '#ff1f91',
          500: '#ff007f',
          600: '#cc0066',
          700: '#99004c',
          800: '#660033',
          900: '#330019',
        },
        secondary: {
          DEFAULT: '#00bfff',
          50: '#e0f7ff',
          100: '#b1ecff',
          200: '#80e0ff',
          300: '#4fd4ff',
          400: '#1fc9ff',
          500: '#00bfff',
          600: '#0099cc',
          700: '#007399',
          800: '#004c66',
          900: '#002633',
        },
        dark: {
          DEFAULT: '#111111',
          50: '#e6e6e6',
          100: '#cccccc',
          200: '#999999',
          300: '#666666',
          400: '#333333',
          500: '#111111',
          600: '#0e0e0e',
          700: '#0a0a0a',
          800: '#070707',
          900: '#030303',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 10px rgba(255, 0, 127, 0.7), 0 0 20px rgba(255, 0, 127, 0.5), 0 0 30px rgba(255, 0, 127, 0.3)' },
          '100%': { textShadow: '0 0 20px rgba(255, 0, 127, 0.9), 0 0 30px rgba(255, 0, 127, 0.7), 0 0 40px rgba(255, 0, 127, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}

export default config