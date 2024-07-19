import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

type AddressMap = Record<number, Address>;

export const USERNAME_CHAIN_ID_FROM_ENV = process.env.NEXT_PUBLIC_USER_NAME_CHAIN_ID
  ? Number(process.env.NEXT_PUBLIC_USER_NAME_CHAIN_ID)
  : undefined;

// Default to Base Sepolia
export const USERNAME_CHAIN_ID = USERNAME_CHAIN_ID_FROM_ENV ?? baseSepolia.id;
export const SUPPORTED_CHAIN_IDS: number[] = [base.id, baseSepolia.id];

export function isSupportedChain(chainId: number) {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
}

// Build: throw error in case of misconfiguration
//        This avoids us having to check for valid chainId down the road (hooks/components)
if (!isSupportedChain(USERNAME_CHAIN_ID)) {
  throw new Error(`Unsupported chainId for basename: ${USERNAME_CHAIN_ID}`);
}

export const ADDRESS_REVERSE_NODE =
  '0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2';

const USERNAME_L2_RESOLVER_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0x8d2D30cdE6c46BC81824d0732cE8395c58da3939',
  [base.id]: '0x',
};

export const USERNAME_L2_RESOLVER_ADDRESS = USERNAME_L2_RESOLVER_ADDRESSES[USERNAME_CHAIN_ID];

const USERNAME_REGISTRAR_CONTROLLER_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0x16ee2051a0613e5c52127755ee3110cf4cd1ca10',
  [base.id]: '0x',
};

export const USERNAME_REGISTRAR_CONTROLLER_ADDRESS =
  USERNAME_REGISTRAR_CONTROLLER_ADDRESSES[USERNAME_CHAIN_ID];

const USERNAME_CB_ID_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0x1079eF978d3c2A6CD4db142118D3C904E0Ac4Fc7',
  [base.id]: '0x',
};

export const USERNAME_CB_ID_DISCOUNT_VALIDATOR =
  USERNAME_CB_ID_DISCOUNT_VALIDATORS[USERNAME_CHAIN_ID];

const USERNAME_CB1_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0x502df754f25f492cad45ed85a4de0ee7540717e7',
  [base.id]: '0x',
};

export const USERNAME_CB1_DISCOUNT_VALIDATOR = USERNAME_CB1_DISCOUNT_VALIDATORS[USERNAME_CHAIN_ID];

const USERNAME_CB_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0x87B6Bb5d4F43f7bfF78fcFAE7227B2d918828a92',
  [base.id]: '0x',
};

export const USERNAME_CB_DISCOUNT_VALIDATOR = USERNAME_CB_DISCOUNT_VALIDATORS[USERNAME_CHAIN_ID];

const USERNAME_1155_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0xE41Cd25f429E10744938d5048646E721ac630aF3',
  [base.id]: '0x',
};
export const USERNAME_1155_DISCOUNT_VALIDATOR =
  USERNAME_1155_DISCOUNT_VALIDATORS[USERNAME_CHAIN_ID];

export const UNISWAP_USDC_WETH_POOL: AddressMap = {
  [base.id]: '0x88A43bbDF9D098eEC7bCEda4e2494615dfD9bB9C',
};
