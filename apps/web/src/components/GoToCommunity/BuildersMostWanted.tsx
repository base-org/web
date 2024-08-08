'use client';

import React from 'react';
import Image, { StaticImageData } from 'apps/web/node_modules/next/image';
import { Resource } from 'apps/web/src/components/GoToCommunity/ResourceCard/resourceCardTypes';
import onchainAdNetwork from './most-wanted-onchain-ad-network.png';
import whyBase from './most-wanted-why-base.png';
import ecosystem from './most-wanted-ecosystem.png';
import grants from './most-wanted-grants.png';
import jobBoard from './most-wanted-job-board.png';
import officeHours from './most-wanted-office-hours.png';

type MostWantedResources = Resource & {
  img: StaticImageData;
};

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

export default function BuildersMostWanted() {
  return (
    <div className="p-12 sm:p-16 lg:p-24">
      <div>
        <h1 className="mb-4 text-3xl leading-none sm:text-4xl lg:mb-6 lg:text-6xl lg:leading-none">
          The Essentials
        </h1>
        <span className="text-base sm:text-lg lg:text-xl">
          The tools and resources most frequently requested by Base Builders
        </span>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-2 gap-y-8 sm:mt-12 sm:gap-4 sm:gap-y-12 lg:mt-16 lg:gap-6">
        {mostWanted.map((card, index) => (
          <div
            key={card.title}
            className={`${
              index % 2 === 0
                ? 'bg-purple-60 hover:text-purple-60'
                : 'bg-purple-80 hover:text-purple-80'
            } p-8 duration-200 hover:bg-white`}
          >
            <div className="flex h-6 w-6 items-center justify-center bg-white fill-white">
              <Image src={card.img} alt="icon" className="h-full w-full object-contain" />
            </div>
            <div className="mt-8">
              <h3 className="mb-4 font-mono text-lg uppercase sm:text-xl">{card.title}</h3>
              <p className="font-sans text-sm sm:text-base">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
