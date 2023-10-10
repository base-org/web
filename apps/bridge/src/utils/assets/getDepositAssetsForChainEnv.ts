import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

// Get depositable assets on current chain. Note that we do not want to include
// bridged USDC (USDbC on L2) because it is preferable to bridge native USDC using
// CCTP. Returned list is sorted as [ETH, USDC, ...rest].
export function getDepositAssetsForChainEnv() {
  const assetList = getAssetListForChainEnv();

  const nonUSDCAssets = assetList.filter((asset) => asset.L1symbol !== 'USDC');
  const bridgedUSDC = assetList.filter(
    (asset) => asset.L1symbol === 'USDC' && asset.protocol === 'OP',
  );
  const nativeUSDC = assetList.filter(
    (asset) => asset.L1symbol === 'USDC' && asset.protocol === 'CCTP',
  );

  const usdcForChainEnv = publicRuntimeConfig.cctpEnabled === 'true' ? nativeUSDC : bridgedUSDC;

  return [...nonUSDCAssets, ...usdcForChainEnv].sort((a, b) => {
    if (a.L1symbol === 'ETH') return -1;
    if (b.L1symbol === 'ETH') return 1;

    return a.L1symbol === 'USDC' ? -1 : 0;
  });
}
