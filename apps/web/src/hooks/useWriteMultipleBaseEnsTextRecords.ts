import {
  ADDRESS_REVERSE_NODE,
  USERNAME_L2_RESOLVER_ADDRESSES,
} from 'apps/web/src/addresses/usernames';
import { useCallback } from 'react';
import { Abi, Address, ContractFunctionParameters, encodePacked, keccak256 } from 'viem';
import { useClient } from 'wagmi';
import abi from 'apps/web/src/abis/L2Resolver.json';
import { UsernameTextRecords, UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { multicall } from 'viem/actions';

export type UseWriteMultipleBaseEnsTextRecords = {
  address: Address;
  chainId: number; // TODO: Might not be needed for launch (mainnet only)
  textRecords: UsernameTextRecords;
};

// TODO: If we need multicall for other scenarios, make this hook more generic
export function useWriteMultipleBaseEnsTextRecords({
  address,
  chainId,
  textRecords,
}: UseWriteMultipleBaseEnsTextRecords) {
  // TODO: Will this work?
  const client = useClient();

  const addressFormatted = address.toLocaleLowerCase() as Address;

  const addressNode = keccak256(addressFormatted.substring(2) as Address);

  const addressReverseNode = keccak256(
    encodePacked(['bytes32', 'bytes32'], [ADDRESS_REVERSE_NODE, addressNode]),
  );
  const keys: UsernameTextRecordKeys[] = Object.keys(textRecords) as UsernameTextRecordKeys[];
  const resolverAddress = USERNAME_L2_RESOLVER_ADDRESSES[chainId];

  const l2ResolverContractParameters: ContractFunctionParameters = {
    abi: abi as Abi,
    address: resolverAddress,
    functionName: 'setText',
  };

  const contracts: ContractFunctionParameters[] = keys.map((key) => {
    const value = textRecords[key] as UsernameTextRecordKeys;
    return {
      ...l2ResolverContractParameters,
      args: [addressReverseNode, key, value],
    };
  });

  const writeTextRecords = useCallback(async () => {
    console.log({ client });
    if (!client) return;
    const result = await multicall(client, { contracts });
    console.log({ result });
  }, [client, contracts]);

  return { writeTextRecords };
}
