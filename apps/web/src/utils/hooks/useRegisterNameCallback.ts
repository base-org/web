import abi from 'apps/web/src/abis/RegistrarControllerABI.json';
import {
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
} from 'apps/web/src/addresses/usernames';
import { normalizeEnsDomainName } from 'apps/web/src/utils/usernames';
import { useMemo } from 'react';
import { base, baseSepolia } from 'viem/chains';
import { useAccount, useWriteContract } from 'wagmi';

function secondsInYears(years: number): number {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return Math.round(years * secondsPerYear);
}

export function useRegisterNameCallback(
  name: string,
  years: number,
  discountKey?: string,
  validationData?: string,
): () => void {
  const { address, chainId } = useAccount();
  const { writeContract } = useWriteContract();
  const network = chainId === baseSepolia.id ? chainId : base.id;
  const normalizedName = normalizeEnsDomainName(name);
  const registerRequest = useMemo(
    () => ({
      name: normalizedName, // The name being registered.
      owner: address, // The address of the owner for the name.
      duration: secondsInYears(years), // The duration of the registration in seconds.
      resolver: USERNAME_L2_RESOLVER_ADDRESSES[network], // The address of the resolver to set for this name.
      data: '0x0', //  Multicallable data bytes for setting records in the associated resolver upon reigstration.
      reverseRecord: true, // Bool to decide whether to set this name as the "primary" name for the `owner`.
    }),
    [address, network, normalizedName, years],
  );
  const writeContractArgs = useMemo(() => {
    return {
      abi,
      address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[network],
      chainId: network,
      ...(Boolean(discountKey && validationData)
        ? {
            functionName: 'discountedRegister',
            args: [registerRequest, discountKey, validationData],
          }
        : { functionName: 'register', args: [registerRequest] }),
    };
  }, [discountKey, network, registerRequest, validationData]);

  return () => writeContract(writeContractArgs);
}
