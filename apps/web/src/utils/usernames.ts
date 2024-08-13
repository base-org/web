import {
  Address,
  Chain,
  encodePacked,
  keccak256,
  namehash,
  sha256,
  ContractFunctionParameters,
  labelhash,
} from 'viem';
import { normalize } from 'viem/ens';
import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI';
import EARegistrarControllerAbi from 'apps/web/src/abis/EARegistrarControllerAbi';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import RegistryAbi from 'apps/web/src/abis/RegistryAbi';
import profilePictures1 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/1.svg';
import profilePictures2 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/2.svg';
import profilePictures3 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/3.svg';
import profilePictures4 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/4.svg';
import profilePictures5 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/5.svg';
import profilePictures6 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/6.svg';
import profilePictures7 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/7.svg';
import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
import { base, baseSepolia, mainnet } from 'viem/chains';
import { BaseName } from '@coinbase/onchainkit/identity';
import {
  USERNAME_BASE_REGISTRY_ADDRESSES,
  USERNAME_EA_REGISTRAR_CONTROLLER_ADDRESSES,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESSES,
} from 'apps/web/src/addresses/usernames';
import {
  ALLOWED_IMAGE_TYPE,
  MAX_IMAGE_SIZE_IN_MB,
} from 'apps/web/pages/api/basenames/avatar/upload';
import {
  getIpfsGatewayUrl,
  IpfsUrl,
  IsValidIpfsUrl,
  IsValidVercelBlobUrl,
} from 'apps/web/src/utils/urls';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';

export const USERNAME_MIN_CHARACTER_LENGTH = 3;
export const USERNAME_MAX_CHARACTER_LENGTH = 20;

export const USERNAME_DESCRIPTION_MAX_LENGTH = 200;

// DANGER: Changing this post-mainnet launch means the stored data won't be accessible via the updated key
export enum UsernameTextRecordKeys {
  Description = 'description',
  Keywords = 'keywords',
  Url = 'url',
  Email = 'email',
  Phone = 'phone',

  // Socials
  Github = 'com.github',
  Twitter = 'com.twitter',
  Farcaster = 'xyz.farcaster',
  Lens = 'xyz.lens',
  Telegram = 'org.telegram',
  Discord = 'com.discord',

  Avatar = 'avatar',
}

// The social enabled for the current registration / profile pages
export const textRecordsSocialFieldsEnabled = [
  UsernameTextRecordKeys.Twitter,
  UsernameTextRecordKeys.Farcaster,
  UsernameTextRecordKeys.Github,
  UsernameTextRecordKeys.Url,
];

export const textRecordsSocialFieldsEnabledIcons: Record<UsernameTextRecordKeys, string> = {
  [UsernameTextRecordKeys.Twitter]: 'twitter',
  [UsernameTextRecordKeys.Farcaster]: 'farcaster',
  [UsernameTextRecordKeys.Github]: 'github',
  [UsernameTextRecordKeys.Url]: 'website',
};

// Users might add their handle as @myProfile, which breaks on some website
// TODO: Ideally we'd sanitize these before writing them as TextRecord
export const sanitizeHandle = (handle: string) => {
  if (handle.startsWith('@')) {
    handle = handle.substring(1);
  }
  return handle.replace(/^@/, '');
};

export const formatSocialFieldUrl = (key: UsernameTextRecordKeys, handleOrUrl: string) => {
  switch (key) {
    case UsernameTextRecordKeys.Twitter:
      return `https://x.com/${sanitizeHandle(handleOrUrl)}`;
    case UsernameTextRecordKeys.Farcaster:
      return `https://warpcast.com/${sanitizeHandle(handleOrUrl)}`;
    case UsernameTextRecordKeys.Github:
      return `https://github.com/${sanitizeHandle(handleOrUrl)}`;
    case UsernameTextRecordKeys.Url:
      return handleOrUrl;
    default:
      return '';
  }
};

export const formatSocialFieldForDisplay = (key: UsernameTextRecordKeys, handleOrUrl: string) => {
  switch (key) {
    case UsernameTextRecordKeys.Twitter:
    case UsernameTextRecordKeys.Farcaster:
    case UsernameTextRecordKeys.Github:
      return sanitizeHandle(handleOrUrl);

    case UsernameTextRecordKeys.Url:
      return handleOrUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    default:
      return '';
  }
};

