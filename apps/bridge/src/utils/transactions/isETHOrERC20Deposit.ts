import { decodeFunctionData } from 'viem';
import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import getConfig from 'next/config';
import TokenMessenger from 'apps/bridge/src/contract-abis/TokenMessenger';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';

const assetList = getAssetListForChainEnv();

const { publicRuntimeConfig } = getConfig();

const CCTP_DEPOSIT_ADDRESS = (
  publicRuntimeConfig?.l1CCTPTokenMessengerAddress ?? '0xd0c3da58f55358142b8d3e06c1c30c5c6114efe8'
).toLowerCase();

export function isETHOrERC20Deposit(tx: BlockExplorerTransaction) {
  // CCTP deposit
  if (tx.to === CCTP_DEPOSIT_ADDRESS && publicRuntimeConfig.cctpEnabled === 'true') {
    const { functionName } = decodeFunctionData({
      abi: TokenMessenger,
      data: tx.input,
    });
    if (functionName === 'depositForBurn') {
      return true;
    }
  }

  return false;
}
