import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {Dots, LogList, TypeBadge} from '@site/src/components/hub';
import {
  ARMAZENAMENTO, BANCOS, CAPACIDADE, COLUNAS, ENDPOINTS, ENTREVISTA, FLUXOS, NEWSFEED,
  NEWSFEED_ARQUIVOS, NEWSFEED_COMMITS, NEWSFEED_URL, QUIZ, REQ_FUNCIONAIS, REQ_NAO_FUNCIONAIS,
  TIPOS, fmtData, newsfeedFile,
} from '@site/src/data/hub';

const ABAS = [
  ['visao', 'Visão geral'], ['requisitos', 'Requisitos'], ['capacidade', 'Capacidade'], ['api', 'API'],
  ['arquitetura', 'Arquitetura'], ['bancos', 'Bancos'], ['deepdive', 'Deep dive'], ['pratica', 'Prática'],
] as const;
type Aba = (typeof ABAS)[number][0];
const isAba = (s: string): s is Aba => ABAS.some(([id]) => id === s);

const DocLink = ({path, children = 'ler no GitHub'}: {path: string; children?: ReactNode}) => (
  <a className="doclink" href={newsfeedFile(path)}>{children} ↗</a>
);
const metodo = (m: string) => (m === 'delete' ? 'DEL' : m.toUpperCase());

/** JSON com as cores do terminal (chave, string). */
function Json({value}: {value: unknown}): ReactNode {
  const linhas = JSON.stringify(value, null, 2).split('\n');
  return (
    <>
      {linhas.map((l, i) => {
        const m = l.match(/^(\s*)"([^"]+)": (.*)$/);
        const valor = (v: string) =>
          v.startsWith('"') ? <span className="c-str">{v.replace(/,$/, '')}</span> : v.replace(/,$/, '');
        return (
          <span key={i}>
            {m ? (
              <>{m[1]}<span className="c-prop">"{m[2]}"</span>: {valor(m[3])}{m[3].endsWith(',') ? ',' : ''}</>
            ) : /^\s*"/.test(l) ? (
              <>{l.match(/^\s*/)![0]}<span className="c-str">{l.trim().replace(/,$/, '')}</span>{l.trim().endsWith(',') ? ',' : ''}</>
            ) : l}
            {i < linhas.length - 1 ? '\n' : ''}
          </span>
        );
      })}
    </>
  );
}

/* ---------------- Abas ---------------- */

function Visao(): ReactNode {
  return (
    <div className="two">
      <div className="block">
        <h2>Do que se trata</h2>
        <p className="desc">
          Notas de estudo do curso <strong>{NEWSFEED.fonte}</strong>, aplicadas a um case completo: um
          sistema de newsfeed nos moldes do Instagram. O material cobre todo o percurso de uma entrevista
          de system design, além de perguntas de prática e um quiz de revisão.
        </p>
        <h2 style={{marginTop: 8}}>Como estudar com isso</h2>
        <div className="fields">
          <div className="field"><span className="field-name">Leitura sequencial</span><span className="field-desc">Do 01 ao 05, na ordem, para acompanhar o case do zero.</span></div>
          <div className="field"><span className="field-name">Autoteste</span><span className="field-desc">O quiz da aba Prática, com a resposta escondida até você escolher.</span></div>
          <div className="field"><span className="field-name">Prática oral</span><span className="field-desc">Leia só a pergunta da simulação de entrevista, responda em voz alta e depois compare.</span></div>
          <div className="field"><span className="field-name">Consulta rápida</span><span className="field-desc">Glossário bilíngue para termos como throughput, fan-out e pre-signed URL.</span></div>
        </div>
      </div>
      <div className="block">
        <h2>Arquivos do repositório</h2>
        <div className="ov-list">
          {NEWSFEED_ARQUIVOS.map(([path, t]) => (
            <a key={path} href={newsfeedFile(path)}><span className="mono">{path}</span><span className="s">{t}</span></a>
          ))}
        </div>
        <h2 style={{marginTop: 8}}>Linha do tempo</h2>
        <LogList itens={NEWSFEED_COMMITS} />
      </div>
    </div>
  );
}

