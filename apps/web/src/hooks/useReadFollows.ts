import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { BASEFRIENDS_ADDRESSES } from 'apps/web/src/addresses/friends';
import { BASEFRIENDS_ABI } from 'apps/web/src/utils/friends';

import { useReadContract } from 'wagmi';
import { namehash, toBytes, toHex } from 'viem';

// // Function to convert namehash to bytes32 binary string
// const namehashToBytes32 = (name: string): `0x${string}` => {
//   const hash = namehash(name);
//   // return toBytes(hash, { size: 32 });
//   return toHex(hash, { size: 32 });
// };

export function useReadFollows(name: string) {
  const { basenameChain } = useBasenameChain();
  const nameAsNode = namehash(name);
  console.log({ nameAsNode, name, bestfriend: namehash('bestfriend.basetest.eth') });
  return useReadContract({
    address: BASEFRIENDS_ADDRESSES[basenameChain.id],
    abi: BASEFRIENDS_ABI,
    functionName: 'getFollows',
    args: [nameAsNode],
    chainId: basenameChain.id,
  });
}
