'use client';

import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Icon } from '../Icon/Icon';
import { Resource } from './ResourceCard/resourceCardTypes';

type MostWantedResource = Resource & {
  icon: string;
};

const mostWanted: MostWantedResource[] = [
  {
    title: 'Claim Your Basename',
    description: 'Basenames are dope and you should have one. What are you waiting for?',
    href: '/names',
    icon: 'basenamesIcon',
  },
  {
    title: 'Why Base?',
    description: 'Curious waht differentiates Base vs. building on other chains? Look no further',
    href: '/why-base',
    icon: 'questionMark',
  },
  {
    title: 'Onchain Content Network',
    description:
      'Submit your project to be viewed by millions of potential users across the network',
    href: 'https://buildonbase.deform.cc/registry/',
    icon: 'blockchainNetwork',
  },
  {
    title: 'Office Hours',
    description: 'Schedule time to talk to directly to a member of the Base Ecosystem team',
    href: '/',
    icon: 'dotGrid',
  },
  {
    title: 'Base Grants',
    description:
      'Apply for a retroactive Base Builder Grant, rewarding great projects built on Base',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfXuEzmiAzRhie_z9raFCF1BXweXgVt18o-DvBuRRgyTygL2A/viewform',
    icon: 'cash',
  },
  {
    title: 'Job Board',
    description: 'Building a team or looking to join one? Check out the Base Community Job Board',
    href: '/',
    icon: 'clock',
  },
];

export default function BuildersMostWanted() {
  const resourceCardWrapperStyle = classNames(
    'group border-2 p-7 text-white',
    'bg-purple-60 border-purple-60',
    '[&:nth-child(4n-2)]:bg-purple-80 [&:nth-child(4n-2)]:border-purple-80',
    '[&:nth-child(3n)]:bg-purple-80 [&:nth-child(3n)]:border-purple-80',
    'md:odd:bg-purple-60 md:odd:border-purple-60',
    'md:even:bg-purple-80 md:even:border-purple-80',
    'duration-200 transition-colors',
    'hover:!bg-white',
    'hover:odd:text-purple-60',
    'hover:even:text-purple-80',
  );

  return (
    <>
      <div className="p-12 sm:p-16 lg:p-24">
        <div>
          <h1 className="mb-4 text-3xl leading-none sm:text-4xl lg:mb-6 lg:text-6xl lg:leading-none">
            The Essentials
          </h1>
          <span className="text-base sm:text-lg lg:text-xl">
            The tools and resources most frequently requested by Base Builders
          </span>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-2 gap-y-8 sm:mt-12 sm:gap-4 sm:gap-y-12 md:grid-cols-3 lg:mt-16 lg:gap-6">
          {mostWanted.map((card, index) => {
            return (
              <div
                key={card.title}
                className={resourceCardWrapperStyle}
                // className="resourceCard group border-2 p-7 duration-200 hover:bg-white transition-colors"
                // className="resourceCard group border-2 p-7 hover:p-5 hover:bg-white" // need to take away the duration or it jiggles
              >
                <Link href={card.href}>
                  <div
                    className="flex h-6 w-6 items-center justify-center py-1"
                    // className={`flex h-6 w-6 items-center justify-center py-1 ${
                    //   index % 2 === 0
                    //   ? 'group-hover:bg-purple-60'
                    //   // ? 'group-hover:bg-purple-60 group-hover:p-2 group-hover:h-10 group-hover:w-10' // changes the size of the box & text gets out of alignment
                    //     : 'group-hover:bg-purple-80'
                    // }`}
                  >
                    <Icon name={card.icon} color="currentColor" />
                    {/* <Icon name={card.icon} color="white" /> */}
                  </div>
                  {/* <div className="mt-8 group-hover:mx-2 group-hover:mt-6"> */}
                  <div className="mt-8">
                    <h3 className="mb-4 font-mono text-lg uppercase sm:text-xl">{card.title}</h3>
                    <p className="font-sans text-sm sm:text-base">{card.description}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
