import { Metadata } from 'next';
import { FrameButtonMetadata } from '@coinbase/onchainkit/frame';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import { BestOfEthereum } from 'apps/web/src/components/BestOfEthereum/BestOfEthereum';
import { Commitment } from 'apps/web/src/components/Commitment/Commitment';
import { Divider } from 'apps/web/src/components/Divider/Divider';
import { EmpoweredByCoinbase } from 'apps/web/src/components/EmpoweredByCoinbase/EmpoweredByCoinbase';
import { Features } from 'apps/web/src/components/Features/Features';
import { GetConnected } from 'apps/web/src/components/GetConnected/GetConnected';
import { JoinTheCommunity } from 'apps/web/src/components/JoinTheCommunity/JoinTheCommunity';
import { Partnerships } from 'apps/web/src/components/Partnerships/Partnerships';
import ThreeHero from 'apps/web/src/components/ThreeHero';
import ShimmerCard from 'apps/web/src/components/ShimmerCard';

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
    <AnalyticsProvider context="base_landing_page">
      <AnalyticsProvider context="hero">
        <div className="h-[875px] w-full">
          <ThreeHero />
        </div>
      </AnalyticsProvider>
      <main className="flex w-full flex-col items-center bg-black">
        <div className="container flex w-full flex-row items-center gap-12 bg-black p-12 pb-[96px]">
          <ShimmerCard>
            <span className="text-white">Hello, welcome to base</span>
          </ShimmerCard>
          <ShimmerCard>
            <span className="text-white">Hello, welcome to base</span>
          </ShimmerCard>
          <ShimmerCard>
            <span className="text-white">Hello, welcome to base</span>
          </ShimmerCard>
        </div>
        <Divider />
        <Features />
        <Divider />
        <BestOfEthereum />
        <Divider />
        <EmpoweredByCoinbase />
        <Divider />
        <Partnerships />
        <Divider />
        <Commitment />
        <Divider />
        <JoinTheCommunity />
        <Divider />
        <GetConnected />
      </main>
    </AnalyticsProvider>
  );
}
