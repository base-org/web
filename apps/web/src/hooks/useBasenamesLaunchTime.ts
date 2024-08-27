import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { REGISTER_CONTRACT_ABI, REGISTER_CONTRACT_ADDRESSES } from 'apps/web/src/utils/usernames';
import { useReadContract } from 'wagmi';

export function useBasenamesLaunchTime() {
  const { basenameChain } = useBasenameChain();
  return useReadContract({
    address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
    abi: REGISTER_CONTRACT_ABI,
    functionName: 'launchTime' as const,
    chainId: basenameChain.id,
  });
}
