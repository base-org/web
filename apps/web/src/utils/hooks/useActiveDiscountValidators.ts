import { USERNAME_REGISTRAR_CONTROLLER_ADDRESS } from 'apps/web/src/addresses/usernames';
import { useMemo } from 'react';
import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI.json';
import { useAccount, useReadContract } from 'wagmi';
import { base, baseSepolia } from 'viem/chains';

export function useActiveDiscountValidators() {
  const { chainId } = useAccount();
  const network = chainId === baseSepolia.id ? chainId : base.id;

  const activeDiscountsArgs = useMemo(
    () => ({
      address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[network],
      abi: RegistrarControllerABI,
      functionName: 'getActiveDiscounts',
      chainId: network,
    }),
    [network],
  );
  return useReadContract(activeDiscountsArgs);
}
