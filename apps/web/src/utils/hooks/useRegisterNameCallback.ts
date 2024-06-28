import {
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
} from 'apps/web/src/addresses/usernames';
import { normalizeEnsDomainName } from 'apps/web/src/utils/usernames';
import { useEffect, useMemo } from 'react';
import { baseSepolia } from 'viem/chains';
import { useAccount, useWriteContract } from 'wagmi';

function secondsInYears(years: number): bigint {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}

const abiFromBasescan = [
  {
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'uint256', name: 'duration', type: 'uint256' },
          { internalType: 'address', name: 'resolver', type: 'address' },
          { internalType: 'bytes[]', name: 'data', type: 'bytes[]' },
          { internalType: 'bool', name: 'reverseRecord', type: 'bool' },
        ],
        internalType: 'struct RegistrarController.RegisterRequest',
        name: 'request',
        type: 'tuple',
      },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;

export function useRegisterNameCallback(
  name: string,
  years = 1,
  discountKey?: `0x${string}`,
  validationData?: `0x${string}`,
) {
  if (discountKey) {
    console.log('discountKey', discountKey);
    console.log('validationData', validationData);
  }
  const { address } = useAccount();
  const normalizedName = normalizeEnsDomainName(name);
  const registerRequest = useMemo(
    () => ({
      name: normalizedName, // The name being registered.
      owner: address ?? '0x48c89d77ae34ae475e4523b25ab01e363dce5a78', // The address of the owner for the name.
      duration: secondsInYears(years), // The duration of the registration in seconds.
      resolver: USERNAME_L2_RESOLVER_ADDRESSES[baseSepolia.id], // The address of the resolver to set for this name.
      data: [], //  Multicallable data bytes for setting records in the associated resolver upon reigstration.
      reverseRecord: true, // Bool to decide whether to set this name as the "primary" name for the `owner`.
    }),
    [address, normalizedName, years],
  );

  const { writeContract, error, status } = useWriteContract();
  useEffect(() => {
    console.log('jf status', status);
    console.log('jf error', error);
  }, [error, status]);
  return () => {
    writeContract({
      abi: abiFromBasescan,
      address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[baseSepolia.id],
      chainId: baseSepolia.id,
      functionName: 'register',
      args: [registerRequest],
      value: 1n,
    });
  };
}
