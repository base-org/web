import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

type AddressMap = Record<number, Address>;

export const BASEFRIENDS_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0xfD8D9995d894f8Cb0B9898Bf4dfb64Ef03fF9725',
  [base.id]: '0x000000000000000000000000000000000000dEaD',
};
