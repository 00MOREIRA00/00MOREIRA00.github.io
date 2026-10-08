import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import {EstudoCard, LogList} from '@site/src/components/hub';
import {ESTUDOS, GH_USER, NEWSFEED_COMMITS} from '@site/src/data/hub';

export default function Sobre(): ReactNode {
  return (
    <Layout title="Sobre" description="Quem é o Roberto Neto e o que ele está estudando agora.">
      <main className="wrap cat about">
        <div className="about-top">
          <div className="avatar" aria-hidden="true">RN</div>
          <div className="about-id">
            <div className="eyebrow">// Sobre</div>
            <h1>Oi, eu sou o Roberto.</h1>
            <p className="about-role">
              <a href={`https://github.com/${GH_USER}`}>github.com/{GH_USER}</a>
            </p>
          </div>
        </div>
        <div className="block" style={{gap: 18}}>
          <div>
            <div className="eyebrow">// Agora</div>
            <h2 className="sec-title">O que estou estudando</h2>
          </div>
          <div className="now-grid">
            {ESTUDOS.map((e) => <EstudoCard key={e.tema} e={e} />)}
            <div className="block" style={{gap: 10}}>
              <div className="step-tag">Histórico do repositório</div>
              <LogList itens={NEWSFEED_COMMITS} />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
