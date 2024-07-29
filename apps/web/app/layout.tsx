import '@coinbase/onchainkit/styles.css';
import '../pages/global.css';
import AppProviders from 'apps/web/app/AppProviders';
import localFont from 'next/font/local';

const coinbaseDisplay = localFont({
  src: [
    {
      path: '../src/fonts/CoinbaseDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../src/fonts/CoinbaseDisplay-Medium.woff2',
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
      path: '../src/fonts/CoinbaseSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../src/fonts/CoinbaseSans-Medium.woff2',
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
      path: '../src/fonts/CoinbaseMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../src/fonts/CoinbaseMono-Medium.woff2',
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
      path: '../src/fonts/BritneyVariableVF.woff2',
    },
  ],
  display: 'swap',
  variable: '--font-britney',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontClassNames = [
    coinbaseDisplay.variable,
    coinbaseSans.variable,
    coinbaseMono.variable,
    britney.variable,
  ].join(' ');
  return (
    <html lang="en" className={fontClassNames}>
      <body>
        <main>
          <AppProviders>{children}</AppProviders>
        </main>
      </body>
    </html>
  );
}
