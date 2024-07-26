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
import { FrameButtonMetadata, FrameMetadata } from '@coinbase/onchainkit/frame';
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
