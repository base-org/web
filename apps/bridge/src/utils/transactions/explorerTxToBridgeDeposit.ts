import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import { Asset } from 'apps/bridge/src/types/Asset';
import { decodeFunctionData } from 'viem';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import { l1StandardBridgeABI } from '@eth-optimism/contracts-ts';
import getConfig from 'next/config';
import TokenMessenger from 'apps/bridge/src/contract-abis/TokenMessenger';

const assetList = getAssetListForChainEnv();

const { publicRuntimeConfig } = getConfig();

const ETH_DEPOSIT_ADDRESS = (
  publicRuntimeConfig?.l1OptimismPortalProxyAddress ?? '0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA'
).toLowerCase();

const CCTP_DEPOSIT_ADDRESS = (
  publicRuntimeConfig?.l1CCTPTokenMessengerAddress ?? '0xd0c3da58f55358142b8d3e06c1c30c5c6114efe8'
).toLowerCase();

export function explorerTxToBridgeDeposit(tx: BlockExplorerTransaction): BridgeTransaction {
  if (tx.to === ETH_DEPOSIT_ADDRESS) {
    // ETH deposit (OP)
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
      assetDecimals: 18,
      protocol: 'OP',
    };
  } else if (tx.to === CCTP_DEPOSIT_ADDRESS) {
    // CCTP deposit (CCTP)
    const { args } = decodeFunctionData({
      abi: TokenMessenger,
      data: tx.input,
    });
    const token = assetList.find(
      (asset) =>
        asset.L1chainId === parseInt(publicRuntimeConfig.l1ChainID) &&
        asset.L1contract?.toLowerCase() === (args?.[3] as string).toLowerCase() &&
        asset.protocol === 'CCTP',
    ) as Asset;
    return {
      type: 'Deposit',
      from: tx.from,
      to: tx.to,
      assetSymbol: token.L1symbol ?? '',
      amount: (args?.[0] as bigint).toString(),
      blockTimestamp: tx.timeStamp,
      hash: tx.hash as `0x${string}`,
      priceApiId: token.apiId,
      assetDecimals: token.decimals,
      protocol: 'CCTP',
    };
  }

  const { functionName, args } = decodeFunctionData({
    abi: l1StandardBridgeABI,
    data: tx.input,
  });
  const token = assetList.find(
    (asset) =>
      asset.L1chainId === parseInt(publicRuntimeConfig.l1ChainID) &&
      asset.L1contract?.toLowerCase() === (args?.[0] as string).toLowerCase() &&
      asset.protocol === 'OP',
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
    assetDecimals: token.decimals,
    protocol: 'OP',
  };
}
