/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        cyberpink: 'var(--cyberpink)',
        cyberblue: 'var(--cyberblue)',
        'neon-green': 'var(--neon-green)',
        'neon-yellow': 'var(--neon-yellow)',
        'neon-purple': 'var(--neon-purple)',
      },
      animation: {
        'glow-pink': 'glow-pink 1.5s ease-in-out infinite alternate',
        'glow-blue': 'glow-blue 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'glow-pink': {
          '0%': { textShadow: '0 0 10px rgba(255, 0, 127, 0.7), 0 0 20px rgba(255, 0, 127, 0.5)' },
          '100%': { textShadow: '0 0 20px rgba(255, 0, 127, 0.9), 0 0 30px rgba(255, 0, 127, 0.7)' },
        },
        'glow-blue': {
          '0%': { textShadow: '0 0 10px rgba(0, 191, 255, 0.7), 0 0 20px rgba(0, 191, 255, 0.5)' },
          '100%': { textShadow: '0 0 20px rgba(0, 191, 255, 0.9), 0 0 30px rgba(0, 191, 255, 0.7)' },
        },
      },
      backgroundImage: {
        'grid-white': 'linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-repeat': '50px 50px',
      },
    },
  },
  plugins: [],
};