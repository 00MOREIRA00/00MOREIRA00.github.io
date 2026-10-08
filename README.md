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

## Como funciona o deploy

O [workflow de publicação](.github/workflows/deploy.yml) usa GitHub Actions para gerar o site
estático e publicá-lo em **https://00moreira00.github.io** pelo GitHub Pages.

Ele é executado a cada push na `main`, manualmente pela aba **Actions**, ou pelo agendamento
diário às **09:00 UTC (06:00 em São Paulo)**. O agendamento permite atualizar as specs de APIs
sem alterar o código do hub.

O processo tem duas etapas:

1. **Build:** o runner Ubuntu obtém o código, configura Node.js 22 e instala as dependências
   com `npm ci`. Depois, `npm run sync-specs` baixa as specs cadastradas em
   `src/data/catalogo.json`, e `npm run build` gera o site em `build/`. O `prebuild` gera
   automaticamente as páginas de referência das APIs quando o catálogo tem entradas.
   A pasta `build/` é enviada como artefato para o GitHub Pages.
2. **Deploy:** após o build terminar com sucesso, `actions/deploy-pages` publica esse artefato
   no ambiente `github-pages`. Se o build falhar, essa execução não publica uma nova versão.

Uma nova execução cancela a anterior caso ela ainda esteja em andamento. O workflow usa as
permissões do token automático do GitHub; o deploy não exige um token criado manualmente.
O secret opcional `SPECS_TOKEN` serve para baixar specs de outros repositórios privados.

Para configurar e publicar pela primeira vez:

1. No repositório, abra **Settings → Pages** e escolha **Source: GitHub Actions**.
2. Envie as alterações para `main` ou abra **Actions → Publicar o hub no GitHub Pages →
   Run workflow**, selecionando `main`.
3. Acompanhe os jobs `build` e `deploy` na aba **Actions**. Quando concluírem, abra o link
   do ambiente `github-pages` ou a URL do site.

Nas próximas alterações, basta validar o projeto, fazer commit e enviar para `main`.
A pasta `build/` é gerada pelo workflow e não precisa entrar no Git; também não é necessário
criar uma branch `gh-pages` ou executar `npm run deploy` localmente.

Veja o [passo a passo completo de deploy](docs/deploy-github-pages.md) para validação local,
configuração de credenciais opcionais e solução de problemas.

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
