const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Deploying a Smart Contract',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'docs/deploy-with-hardhat',
          label: 'Deploy with Hardhat',
        },
        {
          type: 'doc',
          id: 'docs/deploy-with-foundry',
          label: 'Deploy with Foundry',
        },
        {
          type: 'doc',
          id: 'docs/deploy-with-remix',
          label: 'Deploy with Remix',
        },
        {
          type: 'doc',
          id: 'docs/deploy-with-tenderly',
          label: 'Deploy with Tenderly',
        },
        {
          type: 'doc',
          id: 'docs/deploy-with-thirdweb',
          label: 'Deploy with Thirdweb',
        },
      ],
    },
    {
      type: 'category',
      label: 'Building an Onchain App',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'docs/build-with-thirdweb',
          label: 'Build with Thirdweb',
        },
      ],
    },
    {
      type: 'doc',
      id: 'docs/run-a-base-node',
      label: 'Run a Base Node',
    },
    {
      type: 'category',
      label: 'Accessing Real-World Data Using Oracles',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'docs/oracles-chainlink-price-feeds',
          label: 'Chainlink Price Feeds',
        },
        {
          type: 'doc',
          id: 'docs/oracles-pyth-price-feeds',
          label: 'Pyth Price Feeds',
        },
        {
          type: 'doc',
          id: 'docs/oracles-supra-vrf',
          label: 'Supra VRF',
        },
      ],
    },
    {
      type: 'category',
      label: 'Sending Data and Tokens Across Chains',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'docs/cross-chain-with-ccip',
          label: 'Cross-Chain with CCIP',
        },
        {
          type: 'doc',
          id: 'docs/cross-chain-with-layerzero',
          label: 'Cross-Chain with LayerZero',
        },
      ],
    },
    {
      type: 'category',
      label: 'Account Abstraction',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'docs/account-abstraction-with-biconomy',
          label: 'Account Abstraction with Biconomy',
        },
        {
          type: 'doc',
          id: 'docs/account-abstraction-with-privy-and-base-paymaster',
          label: 'Account Abstraction with Privy and Base Paymaster',
        },
        {
          type: 'doc',
          id: 'docs/account-abstraction-with-particle-network',
          label: 'Account Abstraction with Particle Network',
        },
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
          label: 'Intro to Foundry Setup',
        },
        {
          type: 'doc',
          id: 'docs/intro-to-foundry-testing',
          label: 'Intro to Foundry Testing',
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
          id: 'docs/onchain-nfts',
          label: 'Onchain NFTs',
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
          id: 'docs/farcaster-frames-nocode-minting',
          label: 'No-Code Minting',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-nft-minting',
          label: 'NFT Minting',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-deploy-to-vercel',
          label: 'Deploy to Vercel',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-gating-and-redirects',
          label: 'Gating and Redirects',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-hyperframes',
          label: 'Hyperframes',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-transactions',
          label: 'Transactions',
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
          type: 'category',
          label: 'Profiling Size',
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-profiling-size',
              label: 'Profiling Size',
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
              id: 'docs/hardhat-profiling-gas',
              label: 'Profiling Gas',
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
              id: 'docs/hardhat-debugging',
              label: 'Debugging',
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
              id: 'docs/hardhat-test-coverage',
              label: 'Test Coverage',
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
          label: 'Intro to Providers',
        },
      ],
    },
  ],
};

module.exports = sidebars;
