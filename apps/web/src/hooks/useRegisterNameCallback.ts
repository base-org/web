import { useAnalytics } from 'apps/web/contexts/Analytics';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import abi from 'apps/web/src/abis/RegistrarControllerABI';
import {
  USERNAME_CHAIN_ID,
  USERNAME_L2_RESOLVER_ADDRESS,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
} from 'apps/web/src/addresses/usernames';
import { formatBaseEthDomain, normalizeEnsDomainName } from 'apps/web/src/utils/usernames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useMemo } from 'react';
import { encodeFunctionData, namehash } from 'viem';
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';
import { useCapabilities, useWriteContracts } from 'wagmi/experimental';

function secondsInYears(years: number): bigint {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}

export function useRegisterNameCallback(
  name: string,
  value: bigint | undefined,
  years: number,
  discountKey?: `0x${string}`,
  validationData?: `0x${string}`
) {
  const { address, chainId, isConnected } = useAccount();
  const { writeContractsAsync } = useWriteContracts();
  const { data, writeContractAsync, isPending, error } = useWriteContract();
  const {data: availableCapacities} = useCapabilities({ account: address });
  
  const capabilities = useMemo(() => {
    if (!isConnected || !chainId || !availableCapacities) {
      return {};
    }
    const chainCapabilities = availableCapacities[chainId];
    if (chainCapabilities.paymasterService?.supported) {
      return {
        paymasterService: {
          // url: `${document.location.origin}/api/paymaster`
          url: 'https://api.developer.coinbase.com/rpc/v1/base-sepolia/1IhTcPOmhK5aEq-4WqRZMJoOh0oPenD2'
        }
      }
    }
    return {};
  }, [availableCapacities, chainId, isConnected]);  

  const normalizedName = normalizeEnsDomainName(name);
  const { switchChainAsync } = useSwitchChain();
  const isDiscounted = Boolean(discountKey && validationData);
  const { logEventWithContext } = useAnalytics();


  // TODO: I think we could pass arguments to this function instead of the hook
  const registerName = useCallback(async () => {
    if (!address) return;

    const addressData = encodeFunctionData({
      abi: L2ResolverAbi,
      functionName: 'setAddr',
      args: [namehash(formatBaseEthDomain(name)), address],
    });

    const nameData = encodeFunctionData({
      abi: L2ResolverAbi,
      functionName: 'setName',
      args: [namehash(formatBaseEthDomain(name)), formatBaseEthDomain(name)],
    });

    const registerRequest = {
      name: normalizedName, // The name being registered.
      owner: address, // The address of the owner for the name.
      duration: secondsInYears(years), // The duration of the registration in seconds.
      resolver: USERNAME_L2_RESOLVER_ADDRESS, // The address of the resolver to set for this name.
      data: [addressData, nameData], //  Multicallable data bytes for setting records in the associated resolver upon reigstration.
      reverseRecord: true, // Bool to decide whether to set this name as the "primary" name for the `owner`.
    };

    // Log attempt to register name
    logEventWithContext('register_name_transaction_initiated', ActionType.click);
    
    try {
      await switchChainAsync({ chainId: USERNAME_CHAIN_ID });
      
      if (!capabilities || Object.keys(capabilities).length === 0) {
        await writeContractAsync({
          abi,
          address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
          chainId: USERNAME_CHAIN_ID,
          functionName: isDiscounted ? 'discountedRegister' : 'register',
          // @ts-expect-error isDiscounted is sufficient guard for discountKey and validationData presence
          args: isDiscounted ? [registerRequest, discountKey, validationData] : [registerRequest],
          value,
        });
      } else {
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
      }
    } catch (e) {
      logEventWithContext('register_name_transaction_canceled', ActionType.change, {
        error: JSON.stringify(error),
      });
    }
  }, [address, capabilities, discountKey, error, isDiscounted, logEventWithContext, name, normalizedName, switchChainAsync, validationData, value, writeContractAsync, writeContractsAsync, years]);

  return { callback: registerName, data, isPending, error };
}
