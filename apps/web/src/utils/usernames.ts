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
import { SocialPlatform } from 'apps/web/src/utils/socialPlatforms';
import { ADDRESS_REVERSE_NODE } from 'apps/web/src/addresses/usernames';

export const BASE_ETH_DOMAIN = 'base.eth';
export const USERNAME_MIN_CHARACTER_LENGTH = 3;
export const USERNAME_MAX_CHARACTER_LENGTH = 20;

export const USERNAME_DESCRIPTION_MAX_LENGTH = 200;

// DANGER: Changing this post-mainnet launch means the stored data won't be accessible via the updated key
export enum UsernameTextRecordKeys {
  Description = 'description',
  Keywords = 'keywords',

  // TODO: Implement common ENS records: display, avatar, email, mail, notice, location, phone, url,

  // Socials
  Twitter = 'com.twitter',
  Farcaster = 'xyz.farcaster',
  Lens = 'xyz.lens',
  Telegram = 'org.telegram',
  Discord = 'com.discord',
}

export const textRecordsKeyWords = [
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

export const textRecordsKeysEnabled = [
  UsernameTextRecordKeys.Description,
  UsernameTextRecordKeys.Keywords,
  UsernameTextRecordKeys.Twitter,
  UsernameTextRecordKeys.Farcaster,
  UsernameTextRecordKeys.Lens,
  UsernameTextRecordKeys.Telegram,
  UsernameTextRecordKeys.Discord,
];

// // Helper, maps traditional social platforms name to textrecord keys
export const socialPlatformToTextRecordKeys = {
  [SocialPlatform.Twitter]: UsernameTextRecordKeys.Twitter,
  [SocialPlatform.Farcaster]: UsernameTextRecordKeys.Farcaster,
  [SocialPlatform.Lens]: UsernameTextRecordKeys.Lens,
  [SocialPlatform.Telegram]: UsernameTextRecordKeys.Telegram,
  [SocialPlatform.Discord]: UsernameTextRecordKeys.Discord,
};

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

export const formatBaseEthDomain = (name: string) => {
  return `${name}.${BASE_ETH_DOMAIN}`.toLocaleLowerCase();
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

// will convert an address to a reverse node (bytes32)
// used for reverse resolution and other various resolver contract interaction
export const convertReverseNodeToBytes = (address?: Address) => {
  if (!address) return;
  const addressFormatted = address.toLocaleLowerCase() as Address;
  const addressNode = keccak256(addressFormatted.substring(2) as Address);
  const addressReverseNode = keccak256(
    encodePacked(['bytes32', 'bytes32'], [ADDRESS_REVERSE_NODE, addressNode]),
  );
  return addressReverseNode;
};
