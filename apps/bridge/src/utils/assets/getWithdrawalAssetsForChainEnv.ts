import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

// Get withdrawable assets on current chain. Note that we want to include
// both bridge and native USDC so users who have previously minted USDbC
// on L2 have a way of bridging it back to USDC on L1.
// Returned list is sorted as [ETH, USDC, ...rest].
export function getWithdrawalAssetsForChainEnv() {
  const assetList = getAssetListForChainEnv();

  const nonUSDCAssets = assetList.filter((asset) => asset.L1symbol !== 'USDC');
  const bridgedUSDC = assetList.filter(
    (asset) => asset.L1symbol === 'USDC' && asset.protocol === 'OP',
  );
  const nativeUSDC = assetList.filter(
    (asset) => asset.L1symbol === 'USDC' && asset.protocol === 'CCTP',
  );

  const usdcForChainEnv =
    publicRuntimeConfig.cctpEnabled === 'true' ? [...bridgedUSDC, ...nativeUSDC] : bridgedUSDC;

  return [...nonUSDCAssets, ...usdcForChainEnv].sort((a, b) => {
    if (a.L1symbol === 'ETH') return -1;
    if (b.L1symbol === 'ETH') return 1;

    return a.L1symbol === 'USDC' ? -1 : 0;
  });
}
