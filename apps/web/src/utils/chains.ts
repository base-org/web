import { base, baseSepolia, Chain } from 'viem/chains';

export function isSupportedChain(chainId: number) {
  if (chainId === base.id) {
    return true;
  }
  if (chainId === baseSepolia.id) {
    return true;
  }
  return false;
}
