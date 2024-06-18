import React from 'react';
import Layout from '@theme/Layout';
import PageSection from '../components/PageSection';
import ImageCard from '../components/ImageCard';
import TextCard from '../components/TextCard';
import FooterCategory from '../components/FooterCategory';

import styles from './styles.module.css';

const imageCards = [
  {
    src: '/img/home-intro-1.png',
    title: 'Tutorials',
    description: 'Elevate your coding skills on Base with guided development tutorials.',
    buttonText: 'Get started',
    buttonHref: '/tutorials',
  },
  {
    src: '/img/home-intro-2.png',
    title: 'Base Camp',
    description:
      'Become an onchain developer with our comprehensive smart contract development curriculum.',
    buttonText: 'Explore',
    buttonHref: '/base-camp/docs/welcome',
  },
  {
    src: '/img/home-intro-3.png',
    title: 'Base Grants',
    description:
      'Innovate and build on Base to qualify for grants that support impactful projects.',
    buttonText: 'Learn more',
    buttonHref: 'https://paragraph.xyz/@grants.base.eth/calling-based-builders',
  },
];

const textCards = [
  {
    title: 'Deploying a smart contract',
    description: 'Learn how to deploy a smart contract to Base.',
    href: '/tutorials/deploy-with-foundry',
  },
  {
    title: 'Running a Base node',
    description: 'Learn how to set up and run your own local Base node.',
    href: '/tutorials/run-a-base-node',
  },
  {
    title: 'Build an onchain app',
    description:
      'Learn how to create an NFT collection and build an NFT gallery application for viewing metadata.',
    href: '/tutorials/build-with-thirdweb',
  },
  {
    title: 'Access data using an Oracle',
    description:
      'Learn how to access price data within a smart contract using Chainlink price feeds.',
    href: '/tutorials/oracles-chainlink-price-feeds',
  },
];

const footerCategories = [
  {
    title: 'Introduction',
    links: [
      {
        title: 'About Base',
        href: '/docs/',
      },
      {
        title: 'Using Base',
        href: '/docs/using-base',
      },
      {
        title: 'Network Information',
        href: '/docs/network-information',
      },
      {
        title: 'Base Contracts',
        href: '/docs/base-contracts',
      },
      {
        title: 'Fees',
        href: '/docs/fees',
      },
      {
        title: 'Differences between Ethereum and Base',
        href: '/docs/differences',
      },
      {
        title: 'Bridge FAQ',
        href: '/docs/tools/bridge-faq',
      },
    ],
  },
  {
    title: 'Tools',
    links: [
      {
        title: 'Node Providers',
        href: '/docs/tools/node-providers',
      },
      {
        title: 'Block Explorers',
        href: '/docs/tools/block-explorers',
      },
      {
        title: 'Network Faucets',
        href: '/docs/tools/network-faucets',
      },
      {
        title: 'Oracles',
        href: '/docs/tools/oracles',
      },
      {
        title: 'Data Indexers',
        href: '/docs/tools/data-indexers',
      },
      {
        title: 'Cross-chain',
        href: '/docs/tools/cross-chain',
      },
      {
        title: 'Account Abstraction',
        href: '/docs/tools/account-abstraction',
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        title: 'Bridge',
        href: 'https://bridge.base.org',
      },
      {
        title: 'Token List',
        href: '/docs/tokens/list',
      },
      {
        title: 'Contracts',
        href: '/docs/contracts',
      },
      {
        title: 'Bug Bounty',
        href: 'https://hackerone.com/coinbase',
      },
      {
        title: 'Status',
        href: 'https://status.base.org',
      },
      {
        title: 'Brand Kit',
        href: 'https://github.com/base-org/brand-kit',
      },
    ],
  },
];

export default function Home() {
  return (
    <Layout title="Base Docs" description="Documentation for building with Base">
      <header className={styles.heroContainer}>
        <div className="layout-container">
          <div className={styles.heroTextContainer}>
            <h1 className={styles.heroText}>EVERYTHING YOU NEED TO BUILD ONCHAIN</h1>
          </div>
        </div>
      </header>
      <main className={styles.homepageMain}>
        <PageSection title="Intro" description="Base builder essentials">
          <div className={styles.introSection}>
            {imageCards.map((card) => (
              <ImageCard
                src={card.src}
                title={card.title}
                key={card.title}
                description={card.description}
                buttonText={card.buttonText}
                buttonHref={card.buttonHref}
              />
            ))}
          </div>
        </PageSection>
        <PageSection title="Tutorials" description="Expert how-tos">
          <div className={styles.tutorialsSection}>
            {textCards.map((card) => (
              <TextCard
                title={card.title}
                key={card.title}
                description={card.description}
                href={card.href}
              />
            ))}
          </div>
        </PageSection>
        <PageSection title="Docs" description="Explore the documentation">
          <div className={styles.footerSection}>
            {footerCategories.map((category) => (
              <FooterCategory title={category.title} key={category.title} links={category.links} />
            ))}
          </div>
        </PageSection>
      </main>
    </Layout>
  );
}
