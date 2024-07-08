import {
  ADDRESS_REVERSE_NODE,
  USERNAME_L2_RESOLVER_ADDRESSES,
} from 'apps/web/src/addresses/usernames';
import { useMemo } from 'react';
import { Address, encodePacked, keccak256 } from 'viem';
import { useReadContract } from 'wagmi';
import abi from 'apps/web/src/abis/L2Resolver.json';

export type UseBaseEnsNameProps = {
  address: Address;
  chainId: number; // TODO: Might not be needed for launch (mainnet only)
};

export function useBaseEnsName({ address, chainId }: UseBaseEnsNameProps) {
  const addressFormatted = address.toLocaleLowerCase() as Address;

  const addressNode = keccak256(addressFormatted.substring(2) as Address);

  const addressReverseNode = keccak256(
    encodePacked(['bytes32', 'bytes32'], [ADDRESS_REVERSE_NODE, addressNode]),
  );

  const readContractArgs = useMemo(
    () => ({
      abi,
      address: USERNAME_L2_RESOLVER_ADDRESSES[chainId],
      functionName: 'name',
      args: [addressReverseNode],
      chainId: chainId,
    }),
    [addressReverseNode, chainId],
  );

  return useReadContract(readContractArgs);
}
