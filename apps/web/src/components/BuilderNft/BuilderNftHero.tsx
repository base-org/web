import Image from 'next/image';
import nftPreview from 'apps/web/public/images/builderNft/nftPreview.webp';
import { MintStateContext, useMintState } from './useMintState';
import {
  CTAForStatus,
  ContentForStatus,
  HeadingForStatus,
  SubHeadingForStatus,
} from 'apps/web/src/components/BuilderNft/constants';
import { NftButton } from 'apps/web/src/components/BuilderNft/NftButton';

export function BuilderNftHero() {
  const mintState = useMintState();
  const { status } = mintState;

  return (
    <MintStateContext.Provider value={mintState}>
      <div className="mt-[-96px] flex w-full flex-col items-center bg-black pb-[96px]">
        <div className="flex w-full max-w-[1440px] flex-col justify-center px-8 py-8 pt-48 md:flex-row md:gap-32">
          <div className="flex w-full flex-col gap-8 md:w-1/2">
            <h1 className="font-display text-3xl text-white md:text-5xl lg:text-6xl">
              {HeadingForStatus[status]}
            </h1>
            <p className="font-display text-lg text-white">{SubHeadingForStatus[status]}</p>
            <p className="text-md font-display text-white">{ContentForStatus[status]}</p>
            {CTAForStatus[status]}
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
              <NftButton status={status} />
            </div>
          </div>
        </div>
      </div>
    </MintStateContext.Provider>
  );
}
