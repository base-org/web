import AboutBlock from 'apps/web/src/components/OnchainSummer/AboutBlock';
import CommunityEventsBlock from 'apps/web/src/components/OnchainSummer/CommunityEventsBlock';
import EventsBlock from 'apps/web/src/components/OnchainSummer/EventsBlock';
import Hero from 'apps/web/src/components/OnchainSummer/Hero';
import ResourcesBlock from 'apps/web/src/components/OnchainSummer/ResourcesBlock';
import RewardsBlock from 'apps/web/src/components/OnchainSummer/RewardsBlock';
import SponsorsBlock from 'apps/web/src/components/OnchainSummer/SponsorsBlock';
import ToolsBlock from 'apps/web/src/components/OnchainSummer/ToolsBlock';

export default function OnChainSummer() {
  return (
    <main className="flex w-full flex-col items-center bg-white">
      <div className="flex w-full max-w-[1440px] flex-col px-1">
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
