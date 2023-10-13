import { l2StandardBridgeABI } from '@eth-optimism/contracts-ts';
import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import { Asset } from 'apps/bridge/src/types/Asset';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import getConfig from 'next/config';
import { decodeFunctionData } from 'viem';

const assetList = getAssetListForChainEnv();

const { publicRuntimeConfig } = getConfig();

const ETH_WITHDRAWAL_ADDRESS = (
  publicRuntimeConfig?.l2L1MessagePasserAddress ?? '0x4200000000000000000000000000000000000016'
).toLowerCase();

export function explorerTxToBridgeWithdrawal(tx: BlockExplorerTransaction): BridgeTransaction {
  if (tx.to === ETH_WITHDRAWAL_ADDRESS) {
    return {
      type: 'Withdrawal',
      from: tx.from,
      to: tx.to,
      assetSymbol: 'ETH',
      amount: tx.value,
      blockTimestamp: tx.timeStamp,
      hash: tx.hash as `0x${string}`,
      priceApiId: 'ethereum',
    };
  }

  const { functionName, args } = decodeFunctionData({ abi: l2StandardBridgeABI, data: tx.input });
  const token = assetList.find(
    (asset) =>
      asset.L2chainId === parseInt(publicRuntimeConfig.l2ChainID) && asset.L2contract === args?.[0],
  ) as Asset;
  return {
    type: 'Withdrawal',
    from: tx.from,
    to: tx.to,
    assetSymbol: token?.L2symbol ?? 'Unlisted',
    amount: ((functionName === 'withdraw' ? args?.[1] : args?.[2]) as bigint).toString(),
    blockTimestamp: tx.timeStamp,
    hash: tx.hash as `0x${string}`,
    priceApiId: token?.apiId,
  };
}
