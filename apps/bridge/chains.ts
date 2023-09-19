import { Chain } from 'wagmi/chains';

export default [
  {
    id: 1,
    name: 'Ethereum',
    network: 'homestead',
    summary: {
      location: 'Ethereum',
      svg: '/icons/eth.svg',
    },
    svg: '/icons/eth.svg',
    description: 'Ethereum',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://cloudflare-eth.com'],
      },
    },
    blockExplorers: {
      etherscan: {
        name: 'Etherscan',
        url: 'https://etherscan.io',
      },
      default: {
        name: 'Etherscan',
        url: 'https://etherscan.io',
      },
    },
    contracts: {
      ensRegistry: {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 14353601,
      },
    },
  },
  {
    id: 8453,
    name: 'Base',
    network: 'base',
    summary: {
      location: 'Base',
      svg: '/icons/eth-summary.svg',
    },
    svg: '/icons/base.svg',
    description: 'Mainnet',
    iconUrl:
      'https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: ['https://mainnet.base.org'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Basescan',
        url: 'https://basescan.org',
      },
    },
    testnet: false,
  },
  {
    id: 84531,
    name: 'Base Goerli',
    network: 'base-goerli',
    summary: {
      location: 'Base Goerli',
      svg: '/icons/eth-summary.svg',
    },
    svg: '/icons/base.svg',
    description: 'Testnet',
    iconUrl:
      'https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg',
    nativeCurrency: {
      decimals: 18,
      name: 'Base Goerli Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: ['https://goerli.base.org'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Basescan',
        url: 'https://goerli.basescan.org',
      },
    },
    testnet: true,
  },
  {
    id: 5,
    network: 'goerli',
    name: 'Goerli',
    summary: {
      location: 'Goerli',
      svg: '/icons/eth.svg',
    },
    svg: '/icons/eth.svg',
    description: 'Ethereum',
    nativeCurrency: {
      name: 'Goerli Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      alchemy: {
        http: ['https://eth-goerli.g.alchemy.com/v2'],
        webSocket: ['wss://eth-goerli.g.alchemy.com/v2'],
      },
      infura: {
        http: ['https://goerli.infura.io/v3'],
        webSocket: ['wss://goerli.infura.io/ws/v3'],
      },
      default: {
        http: ['https://rpc.ankr.com/eth_goerli'],
      },
    },
    blockExplorers: {
      etherscan: {
        name: 'Etherscan',
        url: 'https://goerli.etherscan.io',
      },
      default: {
        name: 'Etherscan',
        url: 'https://goerli.etherscan.io',
      },
    },
    contracts: {
      ensRegistry: {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      },
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 6507670,
      },
    },
    testnet: true,
  },
] as unknown as Chain[];
