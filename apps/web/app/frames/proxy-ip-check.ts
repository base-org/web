import { ipSafe } from 'apps/web/src/middleware/ipSafe';
import dns from 'dns/promises';
import ipaddr from 'ipaddr.js';
import { NextRequest, NextResponse } from 'next/server';
import { URL } from 'url';
import { isDevelopment } from 'apps/web/src/constants';

export function withIPCheck(handler: (req: NextRequest) => Promise<Response>) {
  return async function (req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const url = searchParams.get('url');

    if (url) {
      if (isDevelopment) {
        const res = await handler(req);
        return res;
      }
      try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;
        const resolvedAddresses = await dns.resolve(hostname);

        let allSafe = true;

        for (const address of resolvedAddresses) {
          if (ipaddr.isValid(address)) {
            if (!ipSafe(address)) {
              allSafe = false;
            }
          } else {
            return NextResponse.json({ message: 'Invalid IP address resolution' }, { status: 400 });
          }
        }

        if (!allSafe) {
          return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        return await handler(req);
      } catch (error) {
        return NextResponse.json({ message: 'Invalid URL format' }, { status: 400 });
      }
    }

    return handler(req);
  };
}
