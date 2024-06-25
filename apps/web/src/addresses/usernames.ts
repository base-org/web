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
