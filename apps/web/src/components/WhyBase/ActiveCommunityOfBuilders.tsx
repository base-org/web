import Link from 'apps/web/node_modules/next/link';
import Image from 'apps/web/node_modules/next/image';
import { StaticImport } from 'apps/web/node_modules/next/dist/shared/lib/get-img-props';
import { whyBaseSharedClassNames } from '../../../app/(base-org)/why-base/page';
import { ButtonWithLinkAndEventLogging } from '../Button/ButtonWithLinkAndEventLogging';
import section1 from '../TableOfContents/sectionNumbers/section1.svg';
import aerodromeImage from './images/aerodrome.svg';
import doodlesImage from './images/doodles.svg';
import morphoImage from './images/morpho.svg';
import { partners, Partner } from './partners';

type CommunityCardType = {
  title: string;
  href: string;
  description: string;
  tag: string;
  img: StaticImport;
};

const communityCards: CommunityCardType[] = [
  {
    title: 'Aerodrome',
    href: 'aerodrome.finance',
    description: 'A next-generation DeFi protocol and AMM with friendly user experience',
    tag: 'defi',
    img: aerodromeImage as StaticImport,
  },
  {
    title: 'Doodles',
    href: 'doodles.app',
    description: 'Immersive storytelling through the creation of live and digital experiences',
    tag: 'nft',
    img: doodlesImage as StaticImport,
  },
  {
    title: 'Morpho',
    href: 'morpho.org',
    description: 'A permissionless and non-custodial lending protocol',
    tag: 'defi',
    img: morphoImage as StaticImport,
  },
];

export const COMMUNITY_OF_BUILDERS_SECTION_ID = 'communityOfBuilders';

export default async function ActiveCommunityOfBuilders() {
  return (
    <div
      id={COMMUNITY_OF_BUILDERS_SECTION_ID}
      className={`${whyBaseSharedClassNames.section} sm:pt-8 lg:pt-10`}
    >
      <div className="flex flex-col justify-between md:grid md:grid-cols-[1fr_1fr]">
        <div className="mr-8 hidden md:block">
          <CommunityPartners communityPartners={partners} />
        </div>
        <div className="flex grow flex-col justify-start space-y-6 lg:mx-8 lg:justify-around xl:mx-20">
          <div className="flex flex-row">
            <span className={whyBaseSharedClassNames.sectionNumberIcon}>
              <Image src={section1 as StaticImport} alt="section one" />
            </span>
            <div className="ml-4">
              <h2 className={whyBaseSharedClassNames.title}>
                Join an active community of Builders
              </h2>
              <div className="my-4 md:hidden">
                <CommunityPartners communityPartners={partners} />
              </div>
              <p className={whyBaseSharedClassNames.bodyText}>
                Join a community of thousands builders just like you, building some of the coolest
                projects onchain. Reach out to our Discord support team for help.
              </p>
              <ButtonWithLinkAndEventLogging
                href="https://discord.com/invite/buildonbase"
                eventName="join_discord"
                target="_blank"
                rel="noreferrer noopener"
                linkClassNames="inline-block"
                buttonClassNames={whyBaseSharedClassNames.ctaButton}
              >
                Go To Discord
              </ButtonWithLinkAndEventLogging>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 sm:mt-12 lg:mt-16">
        <span className="text-lg sm:text-xl">Community Spotlight</span>
        <div className="mt-4 flex flex-col flex-wrap justify-between gap-4 sm:flex-row">
          {communityCards.map((card) => (
            <CommunityCard key={card.href} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

async function CommunityPartners({ communityPartners }: { communityPartners: Partner[] }) {
  return (
    <div className="grid h-full max-h-[300px] w-full max-w-[520px] grid-cols-12 gap-0">
      {communityPartners.map((partner, index) => (
        <div
          key={partner.name}
          className={`col-span-2 flex max-h-[75px] max-w-[75px] items-center justify-center
        ${index === 0 || index === 11 ? 'col-start-2' : ''}
      `}
        >
          <Image src={partner.img} alt={partner.name} className="m-0 h-full w-full" />
        </div>
      ))}
    </div>
  );
}

async function CommunityCard({ card }: { card: CommunityCardType }) {
  return (
    <div
      key={card.href}
      className="grid max-h-[330px] w-full grid-rows-[auto_1fr] border-2 border-gray-90 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-16px)]"
    >
      <Link href={`https://${card.href}`} target="_blank" rel="noreferrer noopener">
        <Image src={card.img} alt={card.title} className="h-full w-full object-cover" />
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
