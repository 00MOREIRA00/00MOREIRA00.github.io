# Publicar no GitHub Pages com GitHub Actions

Este projeto usa Docusaurus e já tem um workflow em [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml). Ele gera o site na pasta `build/` e publica em **https://00moreira00.github.io**.

## 1. Confira o repositório e a configuração

O destino configurado é o repositório [00MOREIRA00/00MOREIRA00.github.io](https://github.com/00MOREIRA00/00MOREIRA00.github.io), com a branch `main`.

Em [`docusaurus.config.ts`](../docusaurus.config.ts), a configuração já está adequada para esse site de usuário:

```ts
url: 'https://00moreira00.github.io',
baseUrl: '/',
organizationName: GITHUB_USER,
projectName: '00MOREIRA00.github.io',
```

`GITHUB_USER` vem do campo `githubUser` em `src/data/catalogo.json`, atualmente `00MOREIRA00`. Mantenha `baseUrl: '/'` para esse repositório.

Você precisa de permissão de administração para configurar o Pages. Em uma conta GitHub Free, use um repositório público; a disponibilidade em repositórios privados depende do plano.

## 2. Ative o GitHub Pages

1. Abra o repositório no GitHub.
2. Acesse **Settings → Pages**.
3. Em **Build and deployment → Source**, selecione **GitHub Actions**.

O arquivo de workflow já existe: não é necessário escolher um template nem criar outro workflow. Também não é necessário criar uma branch `gh-pages` ou selecionar a pasta `docs` como origem. O conteúdo publicado é o artefato gerado a partir de `build/`.

Se o GitHub indicar que Actions está desativado, confira **Settings → Actions → General** e permita a execução das actions usadas pelo workflow, respeitando eventuais políticas da organização.

## 3. Valide o site localmente

Use Node.js 22, a mesma versão configurada no workflow. Na raiz do projeto, execute:

```bash
npm ci
npm run sync-specs
npm run typecheck
npm run build
npm run serve
```

Abra o endereço informado por `serve` e confira a home, Projetos e Sobre. Encerre o servidor com `Ctrl+C`.

- `npm ci` instala as dependências conforme `package-lock.json`.
- `sync-specs` baixa as especificações das APIs cadastradas. O catálogo atual está vazio, então nenhuma spec é baixada.
- `typecheck` verifica os tipos; é uma checagem local adicional, que o workflow atual não executa.
- `build` executa automaticamente o `prebuild` para gerar a referência das APIs, quando houver, e cria o site estático em `build/`.

Não adicione `build/` ao Git: essa pasta já está no `.gitignore` e será gerada pelo Actions.

## 4. Faça a primeira publicação

Garanta que o código e `.github/workflows/deploy.yml` estejam enviados para a branch `main` no GitHub. Para enviar commits locais já preparados nessa branch:

```bash
git push origin main
```

Cada push na `main` dispara o deploy. Se os arquivos já estiverem no GitHub, você pode publicar sem fazer um novo commit:

1. Abra a aba **Actions**.
2. Selecione **Publicar o hub no GitHub Pages**.
3. Clique em **Run workflow**.
4. Selecione `main` e confirme em **Run workflow**.

Se esse botão não aparecer, confira se o workflow está na branch padrão do repositório e se contém `workflow_dispatch` (o arquivo atual já contém).

## 5. Acompanhe e confira o resultado

Abra a execução na aba **Actions** e acompanhe os dois jobs:

| Job | O que faz |
| --- | --- |
| `build` | Obtém o código, configura Node 22, instala dependências, sincroniza specs, gera o site e envia `build/` como artefato do Pages. |
| `deploy` | Aguarda o build e publica o artefato usando `actions/deploy-pages`, no ambiente `github-pages`. |

Quando ambos terminarem com sucesso, abra **https://00moreira00.github.io**. O link também aparece no ambiente de deploy e em **Settings → Pages**. A publicação pode levar alguns minutos para ficar disponível.

Confira a navegação e recarregue uma página interna, como `/projetos`, diretamente no navegador.

## 6. Publique as próximas alterações

Depois de editar e validar o projeto, faça commit e envie as mudanças para `main`. O workflow publica novamente de forma automática; um push em outra branch não dispara esse workflow.

Também é possível repetir a publicação pelo botão **Run workflow**. Há ainda uma execução diária configurada com `cron: '0 9 * * *'`: às 09:00 UTC (06:00 no horário de São Paulo), sujeita a atrasos do GitHub. Ela permite atualizar as specs de APIs sem um novo commit neste repositório. Para desativá-la, remova o bloco `schedule` de `.github/workflows/deploy.yml`.

## Credenciais e APIs privadas

Para o deploy atual, não é necessário criar PAT, chave SSH ou secret manual. O workflow usa o token automático do GitHub, com estas permissões já declaradas:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

Somente se cadastrar uma API cuja spec esteja em outro repositório privado, configure um secret **SPECS_TOKEN** em **Settings → Secrets and variables → Actions → New repository secret**. Use um token com acesso de leitura ao conteúdo dos repositórios das specs. O passo `sync-specs` já está preparado para utilizá-lo. A documentação gerada dessa spec será publicada no site.

Não é necessário executar `npm run deploy` neste fluxo: a publicação é feita pelo GitHub Actions.

## Problemas comuns

| Problema | Como verificar ou resolver |
| --- | --- |
| Nenhuma execução aparece | Confira se o push foi para `main`, se `.github/workflows/deploy.yml` está no GitHub e se Actions está habilitado. |
| `npm ci` falha | Consulte o log. Se houver divergência entre `package.json` e o lockfile, execute `npm install` localmente e envie o `package-lock.json` atualizado junto das alterações de dependências. |
| `sync-specs` retorna 403 ou 404 | Confira `repo`, `branch` e `specFile` no catálogo, além das permissões do token quando a spec for privada. |
| O build acusa link quebrado | Corrija o link indicado no log: `onBrokenLinks: 'throw'` faz o build falhar nesses casos. |
| O deploy falha por configuração ou permissão | Confira **Settings → Pages → Source: GitHub Actions**, as permissões do YAML e as regras do ambiente `github-pages` em **Settings → Environments**. Se houver restrição de branches, permita `main`. |
| Site retorna 404 após o deploy | Aguarde alguns minutos, confirme que o job `deploy` terminou com sucesso e abra a URL mostrada em **Settings → Pages**. |
| CSS ou links apontam para o lugar errado | Confira `url` e `baseUrl` no Docusaurus. Neste repositório, o site fica na raiz e usa `baseUrl: '/'`. |

## Referências oficiais

- [Configurar a origem de publicação do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
- [Usar workflows personalizados com GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
- [Deploy do Docusaurus](https://current.docusaurus.io/docs/deployment).
