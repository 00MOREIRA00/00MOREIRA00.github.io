// Baixa a spec OpenAPI de cada repositório listado em src/data/catalogo.json
// para a pasta openapi/.   Uso: npm run sync-specs
// Repositório privado? Defina GITHUB_TOKEN no ambiente.
import {mkdir, readFile, writeFile} from 'node:fs/promises';

const catalog = JSON.parse(
  await readFile(new URL('../src/data/catalogo.json', import.meta.url), 'utf8'),
);

await mkdir(new URL('../openapi/', import.meta.url), {recursive: true});
const headers = {Accept: 'application/vnd.github.raw'};
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

let falhas = 0;
for (const api of catalog.apis) {
  const url = `https://api.github.com/repos/${api.repo}/contents/${api.specFile}?ref=${api.branch}`;
  const res = await fetch(url, {headers});
  if (!res.ok) {
    console.error(`✗ ${api.id}: HTTP ${res.status} em ${api.repo}/${api.specFile}`);
    falhas++;
    continue;
  }
  // JSON também é YAML válido, então sempre salvamos como .yaml
  await writeFile(new URL(`../openapi/${api.id}.yaml`, import.meta.url), await res.text());
  console.log(`✓ ${api.id} ← ${api.repo}/${api.specFile}@${api.branch}`);
}
process.exit(falhas ? 1 : 0);
