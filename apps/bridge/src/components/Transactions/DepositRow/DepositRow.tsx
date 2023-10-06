import { memo } from 'react';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { OPDepositRow } from 'apps/bridge/src/components/Transactions/DepositRow/OPDepositRow';
import { CCTPBridgeRow } from 'apps/bridge/src/components/Transactions/CCTPBridgeRow/CCTPBridgeRow';

type DepositRowProps = {
  transaction: BridgeTransaction;
};

export const DepositRow = memo(function DepositRow({ transaction }: DepositRowProps) {
  if (transaction.protocol === 'CCTP') {
    return <CCTPBridgeRow transaction={transaction} bridgeDirection="deposit" />;
  }

  return <OPDepositRow transaction={transaction} />;
});
