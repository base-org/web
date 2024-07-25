import type { Address } from 'viem';

export type PreviousClaim = {
  address: string;
  signedMessage: string;
};

export type VerifiedAccount = {
  name: string;
  type: string;
  signature: string;
  value: {
    name: string;
    type: string;
    value: boolean;
  };
};

export enum DiscountType {
  EARLY_ACCESS = 'EARLY_ACCESS',
  CB = 'CB',
  CB1 = 'CB1',
  CB_ID = 'CB_ID',
}

export type DiscountValue = {
  schemaId?: Address;
  discountValidatorAddress: Address;
};

export type DiscountTypes = {
  [key in DiscountType]?: DiscountValue;
};

export type PreviousClaims = {
  [key in DiscountType]?: PreviousClaim;
};
