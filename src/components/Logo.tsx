import type {ReactNode} from 'react';

/** Marca do hub: janela de terminal com o prompt ">_" e sombra lime. As cores seguem o tema. */
export default function Logo({size = 32}: {size?: number}): ReactNode {
  return (
    <svg viewBox="0 0 36 36" width={size} height={size} aria-hidden="true">
      <rect x="7" y="7" width="26" height="26" rx="7" fill="#ade022" />
      <rect className="logo-face" x="3" y="3" width="26" height="26" rx="7" strokeWidth="2.6" />
      <path className="logo-r" d="M9.5 11.5l5 4.5-5 4.5" fill="none" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 21.5h6.5" stroke="#23c3e6" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}
