import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import { Asset } from 'apps/bridge/src/types/Asset';
import { decodeFunctionData } from 'viem';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import getConfig from 'next/config';
import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts';

const assetList = getAssetListForChainEnv();

const { publicRuntimeConfig } = getConfig();

const ETH_DEPOSIT_ADDRESS = (
  publicRuntimeConfig?.l1OptimismPortalProxyAddress ?? '0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA'
).toLowerCase();

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

  const { functionName, args } = decodeFunctionData({
    abi: l1StandardBridgeABI,
    data: tx.input,
  });
  const token = assetList.find(
    (asset) =>
      asset.L1chainId === parseInt(publicRuntimeConfig.l1ChainID) &&
      asset.L1contract?.toLowerCase() === (args?.[0] as string).toLowerCase(),
  ) as Asset;
  return {
    type: 'Deposit',
    from: tx.from,
    to: tx.to,
    assetSymbol: token.L1symbol ?? '',
    amount: ((functionName === 'depositERC20' ? args?.[2] : args?.[3]) as bigint).toString(),
    blockTimestamp: tx.timeStamp,
    hash: tx.hash as `0x${string}`,
    status: 'Complete',
    priceApiId: token.apiId,
  };
}
