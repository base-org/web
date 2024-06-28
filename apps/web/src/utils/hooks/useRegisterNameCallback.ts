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
import { ResolvedRegister, type Config } from "wagmi";
import { base, baseSepolia } from 'viem/chains';



function secondsInYears(years: number): number {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return Math.round(years * secondsPerYear);
}

export function useRegisterNameCallback(
  name: string,
  years: number,
  discountKey?: string,
  validationData?: string): () => void {
  const [wallet, setWallet] = useState<number>(2); // 0 for EOA, 1 for Predeployed, 2 for SCW
  const { address, chainId } = useAccount();
  
  const account = useAccount();
  const { data: client } = useWalletClient();
  const { writeContract } = useWriteContract();
  const network = chainId === baseSepolia.id ? chainId : base.id;
  const { writeContracts } = useWriteContracts(); // For Smart Contract Wallet calls
  
  useEffect(() => {
    const isWalletSCW = async () => {
      const publicClient = initializeClient();
      
      try {
        const code = await publicClient.getCode({address: address as Address});
        console.log("code", code);
        if (!code) {
          setWallet(0); // EoA
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
  
  
  const {data: availableCapacities} = useCapabilities({
      account: address
    });

  // const { data: availableCapacities } = wallet === 2
  // ? useCapabilities({ account: address })
  // : { data: undefined };
  
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
  const registerRequest = useMemo(
    () => ({
      name: normalizedName, // The name being registered.
      owner: address, // The address of the owner for the name.
      duration: secondsInYears(years), // The duration of the registration in seconds.
      resolver: USERNAME_L2_RESOLVER_ADDRESSES[network], // The address of the resolver to set for this name.
      data: ['0x0'], //  Multicallable data bytes for setting records in the associated resolver upon reigstration.
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

 
  return () => {

    if (wallet == 0) {
      try {
        const result = writeContract(writeContractArgs);
        console.log('jf useRegisterNameCallback result', result);
      } catch (e) {
        console.error('useRegisterNameCallback:', e);
      }
    } else {
      try {
        const resultSCW = writeContracts({
          contracts: [
            {
              address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[chainId],
              abi: abi,
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
  }
  ;

}
