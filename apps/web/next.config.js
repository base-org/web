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
const greenhouseDomains = 'https://boards.greenhouse.io';
const ccaDomain = 'https://static-assets.coinbase.com/js/cca/v0.0.1.js';
const ccaLiteDomains = 'https://cca-lite.coinbase.com';
const sprigDomains = 'https://api.sprig.com https://cdn.sprig.com;';

const contentSecurityPolicy = {
  'default-src': [
    "'self'",
    "'unsafe-inline'", // NextJS requires 'unsafe-inline'
    isLocalDevelopment ? "'unsafe-eval'" : '',
    baseXYZDomains,
    greenhouseDomains,
    ccaDomain,
    ccaLiteDomains,
    sprigDomains,
  ],
  'frame-ancestors': ["'self'", baseXYZDomains],
  'form-action': ["'self'", baseXYZDomains],
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
    value: 'same-origin',
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
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
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
    ];
  },
});
