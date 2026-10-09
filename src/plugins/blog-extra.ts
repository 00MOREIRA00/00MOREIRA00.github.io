import type {Plugin} from '@docusaurus/types';
import type {BlogContent} from '@docusaurus/plugin-content-blog';

/** Resumo de um post, usado na home ("Últimos posts"). */
export type PostResumo = {
  titulo: string;
  permalink: string;
  data: string; // AAAA-MM-DD
  resumo: string;
  minutos: number;
  tags: {label: string; permalink: string}[];
};

export type BlogExtra = {
  recentes: PostResumo[];
  tags: {label: string; permalink: string; count: number}[];
  total: number;
};

/**
 * Complementa o blog do Docusaurus:
 * - expõe os posts mais recentes (home) e as tags (filtro) via usePluginData('blog-extra');
 * - sem nenhum post, o Docusaurus não cria a página /blog, então este plugin cria uma
 *   página "Nenhum post publicado ainda" no lugar. Ela some sozinha quando o primeiro post entra.
 */
export default function blogExtraPlugin(): Plugin {
  return {
    name: 'blog-extra',
    async allContentLoaded({allContent, actions}) {
      const blog = allContent['docusaurus-plugin-content-blog']?.default as BlogContent | undefined;
      const posts = (blog?.blogPosts ?? []).filter((p) => !p.metadata.unlisted);

      const recentes: PostResumo[] = posts.slice(0, 3).map(({metadata: m}) => ({
        titulo: m.title,
        permalink: m.permalink,
        data: new Date(m.date).toISOString().slice(0, 10),
        resumo: m.description,
        minutos: Math.max(1, Math.ceil(m.readingTime ?? 1)),
        tags: m.tags.map((t) => ({label: t.label, permalink: t.permalink})),
      }));
      const tags = Object.values(blog?.blogTags ?? {})
        .filter((t) => !t.unlisted)
        .map((t) => ({label: t.label, permalink: t.permalink, count: t.items.length}))
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
      const dados: BlogExtra = {recentes, tags, total: posts.length};
      actions.setGlobalData(dados);

      if (posts.length === 0) {
        actions.addRoute({path: '/blog', exact: true, component: '@site/src/components/BlogVazio.tsx'});
      }
    },
  };
}
