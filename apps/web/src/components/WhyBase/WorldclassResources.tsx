'use client';

import React from 'react';
import Link from 'apps/web/node_modules/next/link';

import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

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

export default function WorldclassResources() {
  return (
    <div id="worldClassTools" className="flex flex-col bg-black px-20 pb-10 pt-10">
      <div className="flex flex-row">
        <h2 className="flex font-display text-5xl">
          <span>4.</span>
          <span className="ml-4">World-class tools to help you build and grow your project</span>
        </h2>
        <div>
          <span>
            {`Access top-tier resources to simplify development, enhance your users' experience, and
            accelerate your project's growth.`}
          </span>
          <div>
            <Link
              href="https://docs.base.org/docs"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-block"
              //   onClick={createHandleClick('l2beat')}
            >
              <Button className="mt-8 uppercase">Start Building</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-row flex-wrap justify-center gap-8">
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

function ResourceCard({ counter, title, description, href }: ResourceCardProps) {
  return (
    <Link href={href} target="_blank" rel="noreferrer noopener">
      <div className="flex h-[180px] w-[330px] flex-col gap-8 bg-gray-90 p-6">
        <div className="flex justify-between">
          <span>{String(counter + 1).padStart(2, '0')}</span>
          <Icon name="external-link" />
        </div>
        <div>
          <h3 className="font-mono text-xl uppercase">{title}</h3>
          <span className="font-sans">{description}</span>
        </div>
      </div>
    </Link>
  );
}

type Resource = {
  title: string;
  description: string;
  href: string;
};

// TODO See if you can refactor so that ResourceCardProps always shows all of the properties
type ResourceCardProps = Resource & {
  counter: number;
};
