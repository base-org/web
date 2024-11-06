import { Address, isAddress } from 'viem';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { Basename, GetNameReturnType, useName } from '@coinbase/onchainkit/identity';
import { UseQueryResult } from '@tanstack/react-query';

export type UseBaseEnsNameProps = {
  address?: Address;
};

export type BaseEnsNameData = Basename | undefined;

// Wrapper around onchainkit's useName
export default function useBaseEnsName({ address }: UseBaseEnsNameProps) {
  const { basenameChain } = useBasenameChain();

  const { data, isLoading, refetch, isFetching } = useName(
    {
      // @ts-expect-error: query is disabled without an address
      address: address,
      chain: basenameChain,
    },
    {
      enabled: !!address && isAddress(address),
    },
  ) as UseQueryResult<GetNameReturnType, Error>;

  const ensNameTyped = data ? (data as Basename) : undefined;

  return {
    data: ensNameTyped,
    isLoading,
    isFetching,
    refetch,
  };
}
