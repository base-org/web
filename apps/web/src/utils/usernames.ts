export const BASE_ETH_DOMAIN = 'base.eth';
export const USERNAME_MIN_CHARACTER_LENGTH = 3;
export const USERNAME_MAX_CHARACTER_LENGTH = 200;

export const formatNameForEns = (name: string) => {
  // ens doesn't like spaces and . / :
  return name.replace(/[./:\s]/g, '').toLocaleLowerCase();
};

export const formatBaseEthDomain = (name: string) => {
  return `${formatNameForEns(name)}.${BASE_ETH_DOMAIN}`;
};
