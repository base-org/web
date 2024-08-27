import ReverseRegistrarAbi from 'apps/web/src/abis/ReverseRegistrarAbi';
import {
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_REVERSE_REGISTRAR_ADDRESSES,
} from 'apps/web/src/addresses/usernames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { useCallback, useEffect } from 'react';
import { BaseName } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import { useErrors } from 'apps/web/contexts/Errors';
import useWriteContractWithReceipt from 'apps/web/src/hooks/useWriteContractWithReceipt';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';

/*
  A hook to set an name as primary for resolution.

  Responsabilities:
  - Get and validate the primary username against the new username
  - Write the new name to the contract & Wait for the transaction to be processed
  - Refetch basename on successfull request
*/

type UseSetPrimaryBasenameProps = {
  secondaryUsername: BaseName;
};

export default function useSetPrimaryBasename({ secondaryUsername }: UseSetPrimaryBasenameProps) {
  const { address } = useAccount();
  const { logError } = useErrors();

  const { currentWalletIsProfileEditor } = useUsernameProfile();
  const { basenameChain: secondaryUsernameChain } = useBasenameChain(secondaryUsername);

  // Get current primary username
  // Note: This is sometimes undefined
  const {
    data: primaryUsername,
    refetch: refetchPrimaryUsername,
    isLoading: primaryUsernameIsLoading,
    isFetching: primaryUsernameIsFetching,
  } = useBaseEnsName({
    address: address,
  });

  const usernamesDiffer = secondaryUsername !== primaryUsername;
  const canSetUsernameAsPrimary = usernamesDiffer && currentWalletIsProfileEditor;

  const { initiateTransaction, transactionIsLoading, transactionIsSuccess } =
    useWriteContractWithReceipt({
      chain: secondaryUsernameChain,
      eventName: 'update_primary_name',
    });

  useEffect(() => {
    if (transactionIsSuccess) {
      refetchPrimaryUsername()
        .then()
        .catch((error) => logError(error, 'failed to refetch username'));
    }
  }, [logError, refetchPrimaryUsername, transactionIsSuccess]);

  const setPrimaryName = useCallback(async () => {
    // Already primary
    if (secondaryUsername === primaryUsername) return;

    // No user is connected
    if (!address) return;

    try {
      await initiateTransaction({
        abi: ReverseRegistrarAbi,
        address: USERNAME_REVERSE_REGISTRAR_ADDRESSES[secondaryUsernameChain.id],
        args: [
          address,
          address,
          USERNAME_L2_RESOLVER_ADDRESSES[secondaryUsernameChain.id],
          secondaryUsername,
        ],
        functionName: 'setNameForAddr',
      });
    } catch (error) {
      logError(error, 'Set primary name transaction canceled');
    }

    return true;
  }, [
    secondaryUsername,
    primaryUsername,
    address,
    initiateTransaction,
    secondaryUsernameChain.id,
    logError,
  ]);

  const isLoading = transactionIsLoading || primaryUsernameIsLoading || primaryUsernameIsFetching;

  return { setPrimaryName, canSetUsernameAsPrimary, isLoading };
}
