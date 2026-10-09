# Adicionar um post no blog

Cada post é um arquivo Markdown na pasta `blog/`. Não precisa mexer em código: o post entra
sozinho na lista do `/blog`, nas páginas de tag, no RSS e em "Últimos posts" na home.

Enquanto a pasta não tiver nenhum post, o `/blog` mostra "Nenhum post publicado ainda" e a home
não mostra a seção de posts.

## 1. Crie o arquivo

O nome segue `AAAA-MM-DD-slug.md`. A data do nome é a data do post.

```
blog/2026-10-15-fan-out-na-escrita.md
```

O endereço fica `/blog/2026/10/15/fan-out-na-escrita`. Para um endereço sem a data, use
`slug: fan-out-na-escrita` no cabeçalho: ele vira `/blog/fan-out-na-escrita`.

Use `.mdx` em vez de `.md` só se for usar componentes React dentro do texto.

## 2. Preencha o cabeçalho

```md
---
title: "Fan-out na escrita: o feed fica pronto antes de você abrir o app"
description: Uma ou duas frases. Aparece embaixo do título, na lista e no Google.
authors: roberto
tags: [system-design, cache]
---

## Primeira seção

Texto do post...
```

| Campo | Obrigatório | O que faz |
| --- | --- | --- |
| `title` | sim | título do post. Use aspas se tiver `:` |
| `description` | sim | resumo mostrado na lista e embaixo do título |
| `authors` | sim | sempre `roberto` (definido em `blog/authors.yml`) |
| `tags` | não | em minúsculas, com hífen. Cada tag ganha a página `/blog/tags/<tag>` e um botão no filtro |
| `slug` | não | troca o final do endereço |
| `draft: true` | não | o post aparece no `npm start`, mas não vai para o site publicado |
| `hide_table_of_contents: true` | não | esconde o "Nesta página" da lateral |

## 3. Escreva

- Comece pelas seções com `##`. O título do post já é o `title`, então não repita com `#`.
- O "Nesta página" da lateral é montado com os `##` e `###`.
- O tempo de leitura é calculado sozinho.

Blocos de código com `title` ganham a barra de terminal com o nome do arquivo:

````md
```ts title="news-feed-generator.ts"
const post = await postsDb.get(postId);
```
````

Caixas de destaque:

```md
:::tip[Na prática]
O preço é a consistência eventual.
:::
```

Os tipos são `tip` (verde), `note` e `info` (azul) e `warning` e `danger` (amarelo).

Imagens ficam junto do post: crie uma pasta `blog/2026-10-15-fan-out-na-escrita/` com um
`index.md` e as imagens dentro, e use `![descrição](./diagrama.png)`.

## 4. Confira e suba

```bash
npm start           # veja o post em http://localhost:3000/blog
npm run build       # falha se algum link estiver quebrado
```

Depois é só fazer commit e push: o workflow publica o site.
