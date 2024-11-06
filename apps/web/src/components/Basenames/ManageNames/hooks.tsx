import { useCallback } from 'react';
import { useErrors } from 'apps/web/contexts/Errors';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAccount, useChainId } from 'wagmi';
import { ManagedAddressesResponse } from 'apps/web/src/types/ManagedAddresses';
import useSetPrimaryBasename from 'apps/web/src/hooks/useSetPrimaryBasename';
import { BaseName } from '@coinbase/onchainkit/identity';

export function useNameList() {
  const { address } = useAccount();
  const chainId = useChainId();

  const network = chainId === 8453 ? 'base-mainnet' : 'base-sepolia';

  const { data: namesData, isLoading } = useQuery<ManagedAddressesResponse>({
    queryKey: ['usernames', address, network],
    queryFn: async (): Promise<ManagedAddressesResponse> => {
      const response = await fetch(
        `/api/basenames/getUsernames?address=${address}&network=${network}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch usernames');
      }
      return response.json() as Promise<ManagedAddressesResponse>;
    },
    enabled: !!address,
  });

  return { namesData, isLoading };
}

export function useRemoveNameFromUI(domain: BaseName) {
  const { address } = useAccount();
  const chainId = useChainId();

  const network = chainId === 8453 ? 'base-mainnet' : 'base-sepolia';
  const queryClient = useQueryClient();

  const removeNameFromUI = useCallback(() => {
    queryClient.setQueryData(
      ['usernames', address, network],
      (prevData: ManagedAddressesResponse) => {
        return { ...prevData, data: prevData.data.filter((name) => name.domain !== domain) };
      },
    );
  }, [address, domain, network, queryClient]);

  return { removeNameFromUI };
}

export function useUpdatePrimaryName(domain: BaseName) {
  const { address } = useAccount();
  const chainId = useChainId();
  const { logError } = useErrors();

  const queryClient = useQueryClient();

  const network = chainId === 8453 ? 'base-mainnet' : 'base-sepolia';

  // Hook to update primary name
  const { setPrimaryName } = useSetPrimaryBasename({
    secondaryUsername: domain,
  }) as { setPrimaryName: () => Promise<void> };

  const setPrimaryUsername = useCallback(() => {
    setPrimaryName()
      .then(() => {
        queryClient.setQueryData(
          ['usernames', address, network],
          (prevData: ManagedAddressesResponse) => {
            return {
              ...prevData,
              data: prevData.data.map((name) =>
                name.domain === domain
                  ? { ...name, is_primary: true }
                  : name.is_primary
                  ? { ...name, is_primary: false }
                  : name,
              ),
            };
          },
        );
      })
      .catch((error) => {
        logError(error, 'Failed to update primary name');
      });
  }, [address, domain, logError, network, queryClient, setPrimaryName]);

  return { setPrimaryUsername };
}
