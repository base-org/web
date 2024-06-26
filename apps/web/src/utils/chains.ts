import { base, baseSepolia } from 'viem/chains';

export function isSupportedChain(
  chainId: number,
): chainId is typeof base.id | typeof baseSepolia.id {
  // @ts-expect-error we know chainId might not be one of these IDs
  return [base.id, baseSepolia.id].includes(chainId);
}
