import abi from 'apps/web/src/abis/RegistrarControllerABI.json';
import {
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
} from 'apps/web/src/addresses/usernames';
import { normalizeEnsDomainName } from 'apps/web/src/utils/usernames';
import { getContract } from 'viem';
import { useAccount, useWalletClient, useWriteContract } from 'wagmi';

function secondsInYears(years: number): number {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return Math.round(years * secondsPerYear);
}

export function useRegisterNameCallback(name: string, years: number): () => void {
  const { address, chainId } = useAccount();
  const { data: client } = useWalletClient();
  const { writeContractAsync } = useWriteContract();

  if (chainId === undefined) {
    console.error(
      'useRegisterNameCallback: Unable to create name registration callback; chainId must be defined.',
    );
    return () => {};
  }

  const normalizedName = normalizeEnsDomainName(name);
  const registerRequest = {
    name: normalizedName, // The name being registered.
    owner: address, // The address of the owner for the name.
    duration: secondsInYears(years), // The duration of the registration in seconds.
    resolver: USERNAME_L2_RESOLVER_ADDRESSES[chainId], // The address of the resolver to set for this name.
    data: new Uint8Array(32).fill(0x0), //  Multicallable data bytes for setting records in the associated resolver upon reigstration.
    reverseRecord: true, // Bool to decide whether to set this name as the "primary" name for the `owner`.
  };
  if (client) {
    const controllerContract = getContract({
      abi,
      address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[chainId],
      client: client,
    });
    controllerContract.write
      .discountedRegister([registerRequest, 0x0, 0x0])
      .then(console.log)
      .catch(console.error);
  }

  // discountKey <- getValidDiscounts(): DiscountDetails[]
  // for each discount in DiscountDetails, check if user is valid (?)
  // handler for discount type

  // isValidDiscountedRegistration()
  return () => {
    console.log('jf useRegisterNameCallback registerRequest', registerRequest);
    writeContractAsync({
      abi,
      address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[chainId],
      functionName: 'discountedRegister',
      args: [registerRequest, 0x0, 0x0],
      chainId,
    }).catch(console.error);
  };
}
