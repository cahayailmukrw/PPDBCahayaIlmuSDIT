import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 60px rgba(4, 56, 51, 0.12)',
      },
      colors: {
        emerald: {
          50: '#f3fbf7',
          100: '#e6f4ec',
          200: '#c4e6d5',
          300: '#8fd0b3',
          400: '#5fbf98',
          500: '#289470',
          600: '#1f7a60',
          700: '#1d644f',
          800: '#1b5242',
          900: '#154137'
        },
        midnight: '#0b1220',
        gold: '#d9b270'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(59, 132, 84, 0.25), transparent 35%), linear-gradient(180deg, rgba(19, 59, 45, 0.92), rgba(9, 24, 40, 0.85))'
      }
    }
  },
  plugins: []
};

export default config;
