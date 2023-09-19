import assetList from 'apps/bridge/assets';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export function getAssetListForChainEnv() {
  return assetList.filter(
    (asset) =>
      asset.L1chainId === parseInt(publicRuntimeConfig.l1ChainID) &&
      asset.L2chainId === parseInt(publicRuntimeConfig.l2ChainID),
  );
}
