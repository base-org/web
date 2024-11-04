'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccount, useChainId } from 'wagmi';
import { ManagedAddressesResponse } from '../../../types/ManagedAddresses';
import classNames from 'classnames';

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
    <ul className="space-y-4">
      {namesData.data.map((name) => (
        <li
          key={name.token_id}
          className={classNames('rounded-lg border p-4', {
            'border-blue-500 bg-blue-50': name.is_primary,
            'border-gray-200': !name.is_primary,
          })}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium">{name.domain}</p>
              <p className="text-gray-500 text-sm">Token ID: {name.token_id}</p>
            </div>
            {name.is_primary && (
              <span className="text-blue-700 rounded bg-blue-100 px-2 py-1 text-sm">Primary</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
