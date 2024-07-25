import { NextResponse } from 'next/server';
import { base } from 'viem/chains';

export const config = {
  runtime: 'edge',
};

export default async function GET(request: Request) {
  // TODO: Check this works in live/production
  const url = new URL(request.url);
  const chainId = url.searchParams.get('chainId') ?? base.id;
  if (!chainId) return NextResponse.json({ error: '406: chainId is missing' }, { status: 406 });

  return NextResponse.redirect(
    new URL(`/api/basenames/contract-uri.json?chainId=${chainId}`, request.url),
  );
}
