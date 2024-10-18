'use client';

import nftPreview from 'apps/web/public/images/builderNft/nftPreview.webp';
import { MintStateContext, useMintState } from './useMintState';
import {
  CTAForStatus,
  ContentForStatus,
  HeadingForStatus,
  SubHeadingForStatus,
} from 'apps/web/src/components/BuilderNft/constants';
import { NftButton } from 'apps/web/src/components/BuilderNft/NftButton';
import { FaqContent } from 'apps/web/src/components/BuilderNft/FaqContent';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import Container from 'apps/web/src/components/base-org/Container';

export function BuilderNftHero() {
  const mintState = useMintState();
  const { status } = mintState;

  return (
    <Container>
      <MintStateContext.Provider value={mintState}>
        <div className="flex w-full flex-col items-center bg-black pb-[96px]">
          <div className="flex w-full flex-col items-start justify-center gap-10  pt-32 md:flex-row lg:gap-32">
            <div className="order-last flex w-full flex-col gap-8 md:order-first md:w-2/3">
              <h1 className="font-display text-3xl text-white md:text-5xl lg:text-6xl">
                {HeadingForStatus[status]}
              </h1>
              <p className="font-display text-lg text-white">{SubHeadingForStatus[status]}</p>
              <p className="text-md font-display text-white">{ContentForStatus[status]}</p>
              {CTAForStatus[status]}
              <div className="mt-16 flex flex-col gap-8 text-white">
                <FaqContent />
              </div>
            </div>
            <div className="flex w-full flex-col gap-8 md:w-1/3 md:justify-end">
              <div className="border-4 border-white">
                <ImageAdaptive src={nftPreview} alt="Preview of the Base Builder NFT" />
              </div>
              <div className="flex flex-col justify-between gap-2 lg:flex-row">
                <div className="flex flex-col">
                  <span className="text-md font-mono text-base uppercase text-white">
                    The Expansion of Awareness
                  </span>
                  <span className="text-white">Andre Oshea</span>
                </div>
                <div className="self-end">
                  <NftButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MintStateContext.Provider>
    </Container>
  );
}
