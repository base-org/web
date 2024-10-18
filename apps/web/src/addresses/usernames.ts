import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

type AddressMap = Record<number, Address>;

export const USERNAME_L2_RESOLVER_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0x6533C94869D28fAA8dF77cc63f9e2b2D6Cf77eBA',
  [base.id]: '0xC6d566A56A1aFf6508b41f6c90ff131615583BCD',
};

export const USERNAME_REGISTRAR_CONTROLLER_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0x49aE3cC2e3AA768B1e5654f5D3C6002144A59581',
  [base.id]: '0x4cCb0BB02FCABA27e82a56646E81d8c5bC4119a5',
};

export const USERNAME_EA_REGISTRAR_CONTROLLER_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0x3a0e8c2a0a28f396a5e5b69edb2e630311f1517a',
  [base.id]: '0xd3e6775Ed9B7dC12B205C8E608Dc3767B9e5eFdA',
};

export const USERNAME_CB_ID_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0xA316d8bcEC25587a1Fad599ae6B56169cf377816',
  [base.id]: '0x0A484e560946818787135EAD632771589523dE82',
};

export const USERNAME_CB1_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0xcf3078c5f2C5d8B7E7CF1a23dD7Bb50244423273',
  [base.id]: '0x9de4Ab12320684cec803Edb72aA3a920250d392C',
};

export const USERNAME_CB_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0x949dB534C2D5F777c7755fF22111B01934C87556',
  [base.id]: '0x012076854d030128dc72B34621287Bb585210315',
};

export const USERNAME_EA_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0x3A0E8c2a0a28f396A5E5b69Edb2e630311f1517a',
  [base.id]: '0x6E89d99643DB1223697C77A9F8B2Cb07E898e743',
};

export const USERNAME_BNS_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0x1DE649d8b004A44491a7D3ebbb23F4B0DA89DE78',
  [base.id]: '0x20b433c640DFb8c2e3C6aBB0533314b2d7B9f2FF',
};

export const BASE_DOT_ETH_ERC721_DISCOUNT_VALIDATOR: AddressMap = {
  [baseSepolia.id]: '0xa0C7a114E25618538BE7fA7c6552C3122056F775',
  [base.id]: '0x55564490a44FDC2aEEa54B60eB1c79F124FD88b9',
};

export const BUILDATHON_ERC721_DISCOUNT_VALIDATOR: AddressMap = {
  [baseSepolia.id]: '0x7b5B2dB59c414e15Bf70b59C02E6fb00Ca919dbC',
  [base.id]: '0xB635802085b405A9C8BA7225ae866f60b63d8503',
};

export const USERNAME_BASE_ETH_HOLDERS_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0xA475f24BEa985Ff66c1F0d9D8C23661215418894',
  [base.id]: '0x55564490a44FDC2aEEa54B60eB1c79F124FD88b9',
};

export const USERNAME_1155_DISCOUNT_VALIDATORS: AddressMap = {
  [baseSepolia.id]: '0xE41Cd25f429E10744938d5048646E721ac630aF3',
  [base.id]: '0x55246A2AE466257B2fB54d4BB881Fb3f17D8e03e',
};

export const USERNAME_REVERSE_REGISTRAR_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0xa0A8401ECF248a9375a0a71C4dedc263dA18dCd7',
  [base.id]: '0x79ea96012eea67a83431f1701b3dff7e37f9e282',
};

export const USERNAME_BASE_REGISTRAR_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0xa0c70ec36c010b55e3c434d6c6ebeec50c705794',
  [base.id]: '0x03c4738ee98ae44591e1a4a4f3cab6641d95dd9a',
};

export const USERNAME_BASE_REGISTRY_ADDRESSES: AddressMap = {
  [baseSepolia.id]: '0x1493b2567056c2181630115660963E13A8E32735',
  [base.id]: '0xb94704422c2a1e396835a571837aa5ae53285a95',
};

export const UNISWAP_USDC_WETH_POOL: AddressMap = {
  [base.id]: '0x88A43bbDF9D098eEC7bCEda4e2494615dfD9bB9C',
};

export const EXPONENTIAL_PREMIUM_PRICE_ORACLE: AddressMap = {
  [baseSepolia.id]: '0x2B73408052825e17e0Fe464f92De85e8c7723231',
  [base.id]: '0xd53B558e1F07289acedf028d226974AbBa258312',
};
