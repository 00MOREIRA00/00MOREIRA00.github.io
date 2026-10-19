---
title: Migrations
description: Entenda como migrations versionam a estrutura do banco de dados, com exemplos de Flyway, Spring Boot e um laboratório com PostgreSQL e Docker Compose.
authors: roberto
tags: [banco-de-dados, flyway, docker, desenvolvimento-software]
slug: migrations
image: /img/blog/migrations/capa-social.jpg
---

<img src="/img/blog/migrations/capa.webp" alt="Ilustração de abertura do artigo sobre migrations." width="1024" height="580" loading="eager" decoding="async" />

Fala pessoaaaaal, tudo certo?

Recentemente peguei um repositório antigo meu para reformular e deixar melhor, pois era um projeto de quando eu estava começando os estudos de Docker. Nada mais é do que um Docker Compose que sobe um PostgreSQL e o pgAdmin, para analisar o banco de dados com uma interface gráfica.

Como adição ao projeto, tive a ideia de aplicar migrations e fui olhar projetos de outras pessoas em busca de ideias. Cheguei a uma observação: **as pessoas não têm o hábito de usar migrations nos seus projetos.**

Daí surgiu o tema deste post, porque acredito que muita gente ainda não tem familiaridade com isso. E vem a pergunta que não quer calar:

<!-- truncate -->

> O que é migration em banco de dados ?

Vamos responder de forma conceitual e bem simples: migrations são um mecanismo de versionamento da estrutura do banco de dados.

> Para que precisamos disso ?

Simples: assim como a aplicação evolui, o banco de dados provavelmente não é o mesmo do início. Ele pode ter começado com uma única tabela e poucas colunas e, com o tempo, ganhado novas tabelas e colunas, ou perdido algumas.

Pensa assim: assim como usamos o Git para versionar a aplicação, usamos as migrations para versionar o banco de dados.

## Como é utilizado ?

Agora que entendemos o conceito, vamos ver como funciona. Imagina uma API em Spring Boot que se comunica com um banco de dados PostgreSQL. Para controlar as migrations, vamos usar o Flyway, que tem integração nativa com o Spring Boot.

Dentro do projeto temos a pasta /migration, onde ficam os arquivos .sql. Cada arquivo representa uma versão da estrutura do banco e segue um padrão de nome: a letra V, o número da versão, dois underscores e uma descrição do que ele faz. Por exemplo:

- V1__criando_tabela_vendas.sql
- V2__adicionando_coluna_auditoria.sql
- V3__removendo_coluna_agente.sql

<img src="/img/blog/migrations/pasta.webp" alt="Aplicação Spring Boot com sua pasta de migrations e arquivos SQL versionados." width="701" height="244" loading="lazy" decoding="async" />

Com a dependência do Flyway adicionada ao projeto, não precisamos executar nada manualmente: quando a aplicação sobe, o Flyway entra em ação. Ele consulta a tabela flyway_schema_history, que ele mesmo cria no banco e que guarda o histórico de tudo o que já foi aplicado. Com base nela, identifica quais migrations ainda não foram executadas e roda só as pendentes, na ordem das versões. As que já foram aplicadas são ignoradas.

Um detalhe importante: depois que uma migration foi aplicada, você **não edita** o arquivo. O Flyway guarda um checksum de cada um e reclama se algo mudar. Se precisar de um ajuste, crie uma nova versão.

## O que isso resolve?

Você pode ainda não estar enxergando a importância, então vamos a um exemplo.

Imagina que você está trabalhando em uma task de uma aplicação que usa banco de dados. No desenvolvimento você usa seu banco local, mas existem os ambientes de homologação e de produção, cada um com seu próprio banco.

Sua task exigiu a criação de uma nova tabela. No deploy, a aplicação subiu, mas o banco não tinha a estrutura necessária, porque a criação da tabela foi esquecida. Resultado: erro em produção.

A migration resolve esse problema. No processo de deploy, assim como os testes são executados para validação, as migrations também são executadas: quando a API sobe em cada ambiente, o Flyway verifica a versão do banco e aplica as mudanças necessárias antes de a aplicação começar a receber requisições.

Segue um exemplo do fluxo com a migration, usando o Flyway como responsável pelo processo:

<img src="/img/blog/migrations/fluxo.webp" alt="Fluxo de inicialização da aplicação com verificação e execução das migrations pelo Flyway." width="1024" height="474" loading="lazy" decoding="async" />

## Prática

Pra fixar o conceito, apliquei migrations naquele repositório antigo que citei no começo do post. Ele é um laboratório de PostgreSQL com Docker Compose, pgAdmin e Flyway, em cima de um caso fictício.

Um detalhe: no repositório não existe uma API. Em vez de o Flyway rodar junto com o Spring Boot, ele é um serviço do próprio Docker Compose, que aplica as migrations pendentes e encerra. Quem executa muda, mas a ideia é a mesma: a estrutura do banco é atualizada por uma ferramenta, e não pela memória de alguém.

São três serviços:

- **postgres:** PostgreSQL com healthcheck
- **flyway:** aplica as migrations pendentes e encerra
- **pgadmin:** interface web, com o servidor já cadastrado

As migrations ficam na pasta migrations:

- V1__schema_inicial.sql: cria o schema inicial, com tabelas, constraints e a carga inicial de planos e publicações.
- V2__cupons.sql: adiciona a tabela de cupons e a coluna cupom_id em assinaturas, aplicada em um banco que já tinha dados. É justamente nesse cenário que a migration faz diferença.

Depois de subir tudo, dá para abrir o pgAdmin e consultar a tabela flyway_schema_history para ver o que foi aplicado e quando.

O projeto está disponível aqui:

🔗 [https://github.com/00MOREIRA00/docker-postgresql-pgadmin](https://github.com/00MOREIRA00/docker-postgresql-pgadmin)

## Conclusão

No fim das contas, migrations são o “Git do banco de dados”: garantem que a estrutura acompanhe a aplicação em qualquer ambiente, sem depender da memória de ninguém.

Se você ainda não usa migrations nos seus projetos, vale testar. Depois que acostuma, é difícil voltar.

Até a próxima!

## Referências

- [https://documentation.red-gate.com/flyway](https://documentation.red-gate.com/flyway)
- [https://docs.spring.io/spring-boot/how-to/data-initialization.html](https://docs.spring.io/spring-boot/how-to/data-initialization.html)
