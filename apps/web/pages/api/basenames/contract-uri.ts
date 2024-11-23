import { isDevelopment } from 'apps/web/src/constants';
import { NextResponse } from 'next/server';
import { base } from 'viem/chains';

export const config = {
  runtime: 'edge',
};

export default async function GET(request: Request) {
  const url = new URL(request.url);

  const domainName = isDevelopment ? `${url.protocol}//${url.host}` : 'https://www.base.org';
  const chainIdFromParams = url.searchParams.get('chainId');
  const chainId = chainIdFromParams ? Number(chainIdFromParams) : base.id;
  if (!chainId) return NextResponse.json({ error: '406: chainId is missing' }, { status: 406 });

  return NextResponse.redirect(
    new URL(`${domainName}/api/basenames/contract-uri.json?chainId=${chainId}`, request.url),
  );
}
