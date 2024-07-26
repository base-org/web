import AboutBlock from 'apps/web/src/components/OnchainSummer/AboutBlock';
import CommunityEventsBlock from 'apps/web/src/components/OnchainSummer/CommunityEventsBlock';
import EventsBlock from 'apps/web/src/components/OnchainSummer/EventsBlock';
import Hero from 'apps/web/src/components/OnchainSummer/Hero';
import ResourcesBlock from 'apps/web/src/components/OnchainSummer/ResourcesBlock';
import RewardsBlock from 'apps/web/src/components/OnchainSummer/RewardsBlock';
import SponsorsBlock from 'apps/web/src/components/OnchainSummer/SponsorsBlock';
import ToolsBlock from 'apps/web/src/components/OnchainSummer/ToolsBlock';
import Head from 'next/head';

export default function OnChainSummer() {
  const ogData = {
    title: 'Onchain Summer | Buildathon',
    description:
      'Onchain Summer is back to unleash onchain creativity and invite everyone to build all summer long. Build, create, and get rewarded. June – August 2024.',
    image: 'https://base.org/images/ocs/buildersummer_og.png',
    url: 'https://base.org/onchainsummer',
  };
  return (
    <>
      <Head>
        {/* Open-graph */}
        <meta key="og:url" property="og:url" content={ogData.url} />
        <meta key="og:title" property="og:title" content={ogData.title} />
        <meta key="og:description" property="og:description" content={ogData.description} />

        {/* Default */}
        <title key="title">{ogData.title}</title>
        <meta key="description" content={ogData.description} name="description" />
      </Head>
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
    </>
  );
}
