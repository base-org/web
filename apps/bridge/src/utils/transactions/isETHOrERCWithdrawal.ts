import TokenMessenger from 'apps/bridge/src/contract-abis/TokenMessenger';
import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import getConfig from 'next/config';
import { decodeFunctionData } from 'viem';

const assetList = getAssetListForChainEnv();

const { publicRuntimeConfig } = getConfig();

const CCTP_WITHDRAWAL_ADDRESS = (
  publicRuntimeConfig?.l2CCTPTokenMessengerAddress ?? '0x877b8e8c9e2383077809787ED6F279ce01CB4cc8'
).toLowerCase();

export function isETHOrERC20Withdrawal(tx: BlockExplorerTransaction) {
  // CCTP deposit
  if (tx.to === CCTP_WITHDRAWAL_ADDRESS && publicRuntimeConfig.cctpEnabled === 'true') {
    const { functionName } = decodeFunctionData({ abi: TokenMessenger, data: tx.input });
    if (functionName === 'depositForBurn') {
      return true;
    }
  }

  return false;
}
