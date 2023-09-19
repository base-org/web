import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export function blockExplorerUrlForL1Transaction(txHash: string) {
  return `${publicRuntimeConfig.l1ExplorerURL}/tx/${txHash}`;
}

export function blockExplorerUrlForL2Transaction(txHash: string) {
  return `${publicRuntimeConfig.l2ExplorerURL}/tx/${txHash}`;
}
