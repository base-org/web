import {
  Address,
  Chain,
  encodePacked,
  keccak256,
  namehash,
  ContractFunctionParameters,
  labelhash,
  createPublicClient,
  http,
  sha256,
} from 'viem';
import { normalize } from 'viem/ens';
import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI';
import EARegistrarControllerAbi from 'apps/web/src/abis/EARegistrarControllerAbi';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import RegistryAbi from 'apps/web/src/abis/RegistryAbi';
import BaseRegistrarAbi from 'apps/web/src/abis/BaseRegistrarAbi';
import { base, baseSepolia, mainnet } from 'viem/chains';
import { BaseName } from '@coinbase/onchainkit/identity';
import {
  USERNAME_BASE_REGISTRAR_ADDRESSES,
  USERNAME_BASE_REGISTRY_ADDRESSES,
  USERNAME_EA_REGISTRAR_CONTROLLER_ADDRESSES,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESSES,
} from 'apps/web/src/addresses/usernames';

import {
  getIpfsGatewayUrl,
  IpfsUrl,
  IsValidIpfsUrl,
  IsValidVercelBlobUrl,
} from 'apps/web/src/utils/urls';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { logger } from 'apps/web/src/utils/logger';

// Note: The animations provided by the studio team didn't match the number from our SVGs
//       If we replace those, double check the animation avatar is the same shape as the SVG
import animation1 from 'apps/web/src/components/Basenames/BasenameAvatar/animations/01.json';
import animation2 from 'apps/web/src/components/Basenames/BasenameAvatar/animations/02.json';
import animation3 from 'apps/web/src/components/Basenames/BasenameAvatar/animations/03.json';
import animation4 from 'apps/web/src/components/Basenames/BasenameAvatar/animations/04.json';
import animation5 from 'apps/web/src/components/Basenames/BasenameAvatar/animations/05.json';
import animation6 from 'apps/web/src/components/Basenames/BasenameAvatar/animations/06.json';
import animation7 from 'apps/web/src/components/Basenames/BasenameAvatar/animations/07.json';

import image1 from 'apps/web/src/components/Basenames/BasenameAvatar/images/1.svg';
import image2 from 'apps/web/src/components/Basenames/BasenameAvatar/images/2.svg';
import image3 from 'apps/web/src/components/Basenames/BasenameAvatar/images/3.svg';
import image4 from 'apps/web/src/components/Basenames/BasenameAvatar/images/4.svg';
import image5 from 'apps/web/src/components/Basenames/BasenameAvatar/images/5.svg';
import image6 from 'apps/web/src/components/Basenames/BasenameAvatar/images/6.svg';
import image7 from 'apps/web/src/components/Basenames/BasenameAvatar/images/7.svg';

import { StaticImageData } from 'next/image';
import {
  ALLOWED_IMAGE_TYPE,
  MAX_IMAGE_SIZE_IN_MB,
} from 'apps/web/app/(basenames)/api/basenames/avatar/ipfsUpload/route';

export const USERNAME_MIN_CHARACTER_LENGTH = 3;
export const USERNAME_MAX_CHARACTER_LENGTH = 20;

export const USERNAME_DESCRIPTION_MAX_LENGTH = 200;

// DANGER: Changing this post-mainnet launch means the stored data won't be accessible via the updated key
export enum UsernameTextRecordKeys {
  // Defaults
  Description = 'description',
  Keywords = 'keywords',
  Url = 'url',
  Url2 = 'url2',
  Url3 = 'url3',
  Email = 'email',
  Phone = 'phone',
  Avatar = 'avatar',

  // Socials
  Github = 'com.github',
  Twitter = 'com.twitter',
  Farcaster = 'xyz.farcaster',
  Lens = 'xyz.lens',
  Telegram = 'org.telegram',
  Discord = 'com.discord',

  // Basename specifics
  Frames = 'frames',
  Casts = 'casts',
}

// The social enabled for the current registration / profile pages
export const textRecordsSocialFieldsEnabled = [
  UsernameTextRecordKeys.Twitter,
  UsernameTextRecordKeys.Farcaster,
  UsernameTextRecordKeys.Github,
  UsernameTextRecordKeys.Url,
  UsernameTextRecordKeys.Url2,
  UsernameTextRecordKeys.Url3,
];

export const textRecordsSocialFieldsEnabledIcons: Partial<Record<UsernameTextRecordKeys, string>> =
  {
    [UsernameTextRecordKeys.Twitter]: 'twitter',
    [UsernameTextRecordKeys.Farcaster]: 'farcaster',
    [UsernameTextRecordKeys.Github]: 'github',
    [UsernameTextRecordKeys.Url]: 'website',
    [UsernameTextRecordKeys.Url2]: 'website',
    [UsernameTextRecordKeys.Url3]: 'website',
  };

