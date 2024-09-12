import { Metadata } from 'next';
import { FrameButtonMetadata } from '@coinbase/onchainkit/frame';
import AnalyticsProvider from 'apps/web/contexts/Analytics';

// Clean up assets while removing below
// import { JoinTheCommunity } from 'apps/web/src/components/JoinTheCommunity/JoinTheCommunity';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Container from 'apps/web/src/components/base-org/Container';
import VideoCardsSection from 'apps/web/src/components/base-org/root/VideoCardsSection';
import BuildExploreSection from 'apps/web/src/components/base-org/root/BuildExploreSection';
import SlidingTextSection from 'apps/web/src/components/base-org/root/SlidingTextSection';
import TransactionsFeesSection from 'apps/web/src/components/base-org/root/TransactionsFeesSection';
import BuildAndRewardSection from 'apps/web/src/components/base-org/root/BuildAndRewardSection';
import ErrorsProvider from 'apps/web/contexts/Errors';
import BlogSection from 'apps/web/src/components/base-org/root/BlogSection';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const DynamicThreeHero = dynamic(async () => import('apps/web/src/components/ThreeHero'), {
  ssr: false,
});

/* Farcaster Metadatas */
const buttons: FrameButtonMetadata[] = [
  {
    action: 'link',
    label: 'Read the docs',
    target: 'https://docs.base.org/',
  },
  {
    action: 'link',
    label: 'Bridge assets',
    target: 'https://bridge.base.org/deposit',
  },
];

const otherMetadata: Metadata['other'] = {
  'fc:frame:image': 'https://base.org/images/base-open-graph.png',
};

buttons
  .map((button, index) => {
    const metadataKey = `fc:frame:button:${index + 1}`;
    otherMetadata[metadataKey] = [button.label];
    if (button.action) otherMetadata[`${metadataKey}:action`] = [button.action];
    if (button.target) otherMetadata[`${metadataKey}:target`] = [button.target];
    return otherMetadata;
  })
  .flat();

/* Page Metadatas */
export const metadata: Metadata = {
  other: otherMetadata,
};

export default async function Home() {
  return (
    <ErrorsProvider context="base_landing_page">
      <AnalyticsProvider context="base_landing_page">
        <AnalyticsProvider context="hero">
          <div className="relative h-screen w-full">
            <DynamicThreeHero />

            <div className="absolute bottom-0 left-0 w-full pb-20 text-white">
              <Container>
                <Title level={TitleLevel.Headline}>Base is for everyone.</Title>
                <p className="max-w-[19rem]">
                  Bringing the world onchain to create a global economy that increases innovation,
                  creativity, and freedom.
                </p>
                <div className="mt-4 flex gap-4">
                  <Link href="/getstarted?utm_source=dotorg&medium=hero">
                    <Button variant={ButtonVariants.Secondary} iconName="baseOrgDiagonalUpArrow">
                      Start building
                    </Button>
                  </Link>
                  <Link href="/names?utm_source=dotorg&medium=hero">
                    <Button variant={ButtonVariants.Outlined} iconName="baseOrgDiagonalUpArrow">
                      Get a Basename
                    </Button>
                  </Link>
                </div>
              </Container>
            </div>
          </div>
        </AnalyticsProvider>
        <AnalyticsProvider context="content">
          <main className="flex w-full flex-col items-center bg-black">
            <Container>
              <div className="flex flex-col gap-40 pb-40 pt-20">
                <section>
                  <Title level={TitleLevel.Display1}>
                    The future of the internet is onchain. Base is here to help you build it.
                  </Title>
                </section>
                <BuildExploreSection />
                <VideoCardsSection />
                <SlidingTextSection />
                <TransactionsFeesSection />
                <BuildAndRewardSection />
                <BlogSection />
              </div>
            </Container>
          </main>
        </AnalyticsProvider>
      </AnalyticsProvider>
    </ErrorsProvider>
  );
}
