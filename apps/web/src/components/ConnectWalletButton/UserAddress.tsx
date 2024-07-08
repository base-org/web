import { useEnsName } from 'wagmi';
import { baseSepolia, mainnet } from 'wagmi/chains';
import { truncateMiddle } from 'base-ui/utils/string';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { useBaseEnsName } from 'apps/web/src/hooks/useBaseEnsName';
import { Address } from 'viem';

export type UserAddressProps = {
  address: Address;
};

export function UserAddress({ address }: UserAddressProps) {
  const { data: ensName, isLoading: ensNameIsLoading } = useEnsName({
    address,
    chainId: mainnet.id,
  });

  const { data: baseEnsName, isLoading: baseEnsNameIsLoading } = useBaseEnsName({
    address,
    chainId: baseSepolia.id,
  });

  const isLoading = ensNameIsLoading || baseEnsNameIsLoading;

  const addressOrName =
    (baseEnsName as string) || (ensName as string) || truncateMiddle(address, 6, 4);

  const addressOrNameForDisplay = isLoading ? (
    <Icon name="spinner" color="currentColor" />
  ) : (
    addressOrName
  );

  return (
    <CopyToClipboard text={address ?? ''}>
      <div className="flex cursor-pointer flex-row items-center gap-2">
        <span className="truncate ">{addressOrNameForDisplay}</span>
        <Icon name="copy" color="currentColor" width="1rem" height="1rem" />
      </div>
    </CopyToClipboard>
  );
}
