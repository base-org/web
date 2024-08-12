import classNames from 'classnames';
import {
  gridClasses,
  // FUNDING_SECTION_ID,
  // GET_NOTICED_SECTION_ID,
  // START_BUILDING_SECTION_ID,
} from '../../../app/(base-org)/get-started/page';
import { Icon } from '../Icon/Icon';
import { Resource } from './resourceTypes';
import ResourceCard from './ResourceGrid/ResourceCard';

type MostWantedResource = Resource & {
  icon: string;
};

const mostWanted: MostWantedResource[] = [
  {
    title: 'Create your profile',
    description: 'Claim a Basename and create your Based Profile to connect with other  Builders',
    href: '/names?utm_source=dotorg&utm_medium=builderkit',
    icon: 'basenamesIcon',
  },
  {
    title: 'Why Base?',
    description: 'Curious waht differentiates Base vs. building on other chains? Look no further',
    href: '/why-base/?utm_source=dotorg&utm_medium=builderkit',
    icon: 'questionMark',
  },
  {
    title: 'Office Hours',
    description: 'Schedule time to talk to directly to a member of the Base Ecosystem team',
    href: 'https://lu.ma/base-officehours/?utm_source=dotorg&medium=builderkit',
    icon: 'dotGrid',
  },
  {
    title: 'Get Funded',
    description: 'A collection of monetary programs to help you build or grow your project',
    href: `#GetFunded`,
    icon: 'blockchainNetwork',
  },
  {
    title: 'Get Noticed',
    description:
      'Looking for help with distribution? Get noticed by millions of potential new users',
    href: `#GetNoticed`,
    icon: 'cash',
  },
  {
    title: 'Build Your Project',
    description: 'Resources that make it easy to build and use your onchain project',
    href: `#StartBuilding`,
    icon: 'clock',
  },
];

export default async function BuildersMostWanted() {
  const titleClasses = classNames(
    'mb-4 lg:mb-6',
    'text-3xl sm:text-4xl lg:text-6xl',
    'leading-none',
  );

  const subtitleClasses = classNames(
    'mb-4 sm:mb-6 lg:mb-8',
    'font-sans',
    'text-base sm:text-lg lg:text-xl',
    'leading-snug',
  );

  return (
    <div className="p-12 sm:p-16 lg:p-24">
      <h1 className={titleClasses}>The Essentials</h1>
      <h2 className={subtitleClasses}>
        The tools and resources most frequently requested by Base Builders
      </h2>
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
