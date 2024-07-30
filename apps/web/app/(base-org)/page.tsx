import { FrameButtonMetadata } from '@coinbase/onchainkit/frame';
import { BestOfEthereum } from 'apps/web/src/components/BestOfEthereum/BestOfEthereum';
import { Commitment } from 'apps/web/src/components/Commitment/Commitment';
import { Divider } from 'apps/web/src/components/Divider/Divider';
import { EmpoweredByCoinbase } from 'apps/web/src/components/EmpoweredByCoinbase/EmpoweredByCoinbase';
import { Features } from 'apps/web/src/components/Features/Features';
import { GetConnected } from 'apps/web/src/components/GetConnected/GetConnected';
import { Hero } from 'apps/web/src/components/Home/Hero';
import { JoinTheCommunity } from 'apps/web/src/components/JoinTheCommunity/JoinTheCommunity';
import { Partnerships } from 'apps/web/src/components/Partnerships/Partnerships';
import { Metadata } from 'next';

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
    <>
      <Hero />
      <main className="flex w-full flex-col items-center bg-black">
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
    </>
  );
}
