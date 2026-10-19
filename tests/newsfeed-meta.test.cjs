const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

// Transpila o mesmo módulo usado pelo plugin, sem adicionar um runner ao projeto.
const source = fs.readFileSync('src/plugins/newsfeed-source.ts', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {module: ts.ModuleKind.CommonJS},
}).outputText;
const loaded = {exports: {}};
new Function('module', 'exports', compiled)(loaded, loaded.exports);
const {fetchNewsfeedMeta} = loaded.exports;
const fallback = require('../src/data/newsfeed-fallback.json');
const commit = (date, message) => ({commit: {committer: {date}, message}});
const history = [
  commit('2026-10-18T12:00:00Z', 'Novo material\n\nDetalhes'),
  commit('2026-10-17T10:00:00Z', 'Anterior'),
];
const tree = {
  truncated: false,
  tree: [
    {type: 'blob', path: 'docs/08-novo-topico.md'},
    {type: 'blob', path: 'docs/01-requisitos.md'},
    {type: 'blob', path: 'docs/subpasta/exemplo.mdx'},
    {type: 'tree', path: 'docs/subpasta'},
    {type: 'blob', path: 'glossario.md'},
    {type: 'blob', path: 'database/README.md'},
    {type: 'blob', path: 'diagrams/image.png'},
    {type: 'blob', path: 'README.md'},
  ],
};
const response = (value) => ({ok: true, json: async () => value});
const options = {repo: 'owner/repo', branch: 'main', fallback, warn: () => {}};

test('atualiza commits, data e arquivos; preserva descrições editoriais; token só nos headers', async () => {
  const requests = [];
  const result = await fetchNewsfeedMeta({
    ...options,
    token: 'test-secret',
    fetchImpl: async (url, init) => {
      requests.push({url, init});
      return response(url.includes('/commits?') ? history : tree);
    },
  });
  assert.equal(result.atualizado, '2026-10-18');
  assert.deepEqual(result.commits, [
    ['2026-10-17', 'Anterior'],
    ['2026-10-18', 'Novo material'],
  ]);
  assert.deepEqual(
    result.arquivos.map(([path]) => path),
    [
      'docs/01-requisitos.md',
      'docs/08-novo-topico.md',
      'docs/subpasta/exemplo.mdx',
      'database/README.md',
      'glossario.md',
    ],
  );
  assert.equal(result.arquivos[0][1], fallback.arquivos[0][1]);
  assert.equal(result.arquivos[1][1], 'novo topico');
  assert.ok(
    requests.every(({init}) => init.headers.Authorization === 'Bearer test-secret' && init.signal),
  );
  assert.ok(!JSON.stringify(result).includes('test-secret'));
});

test('indisponibilidade total usa snapshot e não revela erros ou credenciais nos logs', async () => {
  const warnings = [];
  const result = await fetchNewsfeedMeta({
    ...options,
    warn: (message) => warnings.push(message),
    fetchImpl: async () => {
      throw new Error('test-secret');
    },
  });
  assert.deepEqual(result, fallback);
  assert.equal(warnings.length, 2);
  assert.ok(!warnings.join().includes('test-secret'));
});

test('rate limit no histórico mantém lista de arquivos atualizada', async () => {
  const result = await fetchNewsfeedMeta({
    ...options,
    fetchImpl: async (url) =>
      url.includes('/commits?') ? {ok: false, status: 403} : response(tree),
  });
  assert.deepEqual(result.commits, fallback.commits);
  assert.equal(result.atualizado, fallback.atualizado);
  assert.ok(result.arquivos.some(([path]) => path === 'docs/08-novo-topico.md'));
});

test('árvore truncada não publica lista incompleta; commits continuam atualizados', async () => {
  const result = await fetchNewsfeedMeta({
    ...options,
    fetchImpl: async (url) =>
      response(url.includes('/commits?') ? history : {...tree, truncated: true}),
  });
  assert.deepEqual(result.arquivos, fallback.arquivos);
  assert.equal(result.atualizado, '2026-10-18');
});

test('respostas inválidas, JSON quebrado, timeout e HTTP 500 usam fallback', async () => {
  for (const fetchImpl of [
    async () => response(null),
    async () => response([{commit: {committer: {date: 'invalid'}, message: 'test'}}]),
    async () => ({
      ok: true,
      json: async () => {
        throw new SyntaxError('JSON');
      },
    }),
    async () => {
      throw new DOMException('Timeout', 'TimeoutError');
    },
    async () => ({ok: false, status: 500}),
  ])
    assert.deepEqual(await fetchNewsfeedMeta({...options, fetchImpl}), fallback);
});

test('sem token funciona em repositórios públicos; histórico limitado a seis commits', async () => {
  const result = await fetchNewsfeedMeta({
    ...options,
    fetchImpl: async (url, init) => {
      assert.equal(init.headers.Authorization, undefined);
      return response(
        url.includes('/commits?') ? Array(8).fill(history[0]) : {truncated: false, tree: []},
      );
    },
  });
  assert.equal(result.commits.length, 6);
  assert.deepEqual(result.arquivos, []);
});
