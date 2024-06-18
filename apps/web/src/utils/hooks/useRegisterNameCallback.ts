import abi from 'apps/web/src/abis/RegistrarControllerABI.json';
import { normalize } from 'viem/ens';
import { useAccount, useWriteContract } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

function secondsInYears(years: number): number {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return Math.round(years * secondsPerYear);
}

export function useRegisterNameCallback(name: string, years: number) {
  const { address } = useAccount();
  const normalizedName = normalize(name);
  const { writeContract } = useWriteContract();
  const registerRequest = {
    name: normalizedName, // The name being registered.
    owner: address, // The address of the owner for the name.
    duration: secondsInYears(years), // The duration of the registration in seconds.
    resolver: '', // The address of the resolver to set for this name.
    data: [], //  Multicallable data bytes for setting records in the associated resolver upon reigstration.
    reverseRecord: true, // Bool to decide whether to set this name as the "primary" name for the `owner`.
  };

  return () =>
    writeContract({
      abi,
      address: '0xc8b5d24753588fc7ed134df8870f9d5544a3836e',
      functionName: 'discountedRegister',
      args: [registerRequest, 'discountKey', 'validationData'],
      chainId: baseSepolia.id,
    });
}
