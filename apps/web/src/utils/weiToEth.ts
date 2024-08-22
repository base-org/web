export function weiToEth(wei?: bigint): number | '...' {
  if (wei === undefined) {
    return '...';
  }
  const value = Number(wei / 10n ** 18n);
  if (value < 0.001) {
    return parseFloat(value.toFixed(4));
  } else {
    return parseFloat(value.toFixed(3));
  }
}
