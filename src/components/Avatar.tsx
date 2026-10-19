import {useState, type ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

/** Foto local com dimensões reservadas e fallback para as iniciais. */
export default function Avatar({size = 96}: {size?: number}): ReactNode {
  const [falhou, setFalhou] = useState(false);
  const src = useBaseUrl('/img/avatar.webp');
  return (
    <div className="avatar">
      {falhou ? (
        <span aria-hidden="true">RN</span>
      ) : (
        <img
          src={src}
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
