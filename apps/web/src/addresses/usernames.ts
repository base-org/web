import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

type AddressMap = Record<number, Address>;

export const USERNAME_L2_RESOLVER_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0x8d2D30cdE6c46BC81824d0732cE8395c58da3939',
  [base.id]: '0x',
};

export const USERNAME_REGISTRAR_CONTROLLER_ADDRESS: AddressMap = {
  [baseSepolia.id]: '0x16ee2051a0613e5c52127755ee3110cf4cd1ca10',
  [base.id]: '0x',
};

export const USERNAME_CB_ID_DISCOUNT_VALIDATOR: AddressMap = {
  [baseSepolia.id]: '0x1079eF978d3c2A6CD4db142118D3C904E0Ac4Fc7',
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

export const USERNAME_1155_DISCOUNT_VALIDATOR: AddressMap = {
  [baseSepolia.id]: '0xE41Cd25f429E10744938d5048646E721ac630aF3',
  [base.id]: '0x',
};
