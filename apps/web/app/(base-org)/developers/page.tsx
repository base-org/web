import AnalyticsProvider from 'apps/web/contexts/Analytics';
import { UseCases } from 'apps/web/src/components/Developers/UseCases';
import { Hero } from 'apps/web/src/components/Developers/Hero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Developers`,
  openGraph: {
    title: `Base | Developers`,
    url: `/developers`,
  },
};

export default async function Developers() {
  return (
    <AnalyticsProvider context="developers">
      <main className="flex min-h-screen w-full flex-col items-center bg-black">
        <Hero />
        <UseCases />
      </main>
    </AnalyticsProvider>
  );
}
