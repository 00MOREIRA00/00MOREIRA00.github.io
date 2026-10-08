// Ajustes nas páginas geradas pelo docusaurus-plugin-openapi-docs:
// traduz o rótulo fixo "Introduction" da página de informações de cada API e
// fixa a URL dela em /docs/api/<id>, que é para onde os cards do hub apontam.
import {readdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../docs/api/', import.meta.url));
for (const dir of await readdir(root)) {
  for (const file of await readdir(path.join(root, dir))) {
    if (!file.endsWith('.info.mdx')) continue;
    const p = path.join(root, dir, file);
    const src = await readFile(p, 'utf8');
    await writeFile(
      p,
      src
        .replace(/^sidebar_label: Introduction$/m, 'sidebar_label: Visão geral')
        .replace(/^(id: .*)$/m, `$1\nslug: /api/${dir}`)
        .replace(/children=\{"Version: /g, 'children={"Versão: '),
    );
  }
}
