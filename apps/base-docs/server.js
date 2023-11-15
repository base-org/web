const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth');
const fs = require('fs');
const notFound = require('./404.js');

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

app.get('/api/_health', (_, res) => {
  res.sendStatus(200);
});

app.get('/base-camp', (req, res) => {
  res.redirect('base-camp/docs/welcome');
});

app.get('/basecamp', (req, res) => {
  res.redirect('base-camp/docs/welcome');
});

app.get('/guides/run-a-base-goerli-node/', (req, res) => {
  res.redirect('/guides/run-a-base-node/');
});

console.log('process.env.AUTH_ENABLED', process.env.AUTH_ENABLED);

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
    'https://cca-lite.coinbase.com', // CCA Lite
    'https://*.algolia.net', // Algolia Search
    'https://*.algolianet.com', // Algolia Search
  ],
  'frame-src': ["'self'", 'https://player.vimeo.com'],
};

const cspObjectToString = Object.entries(contentSecurityPolicy).reduce((acc, [key, value]) => {
  return `${acc}${key} ${value.join(' ')};`;
}, '');

app.use(
  express.static(path.join(__dirname, '../../out/base-docs'), {
    setHeaders: function (res) {
      res.setHeader('cache-control', 'no-store');
      res.setHeader('content-security-policy', cspObjectToString);
      res.setHeader('cross-origin-opener-policy', 'same-origin');
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
