import { getOEContract } from '@eth-optimism/sdk';
import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import { Asset } from 'apps/bridge/src/types/Asset';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import { BigNumber } from 'ethers';
import getConfig from 'next/config';

const assetList = getAssetListForChainEnv();

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

export function explorerTxToBridgeDeposit(tx: BlockExplorerTransaction): BridgeTransaction {
  if (tx.to === ETH_DEPOSIT_ADDRESS) {
    return {
      type: 'Deposit',
      from: tx.from,
      to: tx.to,
      assetSymbol: 'ETH',
      amount: tx.value,
      blockTimestamp: tx.timeStamp,
      hash: tx.hash as `0x${string}`,
      status: 'Complete',
      priceApiId: 'ethereum',
    };
  }

  const decodedWithdrawData = l1StandardBridgeInterface.decodeFunctionData(
    tx.input.slice(0, 10),
    tx.input,
  );
  const token = assetList.find(
    (asset) =>
      asset.L1chainId === parseInt(publicRuntimeConfig.l1ChainID) &&
      asset.L1contract?.toLowerCase() === (decodedWithdrawData[0] as string).toLowerCase(),
  ) as Asset;
  return {
    type: 'Deposit',
    from: tx.from,
    to: tx.to,
    assetSymbol: token.L1symbol ?? '',
    amount: (decodedWithdrawData[2] as BigNumber).toString(),
    blockTimestamp: tx.timeStamp,
    hash: tx.hash as `0x${string}`,
    status: 'Complete',
    priceApiId: token.apiId,
  };
}
