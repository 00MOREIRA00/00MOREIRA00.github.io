# Guias de manutenção do hub

Estes guias explicam como adicionar conteúdo novo ao site. Eles ficam só no repositório: o
plugin de documentação está desligado; nada daqui vira página do site.

| Quero adicionar...                                             | Guia                                         |
| -------------------------------------------------------------- | -------------------------------------------- |
| Um projeto (system design, Docker ou fluxo) com página própria | [adicionar-projeto.md](adicionar-projeto.md) |
| Um projeto de API com documentação de rotas                    | [adicionar-api.md](adicionar-api.md)         |
| Um tema em "O que estou estudando"                             | [adicionar-estudo.md](adicionar-estudo.md)   |
| Um post no blog                                                | [adicionar-post.md](adicionar-post.md)       |

## Onde mora cada dado

| Arquivo           | O que guarda                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `src/data/hub.ts` | projetos (`PROJETOS`), estudos (`ESTUDOS`), tipos (`TIPOS`) e o conteúdo do case do newsfeed |
| `blog/*.md`       | posts do blog                                                                                |

## Antes de subir qualquer mudança

```bash
npm run typecheck   # erros de tipo nos dados (campo faltando, tipo errado)
npm run build       # falha se algum link estiver quebrado (onBrokenLinks: 'throw')
```

Datas seguem sempre o formato `AAAA-MM-DD` (ou `AAAA-MM` onde o guia indicar). Elas são
formatadas na tela por `fmtData`, `fmtDia` e `fmtMes`, então formato errado quebra a exibição.
