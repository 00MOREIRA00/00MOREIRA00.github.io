# 00moreira00.github.io

Hub de projetos e estudos do Roberto Neto, feito com [Docusaurus](https://docusaurus.io).
No ar em **https://rneto.dev.br**.

Hoje o hub tem um estudo de caso de system design
([Newsfeed estilo Instagram](https://github.com/00MOREIRA00/packt-system-design-masterclass-instagram-newsfeed)).
O portal é um blog e portfólio de projetos, incluindo APIs, ambientes Docker e fluxos.
Projetos de API podem documentar suas rotas na própria página, com métodos, exemplos e links
para o repositório ou documentação externa.

## Rodar localmente

Precisa de Node 20 ou mais novo.

```bash
npm install
npm start        # http://localhost:3000
npm run build    # gera o site estático em build/
```

## Publicar

O workflow `.github/workflows/deploy.yml` gera o site e publica no GitHub Pages a cada push na
`main` (e também manualmente na `main` ou às segundas-feiras, às 09h UTC, para atualizar
os metadados do case). PRs para `main` executam testes, typecheck e build;
a auditoria de dependências gera avisos sem bloquear. PRs não publicam o site.

Na primeira vez: em **Settings › Pages**, escolha **Source: GitHub Actions**.

## Onde fica cada coisa

| Caminho | O que é |
| --- | --- |
| `src/data/hub.ts` | conteúdo do hub: projetos, estudos e todo o conteúdo do case do newsfeed |
| `src/pages/index.tsx` | home |
| `src/pages/projetos/index.tsx` | catálogo de projetos, com filtro por tipo |
| `src/pages/projetos/instagram-newsfeed.tsx` | página do case (abas, arquitetura interativa, quiz) |
| `src/components/NewsfeedCase.tsx` | as abas do case |
| `src/components/hub.tsx` | peças reutilizadas: cards, histórico, selos |
| `src/pages/sobre.tsx` | página Sobre |
| `blog/` | posts do blog (um arquivo `.md` por post) e `authors.yml` |
| `src/theme/BlogListPage`, `src/theme/BlogPostPage`, `src/theme/BlogTagsPostsPage` | lista, post e tag do blog no visual do hub |
| `src/plugins/newsfeed-meta.ts` | metadados do case buscados no GitHub durante o build, com fallback versionado |
| `src/plugins/blog-extra.ts` | "Últimos posts" na home e a página do blog vazio |
| `src/theme/Footer/index.tsx` | rodapé |
| `src/css/custom.css` | tema (cores claro/escuro, fontes, grade de fundo) |

## Adicionar conteúdo

Os guias passo a passo ficam em [`docs/`](docs/README.md):

- [Adicionar um projeto](docs/adicionar-projeto.md) (system design, Docker ou fluxo)
- [Adicionar uma API](docs/adicionar-api.md) (projeto com documentação de rotas)
- [Adicionar um estudo](docs/adicionar-estudo.md)
- [Adicionar um post no blog](docs/adicionar-post.md)