export const textRecordsKeysEnabled = [
  UsernameTextRecordKeys.Description,
  UsernameTextRecordKeys.Keywords,
  UsernameTextRecordKeys.Url,
  UsernameTextRecordKeys.Github,
  UsernameTextRecordKeys.Email,
  UsernameTextRecordKeys.Phone,
  UsernameTextRecordKeys.Twitter,
  UsernameTextRecordKeys.Farcaster,
  UsernameTextRecordKeys.Lens,
  UsernameTextRecordKeys.Telegram,
  UsernameTextRecordKeys.Discord,
  UsernameTextRecordKeys.Avatar,
];

export const textRecordsKeysForDisplay = {
  [UsernameTextRecordKeys.Description]: 'Bio',
  [UsernameTextRecordKeys.Keywords]: 'Skills',
  [UsernameTextRecordKeys.Url]: 'Website',
  [UsernameTextRecordKeys.Github]: 'Github',
  [UsernameTextRecordKeys.Email]: 'Email',
  [UsernameTextRecordKeys.Phone]: 'Phone',
  [UsernameTextRecordKeys.Twitter]: 'Twitter / X',
  [UsernameTextRecordKeys.Farcaster]: 'Farcaster',
  [UsernameTextRecordKeys.Lens]: 'Lens',
  [UsernameTextRecordKeys.Telegram]: 'Telegram',
  [UsernameTextRecordKeys.Discord]: 'Discord',
  [UsernameTextRecordKeys.Avatar]: 'Avatar',
};

export const textRecordsKeysPlaceholderForDisplay = {
  [UsernameTextRecordKeys.Description]: 'Tell us about yourself',
  [UsernameTextRecordKeys.Keywords]: 'Skills',
  [UsernameTextRecordKeys.Url]: 'www.name.com',
  [UsernameTextRecordKeys.Github]: 'Username',
  [UsernameTextRecordKeys.Email]: 'Personal email',
  [UsernameTextRecordKeys.Phone]: '+1 415 ..',
  [UsernameTextRecordKeys.Twitter]: 'Username',
  [UsernameTextRecordKeys.Farcaster]: 'Username',
  [UsernameTextRecordKeys.Lens]: 'name.lens',
  [UsernameTextRecordKeys.Telegram]: 'Username',
  [UsernameTextRecordKeys.Discord]: 'Username',
  [UsernameTextRecordKeys.Avatar]: 'Avatar',
};

export const textRecordsEngineersKeywords = [
  'Solidity',
  'Rust',
  'Security',
  'Javascript',
  'Typescript',
  'Go',
  'Game development',
];
export const textRecordsCreativesKeywords = [
  'UI/UX',
  'Prototyping',
  'Research',
  'Music',
  'Illustration',
  'Writing',
  'Video',
  'Graphic design',
  'Animation',
  'Visual design',
];
export const textRecordsCommunnicationKeywords = [
  'Community',
  'Product management',
  'Strategy',
  'Business development',
  'Legal',
  'Marketing',
];

export const textRecordsKeywords = [
  ...textRecordsEngineersKeywords,
  ...textRecordsCreativesKeywords,
  ...textRecordsCommunnicationKeywords,
];

export type UsernameTextRecords = Record<UsernameTextRecordKeys, string>;

// Any names non-compliant with ENSIP-15 will fail when using ENS normalize()
// For now, we'll only accept alphanumerics characters, including accents
export const sanitizeEnsDomainName = (name: string) => {
  return name.replace(/[^a-zA-Z0-9À-ÿ-]/g, '');
};

// Any names non-compliant with ENSIP-15 will fail when using ENS normalize()

export type ValidationResult = {
  valid: boolean;
  message: string;
};

export const validateEnsDomainName = (name: string): ValidationResult => {
  // Proper way to count emojis' length:
  // https://stackoverflow.com/questions/54369513/how-to-count-the-correct-length-of-a-string-with-emojis-in-javascript
  const nameLength = [...name].length;

  if (nameLength > USERNAME_MAX_CHARACTER_LENGTH) {
    return {
      valid: false,
      message: 'Name is too long',
    };
  }

  if (nameLength < USERNAME_MIN_CHARACTER_LENGTH) {
    return {
      valid: false,
      message: 'Name is too short',
    };
  }

  try {
    const normalizedName = normalize(name);
    const valid = typeof normalizedName === 'string';
    if (valid) {
      return {
        valid: true,
        message: 'Valid name',
      };
    } else {
      return {
        valid: false,
        message: 'Name is invalid',
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        valid: false,
        message: error.message,
      };
    }

    return {
      valid: false,
      message: 'Name is invalid',
    };
  }
};

export const normalizeEnsDomainName = (name: string) => {
  try {
    return normalize(name);
  } catch (error) {
    return normalize(sanitizeEnsDomainName(name));
  }
};

