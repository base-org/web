import abi from 'apps/web/src/abis/RegistrarControllerABI';
import { USERNAME_REGISTRAR_CONTROLLER_ADDRESS } from 'apps/web/src/addresses/usernames';
import { normalizeEnsDomainName } from 'apps/web/src/utils/usernames';
import { useMemo } from 'react';
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

  const readContractCall = useMemo(
    () =>
      ({
        address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
        abi,
        functionName: 'discountedRegisterPrice',
        args: [normalizedName, secondsInYears(years), discountKey ?? '0x'],
      } as const),
    [discountKey, normalizedName, years],
  );

  return useReadContract(readContractCall);
}
export function useNameRegistrationPrice(name: string, years: number) {
  const normalizedName = normalizeEnsDomainName(name);

  const readContractCall = useMemo(
    () =>
      ({
        address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
        abi,
        functionName: 'registerPrice',
        args: [normalizedName, secondsInYears(years)],
      } as const),
    [normalizedName, years],
  );

  return useReadContract(readContractCall);
}
