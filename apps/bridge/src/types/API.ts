export type BlockExplorerApiResponse<T> = {
  message: string;
  status: string;
  result: T;
};

export type DepositStatus = 'Complete' | 'Pending';
export type TransactionStatus = 'Complete' | 'Pending';

export type WithdrawalStatus = 'Complete' | 'Pending';

export type BlockExplorerTransaction = {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: `0x${string}`;
  isError: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
};
