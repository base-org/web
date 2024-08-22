import { formatEther } from 'viem';

export function weiToEth(wei?: bigint): number | '...' {
  if (wei === undefined) {
    return '...';
  }
  const value = parseFloat(formatEther(wei));
  if (value < 0.001) {
    return parseFloat(value.toFixed(4));
  } else {
    return parseFloat(value.toFixed(3));
  }
}
