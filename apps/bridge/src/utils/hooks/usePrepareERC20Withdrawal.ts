import L2StandardBridge from '@eth-optimism/contracts-bedrock/artifacts/contracts/L2/L2StandardBridge.sol/L2StandardBridge.json';
import { Asset } from 'apps/bridge/src/types/Asset';
import { parseUnits } from 'ethers/lib/utils.js';
import getConfig from 'next/config';
import { Address, usePrepareContractWrite } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type UsePrepareERC20Withdrawal = {
  asset: Asset;
  withdrawAmount: string;
  isPermittedToBridge: boolean;
  includeTosVersionByte: boolean;
};

export function usePrepareERC20Withdrawal({
  asset,
  withdrawAmount,
  isPermittedToBridge,
  includeTosVersionByte,
}: UsePrepareERC20Withdrawal) {
  const { config } = usePrepareContractWrite({
    address: isPermittedToBridge ? publicRuntimeConfig.L2StandardBridge : undefined,
    abi: L2StandardBridge.abi,
    functionName: 'withdraw',
    chainId: parseInt(publicRuntimeConfig.l2ChainID),
    args: [
      asset.L2contract as Address,
      parseUnits(withdrawAmount === '' ? '0' : withdrawAmount, asset.decimals),
      100000,
      includeTosVersionByte ? publicRuntimeConfig.tosVersion : '0x',
    ],
  });
  return config;
}
