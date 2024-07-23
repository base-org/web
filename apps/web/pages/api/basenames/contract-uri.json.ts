import { NextResponse } from 'next/server';
import { base } from 'viem/chains';

export const config = {
  runtime: 'edge',
};

export default async function GET(request: Request) {
  // TODO: Check this works in live/production
  const url = new URL(request.url);
  const domainName = `${url.protocol}//${url.host}`;

  const chainId = Number(url.searchParams.get('chainId')) ?? base.id;

  if (!chainId) return NextResponse.json({ error: '406: chainId is missing' }, { status: 406 });

  const name = chainId === base.id ? 'Basename' : 'Basename (Sepolia testnet)';

  const tokenMedata = {
    name: name,
    description: 'TODO',
    image: 'TODO', // TODO
    banner_image: 'TODO.png', // TODO
    featured_image: 'TODO.png', // TODO
    external_link: `${domainName}/names`,
    collaborators: [],
  };

  return NextResponse.json(tokenMedata);
}
