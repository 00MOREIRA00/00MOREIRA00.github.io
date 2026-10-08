import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {
  Dots, EstudoCard, LogList, ProjetoCard, useTodosProjetos, useTotalEndpoints,
} from '@site/src/components/hub';
import {ESTUDOS, GH_USER, NEWSFEED, NEWSFEED_COMMITS, NEWSFEED_URL} from '@site/src/data/hub';

const pad = (k: string, w: number) => k + ' '.repeat(Math.max(1, w - k.length));

export default function Home(): ReactNode {
  const todos = useTodosProjetos();
  const conta = (...tipos: string[]) => todos.filter((p) => tipos.includes(p.tipo)).length;
  const porTipo = (tipo: string) => todos.filter((p) => p.tipo === tipo).map((p) => p.id);
  const lista = (ids: string[]) =>
    ids.length ? ids.map((id, i) => (
      <span key={id}>{i > 0 && ', '}<span className="c-str">"{id}"</span></span>
    )) : null;

  return (
    <Layout title="Início" description="Hub de projetos e estudos do Roberto Neto: system design, APIs e automação.">
      <main>
        <section className="hhero">
          <div className="hero-scan" aria-hidden="true" />
          <div className="wrap hero-grid">
            <div className="hero-text">
              <div className="prompt">
                &gt; hub.init( )<span className="caret" aria-hidden="true" />
              </div>
              <h1>
                Projetos e estudos,
                <br />
                <span className="t-cyan">documentados</span>
                <br />
                <span className="t-lime">de verdade</span>.
              </h1>
              <p className="lead">
                O hub dos meus projetos. Começa por um estudo de caso de system design: o newsfeed do
                Instagram, dos requisitos ao deep dive.
              </p>
              <div className="hrow">
                <Link className="btn btn-primary" to={NEWSFEED.href}>Abrir o case →</Link>
                <a className="btn btn-secondary" href={NEWSFEED_URL}>Ver no GitHub ↗</a>
              </div>
            </div>
            <div className="term" aria-label="Resumo do que há no hub">
              <div className="term-bar"><Dots /><span className="name">hub.config.ts</span></div>
              <pre>
                <span className="c-dim">// o que tem no hub hoje</span>
                {'\n'}<span className="c-key">const</span> hub = {'{'}
                {'\n'}  <span className="c-prop">{pad('design', 8)}</span>: [{lista(porTipo('design'))}],
                {'\n'}  <span className="c-prop">{pad('apis', 8)}</span>: [{lista(porTipo('api'))}],
                {porTipo('api').length === 0 && <>{'   '}<span className="c-dim">// em breve</span></>}
                {'\n'}  <span className="c-prop">{pad('estudo', 8)}</span>: <span className="c-str">"System Design"</span>,
                {'\n'}  <span className="c-prop">{pad('fonte', 8)}</span>: <span className="c-str">"github.com/{GH_USER}"</span>,
                {'\n'}{'};'}
              </pre>
            </div>
          </div>
        </section>

        <section className="wrap">
          <div className="strip">
            <div className="stat"><div className="stat-num t-cyan">{conta('api')}</div><div className="stat-label">APIs publicadas</div></div>
            <div className="stat"><div className="stat-num t-lime">{useTotalEndpoints()}</div><div className="stat-label">endpoints documentados</div></div>
            <div className="stat"><div className="stat-num t-cyan">{conta('design')}</div><div className="stat-label">system designs</div></div>
            <div className="stat"><div className="stat-num t-lime">{conta('docker', 'fluxo')}</div><div className="stat-label">ambientes Docker e fluxos</div></div>
          </div>
        </section>

        <section className="wrap sec">
          <div className="sec-head">
            <div><div className="eyebrow">// Em destaque</div><h2>Estudo de caso</h2></div>
            <Link to="/projetos">todos os projetos →</Link>
          </div>
          <div className="cards" style={{gridTemplateColumns: 'minmax(0,1fr)'}}>
            <ProjetoCard p={NEWSFEED} destaque />
          </div>
        </section>

        <section className="process">
          <div className="wrap sec">
            <div className="sec-head">
              <div><div className="eyebrow cyan">// Agora</div><h2 className="sec-title">O que estou estudando</h2></div>
              <Link to="/sobre">sobre mim →</Link>
            </div>
            <div className="now-grid">
              {ESTUDOS.map((e) => <EstudoCard key={e.tema} e={e} />)}
              <div className="block" style={{gap: 10}}>
                <div className="step-tag">Histórico do repositório</div>
                <LogList itens={NEWSFEED_COMMITS} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
