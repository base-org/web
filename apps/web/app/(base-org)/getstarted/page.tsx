import type { Metadata } from 'next';
import AnalyticsProvider from '../../../contexts/Analytics';
import Hero from '../../../src/components/GetStarted/Hero';
import BuildersMostWanted from '../../../src/components/GetStarted/BuildersMostWanted';
import Funding from '../../../src/components/GetStarted/Funding';
import GetNoticed from '../../../src/components/GetStarted/GetNoticed';
import StartBuilding from '../../../src/components/GetStarted/StartBuilding';
import BuildWithUsFooter from '../../../src/components/GetStarted/BuildWithUsFooter';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Get Started`,
  openGraph: {
    title: `Base | Get Started`,
    url: '/getstarted',
    images: ['https://base.org/images/getstarted-open-graph.png'],
  },
};

export default async function GoToCommunity() {
  return (
    <AnalyticsProvider context="builder_resource_kit">
      <Hero />
      <main className="flex w-full flex-col items-center bg-black font-display text-gray-5">
        <BuildersMostWanted />
        <Funding />
        <GetNoticed />
        <StartBuilding />
        <BuildWithUsFooter />
      </main>
    </AnalyticsProvider>
  );
}