// Users might add their handle as @myProfile, which breaks on some website
// TODO: Ideally we'd sanitize these before writing them as TextRecord
export const sanitizeHandle = (handle: string) => {
  let handleSanitized = handle;

  // User Somehow entered a full URLs instead of a handle
  try {
    const handleAsUrl = new URL(handleSanitized);
    if (handleAsUrl.pathname) {
      handleSanitized = handleAsUrl.pathname.replace(/\//g, '');
    }
  } catch (error) {
    // Handle isn't a url, no problem
  }

  // remove the '@' if present
  if (handleSanitized.startsWith('@')) {
    handleSanitized = handleSanitized.substring(1);
  }

  return handleSanitized;
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
    case UsernameTextRecordKeys.Url2:
    case UsernameTextRecordKeys.Url3:
      if (!/^https?:\/\//i.test(handleOrUrl)) {
        return `https://${handleOrUrl}`;
      }
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
    case UsernameTextRecordKeys.Url2:
    case UsernameTextRecordKeys.Url3:
      return handleOrUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    default:
      return '';
  }
};

export const textRecordsKeysEnabled = [
  UsernameTextRecordKeys.Description,
  UsernameTextRecordKeys.Keywords,
  UsernameTextRecordKeys.Url,
  UsernameTextRecordKeys.Url2,
  UsernameTextRecordKeys.Url3,
  UsernameTextRecordKeys.Github,
  UsernameTextRecordKeys.Email,
  UsernameTextRecordKeys.Phone,
  UsernameTextRecordKeys.Twitter,
  UsernameTextRecordKeys.Farcaster,
  UsernameTextRecordKeys.Lens,
  UsernameTextRecordKeys.Telegram,
  UsernameTextRecordKeys.Discord,
  UsernameTextRecordKeys.Avatar,
  UsernameTextRecordKeys.Frames,
  UsernameTextRecordKeys.Casts,
];

export const textRecordsKeysForDisplay = {
  [UsernameTextRecordKeys.Description]: 'Bio',
  [UsernameTextRecordKeys.Keywords]: 'Skills',
  [UsernameTextRecordKeys.Url]: 'Website',
  [UsernameTextRecordKeys.Url2]: 'Website',
  [UsernameTextRecordKeys.Url3]: 'Website',
  [UsernameTextRecordKeys.Github]: 'Github',
  [UsernameTextRecordKeys.Email]: 'Email',
  [UsernameTextRecordKeys.Phone]: 'Phone',
  [UsernameTextRecordKeys.Twitter]: 'Twitter / X',
  [UsernameTextRecordKeys.Farcaster]: 'Farcaster',
  [UsernameTextRecordKeys.Lens]: 'Lens',
  [UsernameTextRecordKeys.Telegram]: 'Telegram',
  [UsernameTextRecordKeys.Discord]: 'Discord',
  [UsernameTextRecordKeys.Avatar]: 'Avatar',
  [UsernameTextRecordKeys.Frames]: 'Frames',
  [UsernameTextRecordKeys.Casts]: 'Pinned Casts',
};

export const textRecordsKeysPlaceholderForDisplay = {
  [UsernameTextRecordKeys.Description]: 'Tell us about yourself',
  [UsernameTextRecordKeys.Keywords]: 'Skills',
  [UsernameTextRecordKeys.Url]: 'www.name.com',
  [UsernameTextRecordKeys.Url2]: 'www.thingyoubuilt.com',
  [UsernameTextRecordKeys.Url3]: 'www.workyoureproudof.com',
  [UsernameTextRecordKeys.Github]: 'Username',
  [UsernameTextRecordKeys.Email]: 'Personal email',
  [UsernameTextRecordKeys.Phone]: '+1 415 ..',
  [UsernameTextRecordKeys.Twitter]: 'Username',
  [UsernameTextRecordKeys.Farcaster]: 'Username',
  [UsernameTextRecordKeys.Lens]: 'name.lens',
  [UsernameTextRecordKeys.Telegram]: 'Username',
  [UsernameTextRecordKeys.Discord]: 'Username',
  [UsernameTextRecordKeys.Avatar]: 'Avatar',
  [UsernameTextRecordKeys.Frames]: 'Farcaster frame url',
  [UsernameTextRecordKeys.Casts]: 'https://warpcast.com/...',
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
    try {
      return normalize(sanitizeEnsDomainName(name));
    } catch (sanitizedError) {
      return '';
    }
  }
};

export const USERNAME_DOMAINS: Record<number, string> = {
  [baseSepolia.id]: 'basetest.eth',
  [base.id]: 'base.eth',
};

export const formatBaseEthDomain = (name: string, chainId: number): BaseName => {
  return `${name}.${USERNAME_DOMAINS[chainId] ?? '.base.eth'}`.toLocaleLowerCase() as BaseName;
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
  BASE_DOT_ETH_NFT = 'BASE_DOT_ETH_NFT',
}

export function isValidDiscount(key: string): key is keyof typeof Discount {
  return Object.values(Discount).includes(key as Discount);
}

export function getChainForBasename(username: BaseName): Chain {
  return username.endsWith(`.${USERNAME_DOMAINS[base.id]}`) ? base : baseSepolia;
}

export function normalizeName(name: string) {
  const normalizedName: string = normalizeEnsDomainName(name);
  const { valid } = validateEnsDomainName(name);

  if (!valid) {
    return null;
  }
  return normalizedName;
}

