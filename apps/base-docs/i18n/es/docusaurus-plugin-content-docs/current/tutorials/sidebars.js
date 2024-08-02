const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Desplegando un contrato inteligente',
      collapsible: true,
      collapsed: true,
      items: [
        'docs/deploy-with-hardhat',
        'docs/deploy-with-foundry',
        'docs/deploy-with-remix',
        'docs/deploy-with-tenderly',
        'docs/deploy-with-thirdweb',
      ],
    },
    {
      type: 'category',
      label: 'Construyendo una app onchain',
      collapsible: true,
      collapsed: true,
      items: ['docs/build-with-thirdweb'],
    },
    'docs/run-a-base-node',
    {
      type: 'category',
      label: 'Accediendo a datos del mundo real usando Oráculos',
      collapsible: true,
      collapsed: true,
      items: [
        'docs/oracles-chainlink-price-feeds',
        'docs/oracles-pyth-price-feeds',
        'docs/oracles-supra-vrf',
      ],
    },
    {
      type: 'category',
      label: 'Enviando datos y tokens a través de cadenas',
      collapsible: true,
      collapsed: true,
      items: ['docs/cross-chain-with-ccip', 'docs/cross-chain-with-layerzero'],
    },
    {
      type: 'category',
      label: 'Abstracción de cuenta',
      collapsible: true,
      collapsed: true,
      items: [
        'docs/account-abstraction-with-biconomy',
        'docs/account-abstraction-with-privy-and-base-paymaster',
        'docs/account-abstraction-with-particle-network',
      ],
    },
    {
      type: 'category',
      label: 'Introducción a Foundry',
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
      label: 'Desarrollo avanzado de NFT',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'docs/onchain-nfts',
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
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-nft-minting',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-deploy-to-vercel',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-gating-and-redirects',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-hyperframes',
          className: 'sidebar-coding',
        },
        {
          type: 'doc',
          id: 'docs/farcaster-frames-transactions',
          className: 'sidebar-coding',
        },
      ],
    },
    {
      type: 'category',
      label: 'Herramientas y Pruebas de Hardhat',
      collapsible: true,
      items: [
        {
          type: 'category',
          label: 'Perfilado de Tamaño',
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-profiling-size',
              className: 'sidebar-coding',
            },
          ],
        },
        {
          type: 'category',
          label: 'Perfilado de Gas',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-profiling-gas',
              className: 'sidebar-coding',
            },
          ],
        },
        {
          type: 'category',
          label: 'Depuración',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-debugging',
              className: 'sidebar-code',
            },
          ],
        },
        {
          type: 'category',
          label: 'Cobertura de Pruebas',
          collapsible: true,
          items: [
            {
              type: 'doc',
              id: 'docs/hardhat-test-coverage',
              className: 'sidebar-code',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Conectando con la Blockchain',
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
