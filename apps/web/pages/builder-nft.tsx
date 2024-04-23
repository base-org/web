import Head from 'next/head';
import Image from 'next/image';

import nftPreview from 'apps/web/public/images/builderNft/nftPreview.webp';
import { Button } from 'apps/web/src/components/Button/Button';

function BuilderNftHero() {
  return (
    <div className="mt-[-96px] flex w-full flex-col items-center bg-black pb-[96px]">
      <div className="flex w-full max-w-[1440px] flex-col justify-center px-8 py-8 pt-48 md:flex-row md:gap-32">
        <div className="flex w-full flex-col gap-8 md:w-1/2">
          <h1 className="font-display text-3xl text-white md:text-5xl lg:text-6xl">
            It’s here! Claim your Base Builder Mainnet NFT
          </h1>
          <p className="font-display text-lg text-white">
            A special thank you from us for being an early builder on Base.
          </p>
          <p className="text-md font-display text-white">
            By completing last year's onchain quest, your skills and vision helped push the
            boundaries of what's possible onchain. This NFT, designed by digital artist Andre Oshea,
            commemorates the momentum we’ve built together and the creativity that builders bring to
            Base. There’s so much more to come.
          </p>
        </div>
        <div className="flex w-full flex-col gap-8 md:w-1/2 md:justify-end">
          <div className="border-4 border-white">
            <Image src={nftPreview} alt="Preview of the Base Builder NFT" />
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-lg uppercase text-white">
                The Expansion of Awareness
              </span>
              <span className="text-white">Andre Oshea</span>
            </div>
            <Button variant="primary" className="w-32">
              Mint
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: JSX.Element | string }) {
  return (
    <div className="flex flex-col gap-6 border-t border-translucent-200 pt-8">
      <h2 className="text-2xl">{question}</h2>
      <p>{answer}</p>
    </div>
  );
}

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
                <a href="https://base.mirror.xyz/CsHm8poSS9HqWNMvPZEZDIn8LMjiNy5PwUd7z8F6G-Q">
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