export const USERNAME_DOMAINS: Record<number, string> = {
  [baseSepolia.id]: 'basetest.eth',
  [base.id]: 'base.eth',
};

export const formatBaseEthDomain = (name: string, chainId: number): BaseName => {
  return `${name}.${USERNAME_DOMAINS[chainId]}`.toLocaleLowerCase() as BaseName;
};

export const getUsernamePictureIndex = (name: string, totalOptions: number) => {
  const nameAsUint8Array = Uint8Array.from(name.split('').map((letter) => letter.charCodeAt(0)));
  const hash = sha256(nameAsUint8Array);
  const hashValue = parseInt(hash, 16);
  const remainder = hashValue % totalOptions;
  const selectedOption = remainder;
  return selectedOption;
};

export const getUserNamePicture = (username: string) => {
  const profilePictures = [
    profilePictures1,
    profilePictures2,
    profilePictures3,
    profilePictures4,
    profilePictures5,
    profilePictures6,
    profilePictures7,
  ];

  const profilePictureIndex = getUsernamePictureIndex(username, profilePictures.length);

  const selectedProfilePicture = profilePictures[profilePictureIndex] as unknown as StaticImageData;

  return selectedProfilePicture;
};

export const convertChainIdToCoinType = (chainId: number): string => {
  // L1 resolvers to addr
  if (chainId === mainnet.id) {
    return 'addr';
  }

  const cointype = (0x80000000 | chainId) >>> 0;
  return cointype.toString(16).toLocaleUpperCase();
};

export const convertReverseNodeToBytes = ({
  address,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  chainId,
}: {
  address?: Address;
  chainId: number;
}) => {
  if (!address) return;
  const addressFormatted = address.toLocaleLowerCase() as Address;
  const addressNode = keccak256(addressFormatted.substring(2) as Address);

  // TODO: Why doesn't this work with baseSepolia??
  const chainCoinType = convertChainIdToCoinType(base.id);

  const baseReverseNode = namehash(`${chainCoinType.toLocaleUpperCase()}.reverse`);
  const addressReverseNode = keccak256(
    encodePacked(['bytes32', 'bytes32'], [baseReverseNode, addressNode]),
  );

  return addressReverseNode;
};

export enum Discount {
  EARLY_ACCESS = 'EARLY_ACCESS',
  CBID = 'CBID',
  CB1 = 'CB1',
  COINBASE_VERIFIED_ACCOUNT = 'COINBASE_VERIFIED_ACCOUNT',
  BASE_BUILDATHON_PARTICIPANT = 'BASE_BUILDATHON_PARTICIPANT',
  SUMMER_PASS_LVL_3 = 'SUMMER_PASS_LVL_3',
  BNS_NAME = 'BNS_NAME',
  BASE_ETH_NFT = 'BASE_ETH_NFT',
}

export function isValidDiscount(key: string): key is keyof typeof Discount {
  return Object.values(Discount).includes(key as Discount);
}

export function getChainForBasename(username: BaseName): Chain {
  return username.endsWith(`.${USERNAME_DOMAINS[base.id]}`) ? base : baseSepolia;
}

// Assume domainless name to .base.eth
export async function formatDefaultUsername(username: BaseName) {
  if (
    username &&
    !username.endsWith(`.${USERNAME_DOMAINS[baseSepolia.id]}`) &&
    !username.endsWith(`.${USERNAME_DOMAINS[base.id]}`)
  ) {
    return formatBaseEthDomain(username, base.id);
  }

  return username;
}

export const getTokenIdFromBasename = (username: BaseName) => {
  const usernameWithoutDomain = username
    .replace(`.${USERNAME_DOMAINS[base.id]}`, '')
    .replace(`.${USERNAME_DOMAINS[baseSepolia.id]}`, '');

  return BigInt(labelhash(usernameWithoutDomain));
};

export const isBasename = (username: string) => {
  if (username.endsWith(`.${USERNAME_DOMAINS[baseSepolia.id]}`)) {
    return true;
  }

  if (username.endsWith(`.${USERNAME_DOMAINS[base.id]}`)) {
    return true;
  }
  return false;
};

export const isEnsName = (username: string) => {
  if (username.endsWith(`.eth`)) {
    return true;
  }

  if (username.endsWith(`.box`)) {
    return true;
  }
  return false;
};

export const getBasenameAvatarUrl = (source: string) => {
  if (!source) return;

  try {
    const url = new URL(source);
    if (url.protocol === 'https:') {
      return source;
    }

    if (url.protocol === 'ipfs:') {
      return getIpfsGatewayUrl(source as IpfsUrl);
    }
  } catch (error) {
    return;
  }
};

