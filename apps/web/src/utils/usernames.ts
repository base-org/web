import { Address, encodePacked, keccak256, sha256 } from 'viem';
import { normalize } from 'viem/ens';
import profilePictures1 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/1.svg';
import profilePictures2 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/2.svg';
import profilePictures3 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/3.svg';
import profilePictures4 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/4.svg';
import profilePictures5 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/5.svg';
import profilePictures6 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/6.svg';
import profilePictures7 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/7.svg';
import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
import { ADDRESS_REVERSE_NODE, USERNAME_CHAIN_ID } from 'apps/web/src/addresses/usernames';
import { base, baseSepolia } from 'viem/chains';

export const USERNAME_MIN_CHARACTER_LENGTH = 3;
export const USERNAME_MAX_CHARACTER_LENGTH = 20;

export const USERNAME_DESCRIPTION_MAX_LENGTH = 200;

export type BaseMainnetName = `${string}.base.eth`;
export type BaseSepoliaName = `${string}.basetest.eth`;

export type BaseName = BaseMainnetName | BaseSepoliaName;

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
};

export const textRecordsKeywords = [
  'Solidity',
  'Rust',
  'Go',
  'Javascript',
  'Typescript',
  'Security',
  'Product management',
  'Business development',
  'UI/UX',
  'Visual design',
  'Prototyping',
  'Research',
  'Illustration',
  'Music',
  'Graphic design',
  'Animation',
  'Game development',
];

export type UsernameTextRecords = Record<UsernameTextRecordKeys, string>;

// Any names non-compliant with ENSIP-15 will fail when using ENS normalize()
// For now, we'll only accept alphanumerics characters, including accents
export const sanitizeEnsDomainName = (name: string) => {
  return name.replace(/[^a-zA-Z0-9À-ÿ-]/g, '');
};

// Any names non-compliant with ENSIP-15 will fail when using ENS normalize()
export type EnsDomainNameValidationResult = {
  valid: boolean;
  message?: string;
};

export const validateEnsDomainName = (name: string): EnsDomainNameValidationResult => {
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
    return {
      valid,
    };
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

export const USERNAME_DOMAIN = USERNAME_DOMAINS[USERNAME_CHAIN_ID];

export const formatBaseEthDomain = (name: string): BaseName => {
  return `${name}.${USERNAME_DOMAIN}`.toLocaleLowerCase() as BaseName;
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

export const convertReverseNodeToBytes = (address?: Address) => {
  if (!address) return;
  const addressFormatted = address.toLocaleLowerCase() as Address;
  const addressNode = keccak256(addressFormatted.substring(2) as Address);
  const addressReverseNode = keccak256(
    encodePacked(['bytes32', 'bytes32'], [ADDRESS_REVERSE_NODE, addressNode]),
  );

  return addressReverseNode;
};

export enum Discount {
  CBID = 'CBID',
  CB1 = 'CB1',
  COINBASE_VERIFIED_ACCOUNT = 'COINBASE_VERIFIED_ACCOUNT',
}

export function isValidDiscount(key: string): key is keyof typeof Discount {
  return Object.values(Discount).includes(key as Discount);
}
