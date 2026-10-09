import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';
import {apis, GITHUB_USER, localSpecPath} from './src/data/apis';

// APIs (referência estilo Swagger) só entram quando o catálogo tiver alguma.
// Para adicionar: veja docs/adicionar-api.md.
const temApis = apis.length > 0;

const openApiConfig = Object.fromEntries(
  apis.map((api) => [
    api.id,
    {
      specPath: localSpecPath(api),
      outputDir: `docs/api/${api.id}`,
      downloadUrl: `https://github.com/${api.repo}/blob/${api.branch}/${api.specFile}`,
      sidebarOptions: {groupPathsBy: 'tag', categoryLinkSource: 'tag'},
      showSchemas: true,
      // Portal só de documentação: sem botão "Enviar requisição"
      hideSendButton: true,
    } satisfies OpenApiPlugin.Options,
  ]),
);

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
        docs: temApis
          ? {
              sidebarPath: './sidebars.ts',
              docItemComponent: '@theme/ApiItem',
              // Só a referência gerada vira página; os guias em docs/*.md ficam só no repositório
              include: ['api/**/*.{md,mdx}'],
            }
          : false,
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

  plugins: [
    './src/plugins/api-meta.ts',
    './src/plugins/blog-extra.ts',
    ...(temApis
      ? [['docusaurus-plugin-openapi-docs', {id: 'api', docsPluginId: 'classic', config: openApiConfig}]]
      : []),
  ],
  themes: temApis ? ['docusaurus-theme-openapi-docs'] : [],

  themeConfig: {
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
    languageTabs: [
      {highlight: 'bash', language: 'curl', logoClass: 'curl'},
      {highlight: 'javascript', language: 'nodejs', logoClass: 'nodejs'},
      {highlight: 'python', language: 'python', logoClass: 'python'},
      {highlight: 'java', language: 'java', logoClass: 'java', variant: 'unirest'},
      {highlight: 'csharp', language: 'csharp', logoClass: 'csharp'},
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
