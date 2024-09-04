import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { BASEFRIENDS_ADDRESSES } from 'apps/web/src/addresses/friends';
import { BASEFRIENDS_ABI } from 'apps/web/src/utils/friends';

import { useReadContract } from 'wagmi';
import { namehash } from 'viem';

export function useReadFollowers(name: string) {
  const { basenameChain } = useBasenameChain();
  const nameAsNode = namehash(name);
  return useReadContract({
    address: BASEFRIENDS_ADDRESSES[basenameChain.id],
    abi: BASEFRIENDS_ABI,
    functionName: 'getFollowers',
    args: [nameAsNode],
    chainId: basenameChain.id,
  });
}
