# Adicionar um projeto de API

O portal é um blog e portfólio. Uma API entra como projeto com contexto, decisões técnicas
e, quando útil, documentação das rotas na própria página. Não há geração ou sincronização Swagger.

1. Siga [Adicionar um projeto](adicionar-projeto.md), usando `tipo: 'api'` em `PROJETOS`
   (`src/data/hub.ts`) e uma página em `src/pages/projetos/`.
2. Aponte `href` para essa página e informe repositório, descrição, tags e data de atualização.
3. Documente as rotas relevantes com método HTTP, caminho, objetivo, parâmetros,
   autenticação, exemplos de requisição/resposta e códigos de status.
4. Diferencie contratos de estudo de endpoints realmente publicados. Quando houver,
   inclua o endereço público e um link para a documentação mantida pelo projeto.

A aba API do [case Newsfeed](../src/components/NewsfeedCase.tsx) exemplifica uma referência
editorial de rotas, com métodos e corpos de requisição. Uma spec OpenAPI pode continuar
no repositório de origem e ser vinculada na página do projeto.

Antes de publicar, rode `npm run typecheck` e `npm run build`.
