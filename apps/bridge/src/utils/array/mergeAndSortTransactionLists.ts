import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';

export function mergeAndSortTransactionsLists(
  txList1: BridgeTransaction[],
  txList2: BridgeTransaction[],
) {
  const merged = [];
  let index1 = 0;
  let index2 = 0;
  let current = 0;

  while (current < txList1.length + txList2.length) {
    const isTxList1Depleted = index1 >= txList1.length;
    const isTxList2Depleted = index2 >= txList2.length;

    if (
      !isTxList1Depleted &&
      (isTxList2Depleted ||
        parseInt(txList1[index1].blockTimestamp) < parseInt(txList2[index2].blockTimestamp))
    ) {
      merged[current] = txList1[index1];
      index1 += 1;
    } else {
      merged[current] = txList2[index2];
      index2 += 1;
    }

    current += 1;
  }

  return merged.reverse();
}
