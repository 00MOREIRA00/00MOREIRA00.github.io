# Segurança das dependências

## Resultado da revisão

A integração Swagger/OpenAPI e sua cadeia Postman/Faker foram removidas. O portal
é um site estático de blog e portfólio; a documentação de rotas fica nas páginas
dos projetos. Também foram removidos Sass e as dependências diretas `js-yaml` e
`@types/js-yaml`, que não eram mais usadas pelo código do portal. O Docusaurus
continua trazendo seu próprio parser YAML transitivamente.

Auditoria desta revisão, após instalar também as ferramentas da issue #16:

| Resolução                                          | Críticos | Altos | Moderados | Total |
| -------------------------------------------------- | -------: | ----: | --------: | ----: |
| Antes da revisão dos overrides                     |        0 |    28 |         0 |    28 |
| Cópia temporária sem nenhum override               |       15 |    15 |        15 |    45 |
| Resolução final, com quatro overrides justificados |        0 |    28 |         0 |    28 |

Os números representam pacotes afetados direta ou transitivamente no relatório
`npm audit`, não 28 vulnerabilidades independentes. Na árvore final, todos os
alertas derivam do advisory de `braces` descrito abaixo. As ferramentas de lint,
formatação, links e testes do contato não acrescentaram novos advisories.

## Overrides mantidos

| Pacote                    | Versão | Justificativa e consumidor atual                                                                                                             |
| ------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `tinypool`                | 2.1.2  | O Docusaurus solicita 1.x. Sem override resolve 1.1.1, afetado por poluição de protótipo com execução de código; os advisories exigem 2.1.2. |
| `serialize-javascript`    | 7.0.5  | `copy-webpack-plugin` e `css-minimizer-webpack-plugin` resolvem 6.0.2 sem override, reintroduzindo execução de código e exaustão de CPU.     |
| `postcss-selector-parser` | 7.1.6  | Partes da cadeia CSS resolvem 6.1.4 sem override, afetado por complexidade quadrática no parsing de seletores.                               |
| `uuid`                    | 11.1.1 | `sockjs`, usado pelo servidor de desenvolvimento, resolve 8.3.2 sem override, com falha de validação de limites de buffer.                   |

Fontes dos limites de correção: [Tinypool](https://github.com/advisories/GHSA-85c8-ppgw-ccpr),
[Serialize JavaScript — execução de código](https://github.com/advisories/GHSA-5c6j-r48x-rmvq),
[Serialize JavaScript — CPU](https://github.com/advisories/GHSA-qj8w-gfj5-8c6v),
[PostCSS selector parser](https://github.com/advisories/GHSA-rj75-hqrm-r3gf) e
[UUID](https://github.com/advisories/GHSA-w5hq-g745-h8pq).

Esses overrides atravessam versões principais e continuam sendo exceções de
compatibilidade. Instalação limpa, lint, testes, typecheck, build e inicialização
do servidor de desenvolvimento devem ser conferidos ao alterá-los. Reavaliar cada
um quando seus consumidores atualizarem as faixas suportadas; não removê-los apenas
para reduzir o número de overrides.

## Overrides removidos

- `yaml: 1.10.3`: não há consumidor do pacote `yaml` na árvore atual; a exceção
  sustentava a integração antiga.
- `js-yaml: $js-yaml`: os consumidores atuais já resolvem 4.3.2 sem override.
  A dependência direta do portal e seus tipos foram removidos por falta de uso.

## Alerta residual: braces

`braces@3.0.3` sofre exaustão da pilha com padrões profundamente aninhados:
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
O registro npm consultado nesta revisão ainda publica 3.0.3 como versão mais
recente, sem correção disponível. `micromatch`, `fast-glob`, `globby`, `chokidar`
e seus consumidores no Docusaurus propagam o alerta.

A exposição está nas ferramentas de build e desenvolvimento. O GitHub Pages
publica os arquivos estáticos gerados; não executa esses pacotes no servidor para
atender visitantes. Os padrões usados pelo build são definidos no repositório.
Manter a revisão de mudanças que alterem padrões de arquivos e acompanhar a
correção upstream. Esta revisão documenta e aceita o alerta residual; não afirma
que o pacote foi corrigido.

O CI continua executando a auditoria como aviso não bloqueante. Não usar
`npm audit fix --force` para impor downgrades ou alterações incompatíveis ao
Docusaurus. Consultar uma auditoria nova antes de cada revisão: contagens
históricas não descrevem necessariamente o registro atual.

## Reproduzir a verificação

```bash
npm ci
npm ls tinypool serialize-javascript postcss-selector-parser uuid --all
npm audit
npm run lint
npm run format:check
npm test
npm run typecheck
npm run build
```

`npm audit` retorna código diferente de zero enquanto houver o alerta residual.
Os relatórios antes/depois foram obtidos com `npm audit --json`; a comparação sem
overrides foi feita em uma cópia temporária do manifesto e lockfile, sem alterar
a instalação do projeto. Os relatórios descrevem o registro no momento da revisão.
