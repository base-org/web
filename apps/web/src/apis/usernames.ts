import { ContractFunctionParameters, namehash } from 'viem';
import { normalize } from 'viem/ens';

import { BaseName } from '@coinbase/onchainkit/identity';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import {
  getChainForBasename,
  textRecordsKeysEnabled,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';

export async function getBasenameAddress(username: BaseName) {
  const chain = getChainForBasename(username);

  try {
    const client = getBasenamePublicClient(chain.id);
    const ensAddress = await client.getEnsAddress({
      name: normalize(username),
      universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[chain.id],
    });
    return ensAddress;
  } catch (error) {}
}

export function buildBasenameTextRecordContract(
  username: BaseName,
  key: UsernameTextRecordKeys,
): ContractFunctionParameters {
  const chain = getChainForBasename(username);
  return {
    abi: L2ResolverAbi,
    address: USERNAME_L2_RESOLVER_ADDRESSES[chain.id],
    args: [namehash(username), key],
    functionName: 'text',
  };
}

export async function getBasenameTextRecord(username: BaseName, key: UsernameTextRecordKeys) {
  const chain = getChainForBasename(username);
  try {
    const client = getBasenamePublicClient(chain.id);
    const contractParameters = buildBasenameTextRecordContract(username, key);
    const textRecord = await client.readContract(contractParameters);
    return textRecord as string;
  } catch (error) {}
}

export async function getBasenameTextRecords(username: BaseName) {
  const chain = getChainForBasename(username);
  try {
    const readContracts: ContractFunctionParameters[] = textRecordsKeysEnabled.map((key) => {
      return buildBasenameTextRecordContract(username, key);
    });

    const client = getBasenamePublicClient(chain.id);
    const textRecords = await client.multicall({ contracts: readContracts });

    return textRecords;
  } catch (error) {}
}
