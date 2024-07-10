const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth');
const fs = require('fs');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const notFound = require('./404.js');

dotenv.config();

const app = express();

// Middleware
app.use(express.static('static'));
app.use(bodyParser.json());

// Health Check API
app.get('/api/_health', (_, res) => {
  res.sendStatus(200);
});

// Rate Message API
app.post('/api/rateMessage', async (req, res) => {
  try {
    const { message_id, rating_value } = req.body;
    const data = {
      api_key: process.env.MENDABLE_SERVER_API_KEY,
      message_id,
      rating_value,
    };
    const response = await fetch('https://api.mendable.ai/v1/rateMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    res.json(json);
  } catch (error) {
    console.error('Error rating message:', error);
    res.status(400).send('Error rating message');
  }
});

// Redirects
const redirects = {
  '/base-camp': '/base-camp/docs/welcome',
  '/basecamp': '/base-camp/docs/welcome',
  '/using-base': '/docs/using-base',
  '/network-information': '/docs/network-information',
  '/base-contracts': '/docs/base-contracts',
  '/fees': '/docs/fees',
  '/differences': '/docs/differences',
  '/contracts': '/docs/contracts',
  '/security': '/docs/security',
  '/terms-of-service': '/docs/terms-of-service',
  '/privacy-policy': '/docs/privacy-policy',
  '/cookie-policy': '/docs/cookie-policy',
  '/tools/node-providers': '/docs/tools/node-providers',
  '/tools/block-explorers': '/docs/tools/block-explorers',
  '/tools/network-faucets': '/docs/tools/network-faucets',
  '/tools/oracles': '/docs/tools/oracles',
  '/tools/data-indexers': '/docs/tools/data-indexers',
  '/tools/cross-chain': '/docs/tools/cross-chain',
  '/tools/account-abstraction': '/docs/tools/account-abstraction',
  '/tools/nft-checkout': '/docs/tools/nft-checkout',
  '/tools/onramps': '/docs/tools/onramps',
  '/tools/onboarding': '/docs/tools/onboarding',
  '/tools/bridges': '/docs/tools/bridges',
  '/docs/tools/bridges-testnet': '/docs/tools/bridges',
  '/docs/tools/bridge-faq': '/docs/tools/bridges',
  '/tools/foundry': '/docs/tools/foundry',
  '/tools/hardhat': '/docs/tools/hardhat',
  '/tools/thirdweb-cli': '/docs/tools/thirdweb-cli',
  '/tools/ethers': '/docs/tools/ethers',
  '/tools/thirdweb-sdk': '/docs/tools/thirdweb-sdk',
  '/tools/viem': '/docs/tools/viem',
  '/tools/web3': '/docs/tools/web3',
  '/tokens/list': '/docs/tokens/list',
  '/tokens/wallet': '/docs/tokens/wallet',
  '/guides/run-a-base-goerli-node/': '/tutorials/run-a-base-node/',
  '/guides/deploy-smart-contracts': '/tutorials/deploy-with-hardhat',
  '/guides/deploy-with-foundry': '/tutorials/deploy-with-foundry',
  '/guides/deploy-with-remix': '/tutorials/deploy-with-remix',
  '/guides/deploy-with-tenderly': '/tutorials/deploy-with-tenderly',
  '/guides/deploy-with-thirdweb': '/tutorials/deploy-with-thirdweb',
  '/guides/build-with-thirdweb': '/tutorials/build-with-thirdweb',
  '/guides/run-a-base-node': '/tutorials/run-a-base-node',
  '/guides/using-chainlink-price-feeds': '/tutorials/oracles-chainlink-price-feeds',
  '/guides/using-pyth-price-feeds': '/tutorials/oracles-pyth-price-feeds',
  '/guides/using-supra-vrf': '/tutorials/oracles-supra-vrf',
  '/guides/cross-chain-with-ccip': '/tutorials/cross-chain-with-ccip',
  '/guides/cross-chain-with-layerzero': '/tutorials/cross-chain-with-layerzero',
  '/guides/account-abstraction-with-biconomy': '/tutorials/account-abstraction-with-biconomy',
  '/guides/building-with-base-and-foundry/introduction': '/tutorials/intro-to-foundry-setup',
  '/guides/building-with-base-and-foundry/testing': '/tutorials/intro-to-foundry-testing',
  '/guides/complex-onchain-nfts': '/tutorials/onchain-nfts',
  '/guides/linked-minting-frame': '/tutorials/farcaster-frames-nocode-minting',
  '/guides/nft-minting-frame': '/tutorials/farcaster-frames-nft-minting',
  '/guides/deploy-frame-on-vercel': '/tutorials/farcaster-frames-deploy-to-vercel',
  '/guides/advanced-frame-behavior': '/tutorials/farcaster-frames-gating-and-redirects',
  '/guides/hyperframes': '/tutorials/farcaster-frames-hyperframes',
  '/guides/frame-transactions': '/tutorials/farcaster-frames-transactions',
  '/hardhat-tools-and-testing/overview': '',
  '/hardhat-tools-and-testing/hardhat-profiling-size/contract-sizer-setup-vid': '/tutorials/hardhat-profiling-size',
  '/hardhat-tools-and-testing/hardhat-profiling-size/manual-contract-optimizations-vid': '/tutorials/hardhat-profiling-size',
  '/hardhat-tools-and-testing/hardhat-profiling-size/using-the-optimizer-vid': '/tutorials/hardhat-profiling-size',
  '/hardhat-tools-and-testing/hardhat-profiling-size/hardhat-profiling-size': '/tutorials/hardhat-profiling-size',
  '/hardhat-tools-and-testing/hardhat-profiling-gas/installing-the-gas-analyzer-vid': '/tutorials/hardhat-profiling-gas',
  '/hardhat-tools-and-testing/hardhat-profiling-gas/improving-gas-usage-vid': '/tutorials/hardhat-profiling-gas',
  '/hardhat-tools-and-testing/hardhat-profiling-gas/hardhat-profiling-gas': '/tutorials/hardhat-profiling-gas',
  '/hardhat-tools-and-testing/hardhat-debugging/debugging-with-hardhat-sbs': '/tutorials/hardhat-debugging',
  '/hardhat-tools-and-testing/hardhat-test-coverage/hardhat-test-coverage-sbs': '/tutorials/hardhat-test-coverage',
  '/connecting-to-the-blockchain/overview': '/tutorials/intro-to-providers',
  '/connecting-to-the-blockchain/blockchain-providers': '/tutorials/intro-to-providers',
  '/connecting-to-the-blockchain/connecting-with-a-provider': '/tutorials/intro-to-providers',
  '/guides/account-abstraction/overview': '/tutorials/account-abstraction-with-privy-and-base-paymaster',
  '/guides/account-abstraction/intro-to-account-abstraction': '/tutorials/account-abstraction-with-privy-and-base-paymaster',
  '/guides/account-abstraction/intro-to-privy': '/tutorials/account-abstraction-with-privy-and-base-paymaster',
  '/guides/account-abstraction/implementing-the-paymaster': '/tutorials/account-abstraction-with-privy-and-base-paymaster',
  '/building-with-base/guides/account-abstraction/overview': '/tutorials/account-abstraction-with-privy-and-base-paymaster',
  '/building-with-base/guides/account-abstraction/intro-to-account-abstraction': '/tutorials/account-abstraction-with-privy-and-base-paymaster',
  '/building-with-base/guides/account-abstraction/intro-to-privy': '/tutorials/account-abstraction-with-privy-and-base-paymaster',
  '/building-with-base/guides/account-abstraction/implementing-the-paymaster': '/tutorials/account-abstraction-with-privy-and-base-paymaster',
};

for (const [from, to] of Object.entries(redirects)) {
  app.get(from, (req, res) => {
    res.redirect(to);
  });
}

// Basic Authentication
if (process.env.APP_STAGE === 'production' && process.env.AUTH_ENABLED !== 'false') {
  const auth = basicAuth({
    challenge: true,
    realm: 'This is a private site',
    users: process.env.BASIC_AUTH_CREDENTIALS.split(' ').reduce((o, e) => {
      let s = e.split(':');
      o[s[0]] = s[1];
      return o;
    }, {}),
  });

  app.use(unless('/api/_health', auth));
}

// Security Headers
const securityHeaders = {
  'cache-control': 'no-store',
  'content-security-policy': {
    'default-src': ["'self'"],
    'frame-ancestors': ["'self'"],
    'form-action': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'",
      'https://static-assets.coinbase.com/js/cca/v0.0.1.js',
      'https://cca-lite.coinbase.com',
    ],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:'],
    'connect-src': [
      "'self'",
      'wss://www.walletlink.org/rpc',
      'wss://relay.walletconnect.com',
      'wss://relay.walletconnect.org',
      'https://goerli.base.org',
      'https://sepolia.base.org',
      'https://cca-lite.coinbase.com',
      'https://*.algolia.net',
      'https://*.algolianet.com',
      'https://api.mendable.ai/v1/newConversation',
      'https://api.mendable.ai/v1/mendableChat',
      'https://api.mendable.ai/v1/rateMessage',
      'https://api.sprig.com',
      'https://cdn.sprig.com',
    ],
    'frame-src': ["'self'", 'https://player.vimeo.com', 'https://verify.walletconnect.org'],
  },
  'cross-origin-opener-policy': 'same-origin-allow-popups',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'strict-transport-security': 'max-age=63072000; includeSubDomains; preload',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'x-xss-protection': '1; mode=block',
};

app.use(express.static(path.join(__dirname, '../../out/base-docs'), {
  setHeaders: (res) => {
    for (const [header, value] of Object.entries(securityHeaders)) {
      if (typeof value === 'string') {
        res.setHeader(header, value);
      } else if (typeof value === 'object') {
        res.setHeader(header, Object.entries(value).map(([key, val]) => `${key} ${val.join(' ')}`).join('; '));
      }
    }
  },
}));

// Error Handling for 404
app.use((req, res, next) => {
  const filePath = path.resolve(__dirname, req.originalUrl.slice(1));
  const rootDir = path.resolve(__dirname, 'public');

  if (!filePath.startsWith(rootDir) || !fs.existsSync(filePath)) {
    res.status(404).send(notFound.html);
    return;
  }

  next();
});

// Server listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
