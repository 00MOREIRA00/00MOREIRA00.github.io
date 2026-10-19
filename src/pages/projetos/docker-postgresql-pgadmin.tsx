import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import {TypeBadge} from '@site/src/components/hub';
import {POSTGRESQL_PGADMIN, fmtData} from '@site/src/data/hub';

const repoUrl = 'https://github.com/' + POSTGRESQL_PGADMIN.repo;
const arquivos = [
  ['README.md', 'Guia de execução, migrations, backup e restore'],
  ['docker-compose.yml', 'Serviços, healthcheck, volumes e rede'],
  ['docs/caso-de-negocio.md', 'O caso da Pauta Digital e suas regras'],
  ['docs/modelo-de-dados.md', 'Modelo relacional e constraints'],
  ['docs/decisoes.md', 'Decisões técnicas do laboratório'],
  ['migrations', 'Schema inicial e evolução com cupons'],
  ['docs/tutoriais', 'Passo a passo e problemas resolvidos'],
];

export default function Page(): ReactNode {
  return (
    <Layout title={POSTGRESQL_PGADMIN.nome} description={POSTGRESQL_PGADMIN.descricao}>
      <main className="wrap cat">
        <Link to="/projetos" className="doclink">
          ← Todos os projetos
        </Link>
        <div className="eyebrow" style={{marginTop: 24}}>
          // Laboratório de banco de dados
        </div>
        <h1>{POSTGRESQL_PGADMIN.nome}</h1>
        <p className="lead">{POSTGRESQL_PGADMIN.descricao}</p>
        <div className="project-meta">
          <div className="hrow" style={{gap: 8}}>
            <TypeBadge tipo={POSTGRESQL_PGADMIN.tipo} />
            {POSTGRESQL_PGADMIN.tags.map((tag) => (
              <span className="chip" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
          <p className="meta-line">
            repo: <a href={repoUrl}>github.com/{POSTGRESQL_PGADMIN.repo}</a> · atualizado em{' '}
            {fmtData(POSTGRESQL_PGADMIN.atualizado)}
          </p>
        </div>
        <div className="two">
          <section className="block">
            <h2>O caso: Pauta Digital</h2>
            <p className="desc">
              Uma plataforma fictícia de revistas e newsletters por assinatura. O banco guarda
              planos, publicações, assinantes e assinaturas, com regras garantidas pelo PostgreSQL:
              e-mail único, uma assinatura em andamento por assinante e cancelamento com data e
              motivo.
            </p>
            <h2>Como o ambiente funciona</h2>
            <div className="fields">
              <div className="field">
                <span className="field-name">PostgreSQL 18</span>
                <span className="field-desc">
                  Banco com volume persistente, healthcheck e pg_stat_statements habilitado.
                </span>
              </div>
              <div className="field">
                <span className="field-name">Flyway</span>
                <span className="field-desc">
                  Espera o banco ficar saudável, aplica as migrations pendentes e encerra.
                </span>
              </div>
              <div className="field">
                <span className="field-name">pgAdmin 4</span>
                <span className="field-desc">
                  Interface web com o servidor pré-cadastrado; conecta ao host postgres na rede do
                  Compose.
                </span>
              </div>
            </div>
          </section>
          <section className="block">
            <h2>O que o projeto demonstra</h2>
            <ol className="numlist">
              <li>
                <strong>Modelagem relacional</strong>
                <span>
                  PK/FK, CHECK, ENUM, citext e índice único parcial para regras de negócio.
                </span>
              </li>
              <li>
                <strong>Evolução com dados</strong>
                <span>V1 cria o schema; V2 adiciona cupons sem apagar o banco existente.</span>
              </li>
              <li>
                <strong>Dados de exemplo</strong>
                <span>
                  500 assinantes e suas assinaturas gerados com generate_series em um script
                  separado das migrations.
                </span>
              </li>
              <li>
                <strong>Backup e restore</strong>
                <span>
                  pg_dump e pg_restore em banco separado, com conferência de contagens e impressão
                  digital das assinaturas.
                </span>
              </li>
            </ol>
          </section>
        </div>
        <div className="two" style={{marginTop: 24}}>
          <section className="block">
            <h2>Executar localmente</h2>
            <p className="desc">
              Com Docker e Compose v2 instalados, clone o projeto, copie .env.example para .env e
              defina POSTGRES_PASSWORD e PGADMIN_PASSWORD.
            </p>
            <CodeBlock language="bash">
              {'git clone ' +
                repoUrl +
                '.git\ncd docker-postgresql-pgadmin\ndocker compose up -d\ndocker compose ps -a\ndocker compose logs flyway'}
            </CodeBlock>
            <p className="desc">
              O PostgreSQL deve ficar healthy e o Flyway encerrar com código 0. Confira também os
              logs para verificar a aplicação das migrations.
            </p>
            <p className="desc">
              pgAdmin em <code>localhost:16543</code>; PostgreSQL em <code>localhost:5432</code>,
              banco <code>pauta</code>. Use as credenciais do seu .env.
            </p>
            <a className="doclink" href={repoUrl + '#como-rodar'}>
              Abrir instruções completas ↗
            </a>
          </section>
          <section className="block">
            <h2>Explorar o repositório</h2>
            <div className="ov-list">
              {arquivos.map(([path, descricao]) => (
                <a key={path} href={repoUrl + '/tree/main/' + path}>
                  <span className="mono">{path}</span>
                  <span className="s">{descricao}</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
