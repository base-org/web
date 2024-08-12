import ReverseRegistrarAbi from 'apps/web/src/abis/ReverseRegistrarAbi';
import {
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_REVERSE_REGISTRAR_ADDRESSES,
} from 'apps/web/src/addresses/usernames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { useCallback, useEffect } from 'react';
import { BaseName } from '@coinbase/onchainkit/identity';
import {
  useAccount,
  useEnsAddress,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import { useErrors } from 'apps/web/contexts/Errors';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useAnalytics } from 'apps/web/contexts/Analytics';

/*
  A hook to set an name as primary for resolution.

  Responsabilities:
  - Get and validate the primary username against the new username
  - Write the new name to the contract
  - Wait for the transaction to be processed
  - Refetch basename on successfull request  
  - Log errors and analytics accordingly
*/

type UseSetPrimaryBasenameProps = {
  secondaryName: BaseName;
};

export default function useSetPrimaryBasename({ secondaryName }: UseSetPrimaryBasenameProps) {
  const { address } = useAccount();
  const { logError } = useErrors();
  const { logEventWithContext } = useAnalytics();

  const {
    data: primaryUsername,
    refetch: refetchPrimaryUsername,
    isLoading: primaryUsernameIsLoading,
    isFetching: primaryUsernameIsFetching,
  } = useBaseEnsName({
    address: address,
  });

  const { basenameChain: secondaryBaseChain } = useBasenameChain(secondaryName);
  const { basenameChain: primaryBaseChain } = useBasenameChain(primaryUsername);

  const { data: secondaryAddress } = useEnsAddress({
    name: secondaryName,
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[secondaryBaseChain.id],
  });

  const { data: primaryAddress } = useEnsAddress({
    name: primaryUsername,
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[primaryBaseChain.id],
    query: {
      enabled: !!primaryUsername,
    },
  });

  const usernamesHaveSameOwner = secondaryAddress === primaryAddress;
  const usernamesOnSameChains = secondaryBaseChain.id === primaryBaseChain.id;
  const usernamesDiffer = secondaryName !== primaryUsername;

  const canSetUsernameAsPrimary =
    usernamesDiffer && usernamesOnSameChains && usernamesHaveSameOwner;

  const { switchChainAsync } = useSwitchChain();

  const {
    data: transactionHash,
    isPending: transactionHashIsPending,
    writeContractAsync,
    reset: transactionHashReset,
  } = useWriteContract();

  const {
    data: transactionReceipt,
    isFetching: transactionReceiptIsFetching,
    error: transactionReceiptError,
    isError: transactionReceiptIsError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
    chainId: secondaryBaseChain.id,
    query: {
      enabled: !!transactionHash,
      refetchOnWindowFocus: false,
    },
  });

  const setPrimaryName = useCallback(async () => {
    // Already primary
    if (secondaryName === primaryUsername) return;

    // No user is connected
    if (!address) return;

    try {
      await switchChainAsync({ chainId: secondaryBaseChain.id });
      await writeContractAsync({
        abi: ReverseRegistrarAbi,
        address: USERNAME_REVERSE_REGISTRAR_ADDRESSES[secondaryBaseChain.id],
        args: [
          address,
          address,
          USERNAME_L2_RESOLVER_ADDRESSES[secondaryBaseChain.id],
          secondaryName,
        ],
        functionName: 'setNameForAddr',
      });
    } catch (error) {
      logError(error, 'Set primary name transaction canceled');
    }

    return true;
  }, [
    secondaryName,
    primaryUsername,
    address,
    switchChainAsync,
    secondaryBaseChain.id,
    writeContractAsync,
    logError,
  ]);

  // Errors and analytics tracking
  useEffect(() => {
    if (transactionReceiptIsError) {
      logError(transactionReceiptError, 'Failed to get transaction receipt');
      return;
    }
    if (transactionReceiptIsFetching) {
      logEventWithContext('update_primary_name_transaction_processing', ActionType.change);
    }

    if (!transactionReceipt) return;

    if (transactionReceipt.status === 'success') {
      logEventWithContext('update_primary_name_transaction_success', ActionType.change);
      transactionHashReset();
      refetchPrimaryUsername()
        .then()
        .catch((error) => {
          logError(error, 'Failed to refetch basename');
        });
    }

    if (transactionReceipt.status === 'reverted') {
      logEventWithContext('update_primary_name_transaction_reverted', ActionType.change, {
        error: `Transaction reverted: ${transactionReceipt.transactionHash}`,
      });
    }
  }, [
    logEventWithContext,
    logError,
    transactionReceiptIsFetching,
    transactionReceipt,
    refetchPrimaryUsername,
    transactionReceiptIsError,
    transactionReceiptError,
    transactionHashReset,
  ]);

  const isLoading =
    primaryUsernameIsLoading ||
    primaryUsernameIsFetching ||
    transactionHashIsPending ||
    transactionReceiptIsFetching;

  return { setPrimaryName, canSetUsernameAsPrimary, isLoading };
}
