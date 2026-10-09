import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {fmtData} from '@site/src/data/hub';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {BlogExtra, PostResumo} from '@site/src/plugins/blog-extra';

export type {PostResumo};

const IconRss = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="5" cy="19" r="2.5" />
    <path d="M2.5 9.5a12 12 0 0 1 12 12h-3.4a8.6 8.6 0 0 0-8.6-8.6zM2.5 2.5a19 19 0 0 1 19 19h-3.4A15.6 15.6 0 0 0 2.5 5.9z" />
  </svg>
);

/** Cabeçalho das páginas do blog (lista, tag e vazio). */
export function BlogTopo({titulo = 'Blog', lead, rss = true}: {titulo?: string; lead: ReactNode; rss?: boolean}): ReactNode {
  return (
    <div className="blog-head">
      <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
        <div className="eyebrow">// Blog</div>
        <h1>{titulo}</h1>
        <p className="lead" style={{margin: '6px 0 0'}}>{lead}</p>
      </div>
      {/* o feed só existe quando há posts */}
      {rss && (
        <a className="rss" href="/blog/rss.xml">
          <IconRss />
          RSS
        </a>
      )}
    </div>
  );
}

/** Filtro por tag: cada tag é a página /blog/tags/<tag> que o Docusaurus gera. */
export function FiltroTags({atual}: {atual?: string}): ReactNode {
  const {tags, total} = useBlogExtra();
  return (
    <nav className="seg" aria-label="Filtrar por tag">
      <Link to="/blog" aria-current={!atual ? 'page' : undefined}>
        Todos <span className="seg-n">{total}</span>
      </Link>
      {tags.map((t) => (
        <Link key={t.permalink} to={t.permalink} aria-current={atual === t.permalink ? 'page' : undefined}>
          #{t.label} <span className="seg-n">{t.count}</span>
        </Link>
      ))}
    </nav>
  );
}

/** Uma linha da lista de posts: data, título, resumo, tempo de leitura e tags. */
export function PostRow({p}: {p: PostResumo}): ReactNode {
  return (
    <li className="post-row">
      <time dateTime={p.data}>{fmtData(p.data)}</time>
      <div>
        <Link className="pt" to={p.permalink}>
          {p.titulo}
        </Link>
        {p.resumo && <p>{p.resumo}</p>}
        <div className="post-meta">
          <span>{p.minutos} min de leitura</span>
          {p.tags.length > 0 && (
            <span className="ptags">
              {p.tags.map((t) => (
                <Link key={t.permalink} to={t.permalink}>
                  #{t.label}
                </Link>
              ))}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

/** Converte um item da lista do Docusaurus no resumo usado por PostRow. */
export function resumoDe(m: {
  title: string;
  permalink: string;
  date: string | Date;
  description: string;
  readingTime?: number;
  tags: {label: string; permalink: string}[];
}): PostResumo {
  return {
    titulo: m.title,
    permalink: m.permalink,
    data: new Date(m.date).toISOString().slice(0, 10),
    resumo: m.description,
    minutos: Math.max(1, Math.ceil(m.readingTime ?? 1)),
    tags: m.tags.map((t) => ({label: t.label, permalink: t.permalink})),
  };
}

/** Dados do plugin blog-extra: posts recentes, tags e total. */
export const useBlogExtra = () => usePluginData('blog-extra') as BlogExtra;
