'use client';
import bolt from './assets/bolt.webm';
import eth from './assets/eth.webm';
import globe from './assets/globe.webm';
import VideoCard from 'apps/web/src/components/base-org/root/VideoCardsSection/VideoCard';

export default function VideoCardsSection() {
  return (
    <section className="flex w-full flex-col gap-4 md:flex-row">
      <VideoCard
        title="Built for Billions"
        description="Our vision to keep fees low (below 1 cent) and transactions fast (below 1 second) will help bring the next billion people onchain."
        src={bolt}
      />
      <VideoCard
        title="Worldwide reach"
        description="The Base economy is made up of millions of people, thousands of builders, and onramps in 190+ countries."
        src={globe}
      />
      <VideoCard
        title="Open and trusted"
        description="Base is built as an Ethereum L2, decentralized with the Optimism Superchain, and incubated by Coinbase."
        src={eth}
      />
    </section>
  );
}
