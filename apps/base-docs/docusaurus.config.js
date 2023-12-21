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
          routeBasePath: '/',
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
    'docusaurus-node-polyfills',
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
        href: 'https://base.org', // Default to `siteConfig.baseUrl`.
        target: '_self', // By default, this value is calculated based on the `href` attribute (the external link will open in a new tab, all others in the current one).
      },
      items: [
        {
          type: 'doc',
          docId: 'overview',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/base-camp/docs/welcome',
          position: 'left',
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
        {
          type: 'doc',
          docId: 'security',
          position: 'left',
          label: 'Security',
        },
        {
          type: 'dropdown',
          label: 'Community',
          position: 'left',
          items: [
            {
              label: 'Twitter',
              href: 'https://www.twitter.com/BuildOnBase',
            },
            {
              label: 'Discord',
              href: 'https://base.org/discord',
            },
            {
              label: 'GitHub',
              href: 'https://www.github.com/base-org',
            },
          ],
        },
        {
          href: 'https://stack.optimism.io',
          html: `
            <img src="/img/op_stack_dark.svg" width="160" class="op-dark" />
            <img src="/img/op_stack.svg" width="160" class="op-light" />
          `,
          position: 'right',
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
};

module.exports = config;
