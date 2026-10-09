import type {ReactNode} from 'react';
import {Redirect} from '@docusaurus/router';

/** O blog tem um autor só, então a lista de autores (/blog/authors) leva para o Sobre. */
export default function BlogAuthorsListPage(): ReactNode {
  return <Redirect to="/sobre" />;
}
