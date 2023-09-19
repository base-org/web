export function usdFormatter(amount: number | bigint, minimumFractionDigits = 2) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
  });

  return formatter.format(amount);
}

export function formatCryptoBalance(str: string) {
  // removes the trailing zeros from a number
  return parseFloat((+str).toFixed(8)).toString();
}
