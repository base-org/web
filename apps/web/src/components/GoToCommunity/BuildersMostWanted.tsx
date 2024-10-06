import Image, { StaticImageData } from 'apps/web/node_modules/next/image';
import { Resource } from 'apps/web/src/components/GoToCommunity/ResourceCard/resourceCardTypes';

import onchainAdNetwork from './most-wanted-onchain-ad-network.png';
import whyBase from './most-wanted-why-base.png';
import ecosystem from './most-wanted-ecosystem.png';
import grants from './most-wanted-grants.png';
import jobBoard from './most-wanted-job-board.png';
import officeHours from './most-wanted-office-hours.png';

export default async function BuildersMostWanted() {
  return (
    <div className="bg-black p-12 sm:p-16 lg:p-24">
      <div>
        <h1 className="mb-4 text-4xl leading-tight sm:text-5xl lg:mb-6 lg:text-6xl lg:leading-none">{`Builders' Most Wanted`}</h1>
        <span className="text-lg sm:text-xl lg:text-2xl">
          Frequently requested tools and resources for Base Builders
        </span>
      </div>
      <div className="mt-10 flex flex-row flex-wrap justify-center gap-4 gap-y-8 sm:mt-12 sm:gap-6 sm:gap-y-12 lg:mt-16 lg:gap-8 lg:gap-y-16">
        {mostWanted.map((card) => (
          <div
            key={card.title}
            className="relative flex h-[180px] w-full flex-col gap-6 bg-gray-90 p-4 sm:h-[230px] sm:w-[calc(50%-12px)] sm:gap-8 sm:p-6 lg:h-auto lg:w-[330px]"
          >
            <div className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center bg-white">
              <Image src={card.img} alt="icon" className="h-full w-full object-contain" />
            </div>
            <div className="mt-8">
              <h3 className="mb-2 text-center font-mono text-lg uppercase sm:text-xl">
                {card.title}
              </h3>
              <p className="text-center font-sans text-sm sm:text-base">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mostWanted: MostWantedResources[] = [
  {
    title: 'Onchain Ad Network',
    description:
      'Submit your project to be viewed by millions of potential users across the network',
    href: '/',
    img: onchainAdNetwork,
  },
  {
    title: 'Why Base?',
    description: 'Curious waht differentiates Base vs. building on other chains? Look no further',
    href: '/',
    img: whyBase,
  },
  {
    title: 'Office Hours',
    description: 'Schedule time to talk directly to a member of the Base Ecosystem team',
    href: '/',
    img: officeHours,
  },
  {
    title: 'Base Ecosystem',
    description: 'Submit your project to be included on the Base Ecosystem page',
    href: '/',
    img: ecosystem,
  },
  {
    title: 'Base Grants',
    description:
      'Apply for a retroactive Base Builder Grant, rewarding great projects being built on Base',
    href: '/',
    img: grants,
  },
  {
    title: 'Job Board',
    description: 'Building a team or looking to join one? Check out the Base Community Job Board',
    href: '/',
    img: jobBoard,
  },
];

type MostWantedResources = Resource & {
  img: StaticImageData;
};
