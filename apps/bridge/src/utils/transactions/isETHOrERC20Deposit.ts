import { getOEContract } from '@eth-optimism/sdk';
import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const ETH_DEPOSIT_ADDRESS = (
  publicRuntimeConfig?.l1OptimismPortalProxyAddress ?? '0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA'
).toLowerCase();

const ERC20_DEPOSIT_ADDRESS = (
  publicRuntimeConfig?.l1BridgeProxyAddress ?? '0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a'
).toLowerCase();

const L2_CHAIN_ID = parseInt(publicRuntimeConfig?.l2ChainID ?? '84531');

const l1StandardBridgeInterface = getOEContract('L1StandardBridge', L2_CHAIN_ID, {
  address: ERC20_DEPOSIT_ADDRESS,
}).interface;

export function isETHOrERC20Deposit(tx: BlockExplorerTransaction) {
  // Immediately filter out if tx is not to an address we don't care about
  if (tx.to !== ETH_DEPOSIT_ADDRESS && tx.to !== ERC20_DEPOSIT_ADDRESS) {
    return false;
  }

  // ETH deposit
  if (tx.to === ETH_DEPOSIT_ADDRESS && tx.value !== '0') {
    return true;
  }

  // ERC-20 desposit
  if (tx.to === ERC20_DEPOSIT_ADDRESS) {
    const functionName = l1StandardBridgeInterface.getFunction(tx.input.slice(0, 10)).name;
    if (functionName === 'depositERC20') {
      return true;
    }
  }

  return false;
}
