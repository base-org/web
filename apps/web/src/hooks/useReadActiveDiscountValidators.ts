import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI.json';
import { USERNAME_REGISTRAR_CONTROLLER_ADDRESS } from 'apps/web/src/addresses/usernames';
import { useMemo } from 'react';
import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { useAccount, useReadContract } from 'wagmi';

export type DiscountValidator = {
  active: boolean; // whether the discount is active or not.
  discountValidator: Address; // address of the associated validator
  key: `0x${string}`; // unique key that identifies this discount
  discount: bigint; // discount value denominated in wei
};

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

  const { data, isLoading } = useReadContract(activeDiscountsArgs);

  return { data: data as DiscountValidator[] | null, isLoading };
}
