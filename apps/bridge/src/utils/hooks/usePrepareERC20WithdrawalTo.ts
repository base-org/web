import L2StandardBridge from '@eth-optimism/contracts-bedrock/artifacts/contracts/L2/L2StandardBridge.sol/L2StandardBridge.json';
import { Asset } from 'apps/bridge/src/types/Asset';
import { parseUnits } from 'ethers/lib/utils.js';
import getConfig from 'next/config';
import { Address, usePrepareContractWrite } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type UsePrepareERC20WithdrawalTo = {
  asset: Asset;
  to: `0x${string}`;
  withdrawAmount: string;
  isPermittedToBridge: boolean;
  includeTosVersionByte: boolean;
};

export function usePrepareERC20WithdrawalTo({
  asset,
  to,
  withdrawAmount,
  isPermittedToBridge,
  includeTosVersionByte,
}: UsePrepareERC20WithdrawalTo) {
  const { config } = usePrepareContractWrite({
    address: isPermittedToBridge ? publicRuntimeConfig.L2StandardBridge : undefined,
    abi: L2StandardBridge.abi,
    functionName: 'withdrawTo',
    chainId: parseInt(publicRuntimeConfig.l2ChainID),
    args: [
      asset.L2contract as Address,
      to,
      parseUnits(withdrawAmount === '' ? '0' : withdrawAmount, asset.decimals),
      100000,
      includeTosVersionByte ? publicRuntimeConfig.tosVersion : '0x',
    ],
  });
  return config;
}