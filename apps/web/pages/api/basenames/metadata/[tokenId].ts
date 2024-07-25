import L2Resolver from 'apps/web/src/abis/L2Resolver';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { getBasenamePublicClient } from 'apps/web/src/hooks/useBasenameChain';
import { USERNAME_DOMAINS } from 'apps/web/src/utils/usernames';
import { NextResponse } from 'next/server';
import { encodePacked, keccak256, namehash, toHex } from 'viem';
import { base } from 'viem/chains';

export const config = {
  runtime: 'edge',
};

export default async function GET(request: Request) {
  // TODO: Check this works in live/production
  const url = new URL(request.url);
  const domainName = `${url.protocol}//${url.host}`;
  let tokenId = url.searchParams.get('tokenId');
  if (tokenId?.endsWith('.json')) tokenId = tokenId.slice(0, -5);

  const chainId = url.searchParams.get('chainId') ?? base.id;
  const baseDomainName = USERNAME_DOMAINS[Number(chainId)];

  if (!tokenId) return NextResponse.json({ error: '406: tokenId is missing' }, { status: 406 });
  if (!chainId) return NextResponse.json({ error: '406: chainId is missing' }, { status: 406 });
  if (!baseDomainName)
    return NextResponse.json({ error: '406: base domain name is missing' }, { status: 406 });

  // Get labelhash from tokenId
  const labelHash = toHex(BigInt(tokenId));

  // Convert labelhash to namehash
  const namehashNode = keccak256(
    encodePacked(['bytes32', 'bytes32'], [namehash(baseDomainName), labelHash]),
  );

  const client = getBasenamePublicClient(Number(chainId));
  const basename = await client.readContract({
    abi: L2Resolver,
    address: USERNAME_L2_RESOLVER_ADDRESSES[Number(chainId)],
    args: [namehashNode],
    functionName: 'name',
  });

  if (!basename) return NextResponse.json({ error: '404: Basename not found' }, { status: 404 });

  const tokenMedata = {
    // This is the URL to the image of the item.
    image: `${domainName}/api/basenames/${basename}/assets/cardImage.svg`,

    // This is the URL that will appear below the asset's image on OpenSea and will allow users to leave OpenSea and view the item on your site.
    external_url: `${domainName}/name/${basename}`,

    // A human-readable description of the item. Markdown is supported.
    description: `${basename}, a Basename`,

    // A human-readable description of the item. Markdown is supported.
    name: basename,

    // TODO: attributes?
  };

  return NextResponse.json(tokenMedata);
}
