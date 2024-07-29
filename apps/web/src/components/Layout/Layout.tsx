import localFont from 'next/font/local';
import { ReactElement } from 'react';
import { Footer } from './Footer/Footer';
import { Nav } from './Nav/Nav';
import CookieBannerWrapper from 'apps/web/src/components/CookieBannerWrapper';

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

type LayoutProps = { children: ReactElement };

export function Layout({ children }: LayoutProps) {
  return (
    <div
      className={`max-w-screen flex min-h-screen flex-col ${coinbaseDisplay.variable} ${coinbaseSans.variable} ${coinbaseMono.variable} ${britney.variable}`}
    >
      <Nav />
      {children}
      <Footer />
      <CookieBannerWrapper />
    </div>
  );
}
