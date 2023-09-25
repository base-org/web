import { getOEContract } from '@eth-optimism/sdk';
import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const ETH_WITHDRAWAL_ADDRESS = (
  publicRuntimeConfig?.l2L1MessagePasserAddress ?? '0x4200000000000000000000000000000000000016'
).toLowerCase();

const ERC20_WITHDRAWAL_ADDRESS = (
  publicRuntimeConfig?.L2StandardBridge ?? '0x4200000000000000000000000000000000000010'
).toLowerCase();

const L2_CHAIN_ID = parseInt(publicRuntimeConfig?.l2ChainID ?? '84531');

const l2StandardBridgeInterface = getOEContract('L2StandardBridge', L2_CHAIN_ID, {
  address: ERC20_WITHDRAWAL_ADDRESS,
}).interface;

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
    const functionName = l2StandardBridgeInterface.getFunction(tx.input.slice(0, 10)).name;
    if (functionName === 'withdraw' || functionName === 'withdrawTo') {
      return true;
    }
  }

  return false;
}
