import abi from 'apps/web/src/abis/RegistrarControllerABI.json';
import {
  USERNAME_SEPOLIA_REGISTRAR_CONTROLLER_ADDRESS,
  normalizeEnsDomainName,
} from 'apps/web/src/utils/usernames';
import { useReadContract } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

export function useIsNameAvailable(name: string) {
  const normalizedName = normalizeEnsDomainName(name);

  return useReadContract({
    abi,
    address: USERNAME_SEPOLIA_REGISTRAR_CONTROLLER_ADDRESS,
    functionName: 'available',
    args: [normalizedName],
    chainId: baseSepolia.id,
  });
}
