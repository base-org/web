/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-coinbase-display)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-coinbase-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-coinbase-mono)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'sidebar-border': 'rgba(255, 255, 255, 0.15)',
        'cds-primary': 'rgba(88, 138, 245, 1)',
        'cds-background-level-2': 'rgba(30, 32, 37, 1)',
        'cds-background-gray-5': 'rgba(20, 21, 25, 1)',
        'cds-background-gray-60': 'rgba(91, 97, 110, 1)',
        'cds-background-gray-90': 'rgba(224, 226, 231, 1)',
        'cds-background-green-60': 'rgba(39, 173, 117, 1)',
        'cds-background-red-60': 'rgba(240, 97, 109, 1)',
        'cds-background-wash': 'rgba(0, 16, 51, 1)',
        'warning-banner-red': 'rgba(47, 5, 5, 1)',
        muted: 'rgba(138, 145, 158, 1)',
        gray: '#1E2025',
        modal: '#464B55',
        hovergray: '#32353D',
        'notice-blue': '#001033',
      },
      textColor: {
        'cds-primary': 'rgba(88, 138, 245, 1)',
      },
    },
  },
  plugins: [],
};