export function validateBasenameAvatarFile(file: File): ValidationResult {
  if (!ALLOWED_IMAGE_TYPE.includes(file.type)) {
    return {
      valid: false,
      message: 'Only supported image are PNG, SVG, JPEG & WebP',
    };
  }
  const bytes = file.size;
  const bytesToMegaBytes = bytes / (1024 * 1024);

  if (bytesToMegaBytes > MAX_IMAGE_SIZE_IN_MB) {
    return {
      valid: false,
      message: 'Max image size is 1Mb',
    };
  }

  // TODO: Validate a square-ish image, with a width/height ratio of minimum 0.8
  return {
    valid: true,
    message: 'Valid avatar file',
  };
}

// Only support IPFS for now
export function validateBasenameAvatarUrl(source: string): ValidationResult {
  try {
    const url = new URL(source);

    if (url.protocol === 'ipfs:') {
      const isValid = IsValidIpfsUrl(source as IpfsUrl);

      return {
        valid: isValid,
        message: isValid ? 'Valid IPFS URL' : 'Invalid IPFS URL',
      };
    }

    if (url.protocol === 'https:') {
      // Only allow vercel upload for now
      const isValid = IsValidVercelBlobUrl(source as IpfsUrl);
      return {
        valid: isValid,
        message: isValid ? 'Valid URL' : 'Invalid URL',
      };
    }

    if (url.protocol === 'http:') {
      return {
        valid: false,
        message: 'Only IPFS URL are allowed',
      };
    }

    return {
      valid: false,
      message: 'Only IPFS URL are allowed',
    };
  } catch (error) {
    return {
      valid: false,
      message: 'Only IPFS URL are allowed',
    };
  }
}

/* 
  Fetch / Api functions
*/

// Get username `addr`
// Get username token `owner`

export async function getBasenameAddress(username: BaseName) {
  const chain = getChainForBasename(username);

  try {
    const client = getBasenamePublicClient(chain.id);
    const ensAddress = await client.getEnsAddress({
      name: normalize(username),
      universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[chain.id],
    });
    return ensAddress;
  } catch (error) {}
}

// Get username token `owner`
export function buildBasenameOwnerContract(username: BaseName): ContractFunctionParameters {
  const chain = getChainForBasename(username);
  return {
    abi: RegistryAbi,
    address: USERNAME_BASE_REGISTRY_ADDRESSES[chain.id],
    args: [namehash(username)],
    functionName: 'owner',
  };
}

export async function getBasenameOwner(username: BaseName) {
  const chain = getChainForBasename(username);

  try {
    const client = getBasenamePublicClient(chain.id);
    const owner = await client.readContract(buildBasenameOwnerContract(username));

    return owner;
  } catch (error) {}
}

// Build a TextRecord contract request
export function buildBasenameTextRecordContract(
  username: BaseName,
  key: UsernameTextRecordKeys,
): ContractFunctionParameters {
  const chain = getChainForBasename(username);
  return {
    abi: L2ResolverAbi,
    address: USERNAME_L2_RESOLVER_ADDRESSES[chain.id],
    args: [namehash(username), key],
    functionName: 'text',
  };
}

// Get a single TextRecord
export async function getBasenameTextRecord(username: BaseName, key: UsernameTextRecordKeys) {
  const chain = getChainForBasename(username);
  try {
    const client = getBasenamePublicClient(chain.id);
    const contractParameters = buildBasenameTextRecordContract(username, key);
    const textRecord = await client.readContract(contractParameters);
    return textRecord as string;
  } catch (error) {}
}

// Get a all TextRecords
export async function getBasenameTextRecords(username: BaseName) {
  const chain = getChainForBasename(username);
  try {
    const readContracts: ContractFunctionParameters[] = textRecordsKeysEnabled.map((key) => {
      return buildBasenameTextRecordContract(username, key);
    });

    const client = getBasenamePublicClient(chain.id);
    const textRecords = await client.multicall({ contracts: readContracts });

    return textRecords;
  } catch (error) {}
}

/* 
  Feature flags
*/

// Force EA/GA based on env
export const IS_EARLY_ACCESS = process.env.NEXT_PUBLIC_USERNAMES_EARLY_ACCESS == 'true';
export const REGISTER_CONTRACT_ABI = IS_EARLY_ACCESS
  ? EARegistrarControllerAbi
  : RegistrarControllerABI;

export const REGISTER_CONTRACT_ADDRESSES = IS_EARLY_ACCESS
  ? USERNAME_EA_REGISTRAR_CONTROLLER_ADDRESSES
  : USERNAME_REGISTRAR_CONTROLLER_ADDRESSES;
