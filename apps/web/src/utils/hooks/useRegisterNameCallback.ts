import abi from 'apps/web/src/abis/RegistrarControllerABI.json';
import {
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
} from 'apps/web/src/addresses/usernames';
import { normalizeEnsDomainName } from 'apps/web/src/utils/usernames';
import { useMemo } from 'react';
import { Abi, getContract } from 'viem';
import { useAccount, useWalletClient, useWriteContract } from 'wagmi';
import { useCapabilities, useWriteContracts } from 'wagmi/experimental'

function secondsInYears(years: number): number {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return Math.round(years * secondsPerYear);
}

export function useRegisterNameCallback(name: string, years: number): () => void {
  const { address, chainId } = useAccount();
  const account = useAccount();
  const { data: client } = useWalletClient();
  const { writeContractAsync } = useWriteContract();
  const { writeContractsAsync } = useWriteContracts(); // For Smart Contract Wallet calls

  const {data: availableCapacities} = useCapabilities({
    account: address
  });
  const capabilities = useMemo(() => {
    if (!account.isConnected || !chainId || !availableCapacities) {
      return {};
    }
    const chainCapabilities = availableCapacities[chainId];
    if (chainCapabilities["paymasterService"] && chainCapabilities["paymasterService"].supported) {
      return {
        paymasterService: {
          url: `${document.location.origin}/api/paymaster`
        }
      }
    }
    return {};
  }, [availableCapacities, chainId]);

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
  const flag = true; // Change flag to isAccountACoinbaseWallet

  // discountKey <- getValidDiscounts(): DiscountDetails[]
  // for each discount in DiscountDetails, check if user is valid (?)
  // handler for discount type

  // isValidDiscountedRegistration()
  return async () => {
    if (flag) {
      try {
        console.log('jf useRegisterNameCallback registerRequest', registerRequest);
        const result = await writeContractAsync({
          abi,
          address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[chainId],
          functionName: 'discountedRegister',
          args: [registerRequest, 0x0, 0x0],
          chainId,
        });
        console.log('jf useRegisterNameCallback result', result);
      } catch (e) {
        console.error('useRegisterNameCallback:', e);
      }
    } else {
      try {
        const resultSCW = await writeContractsAsync({
          contracts: [
            {
              address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[chainId],
              abi: abi as Abi,
              functionName: 'register',
              args: [registerRequest],
            }
          ], capabilities: capabilities
        });
      } catch (e) {
        console.error("SCW call error", e);
      }
    }
  };
}
