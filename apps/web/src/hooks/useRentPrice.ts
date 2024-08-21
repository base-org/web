import { USERNAME_REGISTRAR_CONTROLLER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI';
import { useReadContract } from 'wagmi';
import { base } from 'viem/chains';
import { normalizeEnsDomainName } from 'apps/web/src/utils/usernames';

function secondsInYears(years: number) {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}

type RentPriceResponseType = {
  data: {
    base: bigint;
    premium: bigint;
  };
};

export function useRentPrice(name: string, years: number) {
  const normalizedName = normalizeEnsDomainName(name);

  const { data }: RentPriceResponseType = useReadContract({
    abi: RegistrarControllerABI,
    address: USERNAME_REGISTRAR_CONTROLLER_ADDRESSES[base.id],
    functionName: 'rentPrice',
    args: [normalizedName, secondsInYears(years)],
    chainId: base.id,
  });

  const basePrice = data?.base;
  const premiumPrice = data?.premium;

  return { basePrice, premiumPrice };
}
