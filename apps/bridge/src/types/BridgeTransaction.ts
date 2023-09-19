import { TransactionStatus } from 'apps/bridge/src/types/API';

type TransactionType = 'Deposit' | 'Withdrawal';

export type BridgeTransaction = {
  type: TransactionType;
  from: string;
  to: string;
  assetSymbol: string;
  amount: string;
  blockTimestamp: string;
  hash: `0x${string}`;
  status?: TransactionStatus;
  priceApiId: string;
};
