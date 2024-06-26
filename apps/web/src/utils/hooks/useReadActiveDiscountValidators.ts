import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI.json';
import { USERNAME_REGISTRAR_CONTROLLER_ADDRESS } from 'apps/web/src/addresses/usernames';
import { useMemo } from 'react';
import { Abi, Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { useAccount, useReadContract } from 'wagmi';

export type DiscountValidator = {
  active: boolean;
  discountValidator: Address;
  key: string;
  discount: number;
};

export function useActiveDiscountValidators() {
  const { chainId } = useAccount();
  const network = chainId === baseSepolia.id ? chainId : base.id;

  const activeDiscountsArgs = useMemo(
    () => ({
      address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[network],
      abi: RegistrarControllerABI as Abi,
      functionName: 'getActiveDiscounts' as const,
      chainId: network,
    }),
    [network],
  );

  return useReadContract(activeDiscountsArgs);
}
