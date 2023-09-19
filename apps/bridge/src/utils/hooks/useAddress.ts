import { useSafeClientValue } from 'apps/bridge/src/utils/hooks/useSafeClientValue';
import { useAccount } from 'wagmi';

export function useAddress() {
  const { address } = useAccount();
  return useSafeClientValue(address);
}
