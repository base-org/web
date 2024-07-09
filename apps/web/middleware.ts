import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const redirects: Record<string, { host: string; pathname: string }> = {
    '/base-camp': { host: 'docs.base.org', pathname: '/base-camp/docs/welcome' },
    '/basecamp': { host: 'docs.base.org', pathname: '/base-camp/docs/welcome' },
    '/base-camp/docs': { host: 'docs.base.org', pathname: '/base-camp/docs/welcome' },
    '/basecamp/docs': { host: 'docs.base.org', pathname: '/base-camp/docs/welcome' },
    '/camp': { host: 'docs.base.org', pathname: '/base-camp/docs/welcome' },
    '/guides/run-a-base-goerli-node': { host: 'docs.base.org', pathname: '/tutorials/run-a-base-node' },
    '/using-base': { host: 'docs.base.org', pathname: '/docs/using-base' },
    '/network-information': { host: 'docs.base.org', pathname: '/docs/network-information' },
    '/base-contracts': { host: 'docs.base.org', pathname: '/docs/base-contracts' },
    '/fees': { host: 'docs.base.org', pathname: '/docs/fees' },
    '/differences': { host: 'docs.base.org', pathname: '/docs/differences' },
    '/tools/node-providers': { host: 'docs.base.org', pathname: '/docs/tools/node-providers' },
    '/tools/block-explorers': { host: 'docs.base.org', pathname: '/docs/tools/block-explorers' },
    '/tools/network-faucets': { host: 'docs.base.org', pathname: '/docs/tools/network-faucets' },
    '/tools/oracles': { host: 'docs.base.org', pathname: '/docs/tools/oracles' },
    '/tools/data-indexers': { host: 'docs.base.org', pathname: '/docs/tools/data-indexers' },
    '/tools/cross-chain': { host: 'docs.base.org', pathname: '/docs/tools/cross-chain' },
    '/tools/account-abstraction': { host: 'docs.base.org', pathname: '/docs/tools/account-abstraction' },
    '/tools/nft-checkout': { host: 'docs.base.org', pathname: '/docs/tools/nft-checkout' },
    '/tools/onramps': { host: 'docs.base.org', pathname: '/docs/tools/onramps' },
    '/tools/onboarding': { host: 'docs.base.org', pathname: '/docs/tools/onboarding' },
    '/tools/bridges': { host: 'docs.base.org', pathname: '/docs/tools/bridges' },
    '/tools/bridges-testnet': { host: 'docs.base.org', pathname: '/docs/tools/bridges-testnet' },
    '/tools/bridge-faq': { host: 'docs.base.org', pathname: '/docs/tools/bridge-faq' },
    '/tools/foundry': { host: 'docs.base.org', pathname: '/docs/tools/foundry' },
    '/tools/hardhat': { host: 'docs.base.org', pathname: '/docs/tools/hardhat' },
    '/tools/thirdweb-cli': { host: 'docs.base.org', pathname: '/docs/tools/thirdweb-cli' },
    '/tools/ethers': { host: 'docs.base.org', pathname: '/docs/tools/ethers' },
    '/tools/thirdweb-sdk': { host: 'docs.base.org', pathname: '/docs/tools/thirdweb-sdk' },
    '/tools/viem': { host: 'docs.base.org', pathname: '/docs/tools/viem' },
    '/tools/web3': { host: 'docs.base.org', pathname: '/docs/tools/web3' },
    '/tokens/list': { host: 'docs.base.org', pathname: '/docs/tokens/list' },
    '/tokens/wallet': { host: 'docs.base.org', pathname: '/docs/tokens/wallet' },
    '/contracts': { host: 'docs.base.org', pathname: '/docs/contracts' },
    '/security': { host: 'docs.base.org', pathname: '/docs/security' },
    '/terms-of-service': { host: 'docs.base.org', pathname: '/docs/terms-of-service' },
    '/privacy-policy': { host: 'docs.base.org', pathname: '/docs/privacy-policy' },
    '/cookie-policy': { host: 'docs.base.org', pathname: '/docs/cookie-policy' },
  };

  const hostRedirects: Record<string, string> = {
    '/discord': 'https://discord.gg/buildonbase',
    '/blog': 'https://base.mirror.xyz/',
  };

  if (redirects[url.pathname]) {
    const { host, pathname } = redirects[url.pathname];
    url.host = host;
    url.pathname = pathname;
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (hostRedirects[url.pathname]) {
    const redirectUrl = hostRedirects[url.pathname];
    return NextResponse.redirect(redirectUrl);
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
      .reduce((acc, cred) => {
        const [username, password] = cred.split(':');
        acc[username] = password;
        return acc;
      }, {});

    if (users[user] === pwd) {
      return NextResponse.next();
    }
  }

  url.pathname = '/api/auth';
  return NextResponse.rewrite(url);
}
