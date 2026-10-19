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

### Imagens e compartilhamento

Salve as imagens em `static/img/blog/<slug>/`. Use WebP no corpo do artigo,
com largura máxima de 1600 px e até 200 KB por arquivo. Para diagramas com texto,
prefira WebP sem perdas. Não amplie imagens menores só para atingir essa largura.

Informe as dimensões reais para reservar espaço durante o carregamento:

```mdx
<img src="/img/blog/meu-post/capa.webp" alt="Descrição da capa" width="1024" height="683" loading="eager" decoding="async" />

<img src="/img/blog/meu-post/diagrama.webp" alt="Descrição do diagrama" width="800" height="300" loading="lazy" decoding="async" />
```

A primeira imagem usa `eager`; imagens abaixo dela usam `lazy`. A sintaxe acima
funciona também nos arquivos `.md`, processados pelo Docusaurus como MDX.

Mantenha uma versão JPEG otimizada da capa para os previews sociais e indique-a
no front matter. Essa versão não precisa ser carregada no corpo do artigo:

```yaml
image: /img/blog/meu-post/capa-social.jpg
```

Para converter localmente, uma opção é Python com Pillow (instalado separadamente):

```python
from PIL import Image

imagem = Image.open("capa-original.png").convert("RGB")
imagem.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
imagem.save("capa.webp", "WEBP", quality=82, method=6)
imagem.save("capa-social.jpg", "JPEG", quality=85, optimize=True, progressive=True)
# Para diagramas: imagem.save("diagrama.webp", "WEBP", lossless=True, method=6)
```

Confira a legibilidade e o tamanho dos arquivos antes de publicar. O avatar do
perfil e dos posts fica em `static/img/avatar.webp` (192 × 192); ao trocar a foto,
atualize esse arquivo para que o site continue sem depender do GitHub para carregá-la.

## 4. Confira e suba

```bash
npm start           # veja o post em http://localhost:3000/blog
npm run build       # falha se algum link estiver quebrado
```

Depois é só fazer commit e push: o workflow publica o site.
