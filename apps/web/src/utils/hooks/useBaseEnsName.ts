import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { useMemo } from 'react';
import { Address, encodePacked, keccak256 } from 'viem';
import { useReadContract } from 'wagmi';
import abi from 'apps/web/src/abis/L2Resolver.json';

export const ADDRESS_REVERSE_NODE =
  '0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2';

export function useBaseEnsName({ address, chainId }: { address: Address; chainId: number }) {
  // Lowercase otherwise it will not work
  const addressFormatted = address.toLocaleLowerCase() as Address;

  // Solidity: bytes32 addrNode = Sha3.hexAddress(addr);
  const addressNode = keccak256(addressFormatted.substring(2) as Address);

  // Solidity: bytes32 reverseNode = keccak256(abi.encodePacked(ADDR_REVERSE_NODE, addrNode));
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
