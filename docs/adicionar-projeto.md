# Adicionar um projeto

Use para system designs, ambientes Docker e fluxos. APIs têm guia próprio:
[adicionar-api.md](adicionar-api.md).

Um projeto é um item da lista `PROJETOS`, em `src/data/hub.ts`, mais uma página em
`src/pages/projetos/`. Depois disso ele aparece sozinho no catálogo (`/projetos`) e nos números da
home.

## 1. Cadastrar o projeto

Em `src/data/hub.ts`, crie a constante do projeto e coloque-a em `PROJETOS`:

```ts
export const MEU_PROJETO: Projeto = {
  id: 'url-shortener',                  // vira a URL: /projetos/url-shortener
  tipo: 'design',                       // 'design' | 'api' | 'docker' | 'fluxo'
  nome: 'Encurtador de URL',
  descricao: 'Uma ou duas frases sobre o que o projeto resolve.',
  repo: `${GH_USER}/url-shortener`,     // "usuario/repo" no GitHub
  fonte: 'Livro X, capítulo 8',         // opcional: de onde veio o estudo
  atualizado: '2026-10-15',             // AAAA-MM-DD
  tags: ['system-design', 'hashing'],   // sem o "#", ele é colocado na tela
  href: '/projetos/url-shortener',      // tem que bater com o arquivo da página
};

export const PROJETOS: Projeto[] = [MEU_PROJETO, NEWSFEED];
```

A ordem de `PROJETOS` é a ordem dos cards no catálogo. Deixe o mais recente primeiro.

## 2. Criar a página

Crie `src/pages/projetos/<id>.tsx`. O nome do arquivo define a rota, então ele tem que bater com
o `href`. A página mais simples possível:

```tsx
import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import {MEU_PROJETO} from '@site/src/data/hub';

export default function Page(): ReactNode {
  return (
    <Layout title={MEU_PROJETO.nome} description={MEU_PROJETO.descricao}>
      <main className="wrap cat">
        <div className="eyebrow">// Projeto</div>
        <h1>{MEU_PROJETO.nome}</h1>
        <p className="lead">{MEU_PROJETO.descricao}</p>
      </main>
    </Layout>
  );
}
```

Para uma página completa com abas, arquitetura e quiz, use como modelo
`src/pages/projetos/instagram-newsfeed.tsx` e `src/components/NewsfeedCase.tsx`. O conteúdo do
newsfeed (requisitos, endpoints, fluxos, quiz...) fica em `src/data/hub.ts`. Siga o mesmo padrão:
dados em `hub.ts`, visual no componente.

## 3. Pontos que não são automáticos

- **Filtro do catálogo:** `src/pages/projetos/index.tsx` só mostra botões para os tipos em
  `FILTROS` (hoje `'todos'`, `'design'` e `'api'`). No primeiro projeto `docker` ou `fluxo`,
  acrescente o tipo ali, senão ele só aparece em "Todos".
- **Destaque da home:** o card "Estudo de caso" em `src/pages/index.tsx` aponta fixo para
  `NEWSFEED`. Troque se quiser destacar o projeto novo.
- **Metadados do Newsfeed:** data de atualização, documentação e últimos seis commits
  vêm do GitHub no build, pelo plugin `src/plugins/newsfeed-meta.ts`. O conteúdo editorial
  (requisitos, quiz e arquitetura) continua em `hub.ts`. Veja o fluxo abaixo.
- **Tipo novo** (além de design, api, docker e fluxo): acrescente em `TipoProjeto` e `TIPOS`
  (`src/data/hub.ts`) e crie as classes `.tb-<tipo>` e `.card-<tipo>` em `src/css/custom.css`.

## 4. Conferir

```bash
npm start           # veja o card em /projetos e a página em /projetos/<id>
npm run typecheck
npm run build
```

## Metadados automáticos do case Newsfeed

O build consulta a branch `main` do repositório informado em `NEWSFEED.repo`:

- a data do último commit alimenta o case e os cards do projeto;
- a árvore de arquivos alimenta a lista de Markdown/MDX em `docs/`, incluindo subpastas,
  mais `glossario.md`, `database/README.md` e `newsfeed.drawio`, quando presentes;
- os seis commits mais recentes alimentam o histórico no case, home e Sobre.

As descrições conhecidas dos arquivos são preservadas a partir do snapshot. Arquivos novos
recebem um título baseado no nome. Os demais projetos continuam com metadados editoriais.

As chamadas acontecem apenas no build, com timeout de oito segundos por consulta.
O workflow fornece `GITHUB_TOKEN` com permissão de leitura; localmente ele é opcional
para repositórios públicos. O token nunca é enviado aos visitantes.

Se uma consulta falhar (rede, limite da API, resposta inválida ou árvore truncada),
aquela parte usa `src/data/newsfeed-fallback.json`. Esse snapshot versionado contém
metadados reais consultados na implementação; pode ser atualizado quando conveniente,
mas o funcionamento normal não depende de edições manuais. Uma falha aparece como aviso
no log, sem derrubar o build. A outra consulta continua aproveitando os dados atuais.

O site se atualiza em push na `main`, execução manual do workflow na `main` ou toda
segunda-feira às 09h UTC (06h em Brasília). Alterações no repositório de origem aparecem
no próximo build, sem consultas no navegador. Os dados da API não são gravados em `hub.ts`.

`npm test` verifica os cenários de sucesso, falhas parciais, limite da API, timeout,
respostas inválidas e fallback. Rode também `npm run typecheck` e `npm run build`.
