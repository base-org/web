import { USERNAME_CHAIN_ID, USERNAME_L2_RESOLVER_ADDRESS } from 'apps/web/src/addresses/usernames';
import { Address } from 'viem';
import { useReadContract } from 'wagmi';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { BaseSepoliaName, convertReverseNodeToBytes } from 'apps/web/src/utils/usernames';

export type UseBaseEnsNameProps = {
  address?: Address;
};

// In-house version of wagmi's "useEnsName"
export type BaseEnsNameData = BaseSepoliaName | undefined;

export default function useBaseEnsName({ address }: UseBaseEnsNameProps) {
  const addressReverseNode = convertReverseNodeToBytes(address);

  // TODO: Fix TS error
  const { data, isLoading, refetch } = useReadContract({
    abi: L2ResolverAbi,
    address: USERNAME_L2_RESOLVER_ADDRESS,
    functionName: 'name',

    // @ts-expect-error query is disabled if addressReverseNode is undefined
    args: [addressReverseNode],
    chainId: USERNAME_CHAIN_ID,
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
