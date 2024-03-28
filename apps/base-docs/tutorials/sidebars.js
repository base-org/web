const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Deploying a Smart Contract',
      collapsible: true,
      collapsed: true,
      items: [
        'docs/deploy-smart-contracts',
        'docs/deploy-with-foundry',
        'docs/deploy-with-remix',
        'docs/deploy-with-tenderly',
        'docs/deploy-with-thirdweb',
      ],
    },
    {
      type: 'category',
      label: 'Building an App Onchain',
      collapsible: true,
      collapsed: true,
      items: ['docs/build-with-thirdweb'],
    },
    'docs/run-a-base-node',
    {
      type: 'category',
      label: 'Accessing real-world data using Oracles',
      collapsible: true,
      collapsed: true,
      items: [
        'docs/using-chainlink-price-feeds',
        'docs/using-pyth-price-feeds',
        'docs/using-supra-vrf',
      ],
    },
    {
      type: 'category',
      label: 'Sending data and tokens across chains',
      collapsible: true,
      collapsed: true,
      items: ['docs/cross-chain-with-ccip', 'docs/cross-chain-with-layerzero'],
    },
    {
      type: 'category',
      label: 'Account abstraction',
      collapsible: true,
      collapsed: true,
      items: [
        'docs/account-abstraction-with-biconomy',
        'docs/account-abstraction-with-privy-and-base-paymaster',
      ],
    },
    {
      type: 'category',
      label: 'Introduction to Foundry',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'docs/intro-to-foundry-setup',
        },
        {
          type: 'doc',
          id: 'docs/intro-to-foundry-testing',
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
          id: 'docs/complex-onchain-nfts',
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
          id: 'docs/linked-minting-frame',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/nft-minting-frame',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/deploy-frame-on-vercel',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/advanced-frame-behavior',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/hyperframes',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/frame-transactions',
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
          id: 'docs/hardhat-tools-and-testing/overview',
          className: 'sidebar-reading',
        },
        {
          type: 'category',
          label: 'Profiling Size',
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-tools-and-testing/hardhat-profiling-size/contract-sizer-setup-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-tools-and-testing/hardhat-profiling-size/manual-contract-optimizations-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-tools-and-testing/hardhat-profiling-size/using-the-optimizer-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-tools-and-testing/hardhat-profiling-size/hardhat-profiling-size',
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
              id: 'docs/hardhat-tools-and-testing/hardhat-profiling-gas/installing-the-gas-analyzer-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-tools-and-testing/hardhat-profiling-gas/improving-gas-usage-vid',
              className: 'sidebar-video',
            },
            {
              type: 'doc',
              id: 'docs/hardhat-tools-and-testing/hardhat-profiling-gas/hardhat-profiling-gas',
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
              id: 'docs/hardhat-tools-and-testing/hardhat-debugging/debugging-with-hardhat-sbs',
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
              id: 'docs/hardhat-tools-and-testing/hardhat-test-coverage/hardhat-test-coverage-sbs',
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
          id: 'docs/intro-to-providers',
        },
      ],
    },
  ],
};

module.exports = sidebars;
