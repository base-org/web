import React from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon/Icon';
import { Resource } from './ResourceCard/ResourceCard';
import ResourceCard from './ResourceCard/ResourceCard';

type MostWantedResource = Resource & {
  icon: string;
};

const mostWanted: MostWantedResource[] = [
  {
    title: 'Create your profile',
    description: 'Claim a Basename and create your Based Profile to connect with other  Builders',
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
    title: 'Base Builder Grants',
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

export default async function BuildersMostWanted() {
  const titleClasses = classNames(
    'mb-4 lg:mb-6',
    'text-3xl sm:text-4xl lg:text-6xl',
    'leading-none',
  );

  const gridClasses = classNames(
    'mt-10 sm:mt-12 lg:mt-16',
    'grid grid-cols-1 md:grid-cols-3',
    'gap-2 gap-y-8 sm:gap-4 sm:gap-y-12 lg:gap-6',
  );

  return (
    <div className="p-12 sm:p-16 lg:p-24">
      <div>
        <h1 className={titleClasses}>The Essentials</h1>
        <span className="font-sans text-base sm:text-lg lg:text-xl">
          The tools and resources most frequently requested by Base Builders
        </span>
      </div>
      <div className={gridClasses}>
        {mostWanted.map((card) => {
          return (
            <ResourceCard
              key={card.href}
              href={card.href}
              title={card.title}
              description={card.description}
              topLeft={<Icon name={card.icon} color="white" />}
              colorOne="purple-60"
              colorTwo="purple-80"
            />
          );
        })}
      </div>
    </div>
  );
}