import getConfig from 'next/config';
import { getAssetListForChainEnv } from 'apps/bridge/src/utils/assets/getAssetListForChainEnv';

const { publicRuntimeConfig } = getConfig();

/* 
  Get depositable assets on current chain. Note that we do not want to include
  bridged USDC (USDbC on L2) because it is preferable to bridge native USDC using
  CCTP.
*/
export function getDepositAssets() {
  const assetList = getAssetListForChainEnv();
  return assetList.filter(
    (asset) =>
      (asset.L1symbol !== 'USDC' || (asset.L1symbol === 'USDC' && asset.protocol === 'CCTP')) &&
      publicRuntimeConfig.assets.split(',').includes(asset.L1symbol.toLowerCase()),
  );
}
