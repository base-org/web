import { useAccount, useEnsName } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { truncateMiddle } from 'base-ui/utils/string';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Icon } from 'apps/web/src/components/Icon/Icon';

export function UserAddress() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  });

  return (
    <CopyToClipboard text={address ?? ''}>
      <div className="flex cursor-pointer flex-row items-center gap-2">
        <span className="truncate ">{ensName ?? truncateMiddle(address, 6, 4)}</span>
        <Icon name="copy" color="currentColor" width="1rem" height="1rem" />
      </div>
    </CopyToClipboard>
  );
}