// Assume domainless name to .base.eth
export async function formatDefaultUsername(username: string | BaseName) {
  if (
    username &&
    !username.endsWith(`.${USERNAME_DOMAINS[baseSepolia.id]}`) &&
    !username.endsWith(`.${USERNAME_DOMAINS[base.id]}`)
  ) {
    return formatBaseEthDomain(username, base.id);
  }

  return username as BaseName;
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

/*
  Get username Basename `editor` in the Base Registrar (different from NFT owner)
*/
export function buildBasenameEditorContract(username: BaseName): ContractFunctionParameters {
  const chain = getChainForBasename(username);
  return {
    abi: RegistryAbi,
    address: USERNAME_BASE_REGISTRY_ADDRESSES[chain.id],
    args: [namehash(username)],
    functionName: 'owner',
  };
}

export async function getBasenameEditor(username: BaseName) {
  const chain = getChainForBasename(username);

  try {
    const client = getBasenamePublicClient(chain.id);
    const owner = await client.readContract(buildBasenameEditorContract(username));

    return owner;
  } catch (error) {}
}

/*
  Get username NFT `owner` in the Base Registry (different from Basename editor)
*/

export function buildBasenameOwnerContract(username: BaseName): ContractFunctionParameters {
  const chain = getChainForBasename(username);
  const tokenId = getTokenIdFromBasename(username);
  return {
    abi: BaseRegistrarAbi,
    address: USERNAME_BASE_REGISTRAR_ADDRESSES[chain.id],
    args: [tokenId],
    functionName: 'ownerOf',
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

export async function getBasenameNameExpires(username: BaseName) {
  const chain = getChainForBasename(username);
  const tokenId = getTokenIdFromBasename(username);
  try {
    const client = getBasenamePublicClient(chain.id);
    const nameExpires = await client.readContract({
      abi: BaseRegistrarAbi,
      address: USERNAME_BASE_REGISTRAR_ADDRESSES[chain.id],
      args: [tokenId],
      functionName: 'nameExpires',
    });

    return nameExpires;
  } catch (error) {}
}

export async function getBasenameAvailable(name: string, chain: Chain): Promise<boolean> {
  try {
    const client = createPublicClient({
      chain: chain,
      transport: http(),
    });
    const normalizedName = normalizeName(name);
    if (!normalizedName) {
      throw new Error('Invalid ENS domain name');
    }

    const available = await client.readContract({
      address: REGISTER_CONTRACT_ADDRESSES[chain.id],
      abi: REGISTER_CONTRACT_ABI,
      functionName: 'available',
      args: [normalizedName],
    });
    return available;
  } catch (error) {
    logger.error('Error checking name availability:', error);
    throw error;
  }
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
  Reclaim a Basename contrat write method
*/
export function buildBasenameReclaimContract(
  username: BaseName,
  address: Address,
): ContractFunctionParameters {
  const chain = getChainForBasename(username);
  const tokenId = getTokenIdFromBasename(username);
  return {
    abi: BaseRegistrarAbi,
    address: USERNAME_BASE_REGISTRAR_ADDRESSES[chain.id],
    args: [tokenId, address],
    functionName: 'reclaim',
  };
}

/*
  Basename avatar / animations
*/

export const getUsernamePictureIndex = (name: string, totalOptions: number) => {
  const nameAsUint8Array = Uint8Array.from(name.split('').map((letter) => letter.charCodeAt(0)));
  const hash = sha256(nameAsUint8Array);
  const hashValue = parseInt(hash, 16);
  const remainder = hashValue % totalOptions;
  const selectedOption = remainder;
  return selectedOption;
};

export const getBasenameAnimation = (username: string) => {
  const animations = [
    animation1,
    animation2,
    animation3,
    animation4,
    animation5,
    animation6,
    animation7,
  ];
  const profilePictureIndex = getUsernamePictureIndex(username, animations.length);
  const selectedAnimation = animations[profilePictureIndex];
  return selectedAnimation;
};

export const getBasenameImage = (username: string) => {
  const images = [image1, image2, image3, image4, image5, image6, image7];
  const profilePictureIndex = getUsernamePictureIndex(username, images.length);
  const selectedAnimation = images[profilePictureIndex] as StaticImageData;
  return selectedAnimation;
};

/*
  Feature flags
*/

// Force EA/GA based on env
export const IS_EARLY_ACCESS = process.env.NEXT_PUBLIC_USERNAMES_EARLY_ACCESS == 'true';
export const USERNAMES_PINNED_CASTS_ENABLED =
  process.env.NEXT_PUBLIC_USERNAMES_PINNED_CASTS_ENABLED === 'true';
export const REGISTER_CONTRACT_ABI = IS_EARLY_ACCESS
  ? EARegistrarControllerAbi
  : RegistrarControllerABI;

export const REGISTER_CONTRACT_ADDRESSES = IS_EARLY_ACCESS
  ? USERNAME_EA_REGISTRAR_CONTROLLER_ADDRESSES
  : USERNAME_REGISTRAR_CONTROLLER_ADDRESSES;
