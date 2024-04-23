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
        <div>
          <h1 className="text-xxl text-white">Builder NFT</h1>
        </div>
      </main>
    </div>
  );
}
