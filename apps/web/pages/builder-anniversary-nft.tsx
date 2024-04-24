import Head from 'next/head';

import { BuilderNftHero } from '../src/components/BuilderNft/BuilderNftHero';
import { FaqItem } from '../src/components/BuilderNft/FaqItem';

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
        <div className="mb-32 flex w-full max-w-[1440px] flex-col gap-12 text-white">
          <h1 className="text-3xl uppercase">Frequently Asked Questions</h1>
          <FaqItem
            question="What is the Base Builder Mainnet NFT?"
            answer={
              <>
                Last year, we launched an{' '}
                <a
                  href="https://base.mirror.xyz/CsHm8poSS9HqWNMvPZEZDIn8LMjiNy5PwUd7z8F6G-Q"
                  target="_blank"
                  rel="noreferrer"
                >
                  onchain Builder Quest
                </a>{' '}
                shortly after we brought Base to testnet. Builders who completed the quest got a
                commemorative NFT on Base testnet designed by Andre Oshea. Our vision was to enable
                builders to keep a piece of onchain history with them as the earliest Base builders.
                Now, holders of the testnet NFT can claim their NFT on mainnet.
              </>
            }
          />
          <FaqItem
            question="Who is Andre Oshea?"
            answer="Andre Oshea is a digital 3D artist who makes art for those “who want to build the future.” Andre’s art explores new worlds and realities, and inspires people to think about the possibilities of the future – exactly the type of curiosity and inspiration that we’re hoping to spark among Based builders."
          />
          <FaqItem
            question="How do I claim my NFT?"
            answer={
              <>
                <p>It’s easy!</p>
                <ol>
                  <li>1. Find the wallet that holds your Goerli testnet NFT</li>
                  <li>2. Connect your wallet to Base mainnet</li>
                  <li>3. Make sure you’ve got ETH for the gas fee</li>
                  <li>4. Click “mint”</li>
                  <li>5. That’s it! Your NFT will be minted and appear in your wallet.</li>
                </ol>
              </>
            }
          />
          <FaqItem
            question="Who is eligible to claim the Base Builder Mainnet NFT?"
            answer="Builders who completed last year’s onchain quest and claimed the testnet NFT. (Please make sure you’re connecting the same wallet that holds the testnet NFT, otherwise you won’t be able to claim.)"
          />
          <FaqItem
            question="Why can’t I claim my NFT?"
            answer="Only builders who completed last year’s onchain quest and claimed the Base Builder NFT on testnet are eligible to claim the mainnet NFT. Please use the wallet that holds the testnet NFT, otherwise you won’t be able to claim."
          />
          <FaqItem
            question="I’m bummed to miss the chance. Will Base do more NFTs?"
            answer="Yes! While there is only one Base Builder Mainnet NFT (for those who have completed last year’s quest), the Base team as well as Based artists worldwide continue to create and distribute digital collectibles that showcase their creativity. Follow Base on X and Warpcast for updates around upcoming mints, and join the /base channel to catch mints from the community."
          />
        </div>
      </main>
    </div>
  );
}
