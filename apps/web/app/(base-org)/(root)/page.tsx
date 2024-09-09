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
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';

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
            <p className="text-white">Hello, welcome to base</p>
          </ShimmerCard>
          <ShimmerCard>
            <p className="text-white">Hello, welcome to base</p>
          </ShimmerCard>
          <ShimmerCard>
            <p className="text-white">Hello, welcome to base</p>
            <br />
            <br />
            <Button roundedFull>Connect</Button>
            <br />
            <br />
            <Button>Button</Button>
            <br />
            <br />
            <Button disabled>Button Disabled</Button>

            <br />
            <br />
            <Button variant={ButtonVariants.Secondary}>Button</Button>
            <br />
            <br />
            <Button variant={ButtonVariants.Secondary} disabled>
              Button Disabled
            </Button>

            <br />
            <br />
            <Button variant={ButtonVariants.Outlined}>Button</Button>
            <br />
            <br />
            <Button variant={ButtonVariants.Outlined} disabled>
              Button Disabled
            </Button>

            <br />
            <br />
            <Button iconName="baseOrgdiagonalUpArrow">Button</Button>
            <br />
            <br />
            <Button iconName="baseOrgdiagonalUpArrow" disabled>
              Button Disabled
            </Button>

            <br />
            <br />
            <Button iconName="baseOrgdiagonalUpArrow" variant={ButtonVariants.Secondary}>
              Button
            </Button>
            <br />
            <br />
            <Button iconName="baseOrgdiagonalUpArrow" variant={ButtonVariants.Secondary} disabled>
              Button Disabled
            </Button>

            <br />
            <br />
            <Button iconName="baseOrgdiagonalUpArrow" variant={ButtonVariants.Outlined}>
              Button
            </Button>
            <br />
            <br />
            <Button iconName="baseOrgdiagonalUpArrow" variant={ButtonVariants.Outlined} disabled>
              Button Disabled
            </Button>
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
