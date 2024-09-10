'use client';
import chain from './assets/chain.webm';
import eth from './assets/eth.webm';
import globe from './assets/globe.webm';
import VideoCard from 'apps/web/src/components/base-org/root/VideoCardsSection/VideoCard';

export default function VideoCardsSection() {
  return (
    <section className="flex w-full flex-col gap-4 md:flex-row">
      <VideoCard
        title="Built for Billions"
        description="Our vision to keep fees low (below 1 cent) and transactions fast(below 1 second) will help bring the next billion people onchain."
        src={chain}
      />
      <VideoCard
        title="Worldwide reach"
        description="The Base economy is made up of millions of people, thousands of builders, and onramps in 190+ countries."
        src={globe}
      />
      <VideoCard
        title="Open, permissionless, and trusted"
        description="Base is secured by Ethereum as a Layer 2, decentralized on the Superchain and incubated by Coinbase."
        src={eth}
      />
    </section>
  );
}
