import { NextRequest, NextResponse } from 'next/server';

const redirects = [
  { paths: ['/base-camp', '/base-learn', '/basecamp', '/baselearn', '/camp', '/learn'], target: '/base-learn/docs/welcome', host: 'docs.base.org' },
  { paths: ['/base-camp/docs', '/base-learn/docs', '/basecamp/docs', '/baselearn/docs'], target: '/base-learn/docs/welcome', host: 'docs.base.org' },
  { paths: ['/guides/run-a-base-goerli-node'], target: '/tutorials/run-a-base-node', host: 'docs.base.org' },
  { paths: ['/using-base'], target: '/docs/using-base', host: 'docs.base.org' },
  { paths: ['/network-information'], target: '/docs/network-information', host: 'docs.base.org' },
  { paths: ['/base-contracts'], target: '/docs/base-contracts', host: 'docs.base.org' },
  { paths: ['/fees'], target: '/docs/fees', host: 'docs.base.org' },
  { paths: ['/differences'], target: '/docs/differences', host: 'docs.base.org' },
  { paths: ['/tools/node-providers'], target: '/docs/tools/node-providers', host: 'docs.base.org' },
  { paths: ['/tools/block-explorers'], target: '/docs/tools/block-explorers', host: 'docs.base.org' },
  { paths: ['/tools/network-faucets'], target: '/docs/tools/network-faucets', host: 'docs.base.org' },
  { paths: ['/tools/oracles'], target: '/docs/tools/oracles', host: 'docs.base.org' },
  { paths: ['/tools/data-indexers'], target: '/docs/tools/data-indexers', host: 'docs.base.org' },
  { paths: ['/tools/cross-chain'], target: '/docs/tools/cross-chain', host: 'docs.base.org' },
  { paths: ['/tools/account-abstraction'], target: '/docs/tools/account-abstraction', host: 'docs.base.org' },
  { paths: ['/tools/nft-checkout'], target: '/docs/tools/nft-checkout', host: 'docs.base.org' },
  { paths: ['/tools/onramps'], target: '/docs/tools/onramps', host: 'docs.base.org' },
  { paths: ['/tools/onboarding'], target: '/docs/tools/onboarding', host: 'docs.base.org' },
  { paths: ['/tools/bridges'], target: '/docs/tools/bridges', host: 'docs.base.org' },
  { paths: ['/tools/bridges-testnet'], target: '/docs/tools/bridges-testnet', host: 'docs.base.org' },
  { paths: ['/tools/bridge-faq'], target: '/docs/tools/bridge-faq', host: 'docs.base.org' },
  { paths: ['/tools/foundry'], target: '/docs/tools/foundry', host: 'docs.base.org' },
  { paths: ['/tools/hardhat'], target: '/docs/tools/hardhat', host: 'docs.base.org' },
  { paths: ['/tools/thirdweb-cli'], target: '/docs/tools/thirdweb-cli', host: 'docs.base.org' },
  { paths: ['/tools/ethers'], target: '/docs/tools/ethers', host: 'docs.base.org' },
  { paths: ['/tools/thirdweb-sdk'], target: '/docs/tools/thirdweb-sdk', host: 'docs.base.org' },
  { paths: ['/tools/viem'], target: '/docs/tools/viem', host: 'docs.base.org' },
  { paths: ['/tools/web3'], target: '/docs/tools/web3', host: 'docs.base.org' },
  { paths: ['/tokens/list'], target: '/docs/tokens/list', host: 'docs.base.org' },
  { paths: ['/tokens/wallet'], target: '/docs/tokens/wallet', host: 'docs.base.org' },
  { paths: ['/contracts'], target: '/docs/contracts', host: 'docs.base.org' },
  { paths: ['/security'], target: '/docs/security', host: 'docs.base.org' },
  { paths: ['/terms-of-service'], target: '/docs/terms-of-service', host: 'docs.base.org' },
  { paths: ['/privacy-policy'], target: '/docs/privacy-policy', host: 'docs.base.org' },
  { paths: ['/cookie-policy'], target: '/docs/cookie-policy', host: 'docs.base.org' },
  { paths: ['/discord'], target: '/buildonbase', host: 'discord.gg' },
  { paths: ['/blog'], target: '/', host: 'base.mirror.xyz' }
];

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  for (const redirect of redirects) {
    if (redirect.paths.includes(url.pathname)) {
      url.host = redirect.host;
      url.pathname = redirect.target;
      url.port = '443';

      return NextResponse.redirect(url);
    }
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
