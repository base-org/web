import { CSSProperties } from 'react';
import Link from 'apps/web/node_modules/next/link';
import { StaticImageData } from 'apps/web/node_modules/next/dist/shared/lib/get-img-props';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';

import aerodromeImage from './aerodrome-logo-light.png';
import doodlesImage from './doodles-banner.png';
import morphoImage from './Morpho-logo-horizontal-darkmode.png';
import communityOfBuilders from './CommunityOfBuilders.png';

export default async function ActiveCommunityOfBuilders() {
  return (
    <div
      id="communityOfBuilders"
      className="mt-10 flex w-full max-w-[1440px] flex-col px-12 pb-6 sm:mt-16 sm:px-16 sm:pb-8 lg:mt-20 lg:px-24 lg:pb-10"
    >
      <div className="flex flex-col justify-between md:grid md:grid-cols-[1fr_1fr]">
        <div
          className="hidden h-auto w-full bg-contain bg-center bg-no-repeat md:block"
          style={imageBackgroundStyles}
        />
        <div className="flex grow flex-col justify-start space-y-6 lg:mx-8 lg:justify-around xl:mx-20">
          <h2 className="flex flex-row font-display text-3xl sm:text-4xl lg:text-5xl">
            <span>1.</span>
            <span className="ml-4">Join an active community of Onchain Builders</span>
          </h2>
          <div
            className="h-full min-h-[175px] w-full min-w-[300px] self-center bg-contain bg-center bg-no-repeat md:hidden"
            style={imageBackgroundStyles}
          />
          <span className="text-base text-white sm:text-lg">
            Join a community of thousands builders just like you, building some of the coolest
            projects onchain. Reach out to our Discord support team for help.
          </span>
          <div>
            <ButtonWithLinkAndEventLogging
              href="https://discord.com/invite/buildonbase"
              eventName="join_discord"
              eventContext="why_base"
              target="_blank"
              rel="noreferrer noopener"
              linkClassNames="inline-block"
              buttonClassNames="uppercase"
            >
              Join the Discord
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>
      </div>
      <div className="mt-10 sm:mt-12 lg:mt-16">
        <span className="text-lg sm:text-xl">Community Spotlight</span>
        <div className="mt-4 flex flex-col flex-wrap justify-between gap-4 sm:flex-row">
          {communityCards?.map((card) => (
            <CommunityCard key={card.href} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

async function CommunityCard({ card }: { card: CommunityCardType }) {
  const backgroundStyles: CSSProperties = {
    backgroundImage: `url('${card.img.src}')`,
  };

  return (
    <div
      key={card.href}
      className="grid h-[330px] w-full grid-rows-[1fr_1fr] border-2 border-gray-90 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-16px)]"
    >
      <Link
        href={`https://${card.href}`}
        target="_blank"
        rel="noreferrer noopener"
        className="flex flex-row justify-end bg-contain bg-center bg-no-repeat pr-4 pt-6 sm:pr-6 lg:pr-10 lg:pt-8"
        style={backgroundStyles}
      >
        <span className="flex h-6 items-center justify-center rounded-xl bg-black px-2 py-1 text-xs uppercase sm:text-sm">
          {card.tag}
        </span>
      </Link>
      <div className="bg-gray-90 p-4 sm:p-5 lg:p-6">
        <div className="mb-3 flex flex-col sm:mb-4">
          <span className="text-sm uppercase sm:text-base">{card.title}</span>
          <span className="text-xs lowercase text-dark-palette-foregroundMuted sm:text-sm">
            {card.href}
          </span>
        </div>
        <span className="text-sm sm:text-base">{card.description}</span>
      </div>
    </div>
  );
}

const communityCards: CommunityCardType[] = [
  {
    title: 'Aerodrome',
    href: 'aerodrome.finance',
    description: 'A next-generation DeFi protocol and AMM with friendly user experience',
    tag: 'defi',
    img: aerodromeImage,
  },
  {
    title: 'Doodles',
    href: 'doodles.app',
    description: 'Immersive storytelling through the creation of live and digital experiences',
    tag: 'nft',
    img: doodlesImage,
  },
  {
    title: 'Morpho',
    href: 'morpho.org',
    description: 'A permissionless and non-custodial lending protocol',
    tag: 'defi',
    img: morphoImage,
  },
];

const imageBackgroundStyles = {
  backgroundImage: `url('${communityOfBuilders.src}')`,
};

type CommunityCardType = {
  title: string;
  href: string;
  description: string;
  tag: string;
  img: StaticImageData;
};
