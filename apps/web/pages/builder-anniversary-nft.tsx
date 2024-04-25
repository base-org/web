import Head from 'next/head';

import { BuilderNftHero } from '../src/components/BuilderNft/BuilderNftHero';

export default function BuilderNFT() {
  return (
    <div>
      <Head>
        <title>Base | Builder NFT</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
      </Head>
      <main className="flex w-full flex-col items-center bg-black">
        <BuilderNftHero />
      </main>
    </div>
  );
}
