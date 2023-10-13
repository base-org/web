import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts';
import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import getConfig from 'next/config';
import { decodeFunctionData } from 'viem';

const { publicRuntimeConfig } = getConfig();

const ETH_WITHDRAWAL_ADDRESS = (
  publicRuntimeConfig?.l2L1MessagePasserAddress ?? '0x4200000000000000000000000000000000000016'
).toLowerCase();

const ERC20_WITHDRAWAL_ADDRESS = (
  publicRuntimeConfig?.L2StandardBridge ?? '0x4200000000000000000000000000000000000010'
).toLowerCase();

export function isETHOrERC20Withdrawal(tx: BlockExplorerTransaction) {
  // Immediately filter out if tx is not to an address we don't care about
  if (tx.to !== ETH_WITHDRAWAL_ADDRESS && tx.to !== ERC20_WITHDRAWAL_ADDRESS) {
    return false;
  }

  // ETH withdrawal
  if (tx.to === ETH_WITHDRAWAL_ADDRESS && tx.value !== '0') {
    return true;
  }

  // ERC-20 Withdrawal
  if (tx.to === ERC20_WITHDRAWAL_ADDRESS) {
    const { functionName } = decodeFunctionData({ abi: l2StandardBridgeABI, data: tx.input });
    if (functionName === 'withdraw' || functionName === 'withdrawTo') {
      return true;
    }
  }

  return false;
}
