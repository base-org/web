export const BASE_ETH_DOMAIN = 'base.eth';
export const USERNAME_MIN_CHARACTER_LENGTH = 3;
export const formatBaseEthDomain = (name: string) => {
  return `${name}.${BASE_ETH_DOMAIN}`;
};
