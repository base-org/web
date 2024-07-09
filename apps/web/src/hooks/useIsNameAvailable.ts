import abi from 'apps/web/src/abis/RegistrarControllerABI';
import { USERNAME_REGISTRAR_CONTROLLER_ADDRESS } from 'apps/web/src/addresses/usernames';
import { normalizeEnsDomainName, validateEnsDomainName } from 'apps/web/src/utils/usernames';
import { useMemo } from 'react';
import { base, baseSepolia } from 'viem/chains';
import { useChainId, useReadContract } from 'wagmi';

export function useIsNameAvailable(name: string) {
  const normalizedName = normalizeEnsDomainName(name);
  const chainId = useChainId();
  const network = chainId === baseSepolia.id ? chainId : base.id;
  const { valid } = validateEnsDomainName(name);
  const readContractArgs = useMemo(
    () => ({
      abi,
      address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[network],
      functionName: 'available' as const,
      args: [normalizedName] as const,
      chainId: network,
      query: {
        enabled: valid,
      },
    }),
    [network, normalizedName, valid],
  );

  return useReadContract(readContractArgs);
}
