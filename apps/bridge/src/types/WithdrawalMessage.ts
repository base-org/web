import { BigNumber } from 'ethers';

export type WithdrawalMessage = {
  nonce: BigNumber;
  sender: `0x${string}`;
  target: `0x${string}`;
  value: BigNumber;
  gasLimit: BigNumber;
  data: `0x${string}`;
};
