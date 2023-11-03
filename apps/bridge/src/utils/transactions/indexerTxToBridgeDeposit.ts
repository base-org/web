import { Asset } from 'apps/bridge/src/types/Asset';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import getConfig from 'next/config';
import { DepositItem } from '@eth-optimism/indexer-api';

const assetList = getAssetListForChainEnv();

const ETH_TOKEN_ADDRESS = '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000';

const { publicRuntimeConfig } = getConfig();

export function indexerTxToBridgeDeposit(tx: DepositItem): BridgeTransaction {
  if (tx.l1TokenAddress === ETH_TOKEN_ADDRESS) {
    // ETH deposit (OP)
    return {
      type: 'Deposit',
      from: tx.from,
      to: tx.to,
      assetSymbol: 'ETH',
      amount: tx.amount,
      blockTimestamp: tx.timestamp.toString(),
      hash: tx.l1TxHash as `0x${string}`,
      status: 'Complete',
      priceApiId: 'ethereum',
      assetDecimals: 18,
      protocol: 'OP',
    };
  }

  const token = assetList.find(
    (asset) =>
      asset.L1chainId === parseInt(publicRuntimeConfig.l1ChainID) &&
      asset.L1contract?.toLowerCase() === tx.l1TokenAddress.toLowerCase(),
  ) as Asset;
  return {
    type: 'Deposit',
    from: tx.from,
    to: tx.to,
    assetSymbol: token.L1symbol ?? '',
    amount: tx.amount,
    blockTimestamp: tx.timestamp.toString(),
    hash: tx.l1TxHash as `0x${string}`,
    status: 'Complete',
    priceApiId: token.apiId,
    assetDecimals: token.decimals,
    protocol: 'OP',
  };
}
