const isProdEnv = process.env.NODE_ENV === 'production';

const baseConfig = {
  // Enable advanced features
  compiler: {
    reactRemoveProperties: true,
    removeConsole: isProdEnv,
    styledComponents: true,
  },

  // Always enable compression
  compress: true,

  // We have our own linting infrastructure, so avoid Next's
  eslint: {
    ignoreDuringBuilds: true,
  },

  // This conflicts with how we use project refs and aliases
  typescript: {
    ignoreBuildErrors: true,
  },

  // Do not broadcast that we're using Next
  poweredByHeader: false,

  // Generate source maps for production builds
  productionBrowserSourceMaps: false,

  // Enable strict mode in development
  reactStrictMode: !isProdEnv,

  // Minifiy for production builds
  swcMinify: true,
};

function extendBaseConfig(customConfig = {}, plugins = []) {
  const defaultConfig = {
    ...baseConfig,
    ...customConfig,
    webpack: (webpack, options) => {
      if (customConfig.webpack) {
        return customConfig.webpack(webpack, options);
      }

      return webpack;
    },
  };

  return plugins.reduce((acc, plugin) => plugin(acc), defaultConfig);
}

// csp headers
const isLocalDevelopment = process.env.NODE_ENV === 'development';
const baseXYZDomains = 'https://base.mirror.xyz';
const greenhouseDomains = 'https://boards.greenhouse.io https://boards-api.greenhouse.io';
const ccaDomain = 'https://static-assets.coinbase.com/js/cca/v0.0.1.js';
const ccaLiteDomains = 'https://cca-lite.coinbase.com';
const sprigDomains = 'https://api.sprig.com https://cdn.sprig.com';
const walletconnectDomains =
  'https://*.walletconnect.org wss://*.walletconnect.org wss://*.walletconnect.com https://*.walletconnect.com https://explorer-api.walletconnect.com';

const contentSecurityPolicy = {
  'default-src': [
    "'self'",
    "'unsafe-inline'", // NextJS requires 'unsafe-inline'
    isLocalDevelopment ? "'unsafe-eval'" : '',
    baseXYZDomains,
    ccaDomain,
    ccaLiteDomains,
    walletconnectDomains,
  ],
  'connect-src': [
    "'self'",
    walletconnectDomains,
    sprigDomains,
    greenhouseDomains,
    ccaLiteDomains,
    ccaDomain,
    'https://analytics-service-dev.cbhq.net',
    'mainnet.base.org',
    'https://cloudflare-eth.com',
    'https://i.seadn.io/', // ens avatars
    'https://api.opensea.io', // enables getting ENS avatars
    isLocalDevelopment ? 'ws://localhost:3000/' : '',
    isLocalDevelopment ? 'http://localhost:3000/' : '',
  ],
  'frame-ancestors': ["'self'", baseXYZDomains],
  'form-action': ["'self'", baseXYZDomains],
  'img-src': [
    "'self'",
    'data:',
    'https://*.walletconnect.com/', // WalletConnect
    'https://i.seadn.io/', // ens avatars
  ],
};

const cspObjectToString = Object.entries(contentSecurityPolicy).reduce((acc, [key, value]) => {
  return `${acc}${key} ${value.join(' ')};`;
}, '');

const securityHeaders = [
  {
    key: 'cache-control',
    value: 'no-store',
  },
  {
    key: 'content-security-policy',
    value: cspObjectToString,
  },
  {
    key: 'cross-origin-opener-policy',
    value: 'same-origin-allow-popups',
  },
  {
    key: 'referrer-policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'strict-transport-security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'x-content-type-options',
    value: 'nosniff',
  },
  {
    key: 'x-frame-options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'x-xss-protection',
    value: '1; mode=block',
  },
];

module.exports = extendBaseConfig({
  transpilePackages: ['base-ui'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.seadn.io',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        basePath: false,
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/careers',
        destination: '/jobs',
        permanent: true,
      },
      {
        source: '/buildersummer',
        destination: '/onchainsummer',
        permanent: true,
      },
      {
        source: '/onchainfont',
        destination: process.env.NEXT_PUBLIC_OCS_CREATIVE_DOWNLOAD_URL,
        permanent: true,
      },
    ];
  },
});
