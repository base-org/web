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
    // https://www.figma.com/design/AH4N0fma2EvI30IltjBGPy/%E2%9C%A8-CDS-Styles-(Variables)?node-id=46-168
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      ocsblue: 'rgba(0, 82, 255, 1)',
      ocspink: '#FF8DCF',
      ocsyellow: '#FEE002',
      illoblack: '#0A0B0D',
      transparent: 'transparent',
      blue: {
        0: '#F5F8FF',
        5: '#D3E1FF',
        10: '#B0CAFF',
        15: '#92B6FF',
        20: '#73A2FF',
        30: '#4684FF',
        40: '#266EFF',
        50: '#105EFF',
        60: '#0052FF',
        70: '#004BEB',
        80: '#003EC1',
        90: '#002982',
        100: '#00184D',
        400: '#688CEC',
        500: '#0455FF',
        600: '#0052FF',
      },
      gray: {
        0: '#FFFFFF',
        5: '#EEF0F3',
        10: '#DEE1E7',
        15: '#CED2DB',
        20: '#BFC4CF',
        30: '#A3A9B6',
        40: '#89909E',
        50: '#717886',
        60: '#5B616E',
        70: '#464B55',
        80: '#32353D',
        90: '#1E2025',
        100: '#0A0B0D',
        dark: '#0F1012',
        muted: '#8A919E',
      },
      green: {
        0: '#F5FFFB',
        5: '#CBF5E3',
        10: '#A3EBCD',
        15: '#83E0BA',
        20: '#65D6A7',
        30: '#3CC28A',
        40: '#22AD73',
        50: '#129961',
        60: '#098551',
        70: '#047043',
        80: '#015C36',
        90: '#00472A',
        100: '#00331E',
      },
      indigo: {
        0: '#F6F7FF',
        5: '#E6E8FF',
        10: '#D6DAFE',
        15: '#C6CCFD',
        20: '#B5BDFD',
        30: '#94A1FB',
        40: '#7487F7',
        50: '#596FF2',
        60: '#425BE9',
        70: '#2F4AD7',
        80: '#1F36AD',
        90: '#11206B',
        100: '#080F33',
      },
      orange: {
        0: '#FFFAF5',
        5: '#FEE8D2',
        10: '#FDD5B0',
        15: '#FBC293',
        20: '#F9AE76',
        30: '#F48C4C',
        40: '#ED702F',
        50: '#E1591B',
        60: '#CF470E',
        70: '#B53606',
        80: '#912702',
        90: '#641A00',
        100: '#330D00',
      },
      pink: {
        0: '#FFF5FF',
        5: '#FDE4FD',
        10: '#FBD4FA',
        15: '#F8C3F5',
        20: '#F4B2F0',
        30: '#EB8FE3',
        40: '#DD6ED1',
        50: '#CB51BB',
        60: '#B33AA2',
        70: '#952785',
        80: '#741A66',
        90: '#531148',
        100: '#330A2C',
      },
      purple: {
        0: '#FBF7FF',
        5: '#F4E9FF',
        10: '#EBDBFE',
        15: '#E3CCFD',
        20: '#D9BDFD',
        30: '#C5A0FB',
        40: '#B184F7',
        50: '#9D6BF2',
        60: '#8A55E9',
        70: '#7743D7',
        80: '#5A30AD',
        90: '#361B6B',
        100: '#190D33',
      },
      red: {
        0: '#FFF5F6',
        5: '#FEE1E4',
        10: '#FDCED2',
        15: '#FBBABF',
        20: '#F9A6AD',
        30: '#F47F88',
        40: '#ED5966',
        50: '#E13947',
        60: '#CF202F',
        70: '#B50F1D',
        80: '#910510',
        90: '#640109',
        100: '#330004',
      },
      teal: {
        0: '#F0FEFF',
        5: '#BCF6FD',
        10: '#88EDFB',
        15: '#5DE2F8',
        20: '#33D5F4',
        30: '#00BCEB',
        40: '#00A9DD',
        50: '#0093CB',
        60: '#007BB3',
        70: '#006195',
        80: '#004774',
        90: '#002F53',
        100: '#001B33',
      },
      yellow: {
        0: '#FFFCF1',
        5: '#FFF2B2',
        10: '#FFE972',
        15: '#FFDD39',
        20: '#FFD200',
        30: '#EFBD00',
        40: '#D8A200',
        50: '#BC8300',
        60: '#9A6000',
        70: '#733E00',
        80: '#4A2100',
        90: '#220C00',
        100: '#000000',
      },

      elevation: {
        level: {
          1: '#FFFFFF',
          2: '#FFFFFF',
        },
      },
      palette: {
        background: '#FFFFFF',
        backgroundAlternate: '#EEF0F3',
        backgroundOverlay: '#32353D',
        foreground: '#0A0B0D',
        foregroundMuted: '#5B616E',
        line: '#5B616E',
        lineHeavy: '#5B616E',
        negative: '#CF202F',
        negativeForeground: '#FFFFFF',
        positive: '#098551',
        positiveForeground: '#FFFFFF',
        primary: '#0052FF',
        primaryForeground: '#FFFFFF',
        primaryWash: '#F5F8FF',
        secondary: '#EEF0F3',
        secondaryForeground: '#0A0B0D',
      },
      state: {
        b: {
          disabled: '#FEFEFE',
          hovered: '#F9F9F9',
          pressed: '#EAEAEB',
        },
        bA: {
          disabled: '#F8F8F9',
          hovered: '#E8EAED',
          pressed: '#DBDDE0',
        },
        f: {
          disabled: '#A1A1A2',
          hovered: '#27282A',
          pressed: '#363739',
        },
        fM: {
          disabled: '#C0C2C7',
          hovered: '#555A66',
          pressed: '#505560',
        },
        n: {
          disabled: '#ECA9AF',
          hovered: '#BE1E2C',
          pressed: '#B21D2A',
        },
        p: {
          disabled: '#9DBCFE',
          hovered: '#014CEB',
          pressed: '#0148DC',
        },
        pO: {
          disabled: '#A1D0BC',
          hovered: '#097B4C',
          pressed: '#097447',
        },
        pW: {
          disabled: '#FAFBFE',
          hovered: '#EFF2F9',
          pressed: '#E1E4EB',
        },
        s: {
          disabled: '#F8F8F9',
          hovered: '#E8EAED',
          pressed: '#DBDDE0',
        },
      },
      dark: {
        blue: {
          0: '#001033',
          5: '#011D5B',
          10: '#012A82',
          15: '#03339A',
          20: '#053BB1',
          30: '#0A48CE',
          40: '#1354E1',
          50: '#2162EE',
          60: '#3773F5',
          70: '#578BFA',
          80: '#84AAFD',
          90: '#B9CFFF',
          100: '#F5F8FF',
        },
        gray: {
          0: '#0A0B0D',
          5: '#141519',
          10: '#1E2025',
          15: '#282B31',
          20: '#32353D',
          30: '#464B55',
          40: '#5B616E',
          50: '#727886',
          60: '#8A919E',
          70: '#A5AAB6',
          80: '#C1C6CF',
          90: '#E0E2E7',
          100: '#FFFFFF',
        },
        green: {
          0: '#00331E',
          5: '#003D24',
          10: '#01472A',
          15: '#025230',
          20: '#025C37',
          30: '#067044',
          40: '#0B8552',
          50: '#159962',
          60: '#27AD75',
          70: '#44C28D',
          80: '#6FD6AB',
          90: '#ABEBD0',
          100: '#F5FFFB',
        },
        indigo: {
          0: '#080F33',
          5: '#0E1B5B',
          10: '#152782',
          15: '#1B2F9A',
          20: '#2138B1',
          30: '#3049CE',
          40: '#445CE1',
          50: '#5C71EE',
          60: '#798AF5',
          70: '#99A5FA',
          80: '#BBC2FD',
          90: '#DBDFFF',
          100: '#F6F7FF',
        },
        orange: {
          0: '#330D00',
          5: '#4F1400',
          10: '#6B1C01',
          15: '#832402',
          20: '#9B2C04',
          30: '#BD3B09',
          40: '#D54C12',
          50: '#E66020',
          60: '#F07836',
          70: '#F89656',
          80: '#FCB983',
          90: '#FEDBB9',
          100: '#FFFAF5',
        },
        pink: {
          0: '#330A2C',
          5: '#460E3D',
          10: '#59134E',
          15: '#6C185E',
          20: '#7E1E6F',
          30: '#9F2C8E',
          40: '#BB40AA',
          50: '#D058C1',
          60: '#E175D6',
          70: '#ED95E6',
          80: '#F6B8F3',
          90: '#FCD9FB',
          100: '#FFF5FF',
        },
        purple: {
          0: '#190D33',
          5: '#2E175B',
          10: '#422282',
          15: '#502A9A',
          20: '#5D32B1',
          30: '#7443CE',
          40: '#8956E1',
          50: '#9D6DEE',
          60: '#B388F5',
          70: '#C9A4FA',
          80: '#DDC3FD',
          90: '#EEDFFF',
          100: '#FBF7FF',
        },
        red: {
          0: '#330004',
          5: '#4F0007',
          10: '#6B010A',
          15: '#83040E',
          20: '#9B0713',
          30: '#BD1321',
          40: '#D52634',
          50: '#E6404E',
          60: '#F0616D',
          70: '#F88690',
          80: '#FCAEB5',
          90: '#FED5D8',
          100: '#FFF5F6',
        },
        teal: {
          0: '#001426',
          5: '#00203B',
          10: '#002D4F',
          15: '#003A63',
          20: '#004876',
          30: '#006399',
          40: '#007DB6',
          50: '#0095CD',
          60: '#00AADF',
          70: '#06BEEC',
          80: '#45D9F5',
          90: '#95EFFB',
          100: '#F0FEFF',
        },
        yellow: {
          0: '#000000',
          5: '#160700',
          10: '#2B0F00',
          15: '#411B00',
          20: '#582900',
          30: '#814900',
          40: '#A96D00',
          50: '#CC9200',
          60: '#E9B300',
          70: '#FFD200',
          80: '#FFDF44',
          90: '#FFED96',
          100: '#FFFCF1',
        },
        elevation: {
          level: {
            1: '#D9D9D9',
            2: '#D9D9D9',
          },
        },
        palette: {
          background: '#0A0B0D',
          backgroundAlternate: '#141519',
          backgroundOverlay: '#0A0B0D',
          foreground: '#FFFFFF',
          foregroundMuted: '#8A919E',
          line: '#8A919E',
          lineHeavy: '#8A919E',
          negative: '#F0616D',
          negativeForeground: '#0A0B0D',
          positive: '#27AD75',
          positiveForeground: '#0A0B0D',
          primary: '#3773F5',
          primaryForeground: '#0A0B0D',
          primaryWash: '#001033',
          secondary: '#32353D',
          secondaryForeground: '#FFFFFF',
        },
        state: {
          b: {
            disabled: '#0A0B0D',
            hovered: '#0F1012',
            pressed: '#1E1F20',
          },
          bA: {
            disabled: '#0E0F12',
            hovered: '#191A1E',
            pressed: '#27282B',
          },
          f: {
            disabled: '#676869',
            hovered: '#E1E1E1',
            pressed: '#D2D2D2',
          },
          fM: {
            disabled: '#3B3E44',
            hovered: '#9299A5',
            pressed: '#999FAB',
          },
          n: {
            disabled: '#612C31',
            hovered: '#F06E79',
            pressed: '#F17780',
          },
          p: {
            disabled: '#1B3365',
            hovered: '#477EF5',
            pressed: '#5386F5',
          },
          pO: {
            disabled: '#154935',
            hovered: '#38B380',
            pressed: '#45B787',
          },
          pW: {
            disabled: '#060D1B',
            hovered: '#051537',
            pressed: '#142343',
          },
          s: {
            disabled: '#191B1F',
            hovered: '#3A3D45',
            pressed: '#474950',
          },
        },
      },
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
      boxShadow: {
        'light-button-3d':
          '0px -8px 24px 0px rgba(0, 0, 0, 0.25) inset, 0px -2px 4px 0px rgba(255, 255, 255, 0) inset, 0px 2px 10px 0px rgba(35, 36, 38, 1) inset, 0px 4px 10px 0px rgba(0, 82, 255, 0.32), 0px 4px 24px 0px rgba(45, 72, 72, 0.5) inset, 0px 8px 10px 0px rgba(255, 255, 255, 0.25) inset;',
        'dark-button-3d':
          '0px 8px 24px 0px rgba(255, 255, 255, 0.5) inset, 0px -8px 24px 0px rgba(0, 0, 0, 0.25) inset, 0px -2px 4px 0px rgba(255, 255, 255, 0.25) inset, 0px 2px 10px 0px rgba(88, 89, 91, 1) inset, 0px 4px 10px 0px rgba(0, 82, 255, 0.32), 0px 4px 24px 0px rgba(155, 216, 217, 0.5) inset, 0px 8px 10px 0px rgba(255, 255, 255, 0.25) inset;',
        'pill-glow': '0px 0px 5px 0px #0052FF;',
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
        longslide: {
          '0%': { transform: 'translateX(-23rem)' },
          '100%': { transform: 'translateX(13rem)' },
        },
      },
      animation: {
        wiggle: 'wiggle 3s linear infinite',
        bounce: 'bounce 1s ease-in-out infinite',
        slide: 'slide 1s linear infinite',
        longslide: 'longslide 2s linear infinite',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
      },
    },
  },
  plugins: [],
};
