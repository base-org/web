import abi from 'apps/web/src/abis/RegistrarControllerABI.json';
import { USERNAME_SEPOLIA_CONTRACT_ADDRESS, formatNameForEns } from 'apps/web/src/utils/usernames';
import { normalize } from 'viem/ens';
import { useReadContract } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

export function useIsNameAvailable(name: string) {
  const formattedName = formatNameForEns(name);
  const normalizedName = normalize(formattedName);

  return useReadContract({
    abi,
    address: USERNAME_SEPOLIA_CONTRACT_ADDRESS,
    functionName: 'available',
    args: [normalizedName],
    chainId: baseSepolia.id,
  });
}
