/**
 * Catálogo de APIs do hub. Os dados ficam em catalogo.json.
 *
 * catalogo.json é a lista que você edita para adicionar uma API. Ela alimenta
 * o plugin OpenAPI (docusaurus.config.ts), a sidebar, os cards do hub e o
 * script scripts/sync-specs.mjs. Lista vazia = site sem a parte de APIs.
 */
import catalog from './catalogo.json';

export type ApiEntry = {
  /** id curto, usado na URL: /docs/api/<id> */
  id: string;
  name: string;
  description: string;
  /** "usuario/repo" no GitHub */
  repo: string;
  /** branch onde está o arquivo da spec */
  branch: string;
  /** caminho da spec dentro do repositório (yaml ou json) */
  specFile: string;
  status: 'estavel' | 'beta';
};

export const GITHUB_USER: string = catalog.githubUser;
export const apis = catalog.apis as ApiEntry[];

/** Caminho local onde a spec fica depois do sync */
export const localSpecPath = (api: ApiEntry) => `openapi/${api.id}.yaml`;
