/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        cyber: {
          dark: '#0a0a0f',
          darker: '#050507',
          pink: '#ff00aa',
          cyan: '#00ffff',
          purple: '#aa00ff',
          green: '#00ff88',
          yellow: '#ffff00',
          gray: '#1a1a2e',
          'gray-light': '#2a2a3e',
        },
        neon: {
          pink: '#ff0080',
          cyan: '#00d4ff',
          green: '#39ff14',
          purple: '#8a2be2',
        }
      },
      boxShadow: {
        'neon-pink': '0 0 20px #ff00aa',
        'neon-cyan': '0 0 20px #00ffff',
        'neon-green': '0 0 20px #00ff88',
        'cyber': '0 4px 20px rgba(255, 0, 170, 0.3)',
      },
      animation: {
        'pulse-neon': 'pulse 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}