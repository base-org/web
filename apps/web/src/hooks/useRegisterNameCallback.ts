import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import {
  formatBaseEthDomain,
  IS_EARLY_ACCESS,
  normalizeEnsDomainName,
  REGISTER_CONTRACT_ABI,
  REGISTER_CONTRACT_ADDRESSES,
} from 'apps/web/src/utils/usernames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useMemo } from 'react';
import { encodeFunctionData, namehash } from 'viem';
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';
import { useCapabilities, useWriteContracts } from 'wagmi/experimental';

function secondsInYears(years: number): bigint {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}

type UseRegisterNameCallbackReturnValue = {
  callback: () => Promise<void>;
  data: `0x${string}` | undefined;
  callBatchId: string | undefined;
  isPending: boolean;
  error: string | undefined | null;
};

export function useRegisterNameCallback(
  name: string,
  value: bigint | undefined,
  years: number,
  discountKey?: `0x${string}`,
  validationData?: `0x${string}`,
): UseRegisterNameCallbackReturnValue {
  const { address, chainId, isConnected } = useAccount();
  const { basenameChain } = useBasenameChain();
  const { logError } = useErrors();
  const {
    data: callBatchId,
    writeContractsAsync,
    isPending: paymasterIsPending,
    error: paymasterError,
  } = useWriteContracts();
  const { data, writeContractAsync, isPending, error } = useWriteContract();
  const { data: availableCapacities } = useCapabilities({ account: address });

  const capabilities = useMemo(() => {
    if (!isConnected || !chainId || !availableCapacities) {
      return {};
    }
    const chainCapabilities = availableCapacities[chainId];
    if (chainCapabilities.paymasterService?.supported) {
      return {
        paymasterService: {
          // url: `${document.location.origin}/api/paymaster`
          url: 'https://api.developer.coinbase.com/rpc/v1/base-sepolia/1IhTcPOmhK5aEq-4WqRZMJoOh0oPenD2',
        },
      };
    }
    return {};
  }, [availableCapacities, chainId, isConnected]);

  const normalizedName = normalizeEnsDomainName(name);
  const { switchChainAsync } = useSwitchChain();
  const isDiscounted = Boolean(discountKey && validationData);
  const { logEventWithContext } = useAnalytics();

  const registerName = useCallback(async () => {
    if (!address) return;

    const addressData = encodeFunctionData({
      abi: L2ResolverAbi,
      functionName: 'setAddr',
      args: [namehash(formatBaseEthDomain(name, basenameChain.id)), address],
    });

    const nameData = encodeFunctionData({
      abi: L2ResolverAbi,
      functionName: 'setName',
      args: [
        namehash(formatBaseEthDomain(name, basenameChain.id)),
        formatBaseEthDomain(name, basenameChain.id),
      ],
    });

    const registerRequest = {
      name: normalizedName, // The name being registered.
      owner: address, // The address of the owner for the name.
      duration: secondsInYears(years), // The duration of the registration in seconds.
      resolver: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id], // The address of the resolver to set for this name.
      data: [addressData, nameData], //  Multicallable data bytes for setting records in the associated resolver upon reigstration.
      reverseRecord: true, // Bool to decide whether to set this name as the "primary" name for the `owner`.
    };

    // Log attempt to register name
    logEventWithContext('register_name_transaction_initiated', ActionType.click);

    try {
      await switchChainAsync({ chainId: basenameChain.id });

      if (!capabilities || Object.keys(capabilities).length === 0) {
        await writeContractAsync({
          abi: REGISTER_CONTRACT_ABI,
          address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
          chainId: basenameChain.id,
          functionName: isDiscounted || IS_EARLY_ACCESS ? 'discountedRegister' : 'register',
          // @ts-expect-error isDiscounted is sufficient guard for discountKey and validationData presence
          args: isDiscounted ? [registerRequest, discountKey, validationData] : [registerRequest],
          value,
        });
      } else {
        await writeContractsAsync({
          contracts: [
            {
              abi: REGISTER_CONTRACT_ABI,
              address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
              functionName: isDiscounted || IS_EARLY_ACCESS ? 'discountedRegister' : 'register',
              args: isDiscounted
                ? [registerRequest, discountKey, validationData]
                : [registerRequest],
              // @ts-expect-error writeContractsAsync is incorrectly typed to not accept value
              value,
            },
          ],
          capabilities: capabilities,
          chainId: basenameChain.id,
        });
      }
    } catch (e) {
      logError(e, 'Register name transaction canceled');
      logEventWithContext('register_name_transaction_canceled', ActionType.change);
    }
  }, [
    address,
    basenameChain.id,
    capabilities,
    discountKey,
    isDiscounted,
    logError,
    logEventWithContext,
    name,
    normalizedName,
    switchChainAsync,
    validationData,
    value,
    writeContractAsync,
    writeContractsAsync,
    years,
  ]);

  return {
    callback: registerName,
    data,
    callBatchId,
    isPending: isPending ?? paymasterIsPending,
    // @ts-expect-error error will be string renderable
    error: error ?? paymasterError,
  };
}
