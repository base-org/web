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
    url.pathname = '/tutorials/run-a-base-node';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/deploy-smart-contracts') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/deploy-with-hardhat';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/deploy-with-foundry') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/deploy-with-foundry';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/deploy-with-remix') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/deploy-with-remix';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/deploy-with-tenderly') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/deploy-with-tenderly';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/deploy-with-thirdweb') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/deploy-with-thirdweb';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/build-with-thirdweb') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/build-with-thirdweb';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/run-a-base-node') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/run-a-base-node';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/using-chainlink-price-feeds') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/oracles-chainlink-price-feeds';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/using-pyth-price-feeds') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/oracles-pyth-price-feeds';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/using-supra-vrf') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/oracles-supra-vrf';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/cross-chain-with-ccip') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/cross-chain-with-ccip';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/cross-chain-with-layerzero') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/cross-chain-with-layerzero';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/account-abstraction-with-biconomy') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/account-abstraction-with-biconomy';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/building-with-base-and-foundry/introduction') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/intro-to-foundry-setup';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/building-with-base-and-foundry/testing') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/intro-to-foundry-testing';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/complex-onchain-nfts') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/onchain-nfts';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/linked-minting-frame') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/farcaster-frames-nocode-minting';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/nft-minting-frame') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/farcaster-frames-nft-minting';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/deploy-frame-on-vercel') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/farcaster-frames-deploy-to-vercel';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/advanced-frame-behavior') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/farcaster-frames-gating-and-redirects';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/hyperframes') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/farcaster-frames-hyperframes';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/guides/frame-transactions') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/farcaster-frames-transactions';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith('/hardhat-tools-and-testing/hardhat-profiling-size')) {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/hardhat-profiling-size';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith('/hardhat-tools-and-testing/hardhat-profiling-gas')) {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/hardhat-profiling-gas';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname === '/hardhat-tools-and-testing/hardhat-debugging/debugging-with-hardhat-sbs') {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/hardhat-debugging';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (
    url.pathname === '/hardhat-tools-and-testing/hardhat-test-coverage/hardhat-test-coverage-sbs'
  ) {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/hardhat-test-coverage';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith('/connecting-to-the-blockchain')) {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/intro-to-providers';
    url.port = '443';

    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith('/guides/account-abstraction')) {
    url.host = 'docs.base.org';
    url.pathname = '/tutorials/account-abstraction-with-privy-and-base-paymaster';
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
