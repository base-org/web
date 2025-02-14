import type { Metadata } from 'next';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Container from 'apps/web/src/components/base-org/Container';
import { Hero } from 'apps/web/src/components/Builders/Landing/Hero';
import { UseCases } from 'apps/web/src/components/Builders/Landing/UseCases';
import { Apps } from 'apps/web/src/components/Builders/Landing/Apps';
import { Testimonials } from 'apps/web/src/components/Builders/Landing/Testimonials';
import { Tools } from 'apps/web/src/components/Builders/Landing/Tools';
import { WhyBase } from 'apps/web/src/components/Builders/Landing/WhyBase';
import { LiveDemo } from 'apps/web/src/components/Builders/Landing/LiveDemo';
import { BottomCta } from 'apps/web/src/components/Builders/Landing/BottomCta';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Developers`,
  openGraph: {
    title: `Base | Developers`,
    url: `/developers`,
  },
};

export default function Developers() {
  return (
    <AnalyticsProvider context="developers">
      <Container className="!px-[1.5rem] lg:!px-[2rem]">
        <main className="mb-32 flex min-h-screen w-full flex-col items-center bg-black pt-20">
          <Hero />
          <UseCases />
          <Apps />
          <Testimonials />
          <Tools />
          <WhyBase />
          <LiveDemo />
          <BottomCta />
        </main>
      </Container>
    </AnalyticsProvider>
  );
}
