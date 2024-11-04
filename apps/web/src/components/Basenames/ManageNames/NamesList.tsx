'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccount, useChainId } from 'wagmi';
import { ManagedAddressesResponse } from '../../../types/ManagedAddresses';
import classNames from 'classnames';

const transitionClasses = 'transition-all duration-700 ease-in-out';
const pillNameClasses = classNames(
  'bg-blue-500 mx-auto text-white relative leading-[2em] overflow-hidden text-ellipsis max-w-full',
  'shadow-[0px_8px_16px_0px_rgba(0,82,255,0.32),inset_0px_8px_16px_0px_rgba(255,255,255,0.25)]',
  transitionClasses,
  'rounded-[2rem] py-8 px-10 pt-40 w-full',
);

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
        <li key={name.token_id} className={pillNameClasses}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-medium">{name.domain}</p>
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
