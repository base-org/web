import type { Metadata } from 'next';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Container from 'apps/web/src/components/base-org/Container';
import { Hero } from 'apps/web/src/components/Developers/Hero';
import { UseCases } from 'apps/web/src/components/Developers/UseCases';
import { Customers } from 'apps/web/src/components/Developers/Customers';
import { Quotes } from 'apps/web/src/components/Developers/Quotes';

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
      <Container>
        <main className="mb-32 flex min-h-screen w-full flex-col items-center bg-black">
          <Hero />
          <UseCases />
          <Customers />
          <Quotes />
        </main>
      </Container>
    </AnalyticsProvider>
  );
}
