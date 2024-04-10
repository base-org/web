import { GetConnected } from 'apps/web/src/components/GetConnected/GetConnected';
import Head from 'next/head';

import { BestOfEthereum } from '../components/BestOfEthereum/BestOfEthereum';
import { Commitment } from '../components/Commitment/Commitment';
import { Divider } from '../components/Divider/Divider';
import { EmpoweredByCoinbase } from '../components/EmpoweredByCoinbase/EmpoweredByCoinbase';
import { Features } from '../components/Features/Features';
import { Hero } from '../components/Home/Hero';
import { JoinTheCommunity } from '../components/JoinTheCommunity/JoinTheCommunity';
import { Partnerships } from '../components/Partnerships/Partnerships';
import { FrameButtonMetadata, FrameMetadata } from '@coinbase/onchainkit';
import { useMemo } from 'react';

export default function Home() {
  const buttons: [FrameButtonMetadata, ...FrameButtonMetadata[]] = useMemo(
    () => [
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
    ],
    [],
  );

  return (
    <>
      <Head>
        <title>Base</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
      </Head>
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
