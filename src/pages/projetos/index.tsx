import {useState, type ReactNode} from 'react';
import Layout from '@theme/Layout';
import {ProjetoCard, useTodosProjetos} from '@site/src/components/hub';
import {TIPOS, type TipoProjeto} from '@site/src/data/hub';

type Filtro = 'todos' | TipoProjeto;
const FILTROS: Filtro[] = ['todos', 'design', 'api'];

export default function Projetos(): ReactNode {
  const todos = useTodosProjetos();
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const q = busca.trim().toLowerCase();
  const lista = todos.filter(
    (p) =>
      (filtro === 'todos' || p.tipo === filtro) &&
      (!q || `${p.nome} ${p.descricao} ${p.repo} ${p.tags.join(' ')}`.toLowerCase().includes(q)),
  );
  const conta = (f: Filtro) => todos.filter((p) => f === 'todos' || p.tipo === f).length;
  const semApis = filtro === 'api' && !q && lista.length === 0;

  return (
    <Layout title="Projetos" description="Todos os projetos do hub: system designs, APIs, Docker e fluxos.">
      <main className="wrap cat">
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          <div className="eyebrow">// Hub</div>
          <h1>Projetos</h1>
          <p className="lead" style={{margin: '6px 0 0'}}>
            Um card por repositório. Por enquanto, um estudo de caso de system design; APIs, Docker e
            fluxos entram aqui conforme forem publicados.
          </p>
        </div>
        <div className="toolbar">
          <label htmlFor="busca" className="sr-only">Filtrar projetos</label>
          <input
            id="busca"
            type="search"
            placeholder="Filtrar por nome, tag ou repositório"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <div className="seg" role="group" aria-label="Tipo de projeto">
            {FILTROS.map((f) => (
              <button key={f} type="button" aria-pressed={filtro === f} onClick={() => setFiltro(f)}>
                {f === 'todos' ? 'Todos' : TIPOS[f].plural} <span className="seg-n">{conta(f)}</span>
              </button>
            ))}
          </div>
        </div>
        {lista.length > 0 ? (
          <div className="cards" style={{marginTop: 0}}>
            {lista.map((p) => <ProjetoCard key={p.id} p={p} />)}
          </div>
        ) : (
          <div className="empty">
            <strong>{semApis ? 'Nenhuma API publicada ainda.' : 'Nenhum projeto encontrado.'}</strong>
            <span>
              {semApis
                ? 'Quando um repositório tiver um openapi.yaml, ele aparece aqui com a referência estilo Swagger.'
                : 'Limpe o filtro para ver todos.'}
            </span>
          </div>
        )}
      </main>
    </Layout>
  );
}
