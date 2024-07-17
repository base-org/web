import { USERNAME_CHAIN_ID } from 'apps/web/src/addresses/usernames';
import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

export const nodeEnv = process.env.NODE_ENV;
export const docsUrl = process.env.DOCS_URL ?? 'https://docs.base.org';
export const bridgeUrl = process.env.BRIDGE_URL ?? 'https://bridge.base.org';
export const greenhouseApiUrl =
  process.env.GREENHOUSE_HTTPS ?? 'https://boards-api.greenhouse.io/v1';
export const mainnetLaunchBlogPostURL =
  process.env.MAINNET_LAUNCH_BLOG_POST_URL ?? 'https://base.mirror.xyz/';
export const mainnetLaunchFlag = process.env.MAINNET_LAUNCH_FLAG ?? 'false';
export const isDevelopment = nodeEnv === 'development';

// trusted signer
export const trustedSignerAddress = (process.env.TRUSTED_SIGNER_ADDRESS as Address) ?? '0x';
export const trustedSignerPKey = process.env.TRUSTED_SIGNER_PRIVATE_KEY ?? '0x';

type AddressMap = Record<number, Address>;
export const ATTESTATION_VERIFIED_ACCOUNT_SCHEMA_IDS: AddressMap = {
  [baseSepolia.id]: '0x2f34a2ffe5f87b2f45fbc7c784896b768d77261e2f24f77341ae43751c765a69',
  [base.id]: '0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9',
};

export const ATTESTATION_VERIFIED_ACCOUNT_SCHEMA_ID =
  ATTESTATION_VERIFIED_ACCOUNT_SCHEMA_IDS[USERNAME_CHAIN_ID];

export const ATTESTATION_VERIFIED_CB1_ACCOUNT_SCHEMA_IDS: AddressMap = {
  [baseSepolia.id]: '0xef8a28852c57170eafe8745aff8b47e22d36b8fb05476cc9ade66637974a1e8c',
  [base.id]: '0x254bd1b63e0591fefa66818ca054c78627306f253f86be6023725a67ee6bf9f4',
};

export const ATTESTATION_VERIFIED_CB1_ACCOUNT_SCHEMA_ID =
  ATTESTATION_VERIFIED_CB1_ACCOUNT_SCHEMA_IDS[USERNAME_CHAIN_ID];
