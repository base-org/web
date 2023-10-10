import getConfig from 'next/config';
import { Address, erc20ABI, useContractRead } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type UseIsContractApprovedProps = {
  contactAddress?: `0x${string}`;
  address?: `0x${string}`;
  spender: `0x${string}`;
  bridgeDirection: 'deposit' | 'withdraw';
};

export function useIsContractApproved({
  contactAddress,
  address,
  spender,
  bridgeDirection,
}: UseIsContractApprovedProps) {
  return useContractRead({
    address: contactAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    watch: true,
    chainId:
      bridgeDirection === 'deposit'
        ? parseInt(publicRuntimeConfig.l1ChainID)
        : parseInt(publicRuntimeConfig.l2ChainID),
    args: [address as Address, spender],
  });
}
