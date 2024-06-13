/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      gray: '#1E2025',
      darkgray: '#0F1012',
      white: '#FFFFFF',
      muted: '#8A919E',
      yellow: '#FFD200',
      translucent: {
        100: 'rgba(255,255,255,0.1)',
        200: 'rgba(255,255,255,0.2)',
        300: 'rgba(255,255,255,0.3)',
        400: 'rgba(255,255,255,0.4)',
        500: 'rgba(255,255,255,0.5)',
        600: 'rgba(255,255,255,0.6)',
        700: 'rgba(255,255,255,0.7)',
        800: 'rgba(255,255,255,0.8)',
        900: 'rgba(255,255,255,0.9)',
      },
      black: '#000000',
      ocsblue: 'rgba(0, 82, 255, 1)',
      ocspink: '#FF8DCF',
      ocsyellow: '#FEE002',
      illoblack: '#0A0B0D',
      blue: {
        400: '#688CEC',
        500: '#0455FF',
        600: '#0052FF',
      },
    },
    extend: {
      borderRadius: {
        DEFAULT: '3px',
        full: '9999px',
      },
      screens: {
        '3xl': '2048px',
      },
      spacing: {
        80: '20rem',
      },
      fontFamily: {
        display: ['var(--font-coinbase-display)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-coinbase-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-coinbase-mono)', ...defaultTheme.fontFamily.sans],
        britney: ['var(--font-britney)', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        empowered_by_coinbase: "url('/images/empowered_by_coinbase.png')",
        bootcamp_background_image: "url('/images/bootcamp-background.png')",
      },
      transitionTimingFunction: {
        partners: 'cubic-bezier(0.25, 1, 0.25, 1)',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-2.5%)' },
          '50%': { transform: 'translateY(2.5%)' },
        },
      },
      animation: {
        wiggle: 'wiggle 3s linear infinite',
        bounce: 'bounce 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
