# 00moreira00.github.io

Hub de projetos e estudos do Roberto Neto, feito com [Docusaurus](https://docusaurus.io).
No ar em **https://00moreira00.github.io**.

Hoje o hub tem um estudo de caso de system design
([Newsfeed estilo Instagram](https://github.com/00MOREIRA00/packt-system-design-masterclass-instagram-newsfeed)).
A estrutura já está pronta para receber APIs (referência estilo Swagger, gerada do OpenAPI),
ambientes Docker e fluxos.

## Rodar localmente

Precisa de Node 20 ou mais novo.

```bash
npm install
npm start        # http://localhost:3000
npm run build    # gera o site estático em build/
```

## Publicar

O workflow `.github/workflows/deploy.yml` gera o site e publica no GitHub Pages a cada push na
`main` (e também manualmente ou uma vez por dia).

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
| `src/theme/Footer/index.tsx` | rodapé |
| `src/css/custom.css` | tema (cores claro/escuro, fontes, grade de fundo) |
| `src/data/catalogo.json` | lista de APIs (vazia por enquanto) |

## Adicionar conteúdo

Os guias passo a passo ficam em [`docs/`](docs/README.md):

- [Adicionar um projeto](docs/adicionar-projeto.md) (system design, Docker ou fluxo)
- [Adicionar uma API](docs/adicionar-api.md) (referência estilo Swagger a partir do OpenAPI)
- [Adicionar um estudo](docs/adicionar-estudo.md)
