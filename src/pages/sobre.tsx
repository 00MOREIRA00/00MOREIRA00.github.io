import {useState, type ReactNode} from 'react';
import Layout from '@theme/Layout';
import {EstudoCard, LogList} from '@site/src/components/hub';
import Avatar from '@site/src/components/Avatar';
import {ESTUDOS, NEWSFEED_COMMITS, PERFIL} from '@site/src/data/hub';


const IconGitHub = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" /></svg>
);
const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5z" /></svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 6.5l8.5 6.5 8.5-6.5" /></svg>
);

function CopiarEmail(): ReactNode {
  const [estado, setEstado] = useState<'copiar' | 'copiado' | 'selecione e copie'>('copiar');
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(PERFIL.email);
      setEstado('copiado');
    } catch {
      setEstado('selecione e copie');
    }
    setTimeout(() => setEstado('copiar'), 1800);
  };
  return (
    <button type="button" className="copy-mail" onClick={copiar}>
      {estado}
    </button>
  );
}

export default function Sobre(): ReactNode {
  return (
    <Layout title="Sobre" description={`${PERFIL.nome}, ${PERFIL.cargo} com ${PERFIL.anosExperiencia} anos de experiência.`}>
      <main className="wrap cat about">
        <div className="about-top">
          <Avatar />
          <div className="about-id">
            <div className="eyebrow">// Sobre</div>
            <h1>Oi, eu sou o Roberto.</h1>
            <p className="about-role">{PERFIL.cargo} · {PERFIL.anosExperiencia} anos de experiência</p>
            <nav className="socials" aria-label="Redes">
              <a href={PERFIL.github} aria-label="GitHub"><IconGitHub /></a>
              <a href={PERFIL.linkedin} aria-label="LinkedIn"><IconLinkedIn /></a>
              <a href={`mailto:${PERFIL.email}`} aria-label="E-mail"><IconMail /></a>
            </nav>
          </div>
        </div>

        <div className="about-intro">
          <div className="about-bio">
            <p>
              Sou desenvolvedor backend pleno, com {PERFIL.anosExperiencia} anos de experiência construindo
              e mantendo sistemas. Aqui reúno meus projetos, estudos e o que venho aprendendo.
            </p>
            <div className="facts">
              <div className="stat"><div className="stat-num t-cyan">{PERFIL.anosExperiencia} anos</div><div className="stat-label">de experiência</div></div>
              <div className="stat"><div className="stat-num t-lime">Backend</div><div className="stat-label">área</div></div>
              <div className="stat"><div className="stat-num t-cyan">Pleno</div><div className="stat-label">nível</div></div>
            </div>
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

        <section className="cta-box" aria-label="Contato">
          <svg className="cta-wave" height="14" viewBox="0 0 900 14" preserveAspectRatio="none" aria-hidden="true"><path d="M0 8 C200 0 400 12 600 6 C750 2 850 9 900 5" fill="none" stroke="#23c3e6" strokeWidth="3" /></svg>
          <div className="eyebrow">// Bora conversar</div>
          <h2>Quer trocar uma ideia?</h2>
          <p>Sobre um projeto, uma oportunidade ou qualquer assunto de tecnologia. Me chama por e-mail ou no LinkedIn.</p>
          <div className="hrow" style={{justifyContent: 'center'}}>
            <a className="btn btn-primary" href={`mailto:${PERFIL.email}`}>Mandar e-mail →</a>
            <a className="btn btn-secondary" href={PERFIL.linkedin}>LinkedIn ↗</a>
          </div>
          <div className="cta-mail"><span className="mono">{PERFIL.email}</span><CopiarEmail /></div>
        </section>
      </main>
    </Layout>
  );
}
