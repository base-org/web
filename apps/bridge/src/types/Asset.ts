import { Address } from 'wagmi';
import { Chain } from 'wagmi/chains';

// OP --> Optimism bridge
// CCTP --> Circle Cross-Chain Transfer Protocol (eg USDC)
export type BridgeProtocol = 'OP' | 'CCTP';

export type Asset = {
  L1symbol: string;
  L2symbol: string;
  apiId: string;
  L1icon: string;
  L2icon: string;
  L1chainId: number;
  L2chainId: number;
  L1contract?: Address;
  L2contract?: Address;
  decimals: number;
  protocol: BridgeProtocol;
};

export type CustomChain = Chain & {
  svg: string;
  title: string;
  iconUrl: string;
  description: string;
  summary: {
    location: string;
    svg: string;
  };
};
