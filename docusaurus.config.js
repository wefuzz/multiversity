// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Multiversity',
  tagline: 'The Hacker DAOs\' collection of awesome resources useful for Hackers and Developers to learn, hack, and secure various Blockchains!',
  url: 'https://multiversity.wefuzz.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/multiversity.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wefuzz.github.io', // Usually your GitHub org/user name.
  projectName: 'multiversity', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          routeBasePath:"/",
          sidebarCollapsible: true,
          breadcrumbs: false

        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Multiversity',
        logo: {
          alt: '<multiversity>',
          src: 'img/multiversity.jpeg',
        },
        items: [
        ],
      },
      
      prism: {
        theme: require('prism-react-renderer/themes/dracula'),
        darkTheme: darkCodeTheme,
        additionalLanguages: ['solidity'],
      },
      usePrism: ['solidity'],
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
      },
      sidebar :{
        hideable: true,
      }
      
    }),
};

module.exports = config;
