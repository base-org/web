import abi from 'apps/web/src/abis/RegistrarControllerABI.json';
import { USERNAME_SEPOLIA_CONTRACT_ADDRESS, formatNameForEns } from 'apps/web/src/utils/usernames';
import { getContract } from 'viem';
import { normalize } from 'viem/ens';
import { useAccount, useWalletClient, useWriteContract } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

function secondsInYears(years: number): number {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return Math.round(years * secondsPerYear);
}

export function useRegisterNameCallback(name: string, years: number) {
  const { address } = useAccount();
  const formattedName = formatNameForEns(name);
  const normalizedName = normalize(formattedName);
  const { data: client } = useWalletClient();
  const registerRequest = {
    name: normalizedName, // The name being registered.
    owner: address, // The address of the owner for the name.
    duration: secondsInYears(years), // The duration of the registration in seconds.
    resolver: '0x51A16746Af2247DCA3665c078cCCf5678d19E366', // The address of the resolver to set for this name.
    data: new Uint8Array(32).fill(0x0), //  Multicallable data bytes for setting records in the associated resolver upon reigstration.
    reverseRecord: true, // Bool to decide whether to set this name as the "primary" name for the `owner`.
  };
  if (client) {
    const controllerContract = getContract({
      abi,
      address: USERNAME_SEPOLIA_CONTRACT_ADDRESS,
      client: client,
    });
    controllerContract.write
      .discountedRegister([registerRequest, 0x0, 0x0])
      .then(console.log)
      .catch(console.error);
  }
  const { writeContractAsync } = useWriteContract();

  // discountKey <- getValidDiscounts(): DiscountDetails[]
  // for each discount in DiscountDetails, check if user is valid (?)
  // handler for discount type

  // isValidDiscountedRegistration()
  return async () => {
    try {
      console.log('jf registerRequest', registerRequest);
      const result = await writeContractAsync({
        abi,
        address: USERNAME_SEPOLIA_CONTRACT_ADDRESS,
        functionName: 'discountedRegister',
        args: [registerRequest, 0x0, 0x0],
        chainId: baseSepolia.id,
      });
      console.log('jf result', result);
    } catch (e) {
      console.error('jf e', e);
    }
  };
}
