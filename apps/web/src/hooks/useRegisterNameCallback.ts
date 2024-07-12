import { useAnalytics } from 'apps/web/contexts/Analytics';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import abi from 'apps/web/src/abis/RegistrarControllerABI';
import {
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_REGISTRAR_CONTROLLER_ADDRESS,
} from 'apps/web/src/addresses/usernames';
import { formatBaseEthDomain, normalizeEnsDomainName } from 'apps/web/src/utils/usernames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useMemo } from 'react';
import { encodeFunctionData, namehash, TransactionExecutionError } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { useAccount, useWriteContract } from 'wagmi';

function secondsInYears(years: number): bigint {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}

export function useRegisterNameCallback(
  name: string,
  value: bigint | undefined,
  years: number,
  discountKey?: `0x${string}`,
  validationData?: `0x${string}`,
) {
  const { address, chainId } = useAccount();
  const network = chainId === baseSepolia.id ? chainId : base.id;
  const normalizedName = normalizeEnsDomainName(name);
  const isDiscounted = Boolean(discountKey && validationData);
  const { logEventWithContext } = useAnalytics();
  const addressData = encodeFunctionData({
    abi: L2ResolverAbi,
    functionName: 'setAddr',
    args: [namehash(formatBaseEthDomain(name)), address ?? '0xasdf'],
  });

  const registerRequest = useMemo(
    () => ({
      name: normalizedName, // The name being registered.
      owner: address ?? '0x48c89d77ae34ae475e4523b25ab01e363dce5a78', // The address of the owner for the name.
      duration: secondsInYears(years), // The duration of the registration in seconds.
      resolver: USERNAME_L2_RESOLVER_ADDRESSES[network], // The address of the resolver to set for this name.
      data: [addressData], //  Multicallable data bytes for setting records in the associated resolver upon reigstration.
      reverseRecord: true, // Bool to decide whether to set this name as the "primary" name for the `owner`.
    }),
    [address, addressData, network, normalizedName, years],
  );

  const { data, writeContractAsync, isPending } = useWriteContract();

  // TODO: I think we could pass arguments to this function instead of the hook
  const registerName = useCallback(async () => {
    // Log attempt to register name
    logEventWithContext('register_name_transaction_initiated', ActionType.click);

    try {
      await writeContractAsync({
        abi,
        address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[network],
        chainId: network,
        functionName: isDiscounted ? 'discountedRegister' : 'register',
        // @ts-expect-error isDiscounted is sufficient guard for discountKey and validationData presence
        args: isDiscounted ? [registerRequest, discountKey, validationData] : [registerRequest],
        value,
      });
    } catch (error) {
      let errorReason = 'unknown';
      if (error instanceof TransactionExecutionError) {
        errorReason = error.details;
      }

      logEventWithContext('register_name_transaction_canceled', ActionType.change, {
        error: errorReason,
      });
      // TODO: Show error
    }
  }, [
    discountKey,
    isDiscounted,
    logEventWithContext,
    network,
    registerRequest,
    validationData,
    value,
    writeContractAsync,
  ]);

  return { callback: registerName, data, isPending };
}
