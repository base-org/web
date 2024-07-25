import { NextResponse } from 'next/server';
import { base } from 'viem/chains';

export const config = {
  runtime: 'edge',
};

export default async function GET(request: Request) {
  // TODO: Check this works in live/production
  const url = new URL(request.url);
  const isDevelopment = process.env.NODE_ENV === 'development';
  const domainName = isDevelopment ? `${url.protocol}//${url.host}` : 'https://www.base.org';

  const chainId = url.searchParams.get('chainId') ?? base.id;
  if (!chainId) return NextResponse.json({ error: '406: chainId is missing' }, { status: 406 });

  const name = Number(chainId) === base.id ? 'Basename' : 'Basename (Sepolia testnet)';

  const tokenMedata = {
    name: name,
    description: 'TODO',
    image: 'TODO', // TODO
    banner_image: 'TODO.png', // TODO
    featured_image: 'TODO.png', // TODO
    external_link: `${domainName}/name`,
    collaborators: [],
  };

  return NextResponse.json(tokenMedata);
}
