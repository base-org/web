import L1StandartBridge from 'apps/bridge/src/contract-abis/L1StandardBridge';
import { Asset } from 'apps/bridge/src/types/Asset';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import getConfig from 'next/config';
import { Address, usePrepareContractWrite } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type UsePrepareERC20DepositProps = {
  asset: Asset;
  depositAmount: string;
  readApprovalResult?: boolean;
  isPermittedToBridge: boolean;
  includeTosVersionByte: boolean;
};

export function usePrepareERC20Deposit({
  asset,
  depositAmount,
  isPermittedToBridge,
  includeTosVersionByte,
}: UsePrepareERC20DepositProps) {
  const { config: depositConfig } = usePrepareContractWrite({
    address:
      isPermittedToBridge && depositAmount !== ''
        ? publicRuntimeConfig.l1BridgeProxyAddress
        : undefined,
    abi: L1StandartBridge,
    functionName: 'depositERC20',
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
    args: [
      asset.L1contract as Address,
      asset.L2contract as Address,
      depositAmount !== ''
        ? parseUnits(depositAmount, asset.decimals)
        : parseUnits('0', asset.decimals),
      100000,
      includeTosVersionByte ? publicRuntimeConfig.tosVersion : '0x',
    ],
    cacheTime: 0,
    staleTime: 1,
    overrides: { gasLimit: BigNumber.from(300000) },
  });
  return depositConfig;
}
