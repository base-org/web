import { Address } from 'wagmi';
import { Chain } from 'wagmi/chains';

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
