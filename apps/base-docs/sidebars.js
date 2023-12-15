module.exports = {
  developers: [
    ['overview'],
    ['using-base'],
    {
      type: 'category',
      label: 'Building on Base',
      collapsible: false,
      collapsed: false,
      items: [
        'building-with-base/network-information',
        'building-with-base/base-contracts',
        'building-with-base/fees',
        'building-with-base/differences',
        {
          type: 'link',
          label: 'Decentralizing Base with Optimism',
          href: 'https://base.mirror.xyz/H_KPwV31M7OJT-THUnU7wYjOF16Sy7aWvaEr5cgHi8I',
        },
        {
          type: 'category',
          label: 'Guides',
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Deploying a Smart Contract',
              collapsible: true,
              collapsed: true,
              items: [
                'building-with-base/guides/deploy-smart-contracts',
                'building-with-base/guides/deploy-with-remix',
                'building-with-base/guides/deploy-with-tenderly',
                'building-with-base/guides/deploy-with-thirdweb',
                'building-with-base/guides/build-with-cookbook',
              ],
            },
            {
              type: 'category',
              label: 'Building an App Onchain',
              collapsible: true,
              collapsed: true,
              items: ['building-with-base/guides/build-with-thirdweb'],
            },
            'building-with-base/guides/run-a-base-node',
            {
              type: 'category',
              label: 'Hardhat Tools and Testing',
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'hardhat-tools-and-testing/overview',
                  className: 'sidebar-reading',
                },
                {
                  type: 'category',
                  label: 'Profiling Size',
                  items: [
                    {
                      type: 'doc',
                      id: 'hardhat-tools-and-testing/hardhat-profiling-size/contract-sizer-setup-vid',
                      className: 'sidebar-video',
                    },
                    {
                      type: 'doc',
                      id: 'hardhat-tools-and-testing/hardhat-profiling-size/manual-contract-optimizations-vid',
                      className: 'sidebar-video',
                    },
                    {
                      type: 'doc',
                      id: 'hardhat-tools-and-testing/hardhat-profiling-size/using-the-optimizer-vid',
                      className: 'sidebar-video',
                    },
                    {
                      type: 'doc',
                      id: 'hardhat-tools-and-testing/hardhat-profiling-size/hardhat-profiling-size',
                      className: 'sidebar-coding',
                    },
                  ],
                },
                {
                  type: 'category',
                  label: 'Profiling Gas',
                  collapsible: true,
                  items: [
                    {
                      type: 'doc',
                      id: 'hardhat-tools-and-testing/hardhat-profiling-gas/installing-the-gas-analyzer-vid',
                      className: 'sidebar-video',
                    },
                    {
                      type: 'doc',
                      id: 'hardhat-tools-and-testing/hardhat-profiling-gas/improving-gas-usage-vid',
                      className: 'sidebar-video',
                    },
                    {
                      type: 'doc',
                      id: 'hardhat-tools-and-testing/hardhat-profiling-gas/hardhat-profiling-gas',
                      className: 'sidebar-coding',
                    },
                  ],
                },
                {
                  type: 'category',
                  label: 'Debugging',
                  collapsible: true,
                  items: [
                    {
                      type: 'doc',
                      id: 'hardhat-tools-and-testing/hardhat-debugging/debugging-with-hardhat-sbs',
                      className: 'sidebar-code',
                    },
                  ],
                },
                {
                  type: 'category',
                  label: 'Test Coverage',
                  collapsible: true,
                  items: [
                    {
                      type: 'doc',
                      id: 'hardhat-tools-and-testing/hardhat-test-coverage/hardhat-test-coverage-sbs',
                      className: 'sidebar-code',
                    },
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Connecting to the Blockchain',
              collapsible: true,
              items: [
                {
                  type: 'doc',
                  id: 'connecting-to-the-blockchain/overview',
                  className: 'sidebar-reading',
                },
                {
                  type: 'doc',
                  id: 'connecting-to-the-blockchain/blockchain-providers',
                  className: 'sidebar-reading',
                },
                {
                  type: 'doc',
                  id: 'connecting-to-the-blockchain/connecting-with-a-provider',
                  className: 'sidebar-coding',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      collapsible: false,
      collapsed: false,
      items: [
        'tools/node-providers',
        'tools/block-explorers',
        'tools/network-faucets',
        'tools/oracles',
        'tools/data-indexers',
        'tools/cross-chain',
        'tools/onramps',
        'tools/onboarding',
        {
          type: 'category',
          label: 'Bridges',
          collapsible: true,
          collapsed: true,
          items: ['tools/bridges-mainnet', 'tools/bridges-testnet', 'tools/bridge-faq'],
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
    ['contracts'],
    ['tokens'],
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
  ],
};
