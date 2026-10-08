import {useState, type ReactNode} from 'react';
import {GH_USER} from '@site/src/data/hub';

/**
 * Foto de perfil vinda do GitHub (github.com/<usuario>.png): nenhuma imagem fica no repositório
 * e a foto acompanha a do perfil. Se não carregar, mostra as iniciais.
 */
export default function Avatar({size = 96}: {size?: number}): ReactNode {
  const [falhou, setFalhou] = useState(false);
  return (
    <div className="avatar">
      {falhou ? (
        <span aria-hidden="true">RN</span>
      ) : (
        <img
          src={`https://github.com/${GH_USER}.png?size=${size * 2}`}
          alt="Foto de Roberto Neto"
          width={size}
          height={size}
          loading="eager"
          onError={() => setFalhou(true)}
        />
      )}
    </div>
  );
}
