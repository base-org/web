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
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        property: 'og:type',
        content: 'website',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:title',
        content: 'Base | Docs',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:description',
        content:
          'Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2.',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:image',
        content: 'https://docs.base.org/img/base-open-graph.png',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'twitter:domain',
        content: 'base.org',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:title',
        content: 'Base | Docs',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:description',
        content:
          'Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2.',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:image',
        content: 'https://docs.base.org/img/base-open-graph.png',
      },
    },
  ],
  customFields: {
    nodeEnv: process.env.NODE_ENV,
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/docs',
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
        breadcrumbs: false,
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
        alt: `${PRODUCT_NAME} Docs`,
        src: 'img/logo.svg',
        srcDark: 'img/logo_dark.svg',
      },
      items: [
        {
          to: '/',
          exact: true,
          navposition: 'bottomLeft',
          label: 'Home',
        },
        {
          type: 'doc',
          docId: 'overview',
          navposition: 'bottomLeft',
          label: 'Docs',
        },
        {
          to: '/tutorials',
          navposition: 'bottomLeft',
          label: 'Tutorials',
        },
        {
          to: '/base-camp/docs/welcome',
          navposition: 'bottomLeft',
          label: 'Camp',
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
          type: 'dropdown',
          label: 'Ecosystem',
          navposition: 'topRight',
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
          navposition: 'topRight',
          href: 'https://bridge.base.org/',
        },
        {
          type: 'dropdown',
          label: 'Builders',
          navposition: 'topRight',
          items: [
            {
              label: 'Block Explorer',
              href: 'https://explorer.base.org/',
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
          navposition: 'topRight',
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
        // Langauge selection dropdown will be supported in the future
        // {
        //   type: 'localeDropdown',
        //   navposition: 'bottomRight',
        // },
      ],
    },
    algolia: {
      // Application ID
      appId: 'EG1Y9QIPP9',
      // Public API key - safe to commit
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
  // Langauge selection dropdown will be supported in the future
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'fr'],
  //   localeConfigs: {},
  // },
};

module.exports = config;
