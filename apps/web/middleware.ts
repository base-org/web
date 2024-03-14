import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (
    url.pathname === '/base-camp' ||
    url.pathname === '/basecamp' ||
    url.pathname === '/base-camp/docs' ||
    url.pathname === '/basecamp/docs' ||
    url.pathname === '/camp'
  ) {
    url.host = 'docs.base.org';
    url.pathname = '/base-camp/docs/welcome';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/run-a-base-goerli-node') {
    url.host = 'docs.base.org';
    url.pathname = '/guides/run-a-base-node';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/discord') {
    url.host = 'discord.gg';
    url.pathname = '/buildonbase';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/blog') {
    url.host = 'base.mirror.xyz';
    url.pathname = '/';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (
    process.env.APP_STAGE !== 'production' ||
    process.env.AUTH_ENABLED === 'false' ||
    url.pathname === '/api/_health'
  ) {
    return NextResponse.next();
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
