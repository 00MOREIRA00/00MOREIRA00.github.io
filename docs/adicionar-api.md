# Adicionar uma API

O hub gera uma referência estilo Swagger a partir do `openapi.yaml` (ou `.json`) que fica no
repositório da API. Você não copia a spec à mão: cadastra a API no catálogo e o script baixa.

## Pré-requisito

O repositório da API precisa ter uma spec OpenAPI 3 válida, por exemplo `openapi.yaml` na raiz.
Vale preencher `info.title`, `info.version` e `servers`, porque esses campos aparecem no hub.

## 1. Cadastrar no catálogo

Em `src/data/catalogo.json`, acrescente um item em `apis`:

```json
{
  "githubUser": "00MOREIRA00",
  "apis": [
    {
      "id": "minha-api",
      "name": "Minha API",
      "description": "O que ela faz, em uma frase.",
      "repo": "00MOREIRA00/minha-api",
      "branch": "main",
      "specFile": "openapi.yaml",
      "status": "beta"
    }
  ]
}
```

| Campo | Regra |
| --- | --- |
| `id` | curto, minúsculo, com hífen. Vira a URL `/docs/api/<id>` e o arquivo `openapi/<id>.yaml` |
| `repo` | `usuario/repo` no GitHub |
| `branch` | branch onde está a spec |
| `specFile` | caminho da spec dentro do repositório (pode estar numa subpasta) |
| `status` | `"estavel"` ou `"beta"` |

## 2. Baixar a spec

```bash
npm run sync-specs
```

A spec é salva em `openapi/<id>.yaml`. Repositório privado precisa de token com leitura de
conteúdo:

```bash
GITHUB_TOKEN=<seu-token> npm run sync-specs
```

No deploy, o workflow `.github/workflows/deploy.yml` roda o mesmo script todo dia. Para
repositório privado, crie o secret `SPECS_TOKEN` no repositório do hub.

## 3. Gerar e ver

```bash
npm start
```

O `prestart` (e o `prebuild`) rodam `npm run gen-api`, que gera as páginas em `docs/api/<id>/`.
Essa pasta é gerada e está no `.gitignore`.

O que aparece sozinho:

- card do tipo API em `/projetos`, com versão e número de endpoints lidos da spec
  (plugin `src/plugins/api-meta.ts`);
- contadores "APIs publicadas" e "endpoints documentados" na home;
- referência navegável em `/docs/api/<id>`, com sidebar agrupada por tag.

## Atualizar uma API que já existe

Mudou a spec no repositório da API? Rode `npm run sync-specs` e depois `npm start`. Em produção
isso acontece no build diário ou ao rodar o workflow manualmente.

## Problemas comuns

- **`✗ minha-api: HTTP 404`**: `repo`, `branch` ou `specFile` errado, ou repositório privado sem
  token.
- **Build falha em `sidebars.ts`** procurando `docs/api/<id>/sidebar`: a geração não rodou. Rode
  `npm run gen-api`.
- **Build falha ao ler `openapi/<id>.yaml`**: a spec não foi baixada. Rode `npm run sync-specs`.
