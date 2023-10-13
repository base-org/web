import L2ToL1MessagePasser from 'apps/bridge/src/contract-abis/L2ToL1MessagePasser';
import { parseUnits, parseEther } from 'viem';
import getConfig from 'next/config';
import { Address, usePrepareContractWrite } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type UsePrepareETHWithdrawalProps = {
  userAddress?: `0x${string}`;
  withdrawAmount: string;
  isPermittedToBridge: boolean;
  includeTosVersionByte: boolean;
};

export function usePrepareETHWithdrawal({
  userAddress,
  withdrawAmount,
  isPermittedToBridge,
  includeTosVersionByte,
}: UsePrepareETHWithdrawalProps) {
  const { config: withdrawConfig } = usePrepareContractWrite({
    address: isPermittedToBridge ? publicRuntimeConfig.l2L1MessagePasserAddress : undefined,
    abi: L2ToL1MessagePasser,
    functionName: 'initiateWithdrawal',
    chainId: parseInt(publicRuntimeConfig.l2ChainID),
    args: [
      userAddress as Address,
      parseUnits('1', 5),
      includeTosVersionByte ? publicRuntimeConfig.tosVersion : '0x',
    ],
    value: parseEther(withdrawAmount === '' ? '0' : withdrawAmount),
  });

  return withdrawConfig;
}
