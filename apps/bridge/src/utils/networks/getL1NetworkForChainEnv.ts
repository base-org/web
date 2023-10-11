import { Network } from 'apps/bridge/src/types/Network';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const l1ChainID = parseInt(publicRuntimeConfig.l1ChainID);

const CHAIN_ID_TO_NETWORK: Record<number, Network> = {
  1: 'homestead',
  5: 'goerli',
  11155111: 'sepolia',
};

export function getL1NetworkForChainEnv() {
  return CHAIN_ID_TO_NETWORK[l1ChainID];
}
