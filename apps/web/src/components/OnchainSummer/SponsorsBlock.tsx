import Brit from 'apps/web/src/components/OnchainSummer/Brit';
import { BlackCircle } from 'apps/web/src/components/OnchainSummer/Circles';
import stripe from 'apps/web/public/images/ocs/sponsors/stripe.png';
import farcaster from 'apps/web/public/images/ocs/sponsors/farcaster.png';
import aerodrome from 'apps/web/public/images/ocs/sponsors/aerodrome.png';
import fleek from 'apps/web/public/images/ocs/sponsors/fleek.png';
import thirdweb from 'apps/web/public/images/ocs/sponsors/thirdweb.png';
import zora from 'apps/web/public/images/ocs/sponsors/zora.png';
import shopify from 'apps/web/public/images/ocs/sponsors/shopify.png';
import nouns from 'apps/web/public/images/ocs/sponsors/nouns.png';
import synthetix from 'apps/web/public/images/ocs/sponsors/synthetix.png';
import Image from 'next/image';
import { FadeInSection } from 'apps/web/src/components/OnchainSummer/FadeIns';

const sponsors = [
  {
    name: 'Stripe',
    color: '#635BFF',
    text: 'white',
    image: stripe,
  },
  {
    name: 'Farcaster',
    color: '#833DFF',
    text: 'white',
    image: farcaster,
  },
  {
    name: 'Aerodrome',
    color: '#E9E8E3',
    text: 'black',
    image: aerodrome,
  },
  {
    name: 'Fleek',
    color: '#0A0C0E',
    text: 'white',
    image: fleek,
  },
  {
    name: 'Thirdweb',
    color: '#DC35A7',
    text: 'white',
    image: thirdweb,
  },
  {
    name: 'Zora',
    color: '#E9E8E3',
    text: 'black',
    image: zora,
  },
  {
    name: 'Shopify',
    color: '#5E8E3E',
    text: 'white',
    image: shopify,
  },
  {
    name: 'Nouns',
    color: '#EFC950',
    text: 'black',
    image: nouns,
  },
  {
    name: 'Synthetix',
    color: '#00BAFA',
    text: 'white',
    image: synthetix,
  },
];

export default function SponsorsBlock() {
  return (
    <div className="my-20 flex w-full max-w-[1200px] flex-col">
      <div className="text-l flex flex-row items-center gap-2 px-8 font-mono uppercase">
        <BlackCircle /> Sponsors
      </div>
      <FadeInSection>
        <div className="my-6 flex flex-col gap-6 px-8">
          <span className="text-5xl font-extrabold leading-9 md:text-7xl">
            BUILDATION TR<Brit>a</Brit>CK <Brit axis={68}>s</Brit>PONSORS
          </span>
          <p className="mt-4 text-2xl md:text-4xl">
            8 tracks across commerce, payments, gaming, creator, social, and more. Sponsored by
            leading builders and innovators
          </p>
        </div>
      </FadeInSection>
      <FadeInSection delay={0.5}>
        <div
          className="mb-8 flex w-full max-w-[1200px] flex-row gap-2 overflow-x-auto pb-6 md:px-8"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#000',
          }}
        >
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex min-h-[150px] min-w-[150px] flex-col justify-between gap-2 rounded-[3px] p-4"
              style={{ background: sponsor.color }}
            >
              <Image src={sponsor.image} alt={sponsor.name} height={50} />
              <span
                className="text-l font-mono font-light uppercase"
                style={{ color: sponsor.text }}
              >
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>
        <span className="px-8">SCROLL &gt;</span>
        <div className="ml-8 h-[3px] w-[90px] bg-black px-8" />
        <div className="mx-8 h-[1px] w-[300px] bg-black px-8" />
      </FadeInSection>
    </div>
  );
}