function Requisitos(): ReactNode {
  return (
    <>
      <div className="two">
        <div className="block">
          <h2>Funcionais <span className="field-type">o que o sistema faz</span></h2>
          <ol className="numlist">
            {REQ_FUNCIONAIS.map(([t, d]) => <li key={t}><strong>{t}</strong><span>{d}</span></li>)}
          </ol>
        </div>
        <div className="block">
          <h2>Não funcionais <span className="field-type">quão bem ele faz</span></h2>
          <div className="fields">
            {REQ_NAO_FUNCIONAIS.map(([t, m, d]) => (
              <div className="field" key={t}>
                <div className="field-head">
                  <span className="field-name" style={{fontFamily: 'var(--body)', fontSize: 15}}>{t}</span>
                  {m && <span className="metric">{m}</span>}
                </div>
                <span className="field-desc">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="tip">
        <strong>Dica de entrevista:</strong> alinhe com o entrevistador o número de usuários e o nível de
        consistência. São suposições, não fatos, e ele quer ver você negociando o escopo.{' '}
        <DocLink path="docs/01-requisitos.md" />
      </div>
    </>
  );
}

function Capacidade(): ReactNode {
  const max = Math.max(...ARMAZENAMENTO.map((a) => a[3]));
  return (
    <>
      <div className="capgrid">
        {CAPACIDADE.map(([n, l, c]) => (
          <div className="stat" key={l}><div className={`stat-num t-${c}`}>{n}</div><div className="stat-label">{l}</div></div>
        ))}
      </div>
      <div className="two">
        <div className="block">
          <h2>Armazenamento por tipo de post <span className="field-type">TB por dia</span></h2>
          <div className="bars">
            {ARMAZENAMENTO.map(([t, pct, tam, tb]) => (
              <div className="barrow" key={t}>
                <span className="bl">{t}<small>{pct} · {tam}</small></span>
                <span className="bt"><span style={{width: `${Math.max(1.2, (tb / max) * 100)}%`}} /></span>
                <span className="bv">{tb} TB</span>
              </div>
            ))}
          </div>
          <p className="desc" style={{fontSize: 14}}>Vídeo é só 20% dos posts, mas responde por 200 dos 216 TB diários.</p>
        </div>
        <div className="block">
          <h2>O gargalo é a leitura</h2>
          <div className="fields">
            <div className="field"><div className="field-head"><span className="field-name">50M</span><span className="field-type">escritas por dia</span></div><span className="field-desc">10% dos 500M DAU postam uma vez.</span></div>
            <div className="field"><div className="field-head"><span className="field-name">50B</span><span className="field-type">leituras por dia</span></div><span className="field-desc">10 aberturas do feed × 10 posts por usuário.</span></div>
            <div className="field"><div className="field-head"><span className="field-name">~1000×</span><span className="field-type">egress / ingress</span></div><span className="field-desc">Cada post é lido muito mais vezes do que escrito. É isso que guia cache, CDN e fan-out na escrita.</span></div>
          </div>
          <DocLink path="docs/02-capacity-estimation.md">ver as contas no GitHub</DocLink>
        </div>
      </div>
    </>
  );
}

function Api(): ReactNode {
  return (
    <>
      <p className="desc">O contrato REST do case. São endpoints de design, não uma API publicada.</p>
      <div className="apilist">
        {ENDPOINTS.map((e) => (
          <article className="apiitem" key={e.titulo}>
            <div className="endpoint"><span className={`m m-${e.metodo}`}>{metodo(e.metodo)}</span><span>{e.path}</span></div>
            <div className="api-txt"><h3>{e.titulo}</h3>{e.nota && <p>{e.nota}</p>}</div>
            {e.body && (
              <div className="term">
                <div className="term-bar"><Dots /><span className="name">body · application/json</span></div>
                <pre className="small"><Json value={e.body} /></pre>
              </div>
            )}
          </article>
        ))}
      </div>
      <DocLink path="docs/03-api-design.md" />
    </>
  );
}

function Arquitetura(): ReactNode {
  const [fluxoId, setFluxoId] = useState(FLUXOS[0].id);
  const [passo, setPasso] = useState(0);
  const f = FLUXOS.find((x) => x.id === fluxoId)!;
  const usados: Record<string, number[]> = {};
  f.passos.forEach(([, comps], i) => comps.forEach((c) => { (usados[c] ??= []).push(i + 1); }));
  const agora = new Set(f.passos[passo][1]);
  return (
    <>
      <div className="flowpick" role="tablist" aria-label="Fluxos">
        {FLUXOS.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={x.id === fluxoId}
            onClick={() => { setFluxoId(x.id); setPasso(0); }}>{x.titulo}</button>
        ))}
      </div>
      <p className="desc" style={{marginTop: 4}}>{f.resumo}</p>
      <div className="archwrap">
        <div className="board" aria-label="Componentes da arquitetura; os destacados participam do fluxo">
          {COLUNAS.map(([col, comps]) => (
            <div className="bcol" key={col}>
              <div className="tier-label">{col}</div>
              {comps.map(([id, nome, sub]) => (
                <div key={id} className={`comp ${usados[id] ? 'on' : ''} ${agora.has(id) ? 'now' : ''}`}>
                  <strong>{nome}</strong>
                  {sub && <span>{sub}</span>}
                  {usados[id] && <em>{usados[id].join(' · ')}</em>}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="stepper">
          <ol>
            {f.passos.map(([t], i) => (
              <li key={i}>
                <button type="button" aria-current={i === passo} onClick={() => setPasso(i)}>
                  <span className="sn">{i + 1}</span><span>{t}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="pager" style={{margin: 0}}>
            <button type="button" disabled={passo === 0} onClick={() => setPasso(passo - 1)}>← passo anterior</button>
            <button type="button" className="next" disabled={passo === f.passos.length - 1} onClick={() => setPasso(passo + 1)}>próximo passo →</button>
          </div>
        </div>
      </div>
      <div className="tip">
        <strong>Trade-off do fan-out na escrita:</strong> a leitura vira só uma busca em cache, mas cada
        post gera uma gravação por seguidor. Para contas com milhões de seguidores, a alternativa é o
        fan-out na leitura. <DocLink path="docs/04-high-level-design.md" />
      </div>
    </>
  );
}

function Bancos(): ReactNode {
  return (
    <>
      <div className="dbgrid">
        {BANCOS.map((d) => (
          <article className="db" key={d.nome}>
            <div className="card-head"><h3>{d.nome}</h3><span className={`tb ${d.tipo === 'GraphDB' ? 'tb-design' : 'tb-api'}`}>{d.tipo}</span></div>
            <p>{d.porque}</p>
            <div className="dbmeta"><span>índice: <b>{d.indice}</b></span><span>escala: <b>{d.escala}</b></span></div>
            <div className="dbfields">{d.campos.map((c) => <code key={c}>{c}</code>)}</div>
            <DocLink path={`database/${d.nome.toLowerCase()}.schema.json`}>JSON Schema</DocLink>
          </article>
        ))}
      </div>
      <div className="tip">
        <strong>Regra usada:</strong> NoSQL quando o acesso precisa ser rápido, a escala é muito grande, os
        dados não têm estrutura fixa ou o schema vai evoluir; SQL quando há consultas complexas e schema
        estável. <DocLink path="database/README.md" />
      </div>
    </>
  );
}

function DeepDive(): ReactNode {
  return (
    <>
      <div className="deep">
        <article className="db">
          <div className="eyebrow cyan">// Upload</div>
          <h3>Pre-signed URLs</h3>
          <p>URLs com uma assinatura que dá ao cliente permissão temporária (por exemplo, 10 minutos) para enviar o arquivo direto ao object storage.</p>
          <div className="fields">
            <div className="field"><span className="field-name">Upload mais rápido</span><span className="field-desc">O arquivo não passa pelos servidores da aplicação.</span></div>
            <div className="field"><span className="field-name">Acesso seguro e temporário</span><span className="field-desc">A URL expira e não pode ser reaproveitada.</span></div>
          </div>
        </article>
        <article className="db">
          <div className="eyebrow">// Mídia</div>
          <h3>Media processing</h3>
          <p>Depois do upload, um serviço converte o original em vários formatos e resoluções e grava de volta no object storage. Cada dispositivo e conexão recebe a versão certa.</p>
          <div className="dbfields"><code>original</code><span className="arrow">→</span><code>480p</code><code>720p</code><code>1080p</code></div>
          <p style={{fontSize: 13}}>Ex.: MP4 no celular, MOV no laptop; 4K com boa conexão, 360p ou 240p com conexão ruim.</p>
        </article>
        <article className="db">
          <div className="eyebrow cyan">// Segurança</div>
          <h3>Encriptação</h3>
          <p>Requisito não funcional discutido na simulação: TLS/HTTPS em trânsito e encriptação em repouso nos cinco bancos e no object storage, de forma mensurável (AES-256, TLS 1.2+).</p>
        </article>
      </div>
      <DocLink path="docs/05-deep-dive.md" />
    </>
  );
}

function Pratica(): ReactNode {
  const [resp, setResp] = useState<Record<number, number>>({});
  const respondidas = Object.keys(resp).length;
  const certas = QUIZ.filter((q, i) => resp[i] === q.certa).length;
  return (
    <>
      <div className="block">
        <h2>Quiz de revisão <span className="field-type">{respondidas ? `${certas}/${QUIZ.length} certas` : `${QUIZ.length} questões`}</span></h2>
        <div className="quiz">
          {QUIZ.map((q, i) => {
            const a = resp[i];
            return (
              <article className="qitem" key={i}>
                <h3><span className="sn">{i + 1}</span>{q.pergunta}</h3>
                <div className="opts">
                  {q.opcoes.map((o, j) => (
                    <button key={j} type="button" disabled={a !== undefined}
                      className={a === undefined ? '' : j === q.certa ? 'right' : j === a ? 'wrong' : ''}
                      onClick={() => setResp({...resp, [i]: j})}>
                      <span className="ol">{'abcd'[j]}</span>{o}
                    </button>
                  ))}
                </div>
                {a !== undefined && <p className="why"><b>{a === q.certa ? 'Certo.' : 'Não foi dessa vez.'}</b> {q.porque}</p>}
              </article>
            );
          })}
        </div>
        {respondidas > 0 && <button type="button" className="reset" onClick={() => setResp({})}>refazer o quiz</button>}
      </div>
      <div className="block">
        <h2>Simulação de entrevista</h2>
        <p className="desc">Leia a pergunta, responda em voz alta e depois compare com a resposta-modelo no repositório.</p>
        <ol className="numlist">{ENTREVISTA.map((q) => <li key={q}><span style={{color: 'var(--fg)'}}>{q}</span></li>)}</ol>
        <DocLink path="docs/06-simulacao-entrevista.md">ver as respostas-modelo</DocLink>
      </div>
    </>
  );
}

const CONTEUDO: Record<Aba, () => ReactNode> = {
  visao: Visao, requisitos: Requisitos, capacidade: Capacidade, api: Api,
  arquitetura: Arquitetura, bancos: Bancos, deepdive: DeepDive, pratica: Pratica,
};

/* ---------------- Página ---------------- */

export default function NewsfeedCase(): ReactNode {
  const [aba, setAba] = useState<Aba>('visao');

  // A aba fica no endereço (#arquitetura, #pratica...) para dar para compartilhar o link.
  useEffect(() => {
    const ler = () => { const h = window.location.hash.slice(1); if (isAba(h)) setAba(h); };
    ler();
    window.addEventListener('hashchange', ler);
    return () => window.removeEventListener('hashchange', ler);
  }, []);
  const ir = (id: Aba) => {
    setAba(id);
    window.history.replaceState(null, '', `#${id}`);
    const t = document.getElementById('abas');
    if (t && t.getBoundingClientRect().top < 0) t.scrollIntoView({block: 'start'});
  };
  const i = ABAS.findIndex(([id]) => id === aba);
  const Conteudo = CONTEUDO[aba];
  const p = NEWSFEED;

  return (
    <main className="wrap cat proj">
      <div className="crumbs">
        <Link to="/projetos">Projetos</Link><span>›</span><span>{TIPOS[p.tipo].plural}</span><span>›</span><span>{p.nome}</span>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        <div className="eyebrow">// {TIPOS[p.tipo].label} · estudo de caso</div>
        <h1>{p.nome}</h1>
        <p className="lead" style={{margin: 0}}>{p.descricao}</p>
        <div className="hrow" style={{gap: 8}}>
          <TypeBadge tipo={p.tipo} />
          {p.tags.map((t) => <span className="chip" key={t}>#{t}</span>)}
        </div>
        <p className="meta-line">
          curso: {p.fonte} · repo: <a href={NEWSFEED_URL}>github.com/{p.repo}</a> · atualizado em {fmtData(p.atualizado)}
        </p>
      </div>
      <nav className="ctabs" id="abas" role="tablist" aria-label="Seções do case">
        {ABAS.map(([id, l], n) => (
          <button key={id} type="button" role="tab" aria-selected={aba === id} onClick={() => ir(id)}>
            <span>{String(n + 1).padStart(2, '0')}</span>{l}
          </button>
        ))}
      </nav>
      <div className="cbody" role="tabpanel"><Conteudo /></div>
      <div className="pager">
        {i > 0 ? <button type="button" onClick={() => ir(ABAS[i - 1][0])}>← {ABAS[i - 1][1]}</button> : <span />}
        {i < ABAS.length - 1 && <button type="button" className="next" onClick={() => ir(ABAS[i + 1][0])}>{ABAS[i + 1][1]} →</button>}
      </div>
    </main>
  );
}
