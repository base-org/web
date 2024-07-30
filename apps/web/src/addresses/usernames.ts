import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

type AddressMap = Record<number, Address>;

export const USERNAME_L2_RESOLVER_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0x6533C94869D28fAA8dF77cc63f9e2b2D6Cf77eBA',
  [base.id]: '0xC6d566A56A1aFf6508b41f6c90ff131615583BCD',
};

export const USERNAME_REGISTRAR_CONTROLLER_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0x49aE3cC2e3AA768B1e5654f5D3C6002144A59581',
  [base.id]: '0xd3e6775Ed9B7dC12B205C8E608Dc3767B9e5eFdA',
};

export const USERNAME_CB_ID_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0xA316d8bcEC25587a1Fad599ae6B56169cf377816',
  [base.id]: '0x',
};

export const USERNAME_CB1_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0xcf3078c5f2C5d8B7E7CF1a23dD7Bb50244423273',
  [base.id]: '0x',
};

export const USERNAME_CB_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0x949dB534C2D5F777c7755fF22111B01934C87556',
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
