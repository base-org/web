import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import useBaseEnsAvatar from 'apps/web/src/hooks/useBaseEnsAvatar';
import { BaseEnsNameData } from 'apps/web/src/hooks/useBaseEnsName';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { UsernameTextRecords, UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { namehash, encodeFunctionData, Address } from 'viem';
import { useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

export type UseWriteBaseEnsTextRecordsProps = {
  address?: Address;
  username: BaseEnsNameData;
  onSuccess?: () => void;
};

/*
  A hook to set update TextRecords in a batch

  Responsabilities:
  - Get existing TextRecords
  - Keep track of TextRecords updates
  - Wait for the transaction to be processed
  - Refetch records on successfull request  
  - Log errors and analytics accordingly

*/

export default function useWriteBaseEnsTextRecords({
  address,
  username,
  onSuccess,
}: UseWriteBaseEnsTextRecordsProps) {
  // Errors & Analytics
  const { logEventWithContext } = useAnalytics();
  const { logError } = useErrors();

  // Fetch existing TextRecords
  const { existingTextRecords, existingTextRecordsIsLoading, refetchExistingTextRecords } =
    useReadBaseEnsTextRecords({
      address,
      username,
    });

  // Save a copy of updated TextRecords
  const [updatedTextRecords, setUpdatedTextRecords] =
    useState<UsernameTextRecords>(existingTextRecords);
  useEffect(() => {
    setUpdatedTextRecords(existingTextRecords);
  }, [existingTextRecords]);

  const updateTextRecords = useCallback(
    (key: UsernameTextRecordKeys, value: string) => {
      setUpdatedTextRecords((previousTextRecords) => {
        return {
          ...previousTextRecords,
          [key]: value,
        };
      });
    },
    [setUpdatedTextRecords],
  );

  // Track keys that have changed
  const keysToUpdate = useMemo(() => {
    const keys: UsernameTextRecordKeys[] = Object.keys(
      updatedTextRecords,
    ) as UsernameTextRecordKeys[];
    return keys.filter((key) => {
      const existingValue = existingTextRecords[key].trim();
      const updatedValueValue = updatedTextRecords[key].trim();

      return existingValue != updatedValueValue;
    });
  }, [existingTextRecords, updatedTextRecords]);

  // Track hasChanged as a boolean
  const hasChanged = useMemo(() => {
    return keysToUpdate.length !== 0;
  }, [keysToUpdate.length]);

  const { basenameChain } = useBasenameChain();

  // Write TextRecords
  const {
    data: writeTextRecordsTransactionHash,
    writeContractAsync,
    isPending: writeTextRecordsIsPending,
    isError: writeTextRecordsIsError,
    error: writeTextRecordsError,
    isSuccess: writeTextRecordsIsSuccess,
  } = useWriteContract();

  // Wait for TextRecords transaction to be processed
  const {
    data: transactionData,
    isFetching: transactionIsFetching,
    isSuccess: transactionIsSuccess,
    isError: transactionIsError,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash: writeTextRecordsTransactionHash,
    chainId: basenameChain.id,
    query: {
      enabled: !!writeTextRecordsTransactionHash,
    },
  });

  const { refetch: refetchBaseEnsAvatar } = useBaseEnsAvatar({
    name: username,
  });

  const { switchChainAsync } = useSwitchChain();

  const writeTextRecords = useCallback(async () => {
    if (!username) return Promise.reject(new Error('Cannot write text records without a name'));

    if (!hasChanged) return onSuccess?.();

    logEventWithContext('update_text_records_transaction_initiated', ActionType.change);
    const nameHash = namehash(username);

    const textRecordsBytes = keysToUpdate.map((key) => {
      const value = updatedTextRecords[key];

      return encodeFunctionData({
        abi: L2ResolverAbi,
        functionName: 'setText',
        args: [nameHash, key, value.trim()],
      });
    });

    await switchChainAsync({ chainId: basenameChain.id });

    await writeContractAsync({
      abi: L2ResolverAbi,
      address: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id],
      args: [nameHash, textRecordsBytes],
      functionName: 'multicallWithNodeCheck',
    });
  }, [
    basenameChain.id,
    hasChanged,
    keysToUpdate,
    logEventWithContext,
    onSuccess,
    switchChainAsync,
    updatedTextRecords,
    username,
    writeContractAsync,
  ]);

  // Keep track of request, transaction & log analytics/errors
  useEffect(() => {
    if (writeTextRecordsIsSuccess) {
      logEventWithContext('update_text_records_transaction_approved', ActionType.change);
    }

    if (transactionIsFetching) {
      logEventWithContext('update_text_records_transaction_processing', ActionType.change);
    }
    if (!transactionData) return;

    if (transactionData.status === 'success') {
      logEventWithContext('update_text_records_transaction_success', ActionType.change);
      refetchExistingTextRecords()
        .then(() => {
          refetchBaseEnsAvatar()
            .then(() => {
              onSuccess?.();
            })
            .catch((error) => {
              logError(error, 'Failed to refetch avatar');
            });
        })
        .catch((error) => {
          logError(error, 'Failed to refetch existing text records');
        });
    }

    if (transactionData.status === 'reverted') {
      logEventWithContext('update_text_records_transaction_reverted', ActionType.change, {
        error: `Transaction reverted: ${transactionData.transactionHash}`,
      });
    }
  }, [
    refetchExistingTextRecords,
    transactionIsSuccess,
    transactionData,
    logEventWithContext,
    transactionIsFetching,
    logError,
    refetchBaseEnsAvatar,
    onSuccess,
    writeTextRecordsIsSuccess,
  ]);

  const isLoading =
    existingTextRecordsIsLoading || writeTextRecordsIsPending || transactionIsFetching;

  const isError = writeTextRecordsIsError || transactionIsError;

  const error = writeTextRecordsError ?? transactionError;

  return {
    existingTextRecords,
    updateTextRecords,
    updatedTextRecords,
    setUpdatedTextRecords,
    writeTextRecords,
    hasChanged,
    writeTextRecordsIsPending: isLoading,
    writeTextRecordsIsError: isError,
    writeTextRecordsError: error,
    writeTextRecordsTransactionHash,
  };
}
