import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';

// Get depositable assets on current chain. Note that we do not want to include
// bridged USDC (USDbC on L2) because it is preferable to bridge native USDC using
// CCTP. Returned list is sorted as [ETH, USDC, ...rest].
export function getDepositAssets() {
  const assetList = getAssetListForChainEnv();
  const nonUSDCAssets = assetList.filter((asset) => asset.L1symbol !== 'USDC');
  const nativeUSDC = assetList.filter(
    (asset) => asset.L1symbol === 'USDC' && asset.protocol === 'CCTP',
  );

  return [...nonUSDCAssets, ...nativeUSDC].sort((a, b) => {
    if (a.L1symbol === 'ETH') return -1;
    if (b.L1symbol === 'ETH') return 1;

    return a.L1symbol === 'USDC' ? -1 : 0;
  });
}
