import abi from 'apps/web/src/abis/RegistrarControllerABI.json';
import {
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
} from 'apps/web/src/addresses/usernames';
import { normalizeEnsDomainName } from 'apps/web/src/utils/usernames';
import { useEffect, useMemo, useState } from 'react';
import { Abi, Address, BlockTag, Hex, decodeAbiParameters, getContract } from 'viem';
import { useAccount, useWalletClient, useWriteContract } from 'wagmi';
import { useCapabilities, useWriteContracts } from 'wagmi/experimental';
import {initializeClient} from "../paymasterConfig";
import { CB_SW_PROXY_BYTECODE, CB_SW_V1_IMPLEMENTATION_ADDRESS, ERC_1967_PROXY_IMPLEMENTATION_SLOT } from 'apps/web/src/constants';


function secondsInYears(years: number): number {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return Math.round(years * secondsPerYear);
}

export function useRegisterNameCallback(name: string, years: number): () => void {
  const [wallet, setWallet] = useState<number>(0); // 0 for EOA, 1 for Predeployed, 2 for SCW
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
  
  useEffect(() => {
    const isWalletSCW = async () => {
      const publicClient = initializeClient();
      
      try {
        const code = await publicClient.getCode({address: address as Address});
        if (!code) {
          setWallet(0); // Wallet about to be deployed
          return;
        }
        if (code !== CB_SW_PROXY_BYTECODE) {
          setWallet(0); // EOA
          return;
        }
        const implementation = await publicClient.request({
          method: "eth_getStorageAt",
          params: [address as Address, ERC_1967_PROXY_IMPLEMENTATION_SLOT, "latest"],
        });
        
        const implementationAddress = decodeAbiParameters(
          [{ type: "address" }],
          implementation
        )[0];
        if (implementationAddress !== CB_SW_V1_IMPLEMENTATION_ADDRESS) {
          setWallet(0);
        } 
      } catch (e) {
        console.error("Error", e);
        setWallet(0); // Set to 0 in case of error
      }
    };
    if (address) {
      isWalletSCW().catch(console.error);
    }
    
  }, [address]);

  const normalizedName = normalizeEnsDomainName(name);
  const registerRequest = {
    name: normalizedName, // The name being registered.
    owner: address, // The address of the owner for the name.
    duration: secondsInYears(years), // The duration of the registration in seconds.
    resolver: USERNAME_L2_RESOLVER_ADDRESSES[chainId], // The address of the resolver to set for this name.
    // data: [],
    data: new Uint8Array(32).fill(0x0), //  Multicallable data bytes for setting records in the associated resolver upon reigstration.
    reverseRecord: true, // Bool to decide whether to set this name as the "primary" name for the `owner`.
  };
  // if (client) {
  //   console.log("Test");
  //   const controllerContract = getContract({
  //     abi,
  //     address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[chainId],
  //     client: client,
  //   });
  //   controllerContract.write
  //     .discountedRegister([registerRequest, 0x0, 0x0])
  //     .then(console.log)
  //     .catch(console.error);
  // }

  // discountKey <- getValidDiscounts(): DiscountDetails[]
  // for each discount in DiscountDetails, check if user is valid (?)
  // handler for discount type

  // isValidDiscountedRegistration()
  return async () => {
    if (wallet == 0) {
      try {
        console.log('jf useRegisterNameCallback registerRequest', registerRequest);
        const result = await writeContractAsync({
          abi,
          address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[chainId],
          functionName: 'discountedRegister',
          args: [registerRequest, '0x0000000000000000000000000000000000000000000000000000000000000000', '0x'],
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
        console.log('useRegisterNameCallbackSCW result', resultSCW);
      } catch (e) {
        console.error("SCW call error", e);
      }
    }
  };
}
