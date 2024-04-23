import { useAccount, useEnsName } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { truncateMiddle } from 'base-ui/utils/string';

export function UserAddress() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  });

  return (
    <span className="truncate text-lg text-white">{ensName ?? truncateMiddle(address, 6, 4)}</span>
  );
}
