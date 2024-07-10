import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import Image, { StaticImageData } from 'next/image';
import onChainSummerPassCard from './images/onChainSummerPassCard.png';
import onChainSummerRegistryCard from './images/onChainSummerRegistryCard.png';
import baseGuildCard from './images/baseGuildCard.png';
import grantsCard from './images/grantsCard.png';
import verificationCard from './images/verificationCard.png';
import baseLearnCard from './images/baseLearnCard.png';

import Link from 'next/link';
import { Icon } from 'apps/web/src/components/Icon/Icon';

export type UsernameProfileSectionExploreLink = {
  id: number;
  title: string;
  image: StaticImageData;
  href: string;
};

const usernameProfileSectionExploreLinks: UsernameProfileSectionExploreLink[] = [
  {
    id: 1,
    title: 'Get an Onchain Summer Pass',
    image: onChainSummerPassCard,
    href: 'https://www.base.org/onchainsummer',
  },
  {
    id: 2,
    title: 'Sign up for the OCS Registry',
    image: onChainSummerRegistryCard,
    href: 'https://www.base.org/onchainsummer',
  },
  {
    id: 3,
    title: 'Go to Base Guild',
    image: baseGuildCard,
    href: 'https://www.base.org/onchainsummer',
  },
  {
    id: 4,
    title: 'Get a Rounds Grant',
    image: grantsCard,
    href: 'https://www.base.org/onchainsummer',
  },
  {
    id: 5,
    title: 'Get a verification',
    image: verificationCard,
    href: 'https://www.base.org/onchainsummer',
  },
  {
    id: 6,
    title: 'Go to Base Learn',
    image: baseLearnCard,
    href: 'https://www.base.org/onchainsummer',
  },
];

export default function UsernameProfileSectionExplore() {
  return (
    <section className="">
      <UsernameProfileSectionTitle title="Explore" />
      <ul className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        {usernameProfileSectionExploreLinks.map((usernameProfileSectionExploreLink) => (
          <li key={usernameProfileSectionExploreLink.id} className="inline-block w-full">
            <Link
              href={usernameProfileSectionExploreLink.href}
              target="_blank"
              className="flex w-full flex-col gap-2 hover:text-blue-600"
            >
              <Image
                src={usernameProfileSectionExploreLink.image}
                alt={usernameProfileSectionExploreLink.title}
              />
              <h4 className="mt-2 flex items-center gap-2">
                {usernameProfileSectionExploreLink.title}
                <Icon name="arrowRight" color="currentColor" height="1rem" width="1rem" />
              </h4>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
