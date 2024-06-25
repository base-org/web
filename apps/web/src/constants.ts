import { Address } from 'viem';

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
export const trustedSignerPKey = (process.env.TRUSTED_SIGNER_PRIVATE_KEY as Address) ?? '0x';

// attestations
export const verifiedAccountSchemaId = process.env.VERIFICATION_VERIFIED_ACCOUNT_SCHEMA_ID;
export const verifiedCb1AccountSchemaId = process.env.VERIFICATION_VERIFIED_CB1_ACCOUNT_SCHEMA_ID;

export const CB_SW_PROXY_BYTECODE =
  '0x363d3d373d3d363d7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc545af43d6000803e6038573d6000fd5b3d6000f3';
export const CB_SW_V1_IMPLEMENTATION_ADDRESS =
  '0x000100abaad02f1cfC8Bbe32bD5a564817339E72';
export const ERC_1967_PROXY_IMPLEMENTATION_SLOT =
  '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
export const CB_SW_FACTORY_ADDRESS =
  '0x0BA5ED0c6AA8c49038F819E587E2633c4A9F428a';
export const magicSpendAddress = "0x011A61C07DbF256A68256B1cB51A5e246730aB92";

export const coinbaseSmartWalletABI = [
  {
    type: "function",
    name: "executeBatch",
    inputs: [
      {
        name: "calls",
        type: "tuple[]",
        internalType: "struct CoinbaseSmartWallet.Call[]",
        components: [
          {
            name: "target",
            type: "address",
            internalType: "address",
          },
          {
            name: "value",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
];