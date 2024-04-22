import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';
import Image from 'next/image';
import { mainnet } from 'wagmi/chains';

export function UserAvatar() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ?? undefined,
    chainId: mainnet.id,
    assetGatewayUrls: {
      ipfs: 'https://cloudflare-ipfs.com',
    },
  });

  const avatar = ensAvatar ?? '/icons/default-avatar.svg';

  return <Image src={avatar} className="rounded-full" width="40" height={40} alt="Avatar" />;
}
