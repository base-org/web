import { FrameButtonMetadata, FrameMetadata } from '@coinbase/onchainkit/frame';
import { BestOfEthereum } from 'apps/web/src/components/BestOfEthereum/BestOfEthereum';
import { Commitment } from 'apps/web/src/components/Commitment/Commitment';
import { Divider } from 'apps/web/src/components/Divider/Divider';
import { EmpoweredByCoinbase } from 'apps/web/src/components/EmpoweredByCoinbase/EmpoweredByCoinbase';
import { Features } from 'apps/web/src/components/Features/Features';
import { GetConnected } from 'apps/web/src/components/GetConnected/GetConnected';
import { Hero } from 'apps/web/src/components/Home/Hero';
import { JoinTheCommunity } from 'apps/web/src/components/JoinTheCommunity/JoinTheCommunity';
import { Partnerships } from 'apps/web/src/components/Partnerships/Partnerships';
import Head from 'next/head';

const buttons: [FrameButtonMetadata, ...FrameButtonMetadata[]] = [
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

export default async function Home() {
  return (
    <>
      <FrameMetadata
        buttons={buttons}
        image="https://base.org/images/base-open-graph.png"
        wrapper={Head}
      />
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
