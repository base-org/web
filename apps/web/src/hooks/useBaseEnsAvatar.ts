import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { BaseName } from '@coinbase/onchainkit/identity';
import { useEnsAvatar } from 'wagmi';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { CLOUDFARE_IPFS_PROXY } from 'apps/web/src/utils/urls';

export type UseBaseEnsNameProps = {
  name?: BaseEnsNameData;
};

export type BaseEnsNameData = BaseName | undefined;

// Wrapper around onchainkit's useName
export default function useBaseEnsAvatar({ name }: UseBaseEnsNameProps) {
  const { basenameChain } = useBasenameChain(name);

  return useEnsAvatar({
    name: name,
    chainId: basenameChain.id,
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id],
    assetGatewayUrls: {
      ipfs: CLOUDFARE_IPFS_PROXY,
    },
    query: {
      retry: false,
      enabled: !!name,
    },
  });
}
