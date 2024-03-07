import { GetConnected } from 'apps/web/src/components/GetConnected/GetConnected';
import Head from 'next/head';

import { BestOfEthereum } from '../src/components/BestOfEthereum/BestOfEthereum';
import { Commitment } from '../src/components/Commitment/Commitment';
import { Divider } from '../src/components/Divider/Divider';
import { EmpoweredByCoinbase } from '../src/components/EmpoweredByCoinbase/EmpoweredByCoinbase';
import { Features } from '../src/components/Features/Features';
import { Hero } from '../src/components/Home/Hero';
import { JoinTheCommunity } from '../src/components/JoinTheCommunity/JoinTheCommunity';
import { Partnerships } from '../src/components/Partnerships/Partnerships';
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
        <meta property="og:site_name" content="Base" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Base" />
        <meta
          property="og:description"
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
        />
        <meta property="og:url" content="https://base.org" />
        <meta property="og:image" content="https://base.org/images/base-open-graph.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Base" />
        <meta
          name="twitter:description"
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
        />
        <meta name="twitter:url" content="https://base.org" />
        <meta name="twitter:image" content="https://base.org/images/base-open-graph.png" />
        <meta name="twitter:site" content="Base" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
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
