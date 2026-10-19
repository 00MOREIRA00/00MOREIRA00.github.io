const {test} = require('node:test');
const assert = require('node:assert/strict');

test('extrai somente URLs externas navegáveis e imagens, decodifica entidades e remove duplicatas', async () => {
  const {externalUrls} = await import('../scripts/check-links.mjs');
  const urls = externalUrls(
    `
    <a href="/sobre">interno</a><a href="https://rneto.dev.br/blog">interno</a>
    <a href="mailto:email@example.com">email</a>
    <a href="https://example.com/search?a=1&amp;b=2#fragment">externo</a>
    <a href="https://example.com/search?a=1&amp;b=2">duplicado</a>
    <img src="https://cdn.example.com/image.jpg" />`,
    'https://rneto.dev.br',
  );
  assert.deepEqual(
    [...urls],
    ['https://example.com/search?a=1&b=2', 'https://cdn.example.com/image.jpg'],
  );
});

test('servidor sem HEAD é verificado com GET; descarta corpo e reporta erro real', async () => {
  const {probeUrl} = await import('../scripts/check-links.mjs');
  const methods = [];
  let cancelled = false;
  const result = await probeUrl('https://example.com', {
    fetchImpl: async (_, options) => {
      methods.push(options.method);
      return options.method === 'HEAD'
        ? {status: 405}
        : {
            status: 404,
            ok: false,
            body: {
              cancel: async () => {
                cancelled = true;
              },
            },
          };
    },
  });
  assert.deepEqual(methods, ['HEAD', 'GET']);
  assert.equal(cancelled, true);
  assert.deepEqual(result, {ok: false, status: '404'});
});

test('reporta timeout e aceita sucesso sem baixar o conteúdo', async () => {
  const {probeUrl} = await import('../scripts/check-links.mjs');
  assert.deepEqual(
    await probeUrl('https://example.com', {
      fetchImpl: async () => {
        throw new DOMException('expired', 'TimeoutError');
      },
    }),
    {ok: false, status: 'timeout'},
  );
  assert.deepEqual(
    await probeUrl('https://example.com', {fetchImpl: async () => ({status: 200, ok: true})}),
    {ok: true, status: '200'},
  );
});
