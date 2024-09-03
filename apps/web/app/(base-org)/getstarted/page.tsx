import type { Metadata } from 'next';
import AnalyticsProvider from '../../../contexts/Analytics';
import Hero from '../../../src/components/GetStarted/Hero';
import Essentials from '../../../src/components/GetStarted/Essentials';
import Funding from '../../../src/components/GetStarted/Funding';
import GetNoticed from '../../../src/components/GetStarted/GetNoticed';
import GetInvolved from 'apps/web/src/components/GetStarted/GetInvolved';
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
        <Essentials />
        <Funding />
        <GetNoticed />
        <GetInvolved />
        <StartBuilding />
        <BuildWithUsFooter />
      </main>
    </AnalyticsProvider>
  );
}
