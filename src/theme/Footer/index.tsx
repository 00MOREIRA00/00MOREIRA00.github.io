import type {ReactNode} from 'react';
import {GH_USER} from '@site/src/data/hub';
import Logo from '@site/src/components/Logo';

/** Rodapé próprio do hub (substitui o rodapé padrão do Docusaurus). */
export default function Footer(): ReactNode {
  return (
    <footer className="foot">
      <svg className="foot-wave" height="16" viewBox="0 0 1000 16" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 9 C200 1 400 14 600 7 C780 2 900 11 1000 6" fill="none" stroke="#23c3e6" strokeWidth="3" />
      </svg>
      <div className="foot-mark" aria-hidden="true">
        hub
      </div>
      <div className="wrap foot-in">
        <div>
          <div className="foot-brand"><Logo size={40} />Roberto Neto</div>
          <span>Hub de projetos e estudos</span>
        </div>
        <a href={`https://github.com/${GH_USER}`}>github.com/{GH_USER}</a>
      </div>
    </footer>
  );
}
