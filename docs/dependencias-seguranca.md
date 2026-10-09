# Segurança das dependências

Revisão em 9 de outubro de 2026. O `npm audit` passou de 53 pacotes afetados
(16 críticos, 21 altos e 16 moderados) para 35 altos, associados a dois alertas.
Não há alertas críticos ou moderados na auditoria após as atualizações.

## Atualizações aplicadas

O campo `overrides` de `package.json` fixa versões corrigidas de dependências
indiretas que os pacotes principais ainda não adotaram:

| Dependência | Versão |
| --- | --- |
| tinypool | 2.1.2 |
| serialize-javascript | 7.0.5 |
| postcss-selector-parser | 7.1.6 |
| js-yaml | mesma faixa da dependência direta (`$js-yaml`), atualmente 4.3.2 |
| yaml | 1.10.3 |
| uuid | 11.1.1 |

Essas substituições incluem mudanças de versão principal. O build de produção,
a leitura de YAML e a geração de um exemplo Node.js/Axios com Postman foram
validados. Isso não cobre todas as funcionalidades futuras do catálogo de APIs,
que atualmente está vazio. Reavaliar os overrides ao atualizar Docusaurus/OpenAPI.

## Alertas pendentes

- **braces 3.0.3:** recursão excessiva com padrões profundamente aninhados.
  Não existe versão corrigida publicada no registro npm nesta revisão.
  Afeta ferramentas que processam padrões de arquivos, como micromatch/chokidar.
  Não usar padrões de arquivos fornecidos por fontes não confiáveis.
  [Alerta upstream](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
- **@faker-js/faker 5.5.3:** execução de código através de templates em `helpers.fake`.
  É uma dependência de `postman-collection`, usada pelos plugins OpenAPI.
  O Postman usa APIs e caminhos de importação antigos que não são compatíveis
  com uma substituição direta pelo Faker 10.6.0 corrigido. É necessária uma
  atualização compatível do Postman ou uma migração da integração OpenAPI.
  Não processar templates ou specs de fontes não confiáveis nessa cadeia.
  [Alerta upstream](https://github.com/advisories/GHSA-qxc2-j82w-r537).

Essas medidas limitam exposição, mas não corrigem os dois pacotes vulneráveis.
Não executar `npm audit fix --force`: nesta revisão ele propõe downgrades de
Docusaurus/OpenAPI incompatíveis com a configuração do projeto.

## Verificação

```powershell
npm.cmd ci --ignore-scripts
npm.cmd audit
npm.cmd run build
```

`--ignore-scripts` contorna o script de instalação do gerador Postman que usa
comandos incompatíveis com Windows. Não configurar essa opção globalmente.
O audit continua retornando código diferente de zero enquanto houver alertas.
