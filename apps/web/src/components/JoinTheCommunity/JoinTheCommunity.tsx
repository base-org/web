/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import Image from 'next/image';

const partners = [
  '0x',
  'aave',
  'aerodrome',
  'animoca',
  'blockscout',
  'blockdaemon',
  'chainlink',
  'daz3d',
  'dune',
  'etherscan',
  'euler',
  'flipside',
  'hop',
  'mnemonic',
  'nansen',
	'odos',
  'parallel',
  'quicknode',
  'socket',
  'sushiswap',
  'thirdweb',
  'transak',
] as const;

export function JoinTheCommunity() {
  return (
    <div className="flex w-full max-w-[780px] flex-col justify-center gap-8 bg-black py-12 px-6 md:gap-6 lg:justify-start lg:px-7 xl:max-w-[1440px]">
      <p className="font-display text-3xl text-white md:text-6xl xl:max-w-[50%]">
        Join the community building on Base
      </p>
      {/* desktop */}
      <div className="group hidden flex-wrap gap-3 xl:flex">
        {partners.map((partner) => (
          <div className="relative h-[108px] w-[108px] overflow-hidden rounded-[3px]" key={partner}>
            <Image
              src={`/images/partners/${partner}.webp`}
              alt={`${partner} logo`}
              fill
              style={{ objectFit: 'cover' }}
              className="duration-300 ease-partners hover:!opacity-100 group-hover:opacity-25"
              title={partner}
            />
          </div>
        ))}
      </div>
      {/* mobile */}
      <div className="group flex flex-wrap justify-center gap-3 xl:hidden">
        {partners.map((partner) => (
          <div className="relative h-[60px] w-[60px] overflow-hidden rounded-[3px]" key={partner}>
            <Image
              src={`/images/partners/${partner}.webp`}
              alt={`${partner} logo`}
              fill
              style={{ objectFit: 'cover' }}
              title={partner}
              className="duration-300 ease-partners hover:!opacity-100 group-hover:opacity-50"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
