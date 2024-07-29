import ProfileProviders from 'apps/web/app/(basenames)/name/[username]/ProfileProviders';
import UsernameProfile from 'apps/web/src/components/Basenames/UsernameProfile';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import { Metadata } from 'next';
import { namehash } from 'viem';
import { base } from 'viem/chains';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;

  let metadataDescription = `${username}, a Basename`;
  try {
    const nameHash = namehash(username);
    const client = getBasenamePublicClient(base.id);
    const description = await client.readContract({
      abi: L2ResolverAbi,
      address: USERNAME_L2_RESOLVER_ADDRESSES[base.id],
      args: [nameHash, UsernameTextRecordKeys.Description],
      functionName: 'text',
    });

    // Satori Doesn't support webp
    if (description && !description.endsWith('.webp')) {
      metadataDescription = description;
    }
  } catch (error) {}

  return {
    metadataBase: new URL('https://base.org'),
    title: `Basenames | ${params.username}`,
    description: metadataDescription,
    openGraph: {
      title: `Basenames | ${params.username}`,
      url: `/${username}`,
      images: [`/${params.username}/assets/coverImage.png`],
    },
  };
}

export default function Username({ params }: Props) {
  return (
    <ProfileProviders username={params.username}>
      <UsernameProfile />
    </ProfileProviders>
  );
}
