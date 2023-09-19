import { useNetwork } from 'wagmi';

export function useIsConnectedToCorrectNetwork(chainId: number): boolean {
  const { chain: currentChain } = useNetwork();
  return currentChain?.id === chainId;
}
