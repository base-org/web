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
      white: '#FFFFFF',
      black: '#000000',
      blue: {
        500: '#0455FF',
        600: '#0555FF',
      },
    },
    extend: {
      fontFamily: {
        display: ['var(--font-coinbase-display)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-coinbase-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-coinbase-mono)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
