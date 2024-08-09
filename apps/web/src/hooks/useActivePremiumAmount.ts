import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { REGISTER_CONTRACT_ABI, REGISTER_CONTRACT_ADDRESSES } from 'apps/web/src/utils/usernames';
import { useMemo } from 'react';
import { useReadContract } from 'wagmi';

export function useActiveEthPremiumAmount() {
  return useReadContract();
}

const THIRTY_SIX_HOURS_IN_SECONDS = 36 * 60 * 60;
export function usePremiumSecondsRemaining(): null | number {
  const { basenameChain } = useBasenameChain();

  const activeDiscountsArgs = useMemo(
    () => ({
      address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
      abi: REGISTER_CONTRACT_ABI,
      functionName: 'launchTime' as const,
      chainId: basenameChain.id,
    }),
    [basenameChain.id],
  );
  const {} = useReadContract(activeDiscountsArgs);
  return null;
}
