import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

type ChainEnv = 'mainnet' | 'testnet';

export function useChainEnv(): ChainEnv {
  return publicRuntimeConfig.l1ChainID === '1' ? 'mainnet' : 'testnet';
}
