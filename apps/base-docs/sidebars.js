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
                'building-with-base/guides/deploy-with-foundry',
                'building-with-base/guides/deploy-with-remix',
                'building-with-base/guides/deploy-with-tenderly',
                'building-with-base/guides/deploy-with-thirdweb',
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
              label: 'Accessing real-world data using Oracles',
              collapsible: true,
              collapsed: true,
              items: [
                'building-with-base/guides/using-chainlink-price-feeds',
                'building-with-base/guides/using-pyth-price-feeds',
                'building-with-base/guides/using-supra-vrf',
              ],
            },
            {
              type: 'category',
              label: 'Sending data and tokens across chains',
              collapsible: true,
              collapsed: true,
              items: [
                'building-with-base/guides/cross-chain-with-ccip',
                'building-with-base/guides/cross-chain-with-layerzero',
              ],
            },
            {
              type: 'category',
              label: 'Account abstraction',
              collapsible: true,
              collapsed: true,
              items: [
                'building-with-base/guides/account-abstraction-with-biconomy',
                'building-with-base/guides/account-abstraction-with-particle-network',     
              ],
            },
            {
              type: 'category',
              label: 'Building with Foundry',
              collapsible: true,
              collapsed: true,
              items: [
                {
                  type: 'doc',
                  id: 'building-with-base/guides/building-with-base-and-foundry/introduction',
                  className: 'sidebar-coding',
                },
                {
                  type: 'doc',
                  id: 'building-with-base/guides/building-with-base-and-foundry/testing',
                  className: 'sidebar-coding',
                },
              ],
            },
            {
              type: 'category',
              label: 'Advanced NFT Development',
              collapsible: true,
              collapsed: true,
              items: [
                {
                  type: 'doc',
                  id: 'building-with-base/guides/complex-onchain-nfts',
                  className: 'sidebar-coding',
                },
              ],
            },
            {
              type: 'category',
              label: 'Farcaster Frames',
              collapsible: true,
              collapsed: true,
              items: [
                {
                  type: 'doc',
                  id: 'building-with-base/guides/nft-minting-frame',
                  className: 'sidebar-coding',
                },
                {
                  type: 'doc',
                  id: 'building-with-base/guides/deploy-frame-on-vercel',
                  className: 'sidebar-coding',
                },
              ],
            },
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
            {
              type: 'category',
              label: 'Privy and the Base Paymaster',
              collapsible: true,
              collapsed: true,
              items: [
                {
                  type: 'doc',
                  id: 'building-with-base/guides/account-abstraction/overview',
                  className: 'sidebar-reading',
                },
                {
                  type: 'doc',
                  id: 'building-with-base/guides/account-abstraction/intro-to-account-abstraction',
                  className: 'sidebar-reading',
                },
                {
                  type: 'doc',
                  id: 'building-with-base/guides/account-abstraction/intro-to-privy',
                  className: 'sidebar-coding',
                },
                {
                  type: 'doc',
                  id: 'building-with-base/guides/account-abstraction/implementing-the-paymaster',
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
        'tools/account-abstraction',
        'tools/nft-checkout',
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
    {
      type: 'category',
      label: 'Tokens',
      collapsible: false,
      collapsed: false,
      items: ['tokens/token-list', 'tokens/wallet'],
    },
    ['contracts'],
    ['security'],
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
