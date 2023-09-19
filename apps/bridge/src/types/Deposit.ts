import { DepositStatus } from 'apps/bridge/src/types/API';

type Token = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
};

export type Deposit = {
  from: string;
  to: string;
  l1Token: Token;
  amount: string;
  blockTimestamp: string;
  transactionHash: string;
  status: DepositStatus;
};
