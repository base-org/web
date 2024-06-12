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
      button: {
        white: 'rgba(255, 255, 255, 1)',
        whiteHover: 'rgba(219, 221, 224, 1)',
        whiteActive: 'rgba(191, 196, 207, 1)',
        black: 'rgba(10, 11, 13, 1)',
        blackHover: 'rgba(39, 40, 42, 1)',
        blackActive: 'rgba(80, 85, 96, 1)',
      },
      black: '#000000',
      ocsblue: 'rgba(0, 82, 255, 1)',
      ocspink: '#FF8DCF',
      ocsyellow: '#FEE002',
      blue: {
        400: '#688CEC',
        500: '#0455FF',
        600: '#0052FF',
      },
    },
    borderRadius: {
      DEFAULT: '3px',
      full: '9999px',
    },
    extend: {
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
      boxShadow: {
        'light-button-3d':
          '0px 8px 24px 0px rgba(255, 255, 255, 0.5) inset, 0px -8px 24px 0px rgba(0, 0, 0, 0.25) inset, 0px -2px 4px 0px rgba(255, 255, 255, 0.25) inset, 0px 2px 10px 0px rgba(88, 89, 91, 1) inset, 0px 4px 10px 0px rgba(0, 82, 255, 0.32), 0px 4px 24px 0px rgba(155, 216, 217, 0.5) inset, 0px 8px 10px 0px rgba(255, 255, 255, 0.25) inset;',
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
        slide: {
          '0%': { transform: 'translateX(-10rem) rotate(6deg)' },
          '50%': { transform: 'translateX(0) rotate(6deg)' },
          '100%': { transform: 'translateX(0) rotate(6deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 3s linear infinite',
        bounce: 'bounce 1s ease-in-out infinite',
        slide: 'slide 1s linear infinite',
      },
    },
  },
  plugins: [],
};
