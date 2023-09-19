import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Always allow health checks through
  if (url.pathname === '/api/_health') {
    return NextResponse.next();
  }

  // Redirect bridge.base.org --> goerli-bridge.base.org while we prepare
  // mainnet bridge.
  if (process.env.REDIRECT_MAINNET_BRIDGE === 'true') {
    return NextResponse.redirect(
      `${process.env?.GOERLI_BRIDGE_URL ?? 'https://goerli-bridge.base.org'}${url.pathname}`,
    );
  }

  if (url.pathname === '/') {
    url.pathname = '/deposit';

    return NextResponse.redirect(url);
  }

  // If in local / dev or auth is disabled, let request through
  if (process.env.APP_STAGE !== 'production' || process.env.AUTH_ENABLED === 'false') {
    const response = NextResponse.next();
    response.headers.set('x-cf-country', req.headers.get('cf-ipcountry') ?? '');
    return response;
  }

  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');
    const users: Record<string, string> = (process.env?.BASIC_AUTH_CREDENTIALS ?? ' ')
      .split(' ')
      .reduce((o, e) => {
        const s = e.split(':');
        const updated = { ...o, [s[0]]: s[1] };
        return updated;
      }, {});
    if (users[user] === pwd) {
      return NextResponse.next();
    }
  }
  url.pathname = '/api/auth';

  return NextResponse.rewrite(url);
}
