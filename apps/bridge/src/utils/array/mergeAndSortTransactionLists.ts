import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';

export function mergeAndSortTransactionsLists(
  txList1: BridgeTransaction[],
  txList2: BridgeTransaction[],
) {
  return [...txList1, ...txList2].sort((a, b) => {
    if (a.blockTimestamp && b.blockTimestamp) {
      return parseInt(b.blockTimestamp) - parseInt(a.blockTimestamp);
    }

    if (a.blockTimestamp) {
      return -1;
    }

    if (b.blockTimestamp) {
      return 1;
    }

    return 0;
  });
}
