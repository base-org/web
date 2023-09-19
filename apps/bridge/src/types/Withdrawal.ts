import { WithdrawalStatus } from 'apps/bridge/src/types/API';

export type Withdrawal = {
  from: string;
  to: string;
  symbol: string;
  amount: string;
  timestamp: string;
  transactionHash: string;
  status: WithdrawalStatus;
};
