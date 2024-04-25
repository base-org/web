import { useAccount, useEnsName } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import Image from 'next/image';

import { truncateMiddle } from 'base-ui/utils/string';
import CopyToClipboard from 'react-copy-to-clipboard';

export function UserAddress() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  });

  return (
    <CopyToClipboard text={address ?? ''}>
      <div className="flex cursor-pointer flex-row gap-2">
        <span className="truncate text-lg text-white">
          {ensName ?? truncateMiddle(address, 6, 4)}
        </span>
        <Image src="/icons/copy.svg" width="16" height="16" alt="copy" />
      </div>
    </CopyToClipboard>
  );
}
