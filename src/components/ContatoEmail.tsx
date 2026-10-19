import {useEffect, useRef, useState, type ReactNode} from 'react';

type Props = {
  contato: {usuario: string; dominio: string};
  linkedin: string;
};

/** O endereço só é montado após interação, fora do HTML estático. */
export default function ContatoEmail({contato, linkedin}: Props): ReactNode {
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState('');
  const emailLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (email) emailLink.current?.focus();
  }, [email]);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copiar = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setEstado('E-mail copiado.');
    } catch {
      setEstado('Selecione o endereço e copie manualmente.');
    }
    timer.current = setTimeout(() => setEstado(''), 4000);
  };

  return (
    <>
      <div className="hrow" style={{justifyContent: 'center'}}>
        {email ? (
          <a ref={emailLink} className="btn btn-primary" href={`mailto:${email}`}>
            Mandar e-mail →
          </a>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setEmail(`${contato.usuario}@${contato.dominio}`)}
          >
            Mostrar e-mail
          </button>
        )}
        <a className="btn btn-secondary" href={linkedin}>
          LinkedIn ↗
        </a>
      </div>
      {email && (
        <div className="cta-mail">
          <span className="mono">{email}</span>
          <button type="button" className="copy-mail" onClick={copiar}>
            copiar
          </button>
        </div>
      )}
      <span role="status" aria-live="polite">
        {estado}
      </span>
      <noscript>Para contato sem JavaScript, use o link do LinkedIn acima.</noscript>
    </>
  );
}
