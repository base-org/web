import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';

export function dedupeTransactions(transactions: BridgeTransaction[]) {
  const deduped = [];
  const hashes = new Set();
  for (const transaction of transactions) {
    if (!hashes.has(transaction.hash)) {
      deduped.push(transaction);
      hashes.add(transaction.hash);
    }
  }
  return deduped;
}
