// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Waldbrandprävention',
  tagline: 'KIWA',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://waldbrandpraevention.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'waldbrandpraevention', // Usually your GitHub org/user name.
  projectName: 'frontend', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'de',
    locales: ['de'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/waldbrandpraevention/frontend/tree/main/docs/',
          routeBasePath: '/',
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
      // Replace with your project's social card
      image: 'img/logo.webp',
      navbar: {
        title: 'Waldbrandprävention',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.webp',
        },
        items: [
          {
            href: 'https://kiwa.tech',
            label: 'Demo',
            position: 'right',
          },
          {
            href: 'https://hub.docker.com/u/waldbrandpraevention',
            label: 'Docker',
            position: 'right',
          },
          {
            href: 'https://bp.adriansoftware.de/',
            label: 'Dateien',
            position: 'right',
          },
          {
            href: 'https://github.com/waldbrandpraevention',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      /* footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} git.`,
      }, */
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
