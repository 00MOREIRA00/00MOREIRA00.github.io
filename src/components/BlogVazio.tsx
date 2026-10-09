import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {BlogTopo} from '@site/src/components/blog';

/** Página /blog enquanto não houver nenhum post (criada pelo plugin blog-extra). */
export default function BlogVazio(): ReactNode {
  return (
    <Layout title="Blog" description="Anotações sobre o que estou construindo e estudando.">
      <main className="wrap cat">
        <BlogTopo lead="Anotações sobre o que estou construindo e estudando." rss={false} />
        <div className="empty">
          <strong>Nenhum post publicado ainda.</strong>
          <span>
            O primeiro está a caminho. Enquanto isso, dá uma olhada nos <Link to="/projetos">projetos</Link>.
          </span>
        </div>
      </main>
    </Layout>
  );
}
