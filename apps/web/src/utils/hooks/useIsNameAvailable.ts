import abi from 'apps/web/src/abis/RegistrarControllerABI.json';
import { USERNAME_REGISTRAR_CONTROLLER_ADDRESS } from 'apps/web/src/addresses/usernames';
import { normalizeEnsDomainName } from 'apps/web/src/utils/usernames';
import { useChainId, useReadContract } from 'wagmi';

export function useIsNameAvailable(name: string) {
  const normalizedName = normalizeEnsDomainName(name);
  const chainId = useChainId();

  return useReadContract({
    abi,
    address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[chainId],
    functionName: 'available',
    args: [normalizedName],
    chainId,
  });
}
