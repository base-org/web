const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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
    'https://blob.vercel-storage.com', // Vercel File storage
    'https://zku9gdedgba48lmr.public.blob.vercel-storage.com', // Vercel File storage
    walletconnectDomains,
    sprigDomains,
    greenhouseDomains,
    ccaLiteDomains,
    ccaDomain,
    'wss://www.walletlink.org/rpc', // coinbase wallet connection
    'https://analytics-service-dev.cbhq.net',
    'mainnet.base.org',
    'sepolia.base.org',
    'https://cloudflare-eth.com',
    'https://i.seadn.io/', // ens avatars
    'https://api.opensea.io', // enables getting ENS avatars
    'https://ipfs.io', // ipfs ens avatar resolution
    'wss://www.walletlink.org',
    'https://base.easscan.org/graphql',
    'https://api.guild.xyz/',
    isLocalDevelopment ? 'ws://localhost:3000/' : '',
    isLocalDevelopment ? 'http://localhost:3000/' : '',
    'https://flag.lab.amplitude.com/sdk/v2/flags',
    'https://api.lab.amplitude.com/sdk/v2/vardata',
  ],
  'frame-ancestors': ["'self'", baseXYZDomains],
  'form-action': ["'self'", baseXYZDomains],
  'img-src': [
    "'self'",
    'blob:',
    'https://blob.vercel-storage.com', // Vercel File storage
    'https://zku9gdedgba48lmr.public.blob.vercel-storage.com', // Vercel File storage
    'data:',
    'https://*.walletconnect.com/', // WalletConnect
    'https://i.seadn.io/', // ens avatars
    'https://ipfs.io', // ipfs ens avatar resolution
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

module.exports = extendBaseConfig(
  {
    transpilePackages: ['base-ui'],
    i18n: {
      locales: ['en'],
      defaultLocale: 'en',
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
      config.module.rules.push({
        test: /\.webm/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name][hash].[ext]',
              outputPath: 'static/assets/webm/',
              publicPath: '/_next/static/assets/webm/',
            },
          },
        ],
      });
      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.seadn.io',
        },
        {
          protocol: 'https',
          hostname: 'ipfs.io',
        },
        {
          protocol: 'https',
          hostname: 'cf-ipfs.com',
        },
        {
          protocol: 'https',
          hostname: 'blob.vercel-storage.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'zku9gdedgba48lmr.public.blob.vercel-storage.com',
          port: '',
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
          // just so the build doesn't fail in CI
          destination: process.env.NEXT_PUBLIC_OCS_CREATIVE_DOWNLOAD_URL ?? '/',
          permanent: false,
        },
        {
          source: '/registry',
          destination: 'https://buildonbase.deform.cc/registry/',
          permanent: true,
        },
        {
          source: '/registry-edit',
          destination: 'https://buildonbase.deform.cc/registry-edit/',
          permanent: true,
        },
      ];
    },
  },
  [withBundleAnalyzer],
);
