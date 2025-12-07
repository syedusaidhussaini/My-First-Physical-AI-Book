// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI: A Hands-On Learning Guide',
  tagline: 'Learn to build intelligent physical systems',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://physical-ai-book.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'physical-ai-community', // Usually your GitHub org/user name.
  projectName: 'physical-ai-book', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Human Robotic Physical AI Book',
        logo: {
          alt: 'Physical AI Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Explore Modules',
          },
          {
            href: 'https://github.com/physical-ai-community/physical-ai-book',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '📚 Modules',
            items: [
              {
                label: 'Module 1: Fundamentals',
                to: '/docs/module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors/',
              },
              {
                label: 'Module 2: Advanced Projects',
                to: '/docs/module-02-advanced-projects/chapter-01-navigation/lesson-01-robot-navigation/',
              },
            ],
          },
          {
            title: '🛠️ Getting Started',
            items: [
              {
                label: 'Arduino Setup',
                to: '/docs/setup-guides/arduino-setup/',
              },
              {
                label: 'Raspberry Pi Setup',
                to: '/docs/setup-guides/raspberry-pi-setup/',
              },
              {
                label: 'Web Simulator',
                to: '/docs/setup-guides/simulator-setup/',
              },
              {
                label: 'Troubleshooting',
                to: '/docs/setup-guides/troubleshooting/',
              },
            ],
          },
          {
            title: '📖 Resources',
            items: [
              {
                label: 'Glossary',
                to: '/docs/resources/glossary/',
              },
              {
                label: 'Hardware Compatibility',
                to: '/docs/resources/hardware-compatibility/',
              },
              {
                label: 'Safety Guidelines',
                to: '/docs/resources/safety-guidelines/',
              },
              {
                label: 'Further Reading',
                to: '/docs/resources/further-reading/',
              },
            ],
          },
          {
            title: '🤝 Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/physical-ai-community/physical-ai-book',
              },
              {
                label: 'Discussions',
                href: 'https://github.com/physical-ai-community/physical-ai-book/discussions',
              },
              {
                label: 'Issues',
                href: 'https://github.com/physical-ai-community/physical-ai-book/issues',
              },
            ],
          },
        ],
        copyright: `
          <div style="text-align: center; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="margin: 0.5rem 0;"><strong>Human RoboticPhysical AI: A Hands-On Learning Guide</strong></p>
            <p style="margin: 0.5rem 0; opacity: 0.8;">Build intelligent systems that sense, think, and act.</p>
            <p style="margin: 1rem 0; opacity: 0.7;">Copyright © ${new Date().getFullYear()} Physical AI Community. Licensed under CC-BY-4.0.</p>
            <p style="margin: 0.5rem 0; opacity: 0.6;">Built with Syed Usaid using Docusaurus</p>
          </div>
        `,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
