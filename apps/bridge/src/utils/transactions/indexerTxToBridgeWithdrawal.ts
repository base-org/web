import { Asset } from 'apps/bridge/src/types/Asset';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import getConfig from 'next/config';
import { WithdrawalItem } from '@eth-optimism/indexer-api';

const { publicRuntimeConfig } = getConfig();

const assetList = getAssetListForChainEnv();
const ETH_TOKEN_ADDRESS = '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000';

export function indexerTxToBridgeWithdrawal(tx: WithdrawalItem): BridgeTransaction {
  if (tx.l1TokenAddress === ETH_TOKEN_ADDRESS) {
    // ETH Withdrawal (OP)
    return {
      type: 'Withdrawal',
      from: tx.from,
      to: tx.to,
      assetSymbol: 'ETH',
      amount: tx.amount,
      blockTimestamp: tx.timestamp.toString(),
      hash: tx.transactionHash as `0x${string}`,
      priceApiId: 'ethereum',
      protocol: 'OP',
    };
  }

  const token = assetList.find(
    (asset) =>
      asset.L1chainId === parseInt(publicRuntimeConfig.l1ChainID) &&
      asset.L1contract?.toLowerCase() === tx.l1TokenAddress.toLowerCase() &&
      asset.L2contract?.toLowerCase() === tx.l2TokenAddress.toLowerCase(),
  ) as Asset;
  return {
    type: 'Withdrawal',
    from: tx.from,
    to: tx.to,
    assetSymbol: token?.L2symbol ?? 'Unlisted',
    amount: tx.amount,
    blockTimestamp: tx.timestamp.toString(),
    hash: tx.transactionHash as `0x${string}`,
    priceApiId: token?.apiId,
    protocol: 'OP',
  };
}
