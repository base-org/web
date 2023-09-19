import { ReactElement, useMemo } from 'react';
import localFont from '@next/font/local';
import { useRouter } from 'next/router';

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

type LayoutProps = { children: ReactElement };

export function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter();
  const color: 'black' | 'white' = useMemo(() => {
    if (pathname === '/' || pathname === '/jobs/apply') {
      return 'black';
    }

    return 'white';
  }, [pathname]);

  return (
    <div
      className={`max-w-screen flex min-h-screen flex-col ${coinbaseDisplay.variable} ${coinbaseSans.variable} ${coinbaseMono.variable}`}
    >
      <Nav color={color} />
      {children}
      <Footer />
    </div>
  );
}
