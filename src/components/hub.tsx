import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useNewsfeedMeta} from './useNewsfeed';
import {
  NEWSFEED, PROJETOS, TIPOS, fmtData, fmtDia, fmtMes,
  type Estudo, type Projeto, type TipoProjeto,
} from '@site/src/data/hub';

/** Projetos editoriais do portfólio, incluindo projetos de API. */
export function useTodosProjetos(): Projeto[] {
  const meta = useNewsfeedMeta();
  return PROJETOS.map((p) => p.id === NEWSFEED.id ? {...p, atualizado: meta.atualizado} : p);
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
  const meta = useNewsfeedMeta();
  const atualizado = p.id === NEWSFEED.id ? meta.atualizado : p.atualizado;
  return (
    <Link to={p.href} className={`hcard card-${p.tipo} ${destaque ? 'card-feature' : ''}`}>
      <span className="card-head">
        <TypeBadge tipo={p.tipo} />
        {atualizado && <span className="card-ver">atualizado em {fmtData(atualizado)}</span>}
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
