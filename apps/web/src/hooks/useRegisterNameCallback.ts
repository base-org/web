import { useAnalytics } from 'apps/web/contexts/Analytics';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import abi from 'apps/web/src/abis/RegistrarControllerABI';
import {
  USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
  USERNAME_CHAIN_ID,
  USERNAME_L2_RESOLVER_ADDRESS,
} from 'apps/web/src/addresses/usernames';
import { normalizeEnsDomainName, formatBaseEthDomain } from 'apps/web/src/utils/usernames';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { Abi, Address, BlockTag, Hex, decodeAbiParameters, getContract, namehash, encodeFunctionData } from 'viem';
import { useAccount, useWalletClient, useWriteContract, useSwitchChain } from 'wagmi';
import { useCapabilities, useWriteContracts } from 'wagmi/experimental';
import {initializeClient} from "../utils/paymasterConfig";
import { CB_SW_PROXY_BYTECODE, CB_SW_V1_IMPLEMENTATION_ADDRESS, ERC_1967_PROXY_IMPLEMENTATION_SLOT } from 'apps/web/src/constants';
import { ResolvedRegister, type Config } from "wagmi";
import { base, baseSepolia } from 'viem/chains';
import { ActionType } from 'libs/base-ui/utils/logEvent';

function secondsInYears(years: number): bigint {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}

export function useRegisterNameCallback(
  name: string,
  value: bigint | undefined,
  years: number,
  discountKey?: `0x${string}`,
  validationData?: `0x${string}`,) {
  if (discountKey) {
    console.log('discountKey', discountKey);
    console.log('validationData', validationData);
  }
  const { address, chainId } = useAccount();
  
  const account = useAccount();
  const { data: client } = useWalletClient();
  const { writeContract } = useWriteContract();
  const network = chainId === baseSepolia.id ? chainId : base.id;
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
          // url: `${document.location.origin}/api/paymaster`
          url: 'https://api.developer.coinbase.com/rpc/v1/base-sepolia/1IhTcPOmhK5aEq-4WqRZMJoOh0oPenD2'
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
  const { switchChainAsync } = useSwitchChain();
  const isDiscounted = Boolean(discountKey && validationData);
  const { logEventWithContext } = useAnalytics();

  const { data, writeContractAsync, isPending, error } = useWriteContract();

  // TODO: I think we could pass arguments to this function instead of the hook
  const registerName = useCallback(async () => {
    if (!address) return;
    const addressData = encodeFunctionData({
      abi: L2ResolverAbi,
      functionName: 'setAddr',
      args: [namehash(formatBaseEthDomain(name)), address],
    });

    const registerRequest = {
      name: normalizedName, // The name being registered.
      owner: address ?? '0x48c89d77ae34ae475e4523b25ab01e363dce5a78', // The address of the owner for the name.
      duration: secondsInYears(years), // The duration of the registration in seconds.
      resolver: USERNAME_L2_RESOLVER_ADDRESS, // The address of the resolver to set for this name.
      data: [addressData], //  Multicallable data bytes for setting records in the associated resolver upon reigstration.
      reverseRecord: true, // Bool to decide whether to set this name as the "primary" name for the `owner`.
    };

    // Log attempt to register name
    logEventWithContext('register_name_transaction_initiated', ActionType.click);
    
    if (!capabilities || Object.keys(capabilities).length === 0) {
      try {
        await switchChainAsync({ chainId: USERNAME_CHAIN_ID });

        await writeContractAsync({
          abi,
          address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
          chainId: USERNAME_CHAIN_ID,
          functionName: isDiscounted ? 'discountedRegister' : 'register',
          // @ts-expect-error isDiscounted is sufficient guard for discountKey and validationData presence
          args: isDiscounted ? [registerRequest, discountKey, validationData] : [registerRequest],
          value,
        });
      } catch (e) {
        logEventWithContext('register_name_transaction_canceled', ActionType.change, {
          error: JSON.stringify(error),
        });
      }
    }
    else {
     await switchChainAsync({ chainId: USERNAME_CHAIN_ID })
     
      try {
         await writeContractsAsync({
          contracts: [
            {
              address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
              abi: abi,
              functionName: isDiscounted ? 'discountedRegister' : 'register',
              args: isDiscounted ? [registerRequest, discountKey, validationData] : [registerRequest],
              value
            }
          ], 
          capabilities: capabilities,
          chainId: USERNAME_CHAIN_ID
        });
      } catch (e) {
        logEventWithContext('register_name_transaction_canceled', ActionType.change, {
          error: JSON.stringify(error),
        });
      }
    }
  }, [
    address,
    discountKey,
    error,
    isDiscounted,
    logEventWithContext,
    name,
    normalizedName,
    switchChainAsync,
    validationData,
    value,
    writeContractAsync,
    years,
  ]);

  return { callback: registerName, data, isPending, error };
}
