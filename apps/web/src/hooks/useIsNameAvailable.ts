import abi from 'apps/web/src/abis/RegistrarControllerABI';
import { USERNAME_REGISTRAR_CONTROLLER_ADDRESS } from 'apps/web/src/addresses/usernames';
import { normalizeEnsDomainName, validateEnsDomainName } from 'apps/web/src/utils/usernames';
import { useMemo } from 'react';
import { base, baseSepolia } from 'viem/chains';
import { useChainId, useReadContract, useReadContracts } from 'wagmi';

export function useIsNameAvailable(name: string) {
  const normalizedName = normalizeEnsDomainName(name);
  const chainId = useChainId();
  const network = chainId === baseSepolia.id ? chainId : base.id;
  const { valid } = validateEnsDomainName(name);

  return useReadContract({
    abi,
    address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[network],
    functionName: 'available',
    args: [normalizedName],
    chainId: network,
    query: {
      enabled: valid,
    },
  });
}

export function useAreNamesAvailable(names: string[]) {
  const chainId = useChainId();
  const network = chainId === baseSepolia.id ? chainId : base.id;
  const contracts = useMemo(
    () =>
      names.map((name) => ({
        address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[network],
        abi,
        functionName: 'available',
        args: [name],
        chainId: network,
      })),
    [names, network],
  );

  return useReadContracts({ contracts });
}
