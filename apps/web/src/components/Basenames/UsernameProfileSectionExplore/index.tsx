import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import { StaticImageData } from 'next/image';
import onChainSummerPassCard from './images/onChainSummerPassCard.png';
import onChainSummerRegistryCard from './images/onChainSummerRegistryCard.png';
import baseGuildCard from './images/baseGuildCard.png';
import grantsCard from './images/grantsCard.png';
import verificationCard from './images/verificationCard.png';
import baseLearnCard from './images/baseLearnCard.png';

import Link from 'next/link';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';

export type UsernameProfileSectionExploreLink = {
  title: string;
  image: StaticImageData;
  backgroundClassName: string;
  href: string;
};

const USERNAME_PROFILE_SECTION_EXPLORE_LINKS: UsernameProfileSectionExploreLink[] = [
  {
    title: 'Get verified',
    image: verificationCard,
    href: 'https://www.coinbase.com/onchain-verify',
    backgroundClassName: 'bg-black',
  },
  {
    title: 'Go to Base Guild',
    image: baseGuildCard,
    href: 'https://guild.xyz/base',
    backgroundClassName: 'bg-blue-500',
  },
  {
    title: 'Learn on Base Camp',
    image: baseLearnCard,
    href: 'https://docs.base.org/base-camp/progress/',
    backgroundClassName: 'bg-blue-500',
  },
  {
    title: 'Add project to the Onchain Registry',
    image: onChainSummerRegistryCard,
    href: 'https://buildonbase.deform.cc/registry/',
    backgroundClassName: 'bg-blue-500',
  },
  {
    title: 'Get an Onchain Summer Pass',
    image: onChainSummerPassCard,
    href: 'https://wallet.coinbase.com/ocs/progress',
    backgroundClassName: 'bg-[#F1A1D7]',
  },
  {
    title: 'Earn rewards for Based work on Rounds',
    image: grantsCard,
    href: 'https://rounds.wtf/base-builds/',
    backgroundClassName: 'bg-[#F7D43B]',
  },
];

export default function UsernameProfileSectionExplore() {
  return (
    <section className="">
      <UsernameProfileSectionTitle title="Explore" />
      <ul className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        {USERNAME_PROFILE_SECTION_EXPLORE_LINKS.map((usernameProfileSectionExploreLink) => (
          <li key={usernameProfileSectionExploreLink.title} className="inline-block w-full">
            <Link
              href={usernameProfileSectionExploreLink.href}
              target="_blank"
              className="group flex w-full flex-col gap-2 hover:text-blue-600"
            >
              <ImageWithLoading
                src={usernameProfileSectionExploreLink.image}
                alt={usernameProfileSectionExploreLink.title}
                title={usernameProfileSectionExploreLink.title}
                wrapperClassName="rounded-3xl"
                backgroundClassName={usernameProfileSectionExploreLink.backgroundClassName}
                imageClassName="group-hover:rotate-[-1deg] group-hover:scale-105"
              />
              <h4 className="mt-2 flex items-center gap-2 transition-all group-hover:gap-4">
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
