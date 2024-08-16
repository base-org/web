import { formatEther } from 'viem';

export function formatEthPrice(price?: bigint) {
  if (price === undefined) {
    return '...';
  }
  const value = parseFloat(formatEther(price));
  if (value < 0.001) {
    return parseFloat(value.toFixed(4));
  } else {
    return parseFloat(value.toFixed(3));
  }
}
