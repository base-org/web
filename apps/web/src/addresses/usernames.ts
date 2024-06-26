import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

type AddressMap = Record<number, Address>;

export const USERNAME_L2_RESOLVER_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0x51A16746Af2247DCA3665c078cCCf5678d19E366',
  [base.id]: '0x',
};

export const USERNAME_REGISTRAR_CONTROLLER_ADDRESS: AddressMap = {
  [baseSepolia.id]: '0xC8b5d24753588fc7eD134dF8870F9D5544A3836e',
  [base.id]: '0x',
};

export const USERNAME_CB_ID_DISCOUNT_VALIDATOR: AddressMap = {
  [baseSepolia.id]: '0x1079ef978d3c2a6cd4db142118d3c904e0ac4fc7',
  [base.id]: '0x',
};

export const USERNAME_CB1_DISCOUNT_VALIDATOR: AddressMap = {
  [baseSepolia.id]: '0x502df754f25f492cad45ed85a4de0ee7540717e7',
  [base.id]: '0x',
};

export const USERNAME_CB_DISCOUNT_VALIDATOR: AddressMap = {
  [baseSepolia.id]: '0x87B6Bb5d4F43f7bfF78fcFAE7227B2d918828a92',
  [base.id]: '0x',
};
