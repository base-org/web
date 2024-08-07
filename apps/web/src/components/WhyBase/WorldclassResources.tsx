import Link from 'apps/web/node_modules/next/link';
import { ButtonWithLinkAndEventLogging } from '../Button/ButtonWithLinkAndEventLogging';
import { Icon } from '../Icon/Icon';

type Resource = {
  title: string;
  description: string;
  href: string;
};

type ResourceCardProps = Resource & {
  counter: number;
};

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

export const WORLDCLASS_RESOURCES_SECTION_ID = 'worldClassTools';

export default async function WorldclassResources() {
  return (
    <div
      id={WORLDCLASS_RESOURCES_SECTION_ID}
      className="mb-6 mt-6 flex w-full max-w-[1440px] flex-col px-12 sm:mb-8 sm:mt-8 sm:px-16 lg:mb-10 lg:mt-10 lg:px-24"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <div className="mb-4 flex flex-row">
          <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-base font-bold text-black sm:h-7 sm:w-7 sm:text-xl lg:mr-4 lg:mt-2 lg:h-8 lg:w-8 lg:text-2xl">
            4
          </span>
          <div className="ml-4 max-w-[750px]">
            <h2 className="text-3xl sm:text-4xl lg:mb-0 lg:text-6xl">
              World-class tools to help you build and grow your project
            </h2>
            <p className="my-2 text-base sm:text-lg lg:my-4 xl:my-6">
              {`Access top-tier resources to simplify development, enhance your users' experience, and
                accelerate your project's growth.`}
            </p>
            <div>
              <ButtonWithLinkAndEventLogging
                href="https://docs.base.org/docs"
                eventName="worldclass_resources_start_building"
                target="_blank"
                rel="noreferrer noopener"
                linkClassNames="inline-block"
                buttonClassNames="uppercase font-mono font-medium mt-4"
              >
                Start Building
              </ButtonWithLinkAndEventLogging>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-row flex-wrap gap-4 sm:mt-12 sm:gap-6 lg:mt-16 lg:gap-8">
        {resources.map((resource, index) => (
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
