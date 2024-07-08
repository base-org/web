import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { useCallback } from 'react';
import { Address, encodeFunctionData } from 'viem';
import { useWriteContract } from 'wagmi';
import {
  UsernameTextRecords,
  UsernameTextRecordKeys,
  convertReverseNodeToBytes,
} from 'apps/web/src/utils/usernames';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { useReadBaseTextRecords } from 'apps/web/src/hooks/useReadBaseTextRecords';

export type UseWriteBaseEnsTextRecordsProps = {
  address: Address;
  chainId: number; // TODO: Might not be needed for launch (mainnet only)
};

// TODO: If we need multicall for other scenarios, make this hook more generic
export default function useWriteBaseEnsTextRecords({
  address,
  chainId,
}: UseWriteBaseEnsTextRecordsProps) {
  const addressReverseNode = convertReverseNodeToBytes(address);

  // To compare to updated ones, avoid overriding them / unecessary calls
  const { existingTextRecords } = useReadBaseTextRecords({
    address,
    chainId,
  });

  const {
    data: writeTextRecordsTransactionHash,
    writeContractAsync,
    isPending: writeTextRecordsIsPending,
  } = useWriteContract();

  const writeTextRecords = useCallback(
    async (textRecords: UsernameTextRecords) => {
      const keys: UsernameTextRecordKeys[] = Object.keys(textRecords) as UsernameTextRecordKeys[];
      const keysToUpdate = keys.filter((key) => {
        const existingValue = existingTextRecords[key].trim();
        const updatedValueValue = textRecords[key].trim();

        return existingValue != updatedValueValue;
      });

      if (keysToUpdate.length === 0) return;

      const textRecordsBytes = keysToUpdate.map((key) => {
        const value = textRecords[key];

        return encodeFunctionData({
          abi: L2ResolverAbi,
          functionName: 'setText',
          args: [addressReverseNode, key, value.trim()],
        });
      });

      const multicallWriteContract = {
        abi: L2ResolverAbi,
        address: USERNAME_L2_RESOLVER_ADDRESSES[chainId],
        args: [addressReverseNode, textRecordsBytes],
        functionName: 'multicallWithNodeCheck',
      };

      try {
        await writeContractAsync(multicallWriteContract);
      } catch (error) {
        // Log error
      }
    },
    [addressReverseNode, chainId, existingTextRecords, writeContractAsync],
  );

  return {
    writeTextRecords,
    writeTextRecordsIsPending,
    writeTextRecordsTransactionHash,
  };
}
