import ReverseRegistrarAbi from 'apps/web/src/abis/ReverseRegistrarAbi';
import {
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_REVERSE_REGISTRAR_ADDRESSES,
} from 'apps/web/src/addresses/usernames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { useCallback, useEffect } from 'react';
import { BaseName } from '@coinbase/onchainkit/identity';
import { useAccount, useEnsAddress } from 'wagmi';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import { useErrors } from 'apps/web/contexts/Errors';

import useWriteContractWithReceipt from 'apps/web/src/hooks/useWriteContractWithReceipt';

/*
  A hook to set an name as primary for resolution.

  Responsabilities:
  - Get and validate the primary username against the new username
  - Write the new name to the contract & Wait for the transaction to be processed
  - Refetch basename on successfull request
*/

type UseSetPrimaryBasenameProps = {
  secondaryName: BaseName;
};

export default function useSetPrimaryBasename({ secondaryName }: UseSetPrimaryBasenameProps) {
  const { address } = useAccount();
  const { logError } = useErrors();

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

  const usernamesHaveSameOwner = secondaryAddress === address;
  const usernamesOnSameChains = secondaryBaseChain.id === primaryBaseChain.id;
  const usernamesDiffer = secondaryName !== primaryUsername;

  const canSetUsernameAsPrimary =
    usernamesDiffer && usernamesOnSameChains && usernamesHaveSameOwner;

  const { initiateTransaction, transactionIsLoading, transactionIsSuccess } =
    useWriteContractWithReceipt({
      chain: secondaryBaseChain,
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
    if (secondaryName === primaryUsername) return;

    // No user is connected
    if (!address) return;

    try {
      await initiateTransaction({
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
    initiateTransaction,
    secondaryBaseChain.id,
    logError,
  ]);

  const isLoading = transactionIsLoading || primaryUsernameIsLoading || primaryUsernameIsFetching;

  return { setPrimaryName, canSetUsernameAsPrimary, isLoading };
}
