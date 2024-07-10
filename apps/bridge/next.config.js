const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');

const isProdEnv = process.env.NODE_ENV === 'production';
const isLocalDevelopment = process.env.NODE_ENV === 'development';

const baseConfig = {
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  compiler: {
    reactRemoveProperties: true,
    removeConsole: isProdEnv,
    styledComponents: true,
  },
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  reactStrictMode: !isProdEnv,
  swcMinify: true,
};

const contentSecurityPolicy = {
  'default-src': [
    "'self'",
    "'unsafe-inline'",
    'https://*.walletconnect.com',
    ...(isLocalDevelopment ? ["'unsafe-eval'"] : []),
  ],
  'frame-ancestors': ["'self'"],
  'form-action': ["'self'"],
  'connect-src': [
    "'self'",
    'https://ethereum.publicnode.com',
    'https://cloudflare-eth.com',
    'https://eth.llamarpc.com',
    'https://mainnet.base.org',
    'https://rpc.ankr.com/eth_goerli',
    'https://goerli.base.org',
    'https://ethereum-sepolia.publicnode.com',
    'https://sepolia.base.org',
    'https://bridge-api.base.org',
    'https://api.coingecko.com/api/v3/simple/price',
    'wss://www.walletlink.org/rpc',
    'https://eth-goerli.blockscout.com/api',
    'https://base-goerli.blockscout.com/api',
    'https://*.walletconnect.org/',
    'wss://*.walletconnect.org/',
    'wss://*.walletconnect.com',
    'https://*.walletconnect.com/',
    'https://*.coinbase.com/',
    'https://api-goerli.etherscan.io/api',
    'https://api.etherscan.io/api',
    'https://api-goerli.basescan.org/api',
    'https://api.basescan.org/api',
    'https://base.blockscout.com/api',
    'https://base-goerli.blockscout.com/api',
    'https://sepolia.etherscan.io',
    'https://api-sepolia.etherscan.io/api',
    'https://base-sepolia.blockscout.com',
    'https://base-goerli.blockscout.com/api',
    'https://iris-api-sandbox.circle.com/attestations/',
    'https://iris-api.circle.com/attestations/',
  ],
  'img-src': ["'self'", 'data:', 'https://*.walletconnect.com/'],
};

const cspObjectToString = Object.entries(contentSecurityPolicy).reduce((acc, [key, value]) => {
  return `${acc}${key} ${value.join(' ')};`;
}, '');

const securityHeaders = [
  { key: 'cache-control', value: 'no-store' },
  { key: 'content-security-policy', value: cspObjectToString },
  { key: 'cross-origin-opener-policy', value: 'same-origin-allow-popups' },
  { key: 'referrer-policy', value: 'strict-origin-when-cross-origin' },
  { key: 'strict-transport-security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'x-content-type-options', value: 'nosniff' },
  { key: 'x-frame-options', value: 'SAMEORIGIN' },
  { key: 'x-xss-protection', value: '1; mode=block' },
];

function extendBaseConfig(customConfig = {}, plugins = []) {
  const defaultConfig = {
    ...baseConfig,
    ...customConfig,
    webpack: (config, options) => {
      if (customConfig.webpack) {
        config = customConfig.webpack(config, options);
      }

      if (isProdEnv && process.env.BUGSNAG_API_KEY) {
        config.plugins.push(
          new BugsnagSourceMapUploaderPlugin({
            appVersion: process.env.BUILD_ID,
            apiKey: process.env.BUGSNAG_API_KEY,
            publicPath: '*/_next/',
            overwrite: true,
            endpoint: process.env.BUGSNAG_SOURCEMAPS_URL,
          })
        );
      }

      return config;
    },
  };

  return plugins.reduce((acc, plugin) => plugin(acc), defaultConfig);
}

module.exports = extendBaseConfig({
  transpilePackages: ['base-ui'],
  publicRuntimeConfig: {
    chains: process.env.CHAINS,
    assets: process.env.ASSETS,
    l1ChainID: process.env.L1_CHAIN_ID,
    l1ExplorerURL: process.env.L1_EXPLORER_URL,
    l1ExplorerApiUrl: process.env.L1_EXPLORER_API_URL,
    l2ChainID: process.env.L2_CHAIN_ID,
    l2ExplorerURL: process.env.L2_EXPLORER_URL,
    l2ExplorerApiURL: process.env.L2_EXPLORER_API_URL,
    l1BridgeProxyAddress: process.env.L1_BRIDGE_PROXY_ADDRESS,
    l1OptimismPortalProxyAddress: process.env.L1_OPTIMISM_PORTAL_PROXY_ADDRESS,
    l2L1MessagePasserAddress: process.env.L2_L1_MESSAGE_PASSER_ADDRESS,
    L2StandardBridge: process.env.L2_STANDARD_BRIDGE,
    l2OutputOracleProxyAddress: process.env.L2_OUTPUT_ORACLE_PROXY_ADDRESS,
    l1CCTPMessageTransmitterAddress: process.env.L1_CCTP_MESSAGE_TRANSMITTER_ADDRESS,
    l1CCTPTokenMessengerAddress: process.env.L1_CCTP_TOKEN_MESSENGER_ADDRESS,
    l2CCTPMessageTransmitterAddress: process.env.L2_CCTP_MESSAGE_TRANSMITTER_ADDRESS,
    l2CCTPTokenMessengerAddress: process.env.L2_CCTP_TOKEN_MESSENGER_ADDRESS,
    l1CCTPDomain: process.env.L1_CCTP_DOMAIN,
    l2CCTPDomain: process.env.L2_CCTP_DOMAIN,
    marketingURL: process.env.MARKETING_URL,
    docsURL: process.env.DOCS_URL,
    twitterURL: process.env.TWITTER_URL,
    githubURL: process.env.GITHUB_URL,
    blogURL: process.env.BLOG_URL,
    mainnetLaunchBlogPostURL: process.env.MAINNET_LAUNCH_BLOG_POST_URL ?? 'https://base.mirror.xyz/',
    mainnetLaunchFlag: process.env.MAINNET_LAUNCH_FLAG ?? 'false',
    tosVersion: process.env.TOS_VERSION,
    goerliBridgeURL: process.env.GOERLI_BRIDGE_URL,
    mainnetBridgeURL: process.env.MAINNET_BRIDGE_URL,
    mainnetGALaunchFlag: process.env.MAINNET_GA_LAUNCH_FLAG,
    walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID,
    buildId: process.env.BUILD_ID ?? 'local',
    bugsnagApiKey: process.env.BUGSNAG_API_KEY,
    bugsnagNotifyUrl: process.env.BUGSNAG_NOTIFY_URL,
    bugsnagSessionsUrl: process.env.BUGSNAG_SESSIONS_URL,
    appStage: process.env.APP_STAGE,
    bridgeApiURL: process.env.BRIDGE_API_URL,
    sepoliaBridgeURL: process.env.SEPOLIA_BRIDGE_URL,
    cctpAttestationsAPIURL: process.env.CCTP_ATTESTATIONS_API_URL,
    cctpEnabled: process.env.CCTP_ENABLED,
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
});
