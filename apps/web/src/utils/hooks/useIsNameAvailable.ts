import abi from 'apps/web/src/abis/RegistrarControllerABI.json';
import { formatNameForEns } from 'apps/web/src/utils/usernames';
import { normalize } from 'viem/ens';
import { useReadContract } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

export function useIsNameAvailable(name: string) {
  const formattedName = formatNameForEns(name);
  const normalizedName = normalize(formattedName);

  return useReadContract({
    abi,
    address: '0xc8b5d24753588fc7ed134df8870f9d5544a3836e',
    functionName: 'available',
    args: [normalizedName],
    chainId: baseSepolia.id,
  });
}
