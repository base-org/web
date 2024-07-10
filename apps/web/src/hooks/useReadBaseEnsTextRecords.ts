import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { useCallback, useEffect, useState } from 'react';
import { Address, ContractFunctionParameters } from 'viem';
import {
  UsernameTextRecords,
  UsernameTextRecordKeys,
  textRecordsKeysEnabled,
  convertReverseNodeToBytes,
} from 'apps/web/src/utils/usernames';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { getPublicClient } from 'apps/web/src/cdp/utils';
import { useQuery } from '@tanstack/react-query';
import { baseSepolia } from 'viem/chains';

export type UseReadBaseEnsTextRecordsProps = {
  address?: Address;
};

// TODO: If we need multicall for other scenarios, make this hook more generic
export default function useReadBaseEnsTextRecords({ address }: UseReadBaseEnsTextRecordsProps) {
  // TODO: use mainnet
  const chainId = baseSepolia.id;
  const client = getPublicClient(baseSepolia.id);
  const addressReverseNode = convertReverseNodeToBytes(address);

  // TODO: this could be based on textRecordsKeysEnabled via reduce
  const [existingTextRecords, setExistingTextRecords] = useState<UsernameTextRecords>({
    [UsernameTextRecordKeys.Description]: '',
    [UsernameTextRecordKeys.Twitter]: '',
    [UsernameTextRecordKeys.Farcaster]: '',
    [UsernameTextRecordKeys.Lens]: '',
    [UsernameTextRecordKeys.Telegram]: '',
    [UsernameTextRecordKeys.Discord]: '',
    [UsernameTextRecordKeys.Keywords]: '',
    [UsernameTextRecordKeys.Url]: '',
    [UsernameTextRecordKeys.Github]: '',
    [UsernameTextRecordKeys.Email]: '',
    [UsernameTextRecordKeys.Phone]: '',
  });

  const updateExistingTextRecords = useCallback((key: UsernameTextRecordKeys, value: string) => {
    setExistingTextRecords((previousTextRecords) => {
      return {
        ...previousTextRecords,
        [key]: value,
      };
    });
  }, []);

  const getExistingTextRecords = useCallback(async () => {
    if (!client) return;

    const readContracts: ContractFunctionParameters[] = textRecordsKeysEnabled.map((key) => {
      return {
        args: [addressReverseNode, key],
        functionName: 'text',
        abi: L2ResolverAbi,
        address: USERNAME_L2_RESOLVER_ADDRESSES[chainId],
      };
    });

    const result = await client.multicall({ contracts: readContracts });
    return result;
  }, [addressReverseNode, chainId, client]);

  const {
    data: textRecordsData,
    isLoading: existingTextRecordsIsLoading,
    refetch: refetchExistingTextRecords,
  } = useQuery({
    queryKey: ['useReadBaseEnsTextRecords', address, chainId, textRecordsKeysEnabled],
    queryFn: getExistingTextRecords,
    enabled: !!address,
  });

  useEffect(() => {
    // we got an array of result matching our multicall length
    if (
      typeof textRecordsData === 'object' &&
      textRecordsData.length === textRecordsKeysEnabled.length
    ) {
      textRecordsKeysEnabled.map((key, index) => {
        // We have a string value returned
        const currentValue = textRecordsData[index].result;
        if (typeof currentValue === 'string') {
          updateExistingTextRecords(key, currentValue);
        }
      });
    }
  }, [textRecordsData, updateExistingTextRecords]);

  return { existingTextRecordsIsLoading, existingTextRecords, refetchExistingTextRecords };
}
