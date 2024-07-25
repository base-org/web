import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

type AddressMap = Record<number, Address>;

export const USERNAME_L2_RESOLVER_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0x6533C94869D28fAA8dF77cc63f9e2b2D6Cf77eBA',
  [base.id]: '0xC6d566A56A1aFf6508b41f6c90ff131615583BCD',
};

export const USERNAME_REGISTRAR_CONTROLLER_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0x3a0e8c2a0a28f396a5e5b69edb2e630311f1517a',
  [base.id]: '0xd3e6775Ed9B7dC12B205C8E608Dc3767B9e5eFdA',
};

export const USERNAME_CB_ID_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0x1079eF978d3c2A6CD4db142118D3C904E0Ac4Fc7',
  [base.id]: '0x',
};

export const USERNAME_CB1_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0x502df754f25f492cad45ed85a4de0ee7540717e7',
  [base.id]: '0x',
};

export const USERNAME_CB_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0x87B6Bb5d4F43f7bfF78fcFAE7227B2d918828a92',
  [base.id]: '0x',
};

export const USERNAME_EA_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0x4944a8Ea7ec6fA356B159a2c363d83076B8f276D',
  [base.id]: '0x6E89d99643DB1223697C77A9F8B2Cb07E898e743',
};

export const USERNAME_1155_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0xE41Cd25f429E10744938d5048646E721ac630aF3',
  [base.id]: '0x',
};

export const UNISWAP_USDC_WETH_POOL: AddressMap = {
  [base.id]: '0x88A43bbDF9D098eEC7bCEda4e2494615dfD9bB9C',
};
