import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI';
import {
  USERNAME_CHAIN_ID,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
} from 'apps/web/src/addresses/usernames';
import { useMemo } from 'react';
import { Address } from 'viem';
import { useReadContract } from 'wagmi';

export type DiscountValidator = {
  active: boolean; // whether the discount is active or not.
  discountValidator: Address; // address of the associated validator
  key: `0x${string}`; // unique key that identifies this discount
  discount: bigint; // discount value denominated in wei
};

export function useActiveDiscountValidators() {
  const activeDiscountsArgs = useMemo(
    () => ({
      address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
      abi: RegistrarControllerABI,
      functionName: 'getActiveDiscounts' as const,
      chainId: USERNAME_CHAIN_ID,
    }),
    [],
  );

  const { data, isLoading } = useReadContract(activeDiscountsArgs);

  return { data: data as DiscountValidator[] | null, isLoading };
}
