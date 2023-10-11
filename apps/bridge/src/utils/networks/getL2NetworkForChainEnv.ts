import { Network } from 'apps/bridge/src/types/Network';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const l2ChainID = parseInt(publicRuntimeConfig.l2ChainID);

const CHAIN_ID_TO_NETWORK: Record<number, Network> = {
  8453: 'base',
  84531: 'base-goerli',
  84532: 'base-sepolia',
};

export function getL2NetworkForChainEnv() {
  return CHAIN_ID_TO_NETWORK[l2ChainID];
}
