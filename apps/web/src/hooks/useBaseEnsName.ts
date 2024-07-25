import { Address } from 'viem';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { BaseName, GetNameReturnType, useName } from '@coinbase/onchainkit/identity';
import { UseQueryResult } from '@tanstack/react-query';

export type UseBaseEnsNameProps = {
  address?: Address;
};

export type BaseEnsNameData = BaseName | undefined;

// Wrapper around onchainkit's useName
export default function useBaseEnsName({ address }: UseBaseEnsNameProps) {
  const { basenameChain } = useBasenameChain();

  const { data, isLoading, refetch } = useName(
    {
      // @ts-expect-error: query is disabled without an address
      address: address,
      chain: basenameChain,
    },
    {
      enabled: !!address,
    },
  ) as UseQueryResult<GetNameReturnType, Error>;

  const ensNameTyped = data as BaseName;

  return {
    data: ensNameTyped,
    isLoading,
    refetch,
  };
}
