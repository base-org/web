const dotenv = require('dotenv');
dotenv.config();

const baseConfig = {
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'frontend',
  projectName: 'web',
  themeConfig: {
    docs: {
      sidebar: {
        autoCollapseCategories: true,
        hideable: true,
      },
    },
  },
};

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/oceanicNext');

const APP_TITLE = 'Base';
const PRODUCT_NAME = 'Base';

const config = {
  ...baseConfig,
  title: APP_TITLE,
  tagline: '',
  url: 'https://docs.base.org',
  customFields: {
    nodeEnv: process.env.NODE_ENV,
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('@rainbow-me/rainbowkit/styles.css'),
          ],
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'base-camp',
        path: 'base-camp',
        routeBasePath: 'base-camp',
        sidebarPath: require.resolve('./base-camp/sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tutorials',
        path: 'tutorials',
        routeBasePath: 'tutorials',
        sidebarPath: require.resolve('./tutorials/sidebars.js'),
      },
    ],
    'docusaurus-node-polyfills',
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          if (existingPath.includes('/tutorials')) {
            return [existingPath.replace('/tutorials', '/guides')];
          }
          return undefined;
        },
      },
    ],
  ],
  scripts: [
    {
      src: 'https://static-assets.coinbase.com/js/cca/v0.0.1.js',
      async: true,
    },
  ],
  clientModules: [require.resolve('./src/utils/initCCA.ts')],

  themeConfig: {
    image: 'img/base-open-graph.png',
    ...baseConfig.themeConfig,
    navbar: {
      logo: {
        alt: PRODUCT_NAME,
        src: 'img/logo.svg',
        srcDark: 'img/logo_dark.svg',
      },
      items: [
        {
          to: '/',
          navPosition: 'bottomLeft',
          label: 'Home',
        },
        {
          type: 'doc',
          docId: 'overview',
          navPosition: 'bottomLeft',
          label: 'Documentation',
        },
        {
          to: '/tutorials',
          navPosition: 'bottomLeft',
          label: 'Tutorials',
        },
        {
          to: '/base-camp/docs/welcome',
          navPosition: 'bottomLeft',
          label: 'Base Camp',
          items: [
            {
              label: 'Learn',
              to: '/base-camp/docs/welcome',
            },
            {
              label: 'Track your progress',
              to: '/base-camp/progress',
            },
            {
              label: 'Bootcamp',
              href: 'https://base.org/bootcamp',
            },
          ],
        },
        // {
        //   type: 'doc',
        //   docId: 'security',
        //   navPosition: 'bottomLeft',
        //   label: 'Security',
        // },
        // {
        //   type: 'dropdown',
        //   label: 'Community',
        //   navPosition: 'bottomLeft',
        //   items: [
        //     {
        //       label: 'Twitter',
        //       href: 'https://www.twitter.com/base',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://base.org/discord',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://www.github.com/base-org',
        //     },
        //   ],
        // },
        {
          type: 'dropdown',
          label: 'Ecosystem',
          navPosition: 'topRight',
          items: [
            {
              label: 'Apps',
              href: 'https://www.base.org/ecosystem',
            },
            {
              label: 'Grants',
              href: 'https://paragraph.xyz/@grants.base.eth/calling-based-builders',
            },
          ],
        },
        {
          label: 'Bridge',
          navPosition: 'topRight',
          href: 'https://bridge.base.org/',
        },
        {
          type: 'dropdown',
          label: 'Developers',
          navPosition: 'topRight',
          items: [
            {
              label: 'Block Explorer',
              href: 'https://basescan.org/',
            },
            {
              label: 'Status',
              href: 'https://status.base.org/',
            },
            {
              label: 'Bug Bounty',
              href: 'https://hackerone.com/coinbase',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'About',
          navPosition: 'topRight',
          items: [
            {
              label: 'Mission',
              href: 'https://www.base.org/about',
            },
            {
              label: 'Blog',
              href: 'https://base.mirror.xyz/',
            },
            {
              label: 'Jobs',
              href: 'https://www.base.org/jobs',
            },
          ],
        },
        {
          type: 'localeDropdown',
          navPosition: 'bottomRight',
        },
      ],
    },
    algolia: {
      // Application ID
      appId: 'EG1Y9QIPP9',

      // Public API key: it is safe to commit it
      apiKey: '59218c35b3c3e1aa3cdca101ca109839',
      indexName: 'prod',
      contextualSearch: false,
    },

    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['solidity'],
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    localeConfigs: {},
  },
};

module.exports = config;
