import { CookieBanner } from '@coinbase/cookie-banner';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import { ReactElement, useMemo } from 'react';
import { Footer } from './Footer/Footer';
import { Nav } from './Nav/Nav';

const coinbaseDisplay = localFont({
  src: [
    {
      path: '../../fonts/CoinbaseDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/CoinbaseDisplay-Medium.woff2',
      weight: '500 800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-coinbase-display',
});

const coinbaseSans = localFont({
  src: [
    {
      path: '../../fonts/CoinbaseSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/CoinbaseSans-Medium.woff2',
      weight: '500 800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-coinbase-sans',
});

const coinbaseMono = localFont({
  src: [
    {
      path: '../../fonts/CoinbaseMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/CoinbaseMono-Medium.woff2',
      weight: '500 800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-coinbase-mono',
});

const britney = localFont({
  src: [
    {
      path: '../../fonts/BritneyVariableVF.woff2',
    },
  ],
  display: 'swap',
  variable: '--font-britney',
});

export const cookieBannerTheme = {
  colors: {
    primary: '#1652F0',
    positive: '#05B169',
    negative: '#DF5F67',
    warning: '#F4C622',
    background: '#FFFFFF',
    backgroundMuted: '#EEF0F3',
    onBackground: '#050F1A',
    onBackgroundMuted: '#0A0B0D',
    onPrimary: '#FFFFFF',
    overlay: 'rgba(17,52,83,0.6)',
  },
  border: {
    border: '1px solid #D8D8D8',
    borderRadius: '4px',
  },
  fontSize: {
    sm: '14px',
    md: '16px',
  },
  fontWeight: {
    regular: '400',
    bold: '500',
  },
  size: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
  },
  breakpoints: {
    phone: 560,
    desktop: 992,
    tablet: 768,
  },
  zIndex: {
    high: 2,
    overlay: 1000,
  },
};

type LayoutProps = { children: ReactElement };

const BLACK_NAV_PATHS = [
  '/',
  '/jobs/apply',
  '/cookie-policy',
  '/third-party-cookies',
  '/onchainsummer',
  '/name',
];

export function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter();
  const color: 'black' | 'white' = useMemo(() => {
    if (BLACK_NAV_PATHS.includes(pathname)) {
      return 'black';
    }

    return 'white';
  }, [pathname]);

  return (
    <div
      className={`max-w-screen flex min-h-screen flex-col ${coinbaseDisplay.variable} ${coinbaseSans.variable} ${coinbaseMono.variable} ${britney.variable}`}
    >
      <Nav color={color} />
      {children}
      <Footer />
      <CookieBanner companyName="Base" link="/cookie-policy" theme={cookieBannerTheme} />
    </div>
  );
}
