import abi from 'apps/web/src/abis/RegistrarControllerABI';
import { USERNAME_REGISTRAR_CONTROLLER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { normalizeEnsDomainName, validateEnsDomainName } from 'apps/web/src/utils/usernames';
import { useMemo } from 'react';
import { useReadContract, useReadContracts } from 'wagmi';

export function useIsNameAvailable(name: string) {
  const normalizedName = normalizeEnsDomainName(name);
  const { valid } = validateEnsDomainName(name);
  const { basenameChain } = useBasenameChain();

  return useReadContract({
    abi,
    address: USERNAME_REGISTRAR_CONTROLLER_ADDRESSES[basenameChain.id],
    functionName: 'available' as const,
    args: [normalizedName] as const,
    chainId: basenameChain.id,
    query: {
      enabled: valid,
    },
  });
}

export function useAreNamesAvailable(names: string[]) {
  const { basenameChain } = useBasenameChain();
  const contracts = useMemo(
    () =>
      names.map((name) => ({
        address: USERNAME_REGISTRAR_CONTROLLER_ADDRESSES[basenameChain.id],
        abi,
        functionName: 'available',
        args: [name],
        chainId: basenameChain.id,
      })),
    [basenameChain.id, names],
  );

  return useReadContracts({ contracts });
}
