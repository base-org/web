import abi from 'apps/web/src/abis/RegistrarControllerABI';
import {
  USERNAME_CHAIN_ID,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
} from 'apps/web/src/addresses/usernames';
import { normalizeEnsDomainName } from 'apps/web/src/utils/usernames';
import { useReadContract } from 'wagmi';

function secondsInYears(years: number) {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}

export function useDiscountedNameRegistrationPrice(
  name: string,
  years: number,
  discountKey: `0x${string}` | undefined,
) {
  const normalizedName = normalizeEnsDomainName(name);

  return useReadContract({
    address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
    abi,
    functionName: 'discountedRegisterPrice',
    args: [normalizedName, secondsInYears(years), discountKey ?? '0x'],
    chainId: USERNAME_CHAIN_ID,
  });
}
export function useNameRegistrationPrice(name: string, years: number) {
  const normalizedName = normalizeEnsDomainName(name);

  return useReadContract({
    address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
    abi,
    functionName: 'registerPrice',
    args: [normalizedName, secondsInYears(years)],
    chainId: USERNAME_CHAIN_ID,
  });
}
