import React from 'react';
import Layout from '@theme/Layout';
import Hero from '../components/Hero';
import PageSection from '../components/PageSection';
import ImageCard from '../components/ImageCard';
import TextCard from '../components/TextCard';
import FooterCategory from '../components/FooterCategory';

import styles from './styles.module.css';
import { ActionType, AnalyticsEventImportance, ComponentType } from 'base-ui/utils/logEvent';

const imageCards = [
  {
    src: '/img/home-intro-1.png',
    title: 'Tutorials',
    description: 'Elevate your coding skills on Base with guided development tutorials.',
    buttonText: 'Get started',
    buttonHref: '/tutorials',
    analyticsData: {
      name: 'tutorials',
      event: {
        action: ActionType.click,
        componentType: ComponentType.button,
        context: 'builder_essentials',
      },
      importance: AnalyticsEventImportance.high,
    },
  },
  {
    src: '/img/home-intro-2.png',
    title: 'Base Learn',
    description:
      'Become an onchain developer with our comprehensive smart contract development curriculum.',
    buttonText: 'Explore',
    buttonHref: '/base-learn/docs/welcome',
    analyticsData: {
      name: 'camp_bootcamp',
      event: {
        action: ActionType.click,
        componentType: ComponentType.button,
        context: 'builder_essentials',
      },
      importance: AnalyticsEventImportance.high,
    },
  },
  {
    src: '/img/home-intro-3.png',
    title: 'Base Grants',
    description:
      'Innovate and build on Base to qualify for grants that support impactful projects.',
    buttonText: 'Learn more',
    buttonHref: 'https://paragraph.xyz/@grants.base.eth/calling-based-builders',
    analyticsData: {
      name: 'ecosystem_grants',
      event: {
        action: ActionType.click,
        componentType: ComponentType.button,
        context: 'builder_essentials',
      },
      importance: AnalyticsEventImportance.high,
    },
  },
];

const textCards = [
  {
    title: 'Deploying a smart contract',
    description: 'Learn how to deploy a smart contract to Base.',
    href: '/tutorials/deploy-with-foundry',
    analyticsData: {
      name: 'deploy_a_smart_contract',
      event: {
        action: ActionType.click,
        componentType: ComponentType.link,
        context: 'expert_how_to',
      },
      importance: AnalyticsEventImportance.high,
    },
  },
  {
    title: 'Running a Base node',
    description: 'Learn how to set up and run your own local Base node.',
    href: '/tutorials/run-a-base-node',
    analyticsData: {
      name: 'run_a_node',
      event: {
        action: ActionType.click,
        componentType: ComponentType.link,
        context: 'expert_how_to',
      },
      importance: AnalyticsEventImportance.high,
    },
  },
  {
    title: 'Build an onchain app',
    description:
      'Learn how to create an NFT collection and build an NFT gallery application for viewing metadata.',
    href: '/tutorials/build-with-thirdweb',
    analyticsData: {
      name: 'build_onchain_apps',
      event: {
        action: ActionType.click,
        componentType: ComponentType.link,
        context: 'expert_how_to',
      },
      importance: AnalyticsEventImportance.high,
    },
  },
  {
    title: 'Access data using an Oracle',
    description:
      'Learn how to access price data within a smart contract using Chainlink price feeds.',
    href: '/tutorials/oracles-chainlink-price-feeds',
    analyticsData: {
      name: 'access_data_using_oracles',
      event: {
        action: ActionType.click,
        componentType: ComponentType.link,
        context: 'expert_how_to',
      },
      importance: AnalyticsEventImportance.high,
    },
  },
];

const footerCategories = [
  {
    title: 'Introduction',
    links: [
      {
        title: 'About Base',
        href: '/docs/',
        analyticsData: {
          name: 'intro_about_base',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Using Base',
        href: '/docs/using-base',
        analyticsData: {
          name: 'intro_using_base',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Network Information',
        href: '/docs/network-information',
        analyticsData: {
          name: 'intro_network_info',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Base Contracts',
        href: '/docs/base-contracts',
        analyticsData: {
          name: 'intro_base_contracts',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Fees',
        href: '/docs/fees',
        analyticsData: {
          name: 'intro_base_fees',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Differences between Ethereum and Base',
        href: '/docs/differences',
        analyticsData: {
          name: 'intro_differences_ethereum_base',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
    ],
  },
  {
    title: 'Tools',
    links: [
      {
        title: 'Onchain Registry',
        href: '/docs/tools/registry-api/',
        analyticsData: {
          name: 'tools_onchain_registry',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Node Providers',
        href: '/docs/tools/node-providers',
        analyticsData: {
          name: 'tools_node_providers',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Block Explorers',
        href: '/docs/tools/block-explorers',
        analyticsData: {
          name: 'tools_block_explorers',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Network Faucets',
        href: '/docs/tools/network-faucets',
        analyticsData: {
          name: 'tools_network_faucets',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Oracles',
        href: '/docs/tools/oracles',
        analyticsData: {
          name: 'tools_oracles',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Data Indexers',
        href: '/docs/tools/data-indexers',
        analyticsData: {
          name: 'tools_data_indexers',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Cross-chain',
        href: '/docs/tools/cross-chain',
        analyticsData: {
          name: 'tools_cross_chain',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Account Abstraction',
        href: '/docs/tools/account-abstraction',
        analyticsData: {
          name: 'tools_account_abstraction',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        title: 'Bridge',
        href: 'https://bridge.base.org',
        analyticsData: {
          name: 'resources_bridge',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Token List',
        href: '/docs/tokens/list',
        analyticsData: {
          name: 'resources_token_list',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Contracts',
        href: '/docs/contracts',
        analyticsData: {
          name: 'resources_contracts',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Bug Bounty',
        href: 'https://hackerone.com/coinbase',
        analyticsData: {
          name: 'resources_bug_bounty',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Status',
        href: 'https://status.base.org',
        analyticsData: {
          name: 'resources_status',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
      {
        title: 'Brand Kit',
        href: 'https://github.com/base-org/brand-kit',
        analyticsData: {
          name: 'resources_brand_kit',
          event: {
            action: ActionType.click,
            componentType: ComponentType.link,
            context: 'explore_documentation',
          },
          importance: AnalyticsEventImportance.high,
        },
      },
    ],
  },
];

export default function Home() {
  return (
    <Layout title="Base Docs" description="Documentation for building with Base">
      <Hero />
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
                analyticsData={card.analyticsData}
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
                analyticsData={card.analyticsData}
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
