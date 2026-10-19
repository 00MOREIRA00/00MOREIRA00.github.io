import type {NewsfeedMeta} from '../data/newsfeed-meta';

type Options = {
  repo: string;
  branch: string;
  fallback: NewsfeedMeta;
  token?: string;
  fetchImpl?: typeof fetch;
  warn?: (message: string) => void;
  timeoutMs?: number;
};

function commitData(value: unknown): Pick<NewsfeedMeta, 'atualizado' | 'commits'> {
  if (!Array.isArray(value) || value.length === 0) throw new Error('Invalid commits');
  const commits: [string, string][] = value.slice(0, 6).map((item) => {
    const date = item?.commit?.committer?.date;
    const message = item?.commit?.message;
    if (typeof date !== 'string' || !Number.isFinite(Date.parse(date)) ||
        typeof message !== 'string' || !message.trim()) throw new Error('Invalid commit');
    return [new Date(date).toISOString().slice(0, 10), message.trim().split(/\r?\n/)[0]];
  });
  const atualizado = commits[0][0];
  return {atualizado, commits: commits.reverse()};
}

function fileData(value: unknown, fallback: NewsfeedMeta): NewsfeedMeta['arquivos'] {
  const data = value as {truncated?: boolean; tree?: {type: string; path: string}[]};
  if (!data || data.truncated !== false || !Array.isArray(data.tree)) throw new Error('Invalid tree');
  const descriptions = new Map(fallback.arquivos);
  return data.tree
    .filter((entry) => entry.type === 'blob' && typeof entry.path === 'string' &&
      (/^docs\/.+\.mdx?$/i.test(entry.path) ||
        ['glossario.md', 'database/README.md', 'newsfeed.drawio'].includes(entry.path)))
    .sort((a, b) => Number(!a.path.startsWith('docs/')) - Number(!b.path.startsWith('docs/')) ||
      a.path.localeCompare(b.path, 'pt-BR', {numeric: true}))
    .map(({path}) => [path, descriptions.get(path) ?? path.split('/').pop()!
      .replace(/\.mdx?$/i, '').replace(/^\d+[-_]/, '').replace(/[-_]/g, ' ')]);
}

/** Só roda no build: cada consulta tem timeout e fallback independente. */
export async function fetchNewsfeedMeta({
  repo, branch, fallback, token, fetchImpl = fetch, warn = console.warn, timeoutMs = 8000,
}: Options): Promise<NewsfeedMeta> {
  const headers: Record<string, string> = {Accept: 'application/vnd.github+json'};
  if (token) headers.Authorization = `Bearer ${token}`;
  const get = async (endpoint: string): Promise<unknown> => {
    const response = await fetchImpl(`https://api.github.com/repos/${repo}/${endpoint}`, {
      headers, signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
    return response.json();
  };
  const [history, files] = await Promise.allSettled([
    get(`commits?sha=${encodeURIComponent(branch)}&per_page=6`).then(commitData),
    get(`git/trees/${encodeURIComponent(branch)}?recursive=1`).then((data) => fileData(data, fallback)),
  ]);
  // Não incluir erros de rede/headers no log: o token deve ficar apenas no processo de build.
  if (history.status === 'rejected') warn('[newsfeed-meta] Histórico indisponível; usando snapshot versionado.');
  if (files.status === 'rejected') warn('[newsfeed-meta] Arquivos indisponíveis; usando snapshot versionado.');
  return {
    ...(history.status === 'fulfilled' ? history.value : {atualizado: fallback.atualizado, commits: fallback.commits}),
    arquivos: files.status === 'fulfilled' ? files.value : fallback.arquivos,
  };
}
