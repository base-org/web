import type { ReactNode } from 'react';
import CardsProvider from './components/base-org/Card/context.tsx';
import ThemeProvider from './contexts/Theme.tsx';
import { AppProviders } from './contexts/AppProviders.tsx';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className="vocs-layout antialiased"
      style={{
        fontFamily: 'CoinbaseSans !important',
      }}
    >
      <ThemeProvider>
        <CardsProvider>
          <AppProviders>{children}</AppProviders>
        </CardsProvider>
      </ThemeProvider>
    </div>
  );
}
