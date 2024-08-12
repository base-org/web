import classNames from 'classnames';
import { sectionContainer, titleClasses } from '../../../app/(base-org)/getstarted/page';
import { ButtonWithLinkAndEventLogging } from '../Button/ButtonWithLinkAndEventLogging';
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
      title: 'Base Learn',
      description: 'Build easier with expert how-to guides',
      href: 'https://docs.base.org/base-learn/progress/?utm_source=dotorg&utm_medium=builderkit',
    },
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
    <div id={START_BUILDING_SECTION_ID} className={sectionContainer}>
      <div>
        <h1 className={titleClasses}>Start Building</h1>
      </div>
      <h2 className={subtitleClasses}>Learn how to build a project</h2>
      <ResourceGrid section={learnToBuildResources} />
      <h2 className={subtitleClasses}>Make your project easy to build</h2>
      <ResourceGrid section={easyToBuildResources} />
      <ButtonWithLinkAndEventLogging
        href="/all"
        eventName="easy_to_build_resources"
        buttonClassNames="mt-6"
      >
        {`All Resources >>>`}
      </ButtonWithLinkAndEventLogging>
      <h2 className={subtitleClasses}>Make your project easy to use</h2>
      <ResourceGrid section={easyToUseResources} />
      <ButtonWithLinkAndEventLogging
        href="https://www.coinbase.com/developer-platform/?utm_source=dotorg&utm_medium=builderkit"
        eventName="easy_to_build_resources"
        buttonClassNames="mt-6"
      >
        {`All Resources >>>`}
      </ButtonWithLinkAndEventLogging>
    </div>
  );
}
