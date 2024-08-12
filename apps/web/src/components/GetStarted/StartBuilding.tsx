import Link from 'next/link';
import classNames from 'classnames';
import {
  sectionContainerClasses,
  titleClasses,
  linkTextClasses,
} from '../../../app/(base-org)/getstarted/page';
import { Icon } from '../Icon/Icon';
import ResourceGrid from './ResourceGrid/ResourceGrid';
import { ResourceSectionType } from './resourceTypes';

const learnToBuildResources: ResourceSectionType = {
  title: 'Learn how to build a project',
  colorOne: 'orange-80',
  colorTwo: 'orange-60',
  cards: [
    {
      title: 'Learn to Build Onchain',
      description: 'Become an onchain developer with our comprehensive smart contract curriculum',
      href: 'https://docs.base.org/base-learn/?utm_source=dotorg&utm_medium=builderkit',
    },
    {
      title: 'Tutorials',
      description: 'Making building on Base easy, with guided development tutorials',
      href: 'https://docs.base.org/tutorials/?utm_source=dotorg&utm_medium=builderkit',
    },
  ],
};

const easyToBuildResources: ResourceSectionType = {
  title: 'Make your project easy to build',
  colorOne: 'orange-60',
  colorTwo: 'orange-80',
  cards: [
    {
      title: 'OnchainKit',
      description:
        'Build your apps in minutes with off-the-shelf React components and onchain integrations',
      href: 'https://onchainkit.xyz/?utm_source=dotorg&utm_medium=builderkit',
    },
    {
      title: 'Support Team',
      description: 'If you’re ever in need, contact our Support Team via Disord',
      href: 'https://discord.com/invite/buildonbase',
    },
  ],
};

const easyToUseResources: ResourceSectionType = {
  title: 'Make your project easy to use',
  colorOne: 'orange-80',
  colorTwo: 'orange-60',
  cards: [
    {
      title: 'Coinbase Smart Wallet',
      description:
        'Enable your users to create an account in seconds, without apps or seed phrases',
      href: 'https://www.coinbase.com/wallet/smart-wallet/?utm_source=dotorg&utm_medium=builderkit',
    },
    {
      title: 'Gas Sponsorship',
      description:
        'Reduce costs and Sponsor Gas for you users, with the Coinbase Paymster and Bundler',
      href: 'https://www.coinbase.com/developer-platform/products/paymaster/?utm_source=dotorg&utm_medium=builderkit',
    },
    {
      title: 'Coinbase Onramp',
      description: 'Fiat-to-crypto made fast, easy, and secure using Coinbase Onramp',
      href: 'https://www.coinbase.com/developer-platform/products/onramp/?utm_source=dotorg&utm_medium=builderkit',
    },
  ],
};

export const START_BUILDING_SECTION_ID = 'StartBuilding';

export default async function StartBuilding() {
  const subtitleClasses = classNames(
    'mt-6 sm:mt-10 lg:mt-12',
    'mb-2 sm:mb-4',
    'text-xl sm:text-2xl lg:text-3xl',
    'leading-none sm:leading-relaxed',
  );

  return (
    <div id={START_BUILDING_SECTION_ID} className={sectionContainerClasses}>
      <h1 className={titleClasses}>Start Building</h1>
      <h2 className={subtitleClasses}>Learn how to build a project</h2>
      <ResourceGrid section={learnToBuildResources} />
      <h2 className={subtitleClasses}>Save time building</h2>
      <ResourceGrid section={easyToBuildResources} />
      <h2 className={subtitleClasses}>Make your project easy to use</h2>
      <ResourceGrid section={easyToUseResources} />
      <div className="mt-6 flex">
        <Link href="https://www.coinbase.com/developer-platform/?utm_source=dotorg&utm_medium=builderkit">
          <div className="flex flex-row items-center justify-around gap-2 hover:scale-105">
            <span className={`${linkTextClasses}`}>View All Resources</span>
            <Icon name="chevronRight" width="16px" height="16px" color="currentColor" />
          </div>
        </Link>
      </div>
    </div>
  );
}
