export const BASE_ETH_DOMAIN = 'base.eth';
export const USERNAME_MIN_CHARACTER_LENGTH = 3;

export const formatNameForEns = (name: string) => {
  return name.replace(/[.\s]/g, '').toLocaleLowerCase();
};

export const formatBaseEthDomain = (name: string) => {
  return `${formatNameForEns(name)}.${BASE_ETH_DOMAIN}`;
};
