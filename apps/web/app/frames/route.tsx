import { GET as getHandler, POST as postHandler } from '@frames.js/render/next';
import { ipSafe } from 'apps/web/src/middleware/ipSafe';
import { NextRequest, NextResponse } from 'next/server';
import ipaddr from 'ipaddr.js';
import { URL } from 'url';
import dns from 'dns/promises';

function withIPCheck(handler: (req: NextRequest) => Promise<Response>) {
  return async function (req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get('url');

    if (url) {
      try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;
        const resolvedAddresses = await dns.resolve(hostname);

        let allSafe = true;

        for (const address of resolvedAddresses) {
          if (ipaddr.isValid(address)) {
            if (!ipSafe(address)) {
              allSafe = false;
            } else {
            }
          } else {
            return NextResponse.json({ message: 'Invalid IP address resolution' }, { status: 400 });
          }
        }

        if (!allSafe) {
          return NextResponse.json({ message: 'Forbidden: Unsafe IP' }, { status: 403 });
        }

        return await handler(req);
      } catch (error) {
        return NextResponse.json({ message: 'Invalid URL format' }, { status: 400 });
      }
    }

    return handler(req);
  };
}

//
export const GET = withIPCheck(getHandler);
export const POST = withIPCheck(postHandler);
