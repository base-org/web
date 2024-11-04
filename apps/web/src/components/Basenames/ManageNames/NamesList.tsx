'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccount, useChainId } from 'wagmi';
import { ManagedAddressesResponse } from 'apps/web/src/types/ManagedAddresses';
import NameDisplay from './NameDisplay';

export default function NamesList() {
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

  if (isLoading) {
    return <div>Loading names...</div>;
  }

  if (!namesData?.data?.length) {
    return <div>No names found</div>;
  }

  return (
    <ul className="mx-auto max-w-2xl space-y-4 p-8">
      {namesData.data.map((name) => (
        <NameDisplay
          key={name.token_id}
          domain={name.domain}
          isPrimary={name.is_primary}
          tokenId={name.token_id}
          expiresAt={name.expires_at}
        />
      ))}
    </ul>
  );
}
