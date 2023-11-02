import { WithdrawalItem } from '@eth-optimism/indexer-api';
import TokenMessenger from 'apps/bridge/src/contract-abis/TokenMessenger';
import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import getConfig from 'next/config';
import { decodeFunctionData } from 'viem';

const { publicRuntimeConfig } = getConfig();

const assetList = getAssetListForChainEnv();
const ETH_TOKEN_ADDRESS = '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000';

const CCTP_WITHDRAWAL_ADDRESS = (
  publicRuntimeConfig?.l2CCTPTokenMessengerAddress ?? '0x877b8e8c9e2383077809787ED6F279ce01CB4cc8'
).toLowerCase();

export function isExplorerTxETHOrERC20Withdrawal(tx: BlockExplorerTransaction) {
  // CCTP deposit
  if (tx.to === CCTP_WITHDRAWAL_ADDRESS && publicRuntimeConfig.cctpEnabled === 'true') {
    const { functionName } = decodeFunctionData({ abi: TokenMessenger, data: tx.input });
    if (functionName === 'depositForBurn') {
      return true;
    }
  }

  return false;
}

export function isIndexerTxETHOrERC20Withdrawal(tx: WithdrawalItem) {
  // ETH deposit
  if (tx.l1TokenAddress === ETH_TOKEN_ADDRESS) {
    return true;
  }

  // Only show UI-supported ERC20 withdrawals
  const token = assetList.find(
    (asset) =>
      asset.L1chainId === parseInt(publicRuntimeConfig.l1ChainID) &&
      asset.protocol === 'OP' &&
      asset.L1contract?.toLowerCase() === tx.l1TokenAddress.toLowerCase() &&
      asset.L2contract?.toLowerCase() === tx.l2TokenAddress.toLowerCase(),
  );

  return Boolean(token);
}
