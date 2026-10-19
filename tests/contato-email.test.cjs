const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const {JSDOM} = require('jsdom');

const source = fs.readFileSync('src/components/ContatoEmail.tsx', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.ReactJSX,
  },
}).outputText;
const loaded = {exports: {}};
new Function('require', 'module', 'exports', compiled)(require, loaded, loaded.exports);
const ContatoEmail = loaded.exports.default;
const props = {
  contato: {usuario: 'portfolio', dominio: 'example.com'},
  linkedin: 'https://linkedin.com/in/example',
};

test('SSR não expõe endereço nem mailto; LinkedIn permanece acessível sem JavaScript', () => {
  const html = renderToStaticMarkup(React.createElement(ContatoEmail, props));
  assert.ok(!html.includes('portfolio@example.com'));
  assert.ok(!html.includes('mailto:'));
  assert.ok(html.includes('Mostrar e-mail'));
  assert.ok(html.includes(props.linkedin));
});

test('revela após clique, move foco para mailto, copia e oferece alternativa se clipboard falhar', async () => {
  const dom = new JSDOM('<div id="root"></div>', {url: 'https://rneto.dev.br'});
  global.window = dom.window;
  global.document = dom.window.document;
  Object.defineProperty(global, 'navigator', {value: dom.window.navigator, configurable: true});
  global.IS_REACT_ACT_ENVIRONMENT = true;
  const {createRoot} = require('react-dom/client');
  const container = document.getElementById('root');
  const root = createRoot(container);
  let copied;
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: async (text) => {
        copied = text;
      },
    },
    configurable: true,
  });
  try {
    await React.act(async () => root.render(React.createElement(ContatoEmail, props)));
    assert.equal(container.querySelector('a[href^="mailto:"]'), null);
    await React.act(async () => container.querySelector('button').click());
    const link = container.querySelector('a[href^="mailto:"]');
    assert.equal(link.href, 'mailto:portfolio@example.com');
    assert.equal(document.activeElement, link);
    assert.ok(container.textContent.includes('portfolio@example.com'));
    await React.act(async () => container.querySelector('.copy-mail').click());
    assert.equal(copied, 'portfolio@example.com');
    assert.equal(container.querySelector('[role="status"]').textContent, 'E-mail copiado.');
    navigator.clipboard.writeText = async () => {
      throw new Error('blocked');
    };
    await React.act(async () => container.querySelector('.copy-mail').click());
    assert.match(container.querySelector('[role="status"]').textContent, /copie manualmente/);
    assert.ok(container.textContent.includes('portfolio@example.com'));
  } finally {
    await React.act(async () => root.unmount());
    dom.window.close();
    delete global.window;
    delete global.document;
    delete global.navigator;
    delete global.IS_REACT_ACT_ENVIRONMENT;
  }
});
