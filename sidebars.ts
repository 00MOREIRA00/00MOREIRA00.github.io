import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import {apis} from './src/data/apis';

// Cada API ganha sua própria sidebar, gerada pelo plugin em docs/api/<id>/sidebar.ts
// (rode `npm run gen-api` para gerar/atualizar).
const apiSidebars = Object.fromEntries(
  apis.map((api) => [
    api.id,
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(`./docs/api/${api.id}/sidebar`).default,
  ]),
);

const sidebars: SidebarsConfig = {
  ...apiSidebars,
};

export default sidebars;
