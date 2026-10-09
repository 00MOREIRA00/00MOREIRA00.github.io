import type {ReactNode} from 'react';
import clsx from 'clsx';
import {HtmlClassNameProvider, PageMetadata, ThemeClassNames} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import SearchMetadata from '@theme/SearchMetadata';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import type {Props} from '@theme/BlogListPage';
import {BlogTopo, FiltroTags, PostRow, resumoDe} from '@site/src/components/blog';

/** Lista de posts em /blog, no visual do hub (substitui a lista padrão do Docusaurus). */
export default function BlogListPage(props: Props): ReactNode {
  const {metadata, items} = props;
  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}>
      <PageMetadata title={metadata.blogTitle} description={metadata.blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
      <BlogListPageStructuredData {...props} />
      <Layout>
        <main className="wrap cat">
          <BlogTopo titulo={metadata.blogTitle} lead={metadata.blogDescription} />
          <FiltroTags />
          <ul className="posts">
            {items.map(({content}) => (
              <PostRow key={content.metadata.permalink} p={resumoDe(content.metadata)} />
            ))}
          </ul>
        </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}
