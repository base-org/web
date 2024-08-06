import Link from 'apps/web/node_modules/next/link';

import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { Icon } from '../Icon/Icon';

export default async function WorldclassResources() {
  return (
    <div
      id="worldClassTools"
      className="mb-6 mt-6 flex w-full max-w-[1440px] flex-col px-12 sm:mb-8 sm:mt-8 sm:px-16 lg:mb-10 lg:mt-10 lg:px-24"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <div className="lg:w-1/2">
          <h2 className="mb-4 flex flex-row font-display text-3xl sm:text-4xl lg:mb-0 lg:text-6xl">
            <span>4.</span>
            <span className="ml-4">World-class tools to help you build and grow your project</span>
          </h2>
        </div>
        <div className="lg:w-1/2">
          <span className="text-base sm:text-lg">
            {`Access top-tier resources to simplify development, enhance your users' experience, and
            accelerate your project's growth.`}
          </span>
          <div>
            <ButtonWithLinkAndEventLogging
              href="https://docs.base.org/docs"
              eventName="worldclass_resources_start_building"
              target="_blank"
              rel="noreferrer noopener"
              linkClassNames="inline-block"
              buttonClassNames="mt-6 lg:mt-8 uppercase font-mono font-medium w-full sm:w-auto"
            >
              Start Building
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-row flex-wrap justify-center gap-4 sm:mt-12 sm:gap-6 lg:mt-16 lg:gap-8">
        {resources?.map((resource, index) => (
          <ResourceCard
            key={resource.title}
            counter={index}
            title={resource.title}
            description={resource.description}
            href={resource.href}
          />
        ))}
      </div>
    </div>
  );
}

async function ResourceCard({ counter, title, description, href }: ResourceCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="w-full sm:w-[calc(50%-12px)] lg:w-[330px]"
    >
      <div className="flex h-[180px] w-full flex-col gap-6 bg-gray-90 p-4 sm:h-[230px] sm:gap-8 sm:p-6 lg:h-[180px]">
        <div className="flex justify-between">
          <span>{String(counter + 1).padStart(2, '0')}</span>
          <Icon name="external-link" />
        </div>
        <div>
          <h3 className="mb-2 font-mono text-lg uppercase sm:text-xl">{title}</h3>
          <span className="font-sans text-sm sm:text-base">{description}</span>
        </div>
      </div>
    </Link>
  );
}

const resources: Resource[] = [
  {
    title: 'Smart Wallet',
    description: 'Help users create an account in seconds without apps or extensions',
    href: 'https://www.coinbase.com/wallet/smart-wallet',
  },
  {
    title: 'OnchainKit',
    description: 'React components and Typescript utilities to help you build onchain',
    href: 'https://onchainkit.xyz/',
  },
  {
    title: 'Coinbase OnRamp',
    description: 'Widget enabling users to purchase 100+ tokens with 60+ fiat currencies.',
    href: 'https://portal.cdp.coinbase.com/products/onramp',
  },
  {
    title: 'Gas Credits',
    description: 'Sponsor gas for your users using the Coinbase Paymaster',
    href: 'https://docs.cdp.coinbase.com/node/docs/paymaster-bundler-api/',
  },
  {
    title: 'Onchain Verifications',
    description: 'View all of the base transactions through Basescan',
    href: 'https://www.coinbase.com/onchain-verify',
  },
  {
    title: 'Onchain Data',
    description: 'API for wallet balances, balance history, and transaction history',
    href: 'https://portal.cdp.coinbase.com/products/onchain-data',
  },
];

type Resource = {
  title: string;
  description: string;
  href: string;
};

// TODO See if you can refactor so that ResourceCardProps always shows all of the properties
type ResourceCardProps = Resource & {
  counter: number;
};
