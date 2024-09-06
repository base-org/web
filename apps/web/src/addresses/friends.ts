import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

type AddressMap = Record<number, Address>;

export const BASEFRIENDS_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0x128AA5d8DaD4148a8eB1F5aeBdA0e0a62510b87e',
  [base.id]: '0x000000000000000000000000000000000000dEaD',
};
