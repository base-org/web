module.exports = {
  developers: [
    ['why-base'],
    ['overview'],
    ['using-base'],
    {
      type: 'category',
      label: 'Notices',
      collapsible: false,
      collapsed: false,
      items: ['notices/decomissioning-public-geth-archive-snapshots'],
    },
    {
      type: 'category',
      label: 'Building on Base',
      collapsible: false,
      collapsed: false,
      items: [
        'building-with-base/quickstart',
        'building-with-base/network-information',
        'building-with-base/base-contracts',
        'building-with-base/fees',
        'building-with-base/differences',
        {
          type: 'link',
          label: 'Decentralizing Base with Optimism',
          href: 'https://base.mirror.xyz/H_KPwV31M7OJT-THUnU7wYjOF16Sy7aWvaEr5cgHi8I',
        },
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      collapsible: false,
      collapsed: false,
      items: ['troubleshooting/node-operator-troubleshooting'],
    },
    {
      type: 'category',
      label: 'Tools',
      collapsible: false,
      collapsed: false,
      items: [
        'tools/registry-api',
        'tools/node-providers',
        'tools/block-explorers',
        'tools/network-faucets',
        'tools/oracles',
        'tools/data-indexers',
        'tools/cross-chain',
        'tools/account-abstraction',
        'tools/onramps',
        'tools/onboarding',
        'tools/bridges-mainnet',
        {
          type: 'category',
          label: 'Onchain Registry',
          collapsible: true,
          collapsed: true,
          items: ['tools/registry-api', 'tools/registry-faq'],
        },
        {
          type: 'category',
          label: 'Basenames',
          collapsible: true,
          collapsed: true,
          items: [
            'tools/basenames-faq',
            'tools/basenames-tutorial',
            'tools/basenames-onchainkit-tutorial',
          ],
        },
        {
          type: 'category',
          label: 'Toolchains',
          collapsible: true,
          collapsed: true,
          items: ['tools/foundry', 'tools/hardhat', 'tools/thirdweb-cli'],
        },
        {
          type: 'category',
          label: 'Clients',
          collapsible: true,
          collapsed: true,
          items: ['tools/ethers', 'tools/thirdweb-sdk', 'tools/viem', 'tools/web3'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tokens',
      collapsible: false,
      collapsed: false,
      items: ['tokens/token-list', 'tokens/wallet'],
    },
    ['contracts'],
    {
      type: 'category',
      label: 'Security',
      collapsible: false,
      collapsed: false,
      items: ['security/bounty', 'security/report', 'security/app-blocklist'],
    },
    {
      type: 'link',
      label: 'Metrics',
      href: 'https://base.org/stats',
    },
    {
      type: 'link',
      label: 'Status',
      href: 'https://status.base.org',
    },
    {
      type: 'link',
      label: 'Brand Kit',
      href: 'https://github.com/base-org/brand-kit',
    },
    ['terms-of-service'],
    ['privacy-policy'],
    ['cookie-policy'],
  ],
};
