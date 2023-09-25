import { fetchIsAllowed } from 'apps/bridge/src/contexts/OFACContext';
import { useQuery } from 'react-query';

export function useIsPermittedToBridgeTo(address?: `0x${string}`) {
  const { data: isBridgeToAllowed, isLoading: isBridgeToAllowedLoading } = useQuery(
    ['isBridgeToAllowed', address],
    async () => fetchIsAllowed(address),
    {
      select: (r) => r.result,
    },
  );

  return !!isBridgeToAllowed && !isBridgeToAllowedLoading;
}
