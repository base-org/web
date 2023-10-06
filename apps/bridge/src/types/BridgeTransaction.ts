import { TransactionStatus } from 'apps/bridge/src/types/API';
import { BridgeProtocol } from 'apps/bridge/src/types/Asset';

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
  assetDecimals?: number;
  protocol: BridgeProtocol;
};
