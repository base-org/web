const githubTheme = require('prism-react-renderer/themes/github');
const draculaTheme = require('prism-react-renderer/themes/dracula');

const baseConfig = {
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'base',
  projectName: 'web',
  themeConfig: {
    docs: {
      sidebar: {
        autoCollapseCategories: true,
        hideable: true,
      },
    },
    prism: {
      theme: githubTheme,
      darkTheme: draculaTheme,
    },
  },
};

const APP_TITLE = `Base`;
const PRODUCT_NAME = 'Base';

const config = {
  ...baseConfig,
  title: APP_TITLE,
  tagline: '',
  url: 'https://docs.base.org',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    ...baseConfig.themeConfig,
    navbar: {
      title: PRODUCT_NAME,
      logo: {
        alt: PRODUCT_NAME,
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'about/how-base-works',
          position: 'left',
          label: `About ${PRODUCT_NAME}`,
        },
        {
          type: 'doc',
          docId: 'using-base/with-wallet',
          position: 'left',
          label: `Using ${PRODUCT_NAME}`,
        },
        {
          type: 'doc',
          docId: 'developers/building-on-base',
          position: 'left',
          label: `Developers`,
        },
        {
          type: 'doc',
          docId: 'security/security',
          position: 'left',
          label: `Security`,
        },
        {
          type: 'doc',
          docId: 'community/community',
          position: 'left',
          label: `Community`,
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `© ${new Date().getFullYear()} Coinbase`,
    },
  },
};

module.exports = config;
