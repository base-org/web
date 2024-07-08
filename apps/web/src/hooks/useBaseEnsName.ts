import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { useMemo } from 'react';
import { Address } from 'viem';
import { useReadContract } from 'wagmi';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { convertReverseNodeToBytes } from 'apps/web/src/utils/usernames';

export type UseBaseEnsNameProps = {
  address: Address;
  chainId: number; // TODO: Might not be needed for launch (mainnet only)
};

// In-house version of wagmi's "useEnsName"
export function useBaseEnsName({ address, chainId }: UseBaseEnsNameProps) {
  const addressReverseNode = convertReverseNodeToBytes(address);

  const readContractArgs = useMemo(
    () => ({
      abi: L2ResolverAbi,
      address: USERNAME_L2_RESOLVER_ADDRESSES[chainId],
      functionName: 'name',
      args: [addressReverseNode],
      chainId: chainId,
    }),
    [addressReverseNode, chainId],
  );

  return useReadContract(readContractArgs);
}
