import { USERNAME_CHAIN_ID, USERNAME_L2_RESOLVER_ADDRESS } from 'apps/web/src/addresses/usernames';
import { useCallback, useEffect, useState } from 'react';
import { Address, ContractFunctionParameters, namehash } from 'viem';
import {
  UsernameTextRecords,
  UsernameTextRecordKeys,
  textRecordsKeysEnabled,
} from 'apps/web/src/utils/usernames';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { getPublicClient } from 'apps/web/src/cdp/utils';
import { useQuery } from '@tanstack/react-query';
import { baseSepolia } from 'viem/chains';
import { BaseEnsNameData } from 'apps/web/src/hooks/useBaseEnsName';

export type UseReadBaseEnsTextRecordsProps = {
  address?: Address;
  username: BaseEnsNameData;
};

export default function useReadBaseEnsTextRecords({
  address,
  username,
}: UseReadBaseEnsTextRecordsProps) {
  const client = getPublicClient(baseSepolia.id);

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
    if (!username) return;
    const nameHash = namehash(username);
    const readContracts: ContractFunctionParameters[] = textRecordsKeysEnabled.map((key) => {
      return {
        args: [nameHash, key],
        functionName: 'text',
        abi: L2ResolverAbi,
        address: USERNAME_L2_RESOLVER_ADDRESS,
      };
    });

    const result = await client.multicall({ contracts: readContracts });

    return result;
  }, [client, username]);

  const {
    data: textRecordsData,
    isLoading: existingTextRecordsIsLoading,
    refetch: refetchExistingTextRecords,
  } = useQuery({
    queryKey: ['useReadBaseEnsTextRecords', address, textRecordsKeysEnabled, USERNAME_CHAIN_ID],
    queryFn: getExistingTextRecords,
    enabled: !!address && !!username,
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
