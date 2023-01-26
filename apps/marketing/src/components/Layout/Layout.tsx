import { ReactElement } from 'react';
import { Nav } from './Nav/Nav';
import localFont from '@next/font/local';
import { Footer } from './Footer/Footer';
import { useRouter } from 'next/router';

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

type LayoutProps = { children: ReactElement<any, any> };

export function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter();

  return (
    <div
      className={`flex flex-col justify-between ${coinbaseDisplay.variable} ${coinbaseSans.variable} ${coinbaseMono.variable}`}
    >
      <>
        <Nav color={pathname === '/' ? 'black' : 'white'} />
        {children}
        <Footer />
      </>
    </div>
  );
}
