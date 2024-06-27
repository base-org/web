import { sha256 } from 'viem';
import { normalize } from 'viem/ens';
import profilePictures1 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/1.svg';
import profilePictures2 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/2.svg';
import profilePictures3 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/3.svg';
import profilePictures4 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/4.svg';
import profilePictures5 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/5.svg';
import profilePictures6 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/6.svg';
import profilePictures7 from 'apps/web/src/components/ConnectWalletButton/profilesPictures/7.svg';
import { StaticImageData } from 'next/dist/shared/lib/get-img-props';

export const BASE_ETH_DOMAIN = 'base.eth';
export const USERNAME_MIN_CHARACTER_LENGTH = 3;
export const USERNAME_MAX_CHARACTER_LENGTH = 20;

// Any names non-compliant with ENSIP-15 will fail when using ENS normalize()
// For now, we'll only accept alphanumerics characters, including accents
export const sanitizeEnsDomainName = (name: string) => {
  return name.replace(/[^a-zA-Z0-9À-ÿ-]/g, '');
};

export const normalizeEnsDomainName = (name: string) => {
  return normalize(sanitizeEnsDomainName(name));
};

export const formatBaseEthDomain = (name: string) => {
  return `${sanitizeEnsDomainName(name)}.${BASE_ETH_DOMAIN}`.toLocaleLowerCase();
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
