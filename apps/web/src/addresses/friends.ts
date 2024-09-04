import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

type AddressMap = Record<number, Address>;

export const BASEFRIENDS_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0x000000000000000000000000000000000000dEaD',
  [base.id]: '0x000000000000000000000000000000000000dEaD',
};
