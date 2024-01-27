import { WithdrawalItem } from '@eth-optimism/indexer-api';
import TokenMessenger from 'apps/bridge/src/contract-abis/TokenMessenger';
import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import getConfig from 'next/config';
import { decodeFunctionData } from 'viem';

import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts';

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

const ETH_WITHDRAWAL_ADDRESS = (
  publicRuntimeConfig?.l2L1MessagePasserAddress ?? '0x4200000000000000000000000000000000000016'
).toLowerCase();

const ERC20_WITHDRAWAL_ADDRESS = (
  publicRuntimeConfig?.L2StandardBridge ?? '0x4200000000000000000000000000000000000010'
).toLowerCase();

export function isETHOrERC20OrCCTPWithdrawal(tx: BlockExplorerTransaction) {
  // Immediately filter out if tx is not to an address we don't care about
  if (
    tx.to !== ETH_WITHDRAWAL_ADDRESS &&
    tx.to !== ERC20_WITHDRAWAL_ADDRESS &&
    tx.to !== CCTP_WITHDRAWAL_ADDRESS
  ) {
    return false;
  }

  // ETH withdrawal
  if (tx.to === ETH_WITHDRAWAL_ADDRESS && tx.value !== '0') {
    return true;
  }

  // ERC-20 Withdrawal
  if (tx.to === ERC20_WITHDRAWAL_ADDRESS) {
    const { functionName, args } = decodeFunctionData({ abi: l2StandardBridgeABI, data: tx.input });
    if (functionName === 'withdraw' || functionName === 'withdrawTo') {
      const token = assetList.find(
        (asset) =>
          asset.L2chainId === parseInt(publicRuntimeConfig.l2ChainID) &&
          asset.L2contract?.toLowerCase() === ((args?.[0] as string) ?? '').toLowerCase() &&
          asset.protocol === 'OP',
      );
      // Return true if this is a withdraw call to the L2StandardBridge and is a token the UI supports
      return Boolean(token);
    }
  }

  // CCTP Withdrawal
  if (tx.to === CCTP_WITHDRAWAL_ADDRESS && publicRuntimeConfig.cctpEnabled === 'true') {
    const { functionName } = decodeFunctionData({ abi: TokenMessenger, data: tx.input });
    if (functionName === 'depositForBurn') {
      return true;
    }
  }

  return false;
}
