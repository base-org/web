export const runtime = 'edge';

import AboutBlock from 'apps/web/src/components/OnchainSummer/AboutBlock';
import CommunityEventsBlock from 'apps/web/src/components/OnchainSummer/CommunityEventsBlock';
import EventsBlock from 'apps/web/src/components/OnchainSummer/EventsBlock';
import Hero from 'apps/web/src/components/OnchainSummer/Hero';
import ResourcesBlock from 'apps/web/src/components/OnchainSummer/ResourcesBlock';
import RewardsBlock from 'apps/web/src/components/OnchainSummer/RewardsBlock';
import SponsorsBlock from 'apps/web/src/components/OnchainSummer/SponsorsBlock';
import ToolsBlock from 'apps/web/src/components/OnchainSummer/ToolsBlock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Onchain Summer | Buildathon`,
  description:
    'Onchain Summer is back to unleash onchain creativity and invite everyone to build all summer long. Build, create, and get rewarded. June – August 2024.',
  openGraph: {
    title: `Onchain Summer | Buildathon`,
    url: `/onchainsummer`,
    description:
      'Onchain Summer is back to unleash onchain creativity and invite everyone to build all summer long. Build, create, and get rewarded. June – August 2024.',
  },
};

export default async function OnchainSummer() {
  return (
    <main className="flex w-full flex-col items-center bg-white">
      <div className="flex w-full flex-col items-center px-1 md:px-4">
        <Hero />
        <AboutBlock />
        <RewardsBlock />
        <EventsBlock />
        <SponsorsBlock />
        <CommunityEventsBlock />
        <ToolsBlock />
        <ResourcesBlock />
      </div>
    </main>
  );
}
