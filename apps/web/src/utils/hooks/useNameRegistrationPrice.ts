import abi from 'apps/web/src/abis/RegistrarControllerABI.json';
import { USERNAME_REGISTRAR_CONTROLLER_ADDRESS } from 'apps/web/src/addresses/usernames';
import { normalizeEnsDomainName } from 'apps/web/src/utils/usernames';
import { useMemo } from 'react';
import { base, baseSepolia } from 'viem/chains';
import { useAccount, useReadContract } from 'wagmi';

function secondsInYears(years: number): number {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return Math.round(years * secondsPerYear);
}

export function useNameRegistrationPrice(
  name: string,
  years: number,
  discountKey: `0x${string}` | undefined,
) {
  const { chainId } = useAccount();
  const network = chainId === baseSepolia.id ? chainId : base.id;
  const normalizedName = normalizeEnsDomainName(name);
  const address = USERNAME_REGISTRAR_CONTROLLER_ADDRESS[network];
  const readContractArgs = useMemo(
    () =>
      discountKey
        ? {
            address,
            abi,
            functionName: 'discountedRegisterPrice',
            args: [normalizedName, secondsInYears(years), discountKey],
          }
        : {
            address,
            abi,
            functionName: 'registerPrice',
            args: [normalizedName, secondsInYears(years)],
          },
    [address, discountKey, normalizedName, years],
  );
  const { data, isLoading, status, error } = useReadContract(readContractArgs);
  console.log('jf useNameRegistrationPrice', data, status, error);
  return { data, isLoading };
}
