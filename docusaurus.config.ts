import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {GH_USER as GITHUB_USER} from './src/data/hub';

const config: Config = {
  title: 'Roberto Neto',
  tagline: 'Projetos e estudos, documentados de verdade.',
  favicon: 'img/favicon.svg',

  // Domínio público do site hospedado no GitHub Pages.
  url: 'https://rneto.dev.br',
  baseUrl: '/',
  organizationName: GITHUB_USER,
  projectName: '00MOREIRA00.github.io',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  i18n: {defaultLocale: 'pt-BR', locales: ['pt-BR']},

  clientModules: ['./src/fonts.ts'],

  presets: [
    [
      'classic',
      {
        // Guias em docs/ são internos; rotas de APIs ficam nas páginas dos projetos.
        docs: false,
        // Blog: cada post é um arquivo em blog/ (veja docs/adicionar-post.md)
        blog: {
          path: 'blog',
          routeBasePath: 'blog',
          blogTitle: 'Blog',
          blogDescription: 'Anotações sobre o que estou construindo e estudando.',
          postsPerPage: 'ALL',
          blogSidebarCount: 0,
          showReadingTime: true,
          authorsMapPath: 'authors.yml',
          editUrl: `https://github.com/${GITHUB_USER}/00MOREIRA00.github.io/edit/main/`,
          onInlineAuthors: 'throw',
          onInlineTags: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'Roberto Neto · Blog',
            description: 'Anotações sobre o que estou construindo e estudando.',
            copyright: `© ${new Date().getFullYear()} Roberto Neto`,
            language: 'pt-BR',
          },
        },
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],

  plugins: ['./src/plugins/blog-extra.ts', './src/plugins/newsfeed-meta.ts'],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {defaultMode: 'dark', respectPrefersColorScheme: true},
    navbar: {
      title: 'Roberto Neto',
      logo: {alt: '', src: 'img/logo.svg', srcDark: 'img/logo-dark.svg', width: 32, height: 32},
      items: [
        {to: '/projetos', label: 'Projetos', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/sobre', label: 'Sobre', position: 'left'},
        {
          href: `https://github.com/${GITHUB_USER}`,
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub',
        },
      ],
    },
    prism: {
      // blocos de código sempre escuros, no estilo terminal do hub
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash', 'json', 'java', 'csharp'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
