// Gera as páginas de referência das APIs (docusaurus-plugin-openapi-docs).
// Sem APIs no catálogo, não faz nada: o site sobe só com o hub.
import {mkdir, readFile} from 'node:fs/promises';
import {execSync} from 'node:child_process';

const catalog = JSON.parse(
  await readFile(new URL('../src/data/catalogo.json', import.meta.url), 'utf8'),
);

if (!catalog.apis.length) {
  console.log('Nenhuma API no catálogo (src/data/catalogo.json): pulando a geração da referência.');
  process.exit(0);
}

// O plugin exige a pasta docs/ mesmo antes da primeira geração
await mkdir(new URL('../docs/api/', import.meta.url), {recursive: true});

const run = (cmd) => execSync(cmd, {stdio: 'inherit'});
run('npx docusaurus clean-api-docs all');
run('npx docusaurus gen-api-docs all');
run('node scripts/pos-gen.mjs');
