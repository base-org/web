import ReverseRegistrarAbi from 'apps/web/src/abis/ReverseRegistrarAbi';
import {
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_REVERSE_REGISTRAR_ADDRESSES,
} from 'apps/web/src/addresses/usernames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { useCallback, useEffect } from 'react';
import { BaseName } from '@coinbase/onchainkit/identity';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
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

  TODOs:
  - Return list of all names (off-chain indexing)
  - Chain newUsername / primaryUsername chain are matching
  - Chain newUsername / primaryUsername owners are matching
*/

type UseSetPrimaryBasenameProps = {
  secondaryName: BaseName;
};

export default function useSetPrimaryBasename({ secondaryName }: UseSetPrimaryBasenameProps) {
  const { basenameChain } = useBasenameChain(secondaryName);
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

  const {
    data: transactionHash,
    isPending: transactionHashIsPending,
    writeContractAsync,
  } = useWriteContract();

  const {
    data: transactionReceipt,
    isFetching: transactionReceiptIsFetching,
    error: transactionReceiptError,
    isError: transactionReceiptIsError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
    chainId: basenameChain.id,
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
      await writeContractAsync({
        abi: ReverseRegistrarAbi,
        address: USERNAME_REVERSE_REGISTRAR_ADDRESSES[basenameChain.id],
        args: [address, address, USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id], secondaryName],
        functionName: 'setNameForAddr',
      });
    } catch (error) {
      logError(error, 'Set primary name transaction canceled');
    }

    return true;
  }, [address, basenameChain.id, logError, primaryUsername, secondaryName, writeContractAsync]);

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
  ]);

  const isLoading =
    primaryUsernameIsLoading ||
    primaryUsernameIsFetching ||
    transactionHashIsPending ||
    transactionReceiptIsFetching;

  return { setPrimaryName, isLoading };
}
