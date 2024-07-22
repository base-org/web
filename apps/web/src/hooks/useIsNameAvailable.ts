import abi from 'apps/web/src/abis/RegistrarControllerABI';
import {
  USERNAME_CHAIN_ID,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
} from 'apps/web/src/addresses/usernames';
import { normalizeEnsDomainName, validateEnsDomainName } from 'apps/web/src/utils/usernames';
import { useMemo } from 'react';
import { useReadContract, useReadContracts } from 'wagmi';

export function useIsNameAvailable(name: string) {
  const normalizedName = normalizeEnsDomainName(name);
  const { valid } = validateEnsDomainName(name);

  return useReadContract({
    abi,
    address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
    functionName: 'available' as const,
    args: [normalizedName] as const,
    chainId: USERNAME_CHAIN_ID,
    query: {
      enabled: valid,
    },
  });
}

export function useAreNamesAvailable(names: string[]) {
  const contracts = useMemo(
    () =>
      names.map((name) => ({
        address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
        abi,
        functionName: 'available',
        args: [name],
        chainId: USERNAME_CHAIN_ID,
      })),
    [names],
  );

  return useReadContracts({ contracts });
}
