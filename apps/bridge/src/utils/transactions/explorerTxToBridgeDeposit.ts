import { BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import { Asset } from 'apps/bridge/src/types/Asset';
import { decodeFunctionData } from 'viem';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import getConfig from 'next/config';
import TokenMessenger from 'apps/bridge/src/contract-abis/TokenMessenger';

const assetList = getAssetListForChainEnv();

const { publicRuntimeConfig } = getConfig();

export function explorerTxToBridgeDeposit(tx: BlockExplorerTransaction): BridgeTransaction {
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
