import { Asset } from 'apps/bridge/src/types/Asset';
import { parseUnits } from 'viem';
import getConfig from 'next/config';
import { Address, usePrepareContractWrite } from 'wagmi';
import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts';

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
    abi: l2StandardBridgeABI,
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
