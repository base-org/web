import { sha256 } from 'viem';
import { normalize } from 'viem/ens';

export const BASE_ETH_DOMAIN = 'base.eth';
export const USERNAME_MIN_CHARACTER_LENGTH = 3;
export const USERNAME_MAX_CHARACTER_LENGTH = 200;
export const USERNAME_SEPOLIA_CONTRACT_ADDRESS = '0xc8b5d24753588fc7ed134df8870f9d5544a3836e';

// Any names non-compliant with ENSIP-15 will fail when using ENS normalize()
// For now, we'll only accept alphanumerics characters, including accents
export const sanitizeEnsDomainName = (name: string) => {
  return name.replace(/[^a-zA-Z0-9À-ÿ-]/g, '');
};

export const normalizeEnsDomainName = (name: string) => {
  normalize(sanitizeEnsDomainName(name));
};

export const formatBaseEthDomain = (name: string) => {
  return `${sanitizeEnsDomainName(name)}.${BASE_ETH_DOMAIN}`;
};

export const getUsernamePictureIndex = (name: string, totalOptions: number) => {
  const nameAsUint8Array = Uint8Array.from(name.split('').map((letter) => letter.charCodeAt(0)));
  const hash = sha256(nameAsUint8Array);
  const hashValue = parseInt(hash, 16);
  const remainder = hashValue % totalOptions;
  const selectedOption = remainder;
  return selectedOption;
};
