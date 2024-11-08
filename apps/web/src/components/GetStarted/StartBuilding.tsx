import Link from 'next/link';
import { Icon } from '../Icon/Icon';
import ResourceCard from './ResourceCard/ResourceCard';
import { subtitleClasses, linkTextClasses, gridClasses } from './styles';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export const START_BUILDING_SECTION_ID = 'StartBuilding';

const resources = [
  {
    title: "Learn to Build Onchain",
    description: "Become an onchain developer with our comprehensive smart contract curriculum",
    href: "https://docs.base.org/base-learn/?utm_source=dotorg&utm_medium=builderkit",
    topLeft: <span className="font-mono">01</span>,
    topRight: <Icon name="diagonalUpArrow" width="16px" height="16px" />,
    classnames: "bg-orange-80 border-orange-80"
  },
  {
    title: "Tutorials",
    description: "Build now with 1-2-3 quickstarts, then evolve your onchain app with advanced topics",
    href: "https://docs.base.org/tutorials/?utm_source=dotorg&utm_medium=builderkit",
    topLeft: <span className="font-mono">02</span>,
    topRight: <Icon name="diagonalUpArrow" width="16px" height="16px" />,
    classnames: "bg-orange-60 border-orange-60"
  },
  {
    title: "OnchainKit",
    description: "Build your apps in minutes with off-the-shelf React components and onchain integrations",
    href: "https://onchainkit.xyz/?utm_source=dotorg&utm_medium=builderkit",
    topLeft: <span className="font-mono">01</span>,
    topRight: <Icon name="diagonalUpArrow" width="16px" height="16px" />,
    classnames: "bg-orange-60 border-orange-60"
  },
  {
    title: "Support Team",
    description: "If you're ever in need, please reach out in a dedicated Discord support channel",
    href: "https://discord.com/invite/buildonbase",
    topLeft: <span className="font-mono">02</span>,
    topRight: <Icon name="diagonalUpArrow" width="16px" height="16px" />,
    classnames: "bg-orange-80 border-orange-80"
  },
  {
    title: "Coinbase Smart Wallet",
    description: "Enable your users to create an account in seconds, without apps or seed phrases",
    href: "https://www.coinbase.com/wallet/smart-wallet/?utm_source=dotorg&utm_medium=builderkit",
    topLeft: <span className="font-mono">01</span>,
    topRight: <Icon name="diagonalUpArrow" width="16px" height="16px" />,
    classnames: "bg-orange-80 border-orange-80"
  },
  {
    title: "Gas Sponsorship",
    description: "Reduce costs and Sponsor Gas for your users, with the Coinbase Paymaster and Bundler",
    href: "https://www.coinbase.com/developer-platform/products/paymaster/?utm_source=dotorg&utm_medium=builderkit",
    topLeft: <span className="font-mono">02</span>,
    topRight: <Icon name="diagonalUpArrow" width="16px" height="16px" />,
    classnames: "bg-orange-60 border-orange-60"
  },
  {
    title: "Coinbase Onramp",
    description: "Fiat-to-crypto made fast, easy, and secure using Coinbase Onramp",
    href: "https://www.coinbase.com/developer-platform/products/onramp/?utm_source=dotorg&utm_medium=builderkit",
    topLeft: <span className="font-mono">03</span>,
    topRight: <Icon name="diagonalUpArrow" width="16px" height="16px" />,
    classnames: "bg-orange-80 border-orange-80"
  }
];

export default async function StartBuilding() {
  return (
    <div id={START_BUILDING_SECTION_ID}>
      <Title level={TitleLevel.Display2} className="mb-4">
        Start Building
      </Title>
      <h2 className={subtitleClasses}>Learn how to build a project</h2>
      <div className={gridClasses}>
        {resources.slice(0, 2).map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>
      <h2 className={subtitleClasses}>Save time building</h2>
      <div className={gridClasses}>
        {resources.slice(2, 4).map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>
      <h2 className={subtitleClasses}>Make your project easy to use</h2>
      <div className={gridClasses}>
        {resources.slice(4).map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>
      <div className="mt-6 flex">
        <Link href="https://www.coinbase.com/developer-platform/?utm_source=dotorg&utm_medium=builderkit">
          <div className="flex flex-row items-center justify-around gap-2 hover:scale-105">
            <span className={linkTextClasses}>View All Resources</span>
            <Icon name="chevronRight" width="16px" height="16px" color="currentColor" />
          </div>
        </Link>
      </div>
    </div>
  );
}
