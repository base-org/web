import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts';
import { decodeFunctionData } from 'viem';
import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import getConfig from 'next/config';
import TokenMessenger from 'apps/bridge/src/contract-abis/TokenMessenger';

const { publicRuntimeConfig } = getConfig();

const ETH_DEPOSIT_ADDRESS = publicRuntimeConfig.l1OptimismPortalProxyAddress.toLowerCase();

const ERC20_DEPOSIT_ADDRESS = (
  publicRuntimeConfig?.l1BridgeProxyAddress ?? '0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a'
).toLowerCase();

const CCTP_DEPOSIT_ADDRESS = (
  publicRuntimeConfig?.l1CCTPTokenMessengerAddress ?? '0x877b8e8c9e2383077809787ED6F279ce01CB4cc8'
).toLowerCase();

export function isETHOrERC20Deposit(tx: BlockExplorerTransaction) {
  // Immediately filter out if tx is not to an address we don't care about
  if (
    tx.to !== ETH_DEPOSIT_ADDRESS &&
    tx.to !== ERC20_DEPOSIT_ADDRESS &&
    tx.to !== CCTP_DEPOSIT_ADDRESS
  ) {
    return false;
  }

  // ETH deposit
  if (tx.to === ETH_DEPOSIT_ADDRESS && tx.value !== '0') {
    return true;
  }

  // ERC-20 desposit
  if (tx.to === ERC20_DEPOSIT_ADDRESS) {
    const { functionName } = decodeFunctionData({
      abi: l1StandardBridgeABI,
      data: tx.input,
    });
    if (functionName === 'depositERC20' || functionName === 'depositERC20To') {
      return true;
    }
  }

  // CCTP deposit
  if (tx.to === CCTP_DEPOSIT_ADDRESS) {
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
