import type {ReactNode} from 'react';
import clsx from 'clsx';
import {HtmlClassNameProvider, PageMetadata, ThemeClassNames} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogTagsPostsPage';
import {BlogTopo, FiltroTags, PostRow, resumoDe} from '@site/src/components/blog';

/** Posts de uma tag (/blog/tags/<tag>): mesma lista do /blog, com a tag marcada no filtro. */
export default function BlogTagsPostsPage({tag, items}: Props): ReactNode {
  const titulo = `#${tag.label}`;
  const lead = tag.description ?? `${tag.count} ${tag.count === 1 ? 'post' : 'posts'} com esta tag.`;
  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogTagPostListPage)}>
      <PageMetadata title={`Posts com ${titulo}`} description={lead} />
      <SearchMetadata tag="blog_tags_posts" />
      <Layout>
        <main className="wrap cat">
          <BlogTopo titulo={titulo} lead={lead} />
          <FiltroTags atual={tag.permalink} />
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
