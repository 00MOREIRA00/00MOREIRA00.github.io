import snapshot from './newsfeed-fallback.json';

export type NewsfeedMeta = {
  atualizado: string;
  arquivos: [string, string][];
  /** Ordem cronológica crescente, como esperado por LogList. */
  commits: [string, string][];
};

/** Snapshot versionado: permite compilar sem rede ou token. */
export const NEWSFEED_FALLBACK = snapshot as NewsfeedMeta;
