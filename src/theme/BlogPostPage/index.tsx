import {useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import {BlogPostProvider, useBlogPost} from '@docusaurus/plugin-content-blog/client';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import ContentVisibility from '@theme/ContentVisibility';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import type {Props} from '@theme/BlogPostPage';
import {fmtData} from '@site/src/data/hub';

type Autor = {name?: string; title?: string; imageURL?: string; url?: string};

/** Foto do autor; se não carregar, mostra as iniciais. */
function FotoAutor({autor}: {autor: Autor}): ReactNode {
  const [falhou, setFalhou] = useState(false);
  const iniciais = (autor.name ?? '?').split(' ').map((p) => p[0]).slice(0, 2).join('');
  return (
    <span className="byline-av">
      {autor.imageURL && !falhou ? (
        <img src={autor.imageURL} alt="" width={40} height={40} onError={() => setFalhou(true)} />
      ) : (
        <span aria-hidden="true">{iniciais}</span>
      )}
    </span>
  );
}

function Conteudo({children}: {children: ReactNode}): ReactNode {
  const {metadata, toc} = useBlogPost();
  const {title, description, date, readingTime, authors, tags, editUrl, prevItem, nextItem, frontMatter} = metadata;
  const dia = new Date(date).toISOString().slice(0, 10);
  const min = frontMatter.toc_min_heading_level ?? 2;
  const max = frontMatter.toc_max_heading_level ?? 3;
  const sumario = frontMatter.hide_table_of_contents ? [] : toc.filter((t) => t.level >= min && t.level <= max);

  return (
    <Layout>
      <article className="wrap post">
        <Link className="post-back" to="/blog">
          ← Blog
        </Link>
        <header className="post-head">
          <div className="post-meta">
            <time dateTime={dia}>{fmtData(dia)}</time>
            {readingTime !== undefined && (
              <>
                <span aria-hidden="true">·</span>
                <span>{Math.max(1, Math.ceil(readingTime))} min de leitura</span>
              </>
            )}
          </div>
          <h1>{title}</h1>
          {description && <p className="post-sub">{description}</p>}
          {authors.map((a) => (
            <div className="byline" key={a.key ?? a.name}>
              <FotoAutor autor={a} />
              <div>
                <b>{a.url ? <Link to={a.url}>{a.name}</Link> : a.name}</b>
                {a.title && <span>{a.title}</span>}
              </div>
            </div>
          ))}
        </header>

        <div className={clsx('post-grid', sumario.length === 0 && 'post-grid--solo')}>
          <div className="prose">
            <ContentVisibility metadata={metadata} />
            <div className="markdown">
              <MDXContent>{children}</MDXContent>
            </div>

            <div className="post-end">
              <div className="post-end-meta">
                <span className="ptags">
                  {tags.map((t) => (
                    <Link key={t.permalink} to={t.permalink}>
                      #{t.label}
                    </Link>
                  ))}
                </span>
                {editUrl && <Link to={editUrl}>editar no GitHub ↗</Link>}
              </div>
              {(prevItem || nextItem) && (
                <nav className="post-pager" aria-label="Outros posts">
                  {prevItem && (
                    <Link to={prevItem.permalink}>
                      <small>← Mais novo</small>
                      {prevItem.title}
                    </Link>
                  )}
                  {nextItem && (
                    <Link className="next" to={nextItem.permalink}>
                      <small>Mais antigo →</small>
                      {nextItem.title}
                    </Link>
                  )}
                </nav>
              )}
            </div>
          </div>

          {sumario.length > 0 && (
            <nav className="toc" aria-label="Nesta página">
              <div className="eyebrow">Nesta página</div>
              {sumario.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className={t.level > min ? 'toc-sub' : undefined}
                  dangerouslySetInnerHTML={{__html: t.value}}
                />
              ))}
            </nav>
          )}
        </div>
      </article>
    </Layout>
  );
}

/** Página de um post, no visual do hub (substitui a página padrão do Docusaurus). */
export default function BlogPostPage(props: Props): ReactNode {
  const Post = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogPostPage)}>
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <Conteudo>
          <Post />
        </Conteudo>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
