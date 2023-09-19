import OptimismPortal from 'apps/bridge/src/contract-abis/OptimismPortal';
import { BigNumber } from 'ethers';
import { parseEther, parseUnits } from 'ethers/lib/utils.js';
import getConfig from 'next/config';
import { Address, usePrepareContractWrite } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type UsePrepareETHDepositProps = {
  userAddress?: `0x${string}`;
  depositAmount: string;
  isPermittedToBridge: boolean;
  includeTosVersionByte: boolean;
};

export function usePrepareETHDeposit({
  userAddress,
  depositAmount,
  isPermittedToBridge,
  includeTosVersionByte,
}: UsePrepareETHDepositProps) {
  const { config: depositConfig } = usePrepareContractWrite({
    address: isPermittedToBridge ? publicRuntimeConfig.l1OptimismPortalProxyAddress : undefined,
    abi: OptimismPortal,
    functionName: 'depositTransaction',
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
    args: [
      userAddress as Address,
      parseEther(depositAmount === '' ? '0' : depositAmount),
      parseUnits('1', 5),
      false,
      includeTosVersionByte ? publicRuntimeConfig.tosVersion : '0x',
    ],
    overrides: {
      value: parseEther(depositAmount === '' ? '0' : depositAmount),
      gasLimit: BigNumber.from(200000),
    },
  });

  return depositConfig;
}
