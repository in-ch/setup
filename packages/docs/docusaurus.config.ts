import { themes as prismThemes } from 'prism-react-renderer';
import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '@ic-ch/setup',
  tagline: 'A tool for quick setup and configuration of essential project files.',
  favicon: 'img/favicon.ico',

  url: 'https://in-ch.github.io',
  baseUrl: '/setup',
  organizationName: 'in-ch',
  projectName: 'setup',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'kr'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'google-site-verification',
        content: 'r2wMXLQ4i-NMIHesrEyjilh3U9ARQ0w0QuMg6GNrfh0',
      },
    },
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '@in-ch/setup',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {
          href: 'https://github.com/in-ch/setup',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
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
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/in-ch/setup',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} in-ch`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    sitemap: {
      lastmod: 'date',
      changefreq: 'weekly',
      priority: 0.5,
      filename: 'sitemap.xml',
      createSitemapItems: async params => {
        const { defaultCreateSitemapItems, ...rest } = params;
        const items = await defaultCreateSitemapItems(rest);
        return items;
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
