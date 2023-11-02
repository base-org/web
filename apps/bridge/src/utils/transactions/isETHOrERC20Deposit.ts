import { decodeFunctionData } from 'viem';
import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import getConfig from 'next/config';
import TokenMessenger from 'apps/bridge/src/contract-abis/TokenMessenger';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import { DepositItem } from '@eth-optimism/indexer-api';

const { publicRuntimeConfig } = getConfig();

const assetList = getAssetListForChainEnv();
const ETH_TOKEN_ADDRESS = '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000';

const CCTP_DEPOSIT_ADDRESS = (
  publicRuntimeConfig?.l1CCTPTokenMessengerAddress ?? '0xd0c3da58f55358142b8d3e06c1c30c5c6114efe8'
).toLowerCase();

export function isExplorerTxETHOrERC20Deposit(tx: BlockExplorerTransaction) {
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

export function isIndexerTxETHOrERC20Deposit(tx: DepositItem) {
  // ETH deposit
  if (tx.l1TokenAddress === ETH_TOKEN_ADDRESS) {
    return true;
  }

  // Only show UI-supported ERC20 deposits
  const token = assetList.find(
    (asset) =>
      asset.L1chainId === parseInt(publicRuntimeConfig.l1ChainID) &&
      asset.protocol === 'OP' &&
      asset.L1contract?.toLowerCase() === tx.l1TokenAddress.toLowerCase(),
  );

  return Boolean(token);
}
