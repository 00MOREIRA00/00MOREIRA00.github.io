# Guias de manutenção do hub

Estes guias explicam como publicar e adicionar conteúdo novo ao site. Eles ficam só no repositório: o
Docusaurus publica apenas `docs/api/` (gerado), então nada daqui vira página do site.

| Quero... | Guia |
| --- | --- |
| Publicar o site no GitHub Pages com GitHub Actions | [deploy-github-pages.md](deploy-github-pages.md) |
| Um projeto (system design, Docker ou fluxo) com página própria | [adicionar-projeto.md](adicionar-projeto.md) |
| Uma API com referência estilo Swagger, a partir de um `openapi.yaml` | [adicionar-api.md](adicionar-api.md) |
| Um tema em "O que estou estudando" | [adicionar-estudo.md](adicionar-estudo.md) |

## Onde mora cada dado

| Arquivo | O que guarda |
| --- | --- |
| `src/data/hub.ts` | projetos (`PROJETOS`), estudos (`ESTUDOS`), tipos (`TIPOS`) e o conteúdo do case do newsfeed |
| `src/data/catalogo.json` | lista de APIs |
| `openapi/<id>.yaml` | specs baixadas pelo `npm run sync-specs` |
| `docs/api/<id>/` | referência gerada pelo `npm run gen-api` (não vai para o Git) |

## Antes de subir qualquer mudança

```bash
npm run typecheck   # erros de tipo nos dados (campo faltando, tipo errado)
npm run build       # falha se algum link estiver quebrado (onBrokenLinks: 'throw')
```

Datas seguem sempre o formato `AAAA-MM-DD` (ou `AAAA-MM` onde o guia indicar). Elas são
formatadas na tela por `fmtData`, `fmtDia` e `fmtMes`, então formato errado quebra a exibição.
