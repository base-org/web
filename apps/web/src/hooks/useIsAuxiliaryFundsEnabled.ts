import { useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useCapabilities } from 'wagmi/experimental';

export function useIsAuxiliaryFundsEnabled(): boolean {
  const { chainId } = useAccount();
  const { data } = useCapabilities();

  return useMemo(() => {
    if (!data || !chainId) return false;

    return !!data[chainId]?.auxiliaryFunds?.supported;
  }, [chainId, data]);
}
