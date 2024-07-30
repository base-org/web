const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth');
const fs = require('fs');
const notFound = require('./404.js');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const unless = function (path, middleware) {
  return function (req, res, next) {
    if (path === req.baseUrl) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};

const app = express();

app.use(express.static('static'));

app.use(bodyParser.json());

app.get('/api/_health', (_, res) => {
  res.sendStatus(200);
});

app.post('/api/rateMessage', (req, res) => {
  const { message_id, rating_value } = req.body;

  const data = {
    api_key: process.env.MENDABLE_SERVER_API_KEY,
    message_id,
    rating_value,
  };

  fetch('https://api.mendable.ai/v1/rateMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => res.json(response))
    .catch((error) => res.status(400));
});

app.get('/base-camp', (req, res) => {
  res.redirect('/base-learn/docs/welcome');
});

app.get('/base-learn', (req, res) => {
  res.redirect('/base-learn/docs/welcome');
});

app.get('/basecamp', (req, res) => {
  res.redirect('/base-learn/docs/welcome');
});

app.get('/baselearn', (req, res) => {
  res.redirect('/base-learn/docs/welcome');
});

app.get('/using-base', (req, res) => {
  res.redirect('/docs/using-base');
});

app.get('/network-information', (req, res) => {
  res.redirect('/docs/network-information');
});

app.get('/base-contracts', (req, res) => {
  res.redirect('/docs/base-contracts');
});

app.get('/fees', (req, res) => {
  res.redirect('/docs/fees');
});

app.get('/differences', (req, res) => {
  res.redirect('/docs/differences');
});

app.get('/contracts', (req, res) => {
  res.redirect('/docs/contracts');
});

app.get('/security', (req, res) => {
  res.redirect('/docs/security');
});

app.get('/terms-of-service', (req, res) => {
  res.redirect('/docs/terms-of-service');
});

app.get('/privacy-policy', (req, res) => {
  res.redirect('/docs/privacy-policy');
});

app.get('/cookie-policy', (req, res) => {
  res.redirect('/docs/cookie-policy');
});

app.get('/tools/node-providers', (req, res) => {
  res.redirect('/docs/tools/node-providers');
});

app.get('/tools/block-explorers', (req, res) => {
  res.redirect('/docs/tools/block-explorers');
});

app.get('/tools/network-faucets', (req, res) => {
  res.redirect('/docs/tools/network-faucets');
});

app.get('/tools/oracles', (req, res) => {
  res.redirect('/docs/tools/oracles');
});

app.get('/tools/data-indexers', (req, res) => {
  res.redirect('/docs/tools/data-indexers');
});

app.get('/tools/cross-chain', (req, res) => {
  res.redirect('/docs/tools/cross-chain');
});

app.get('/tools/account-abstraction', (req, res) => {
  res.redirect('/docs/tools/account-abstraction');
});

app.get('/tools/nft-checkout', (req, res) => {
  res.redirect('/docs/tools/nft-checkout');
});

app.get('/tools/onramps', (req, res) => {
  res.redirect('/docs/tools/onramps');
});

app.get('/tools/onboarding', (req, res) => {
  res.redirect('/docs/tools/onboarding');
});

app.get('/tools/bridges', (req, res) => {
  res.redirect('/docs/tools/bridges');
});

app.get('/docs/tools/bridges-testnet', (req, res) => {
  res.redirect('/docs/tools/bridges');
});

app.get('docs/tools/bridge-faq', (req, res) => {
  res.redirect('/docs/tools/bridges');
});

app.get('/tools/foundry', (req, res) => {
  res.redirect('/docs/tools/foundry');
});

app.get('/tools/hardhat', (req, res) => {
  res.redirect('/docs/tools/hardhat');
});

app.get('/tools/thirdweb-cli', (req, res) => {
  res.redirect('/docs/tools/thirdweb-cli');
});

app.get('/tools/ethers', (req, res) => {
  res.redirect('/docs/tools/ethers');
});

app.get('/tools/thirdweb-sdk', (req, res) => {
  res.redirect('/docs/tools/thirdweb-sdk');
});

app.get('/tools/viem', (req, res) => {
  res.redirect('/docs/tools/viem');
});

app.get('/tools/web3', (req, res) => {
  res.redirect('/docs/tools/web3');
});

app.get('/tokens/list', (req, res) => {
  res.redirect('/docs/tokens/list');
});

app.get('/tokens/wallet', (req, res) => {
  res.redirect('/docs/tokens/wallet');
});

app.get('/guides/run-a-base-goerli-node/', (req, res) => {
  res.redirect('/tutorials/run-a-base-node/');
});

app.get('/guides/deploy-smart-contracts', (req, res) => {
  res.redirect('/tutorials/deploy-with-hardhat');
});

app.get('/guides/deploy-with-foundry', (req, res) => {
  res.redirect('/tutorials/deploy-with-foundry');
});

app.get('/guides/deploy-with-remix', (req, res) => {
  res.redirect('/tutorials/deploy-with-remix');
});

app.get('/guides/deploy-with-tenderly', (req, res) => {
  res.redirect('/tutorials/deploy-with-tenderly');
});

app.get('/guides/deploy-with-thirdweb', (req, res) => {
  res.redirect('/tutorials/deploy-with-thirdweb');
});

app.get('/guides/build-with-thirdweb', (req, res) => {
  res.redirect('/tutorials/build-with-thirdweb');
});

app.get('/guides/run-a-base-node', (req, res) => {
  res.redirect('/tutorials/run-a-base-node');
});

app.get('/guides/using-chainlink-price-feeds', (req, res) => {
  res.redirect('/tutorials/oracles-chainlink-price-feeds');
});

app.get('/guides/using-pyth-price-feeds', (req, res) => {
  res.redirect('/tutorials/oracles-pyth-price-feeds');
});

app.get('/guides/using-supra-vrf', (req, res) => {
  res.redirect('/tutorials/oracles-supra-vrf');
});

app.get('/guides/cross-chain-with-ccip', (req, res) => {
  res.redirect('/tutorials/cross-chain-with-ccip');
});

app.get('/guides/cross-chain-with-layerzero', (req, res) => {
  res.redirect('/tutorials/cross-chain-with-layerzero');
});

app.get('/guides/account-abstraction-with-biconomy', (req, res) => {
  res.redirect('/tutorials/account-abstraction-with-biconomy');
});

app.get('/guides/building-with-base-and-foundry/introduction', (req, res) => {
  res.redirect('/tutorials/intro-to-foundry-setup');
});

app.get('/guides/building-with-base-and-foundry/testing', (req, res) => {
  res.redirect('/tutorials/intro-to-foundry-testing');
});

app.get('/guides/complex-onchain-nfts', (req, res) => {
  res.redirect('/tutorials/onchain-nfts');
});

app.get('/guides/linked-minting-frame', (req, res) => {
  res.redirect('/tutorials/farcaster-frames-nocode-minting');
});

app.get('/guides/nft-minting-frame', (req, res) => {
  res.redirect('/tutorials/farcaster-frames-nft-minting');
});

app.get('/guides/deploy-frame-on-vercel', (req, res) => {
  res.redirect('/tutorials/farcaster-frames-deploy-to-vercel');
});

app.get('/guides/advanced-frame-behavior', (req, res) => {
  res.redirect('/tutorials/farcaster-frames-gating-and-redirects');
});

app.get('/guides/hyperframes', (req, res) => {
  res.redirect('/tutorials/farcaster-frames-hyperframes');
});

app.get('/guides/frame-transactions', (req, res) => {
  res.redirect('/tutorials/farcaster-frames-transactions');
});

app.get('/hardhat-tools-and-testing/overview', (req, res) => {
  res.redirect('');
});

app.get(
  '/hardhat-tools-and-testing/hardhat-profiling-size/contract-sizer-setup-vid',
  (req, res) => {
    res.redirect('/tutorials/hardhat-profiling-size');
  },
);

app.get(
  '/hardhat-tools-and-testing/hardhat-profiling-size/manual-contract-optimizations-vid',
  (req, res) => {
    res.redirect('/tutorials/hardhat-profiling-size');
  },
);

app.get('/hardhat-tools-and-testing/hardhat-profiling-size/using-the-optimizer-vid', (req, res) => {
  res.redirect('/tutorials/hardhat-profiling-size');
});

app.get('/hardhat-tools-and-testing/hardhat-profiling-size/hardhat-profiling-size', (req, res) => {
  res.redirect('/tutorials/hardhat-profiling-size');
});

app.get(
  '/hardhat-tools-and-testing/hardhat-profiling-gas/installing-the-gas-analyzer-vid',
  (req, res) => {
    res.redirect('/tutorials/hardhat-profiling-gas');
  },
);

app.get('/hardhat-tools-and-testing/hardhat-profiling-gas/improving-gas-usage-vid', (req, res) => {
  res.redirect('/tutorials/hardhat-profiling-gas');
});

app.get('/hardhat-tools-and-testing/hardhat-profiling-gas/hardhat-profiling-gas', (req, res) => {
  res.redirect('/tutorials/hardhat-profiling-gas');
});

app.get('/hardhat-tools-and-testing/hardhat-debugging/debugging-with-hardhat-sbs', (req, res) => {
  res.redirect('/tutorials/hardhat-debugging');
});

app.get(
  '/hardhat-tools-and-testing/hardhat-test-coverage/hardhat-test-coverage-sbs',
  (req, res) => {
    res.redirect('/tutorials/hardhat-test-coverage');
  },
);

app.get('/connecting-to-the-blockchain/overview', (req, res) => {
  res.redirect('/tutorials/intro-to-providers');
});

app.get('/connecting-to-the-blockchain/blockchain-providers', (req, res) => {
  res.redirect('/tutorials/intro-to-providers');
});

app.get('/connecting-to-the-blockchain/connecting-with-a-provider', (req, res) => {
  res.redirect('/tutorials/intro-to-providers');
});

app.get('/guides/account-abstraction/overview', (req, res) => {
  res.redirect('/tutorials/account-abstraction-with-privy-and-base-paymaster');
});

app.get('/guides/account-abstraction/intro-to-account-abstraction', (req, res) => {
  res.redirect('/tutorials/account-abstraction-with-privy-and-base-paymaster');
});

app.get('/guides/account-abstraction/intro-to-privy', (req, res) => {
  res.redirect('/tutorials/account-abstraction-with-privy-and-base-paymaster');
});

app.get('/guides/account-abstraction/implementing-the-paymaster', (req, res) => {
  res.redirect('/tutorials/account-abstraction-with-privy-and-base-paymaster');
});

app.get('/building-with-base/guides/account-abstraction/overview', (req, res) => {
  res.redirect('/tutorials/account-abstraction-with-privy-and-base-paymaster');
});

app.get(
  '/building-with-base/guides/account-abstraction/intro-to-account-abstraction',
  (req, res) => {
    res.redirect('/tutorials/account-abstraction-with-privy-and-base-paymaster');
  },
);

app.get('/building-with-base/guides/account-abstraction/intro-to-privy', (req, res) => {
  res.redirect('/tutorials/account-abstraction-with-privy-and-base-paymaster');
});

app.get('/building-with-base/guides/account-abstraction/implementing-the-paymaster', (req, res) => {
  res.redirect('/tutorials/account-abstraction-with-privy-and-base-paymaster');
});

if (process.env.APP_STAGE === 'production' && process.env.AUTH_ENABLED !== 'false') {
  const auth = basicAuth({
    challenge: true,
    realm: 'This is a private site',
    // expected in the format: "user1:pass user2:pass" (same as the Base public router)
    users: process.env.BASIC_AUTH_CREDENTIALS.split(' ').reduce((o, e) => {
      let s = e.split(':');
      o[s[0]] = s[1];
      return o;
    }, {}),
  });

  app.use(unless('/api/_health', auth));
}

app.set('port', 3000);

const contentSecurityPolicy = {
  'default-src': ["'self'"],
  'frame-ancestors': ["'self'"],
  'form-action': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    'https://static-assets.coinbase.com/js/cca/v0.0.1.js', // CCA Lite
    'https://cca-lite.coinbase.com', // CCA Lite
  ],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:'],
  'connect-src': [
    "'self'",
    'wss://www.walletlink.org/rpc', // Coinbase Wallet SDK
    'wss://relay.walletconnect.com', // WalletConnect
    'wss://relay.walletconnect.org',
    'https://goerli.base.org', // Base Goerli RPC
    'https://sepolia.base.org', // Base Sepolia RPC
    'https://cca-lite.coinbase.com', // CCA Lite
    'https://*.algolia.net', // Algolia Search
    'https://*.algolianet.com', // Algolia Search
    'https://api.mendable.ai/v1/newConversation', // Mendable API
    'https://api.mendable.ai/v1/mendableChat', // Mendable API
    'https://api.mendable.ai/v1/rateMessage', // Mendable API
    'https://api.sprig.com', // Sprig API
    'https://cdn.sprig.com', // Sprig API
    'https://flag.lab.amplitude.com/sdk/v2/flags',
    'https://api.lab.amplitude.com/sdk/v2/vardata',
    'https://browser-intake-datadoghq.com', // datadog
    'https://*.datadoghq.com'
  ],
  'frame-src': ["'self'", 'https://player.vimeo.com', 'https://verify.walletconnect.org'],
};

const cspObjectToString = Object.entries(contentSecurityPolicy).reduce((acc, [key, value]) => {
  return `${acc}${key} ${value.join(' ')};`;
}, '');

app.use(
  express.static(path.join(__dirname, '../../out/base-docs'), {
    setHeaders: function (res) {
      res.setHeader('cache-control', 'no-store');
      res.setHeader('content-security-policy', cspObjectToString);
      res.setHeader('cross-origin-opener-policy', 'same-origin-allow-popups');
      res.setHeader('referrer-policy', 'strict-origin-when-cross-origin');
      res.setHeader('strict-transport-security', 'max-age=63072000; includeSubDomains; preload');
      res.setHeader('x-content-type-options', 'nosniff');
      res.setHeader('x-frame-options', 'SAMEORIGIN');
      res.setHeader('x-xss-protection', '1; mode=block');
    },
  }),
);

app.use(function (req, res, next) {
  const filePath = path.resolve(__dirname, req.originalUrl.slice(1));
  const rootDir = path.resolve(__dirname, 'public');

  if (!filePath.startsWith(rootDir)) {
    res.status(404).send(notFound.html);
    return;
  }

  if (!fs.existsSync(filePath)) {
    res.status(404).send(notFound.html);
    return;
  }

  next();
});

app.listen(app.get('port'));
