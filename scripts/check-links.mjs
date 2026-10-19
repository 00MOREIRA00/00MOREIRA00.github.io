import {readFile, readdir} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {parse} from 'parse5';

/** Extrai links e imagens do HTML real, incluindo entidades e URLs repetidas. */
export function externalUrls(html, origin) {
  const urls = new Set();
  function visit(node) {
    for (const attribute of node.attrs ?? []) {
      if (!(
        (node.tagName === 'a' && attribute.name === 'href') ||
        (node.tagName === 'img' && attribute.name === 'src')
      ))
        continue;
      try {
        const url = new URL(attribute.value, origin);
        if (!['http:', 'https:'].includes(url.protocol) || url.origin === origin) continue;
        url.hash = '';
        urls.add(url.href);
      } catch {
        /* URLs inválidas são verificadas pelo build do Docusaurus. */
      }
    }
    for (const child of node.childNodes ?? []) visit(child);
  }
  visit(parse(html));
  return urls;
}

export async function probeUrl(url, {timeoutMs = 10000, fetchImpl = fetch} = {}) {
  try {
    const request = (method) =>
      fetchImpl(url, {
        method,
        redirect: 'follow',
        signal: AbortSignal.timeout(timeoutMs),
        headers: {'User-Agent': 'Portfolio-Link-Check/1.0'},
      });
    let response = await request('HEAD');
    if ([405, 501].includes(response.status)) {
      response = await request('GET');
      await response.body?.cancel();
    }
    return {ok: response.ok, status: String(response.status)};
  } catch (error) {
    return {ok: false, status: error.name === 'TimeoutError' ? 'timeout' : 'erro de rede'};
  }
}

async function htmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(file)));
    else if (file.endsWith('.html')) files.push(file);
  }
  return files;
}

async function main() {
  const config = JSON.parse(await readFile('.linkcheckrc.json', 'utf8'));
  const ignore = config.ignore.map(({pattern, reason}) => ({pattern: new RegExp(pattern), reason}));
  const files = await htmlFiles('build').catch(() => {
    throw new Error('Execute npm run build antes de npm run check:links.');
  });
  if (!files.length) throw new Error('Nenhuma página HTML encontrada em build/.');
  // Obtém o domínio canônico do próprio build, sem manter outra cópia do config.
  const index = parse(await readFile('build/index.html', 'utf8'));
  let origin;
  function canonical(node) {
    const attrs = Object.fromEntries((node.attrs ?? []).map(({name, value}) => [name, value]));
    if (node.tagName === 'link' && attrs.rel === 'canonical') origin = new URL(attrs.href).origin;
    for (const child of node.childNodes ?? []) canonical(child);
  }
  canonical(index);
  if (!origin) throw new Error('URL canônica ausente no build.');
  const links = new Map();
  for (const file of files) {
    for (const url of externalUrls(await readFile(file, 'utf8'), origin)) {
      if (!links.has(url)) links.set(url, file);
    }
  }
  const queue = [];
  for (const [url, file] of links) {
    const skipped = ignore.find(({pattern}) => pattern.test(url));
    if (skipped) console.log(`IGNORADO ${url} — ${skipped.reason}`);
    else queue.push({url, file});
  }
  let failures = 0;
  let next = 0;
  await Promise.all(
    Array.from({length: config.concurrency}, async () => {
      while (next < queue.length) {
        const {url, file} = queue[next++];
        const result = await probeUrl(url, config);
        if (!result.ok) {
          failures++;
          console.error(`AVISO ${result.status} ${url} (${file})`);
        }
      }
    }),
  );
  console.log(
    `${queue.length} URLs externas verificadas; ${failures} falhas; ${links.size - queue.length} ignoradas.`,
  );
  if (failures) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
