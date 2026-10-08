import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import type {LoadContext, Plugin} from '@docusaurus/types';
import {apis, localSpecPath} from '../data/apis';

export type ApiMeta = {
  id: string;
  title: string;
  version: string;
  endpoints: number;
  servers: string[];
  /** primeiro GET da spec, usado no exemplo da home */
  exemploPath: string;
};

const METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];

/** Lê cada spec no build e expõe versão, nº de endpoints e servidores para as páginas. */
export default function apiMetaPlugin(context: LoadContext): Plugin<ApiMeta[]> {
  return {
    name: 'api-meta',
    async loadContent() {
      return apis.map((api) => {
        const file = path.join(context.siteDir, localSpecPath(api));
        const spec = yaml.load(fs.readFileSync(file, 'utf8')) as any;
        const endpoints = Object.values(spec.paths ?? {}).reduce<number>(
          (n, item: any) => n + METHODS.filter((m) => m in item).length,
          0,
        );
        return {
          id: api.id,
          title: spec.info?.title ?? api.name,
          version: spec.info?.version ?? '',
          endpoints,
          servers: (spec.servers ?? []).map((s: any) => s.url),
          exemploPath:
            Object.entries(spec.paths ?? {}).find(([, item]: any) => 'get' in item)?.[0] ?? '/',
        };
      });
    },
    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },
  };
}
