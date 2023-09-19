import { useOFACStatus } from 'apps/bridge/src/contexts/OFACContext';
import { useTOSStatus } from 'apps/bridge/src/contexts/TOSContext';
import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';

export function useIsPermittedToBridge() {
  const { isTosAccepted } = useTOSStatus();
  const { isOFACAllowed, isOFACAllowedLoading } = useOFACStatus();
  const chainEnv = useChainEnv();
  const isMainnet = chainEnv === 'mainnet';
  const isPermittedToBridge =
    (isMainnet && isTosAccepted && isOFACAllowed && !isOFACAllowedLoading) || !isMainnet;

  return isPermittedToBridge;
}
