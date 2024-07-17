import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { USERNAME_L2_RESOLVER_ADDRESS } from 'apps/web/src/addresses/usernames';
import { BaseEnsNameData } from 'apps/web/src/hooks/useBaseEnsName';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { UsernameTextRecords, UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { useCallback } from 'react';
import { namehash, encodeFunctionData, Address } from 'viem';
import { useWriteContract } from 'wagmi';

export type UseWriteBaseEnsTextRecordsProps = {
  address?: Address;
  username: BaseEnsNameData;
};

// NOTE: If we need multicall for other scenarios, make this hook more generic
export default function useWriteBaseEnsTextRecords({
  address,
  username,
}: UseWriteBaseEnsTextRecordsProps) {
  // To compare to updated ones, avoid overriding them / unecessary calls
  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address,
    username,
  });

  // TODO: Check with current address for write permission
  const {
    data: writeTextRecordsTransactionHash,
    writeContractAsync,
    isPending: writeTextRecordsIsPending,
  } = useWriteContract();

  const writeTextRecords = useCallback(
    async (textRecords: UsernameTextRecords) => {
      if (!username) return Promise.reject(new Error('Cannot write text records without a name'));
      const keys: UsernameTextRecordKeys[] = Object.keys(textRecords) as UsernameTextRecordKeys[];
      const keysToUpdate = keys.filter((key) => {
        const existingValue = existingTextRecords[key].trim();
        const updatedValueValue = textRecords[key].trim();

        return existingValue != updatedValueValue;
      });

      if (keysToUpdate.length === 0) return false;

      const nameHash = namehash(username);

      const textRecordsBytes = keysToUpdate.map((key) => {
        const value = textRecords[key];

        return encodeFunctionData({
          abi: L2ResolverAbi,
          functionName: 'setText',
          args: [nameHash, key, value.trim()],
        });
      });

      await writeContractAsync({
        abi: L2ResolverAbi,
        address: USERNAME_L2_RESOLVER_ADDRESS,
        args: [nameHash, textRecordsBytes],
        functionName: 'multicallWithNodeCheck',
      });

      return true;
    },
    [existingTextRecords, username, writeContractAsync],
  );

  return {
    writeTextRecords,
    writeTextRecordsIsPending,
    writeTextRecordsTransactionHash,
  };
}
