import abi from 'apps/web/src/abis/RegistrarControllerABI.json';
import { normalize } from 'viem/ens';
import { useReadContract } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

export function useIsNameAvailable(name: string) {
  // TODO: This break if user types a dot
  const normalizedName = normalize(name);

  return useReadContract({
    abi,
    address: '0xc8b5d24753588fc7ed134df8870f9d5544a3836e',
    functionName: 'available',
    args: [normalizedName],
    chainId: baseSepolia.id,
  });
}
