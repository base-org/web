import getConfig from 'next/config';
import { Address, erc20ABI, useContractRead } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type UseIsContractApprovedProps = {
  contactAddress?: `0x${string}`;
  address?: `0x${string}`;
};

export function useIsContractApproved({ contactAddress, address }: UseIsContractApprovedProps) {
  return useContractRead({
    address: contactAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    watch: true,
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
    args: [address as Address, publicRuntimeConfig.l1BridgeProxyAddress],
  });
}
