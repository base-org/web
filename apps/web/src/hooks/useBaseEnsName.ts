import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { Address } from 'viem';
import { useReadContract } from 'wagmi';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { BaseName, convertReverseNodeToBytes } from 'apps/web/src/utils/usernames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';

export type UseBaseEnsNameProps = {
  address?: Address;
};

// In-house version of wagmi's "useEnsName"
export type BaseEnsNameData = BaseName | undefined;

export default function useBaseEnsName({ address }: UseBaseEnsNameProps) {
  const { basenameChain } = useBasenameChain();
  const addressReverseNode = convertReverseNodeToBytes({
    address,
    chainId: basenameChain.id,
  });

  const { data, isLoading, refetch } = useReadContract({
    abi: L2ResolverAbi,
    address: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id],
    functionName: 'name',

    // @ts-expect-error query is disabled if addressReverseNode is undefined
    args: [addressReverseNode],
    chainId: basenameChain.id,
    query: {
      enabled: !!addressReverseNode && !!address,
    },
  });

  const ensNameTyped = data as BaseEnsNameData;

  return {
    data: ensNameTyped,
    isLoading,
    refetch,
  };
}
