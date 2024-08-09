'use client';

import React from 'react';
import { Icon } from '../Icon/Icon';
import { Resource } from './ResourceCard/ResourceCard';
import ResourceCard from './ResourceCard/ResourceCard';

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
    href: '/jobs',
    icon: 'clock',
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
      <div className="mt-10 grid grid-cols-2 gap-2 gap-y-8 sm:mt-12 sm:gap-4 sm:gap-y-12 md:grid-cols-3 lg:mt-16 lg:gap-6">
        {mostWanted.map((card) => {
          return (
            <ResourceCard
              key={card.href}
              href={card.href}
              title={card.title}
              description={card.description}
              topLeft={<Icon name={card.icon} color="currentColor" />}
              colorOne="purple-60"
              colorTwo="purple-80"
            />
          );
        })}
      </div>
    </div>
  );
}
