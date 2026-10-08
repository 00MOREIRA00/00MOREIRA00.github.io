import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import {apis} from '@site/src/data/apis';
import type {ApiMeta} from '@site/src/plugins/api-meta';
import {
  PROJETOS, TIPOS, fmtData, fmtDia, fmtMes,
  type Estudo, type Projeto, type TipoProjeto,
} from '@site/src/data/hub';

/** Projetos do hub + APIs do catálogo (cada API vira um card do tipo "api"). */
export function useTodosProjetos(): Projeto[] {
  const meta = (usePluginData('api-meta') ?? []) as ApiMeta[];
  const daApi: Projeto[] = apis.map((a) => {
    const m = meta.find((x) => x.id === a.id);
    return {
      id: a.id,
      tipo: 'api',
      nome: a.name,
      descricao: a.description,
      repo: a.repo,
      atualizado: '',
      tags: ['openapi', ...(m ? [`v${m.version}`, `${m.endpoints} endpoints`] : [])],
      href: `/docs/api/${a.id}`,
    };
  });
  return [...daApi, ...PROJETOS];
}

/** Total de endpoints documentados, lido das specs no build. */
export function useTotalEndpoints(): number {
  const meta = (usePluginData('api-meta') ?? []) as ApiMeta[];
  return meta.reduce((n, m) => n + m.endpoints, 0);
}

export const TypeBadge = ({tipo}: {tipo: TipoProjeto}) => (
  <span className={`tb tb-${tipo}`}>{TIPOS[tipo].label}</span>
);

export const Dots = () => (
  <>
    <span className="dot dot-r" />
    <span className="dot dot-y" />
    <span className="dot dot-g" />
  </>
);

export function ProjetoCard({p, destaque = false}: {p: Projeto; destaque?: boolean}): ReactNode {
  return (
    <Link to={p.href} className={`hcard card-${p.tipo} ${destaque ? 'card-feature' : ''}`}>
      <span className="card-head">
        <TypeBadge tipo={p.tipo} />
        {p.atualizado && <span className="card-ver">atualizado em {fmtData(p.atualizado)}</span>}
      </span>
      <span className="card-name">{p.nome}</span>
      <p>{p.descricao}</p>
      <span className="card-tags">
        {p.tags.map((t) => (
          <span key={t}>#{t}</span>
        ))}
      </span>
      <span className="card-meta">
        {p.fonte ? `${p.fonte} · ` : ''}github.com/{p.repo}
      </span>
    </Link>
  );
}

export function EstudoCard({e}: {e: Estudo}): ReactNode {
  const status = {estudando: 'Estudando', praticando: 'Praticando', concluido: 'Concluído'}[e.status];
  return (
    <article className={`est est-${e.status}`}>
      <div className="est-head">
        <span className="est-st">{status}</span>
        <span className="est-since">desde {fmtMes(e.desde)}</span>
      </div>
      <h3>{e.tema}</h3>
      <p>{e.nota}</p>
      <div className="est-foot">
        <span>{e.fonte}</span>
        {e.projeto && (
          <Link className="est-link" to={e.projeto.href}>
            → ver o case
          </Link>
        )}
      </div>
    </article>
  );
}

export function LogList({itens}: {itens: [string, string][]}): ReactNode {
  return (
    <ol className="log">
      {itens
        .slice()
        .reverse()
        .map(([d, t]) => (
          <li key={d + t}>
            <time dateTime={d}>{fmtDia(d)}</time>
            <span>{t}</span>
          </li>
        ))}
    </ol>
  );
}
