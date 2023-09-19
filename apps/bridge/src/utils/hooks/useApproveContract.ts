import { utils } from 'ethers';
import getConfig from 'next/config';
import { Address, erc20ABI, usePrepareContractWrite } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type UseApproveContractProps = {
  contractAddress?: Address;
  approveAmount: string;
  decimals: number;
};

export function useApproveContract({
  contractAddress,
  approveAmount,
  decimals,
}: UseApproveContractProps) {
  const approveAmountBN =
    approveAmount === '' || Number.isNaN(Number(approveAmount))
      ? utils.parseUnits('0', decimals)
      : utils.parseUnits(approveAmount, decimals);
  const { config: depositConfig } = usePrepareContractWrite({
    address: contractAddress,
    // TODO: Replace with dynamic abi importer
    abi: erc20ABI,
    functionName: 'approve',
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
    // TODO: Add Allowance selection components
    args: [publicRuntimeConfig.l1BridgeProxyAddress, approveAmountBN],
    cacheTime: 0,
  });
  return depositConfig;
}
