import abi from 'apps/web/src/abis/RegistrarControllerABI';
import {
  USERNAME_CHAIN_ID,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
} from 'apps/web/src/addresses/usernames';
import { normalizeEnsDomainName, validateEnsDomainName } from 'apps/web/src/utils/usernames';
import { useMemo } from 'react';
import { useReadContract } from 'wagmi';

export function useIsNameAvailable(name: string) {
  const normalizedName = normalizeEnsDomainName(name);
  const { valid } = validateEnsDomainName(name);
  const readContractArgs = useMemo(
    () => ({
      abi,
      address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
      functionName: 'available' as const,
      args: [normalizedName] as const,
      chainId: USERNAME_CHAIN_ID,
      query: {
        enabled: valid,
      },
    }),
    [normalizedName, valid],
  );

  return useReadContract(readContractArgs);
}
