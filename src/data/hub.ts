/**
 * Conteúdo do hub: projetos, estudos e perfil.
 *
 * Tudo aqui foi tirado dos repositórios reais. Para adicionar um projeto,
 * acrescente um item em PROJETOS e crie a página dele em src/pages/projetos/.
 */

export const GH_USER = '00MOREIRA00';

export type TipoProjeto = 'design' | 'api' | 'docker' | 'fluxo';
export const TIPOS: Record<TipoProjeto, {label: string; plural: string}> = {
  design: {label: 'System Design', plural: 'System Designs'},
  api: {label: 'API', plural: 'APIs'},
  docker: {label: 'Docker', plural: 'Docker'},
  fluxo: {label: 'Fluxo', plural: 'Fluxos'},
};

export type Projeto = {
  id: string;
  tipo: TipoProjeto;
  nome: string;
  descricao: string;
  /** "usuario/repo" no GitHub */
  repo: string;
  /** de onde veio o estudo (curso, livro...) */
  fonte?: string;
  atualizado: string; // AAAA-MM-DD
  tags: string[];
  /** rota da página do projeto */
  href: string;
};

/* ------------------------------------------------------------------ */
/* Case: Newsfeed estilo Instagram                                     */
/* github.com/00MOREIRA00/packt-system-design-masterclass-instagram-newsfeed */
/* ------------------------------------------------------------------ */
const NEWSFEED_REPO = `${GH_USER}/packt-system-design-masterclass-instagram-newsfeed`;
export const NEWSFEED_URL = `https://github.com/${NEWSFEED_REPO}`;
export const newsfeedFile = (path: string) => `${NEWSFEED_URL}/blob/main/${path}`;

export const NEWSFEED: Projeto = {
  id: 'instagram-newsfeed',
  tipo: 'design',
  nome: 'Newsfeed estilo Instagram',
  descricao:
    'Estudo de caso completo de system design: requisitos, estimativa de capacidade, design de API, arquitetura de alto nível e deep dive de um feed de rede social.',
  repo: NEWSFEED_REPO,
  fonte: 'System Design Masterclass (Packt)',
  atualizado: '2026-10-02',
  tags: ['system-design', 'fan-out', 'nosql', 'graphdb', 'cdn', 'cache'],
  href: '/projetos/instagram-newsfeed',
};

export const PROJETOS: Projeto[] = [NEWSFEED];

export const NEWSFEED_ARQUIVOS: [string, string][] = [
  ['docs/01-requisitos.md', 'Requisitos funcionais e não funcionais'],
  ['docs/02-capacity-estimation.md', 'Estimativa de capacidade'],
  ['docs/03-api-design.md', 'Design das APIs REST'],
  ['docs/04-high-level-design.md', 'Arquitetura de alto nível e fluxos'],
  ['docs/05-deep-dive.md', 'Bancos, pre-signed URLs e mídia'],
  ['docs/06-simulacao-entrevista.md', 'Simulação de entrevista'],
  ['docs/07-quiz.md', 'Quiz de revisão'],
  ['glossario.md', 'Glossário bilíngue EN → PT-BR'],
  ['database/README.md', 'Comparativo dos bancos + JSON Schemas'],
  ['newsfeed.drawio', 'Rascunho editável dos fluxos (draw.io)'],
];

export const NEWSFEED_COMMITS: [string, string][] = [
  ['2026-09-15', 'Início do repositório'],
  ['2026-09-17', 'Documentação de requisitos'],
  ['2026-09-21', 'Documentação de capacidade'],
  ['2026-09-23', 'Mais estimativas'],
  ['2026-09-25', 'Documentação de diagramas'],
  ['2026-10-02', 'Material do case'],
];

export const REQ_FUNCIONAIS: [string, string][] = [
  ['Criar posts', 'Texto, imagem ou vídeo.'],
  ['Seguir e deixar de seguir', 'Relação entre usuários.'],
  ['Newsfeed', 'Posts de quem você segue, em ordem cronológica reversa.'],
  ['Curtir e comentar', 'Nos posts de outras pessoas.'],
  ['Notificações', 'Avisar o dono do post quando alguém curte ou comenta.'],
];

export const REQ_NAO_FUNCIONAIS: [string, string | null, string][] = [
  ['Disponibilidade', '99,999%', 'no ar praticamente o tempo todo'],
  ['Consistência', 'eventual', '~2 s para um post propagar é aceitável'],
  ['Latência', '1–2 s', 'para carregar o feed'],
  ['Escala', '500M DAU', '2 bilhões de usuários ativos por mês'],
  ['Extensibilidade', null, 'fácil adicionar respostas a comentários ou recomendação'],
  ['Usabilidade', null, 'mídia renderiza rápido, sem texto sozinho na tela'],
];

export const CAPACIDADE: [string, string, 'cyan' | 'lime'][] = [
  ['500M', 'usuários ativos por dia', 'cyan'],
  ['2B', 'usuários ativos por mês', 'lime'],
  ['50M', 'posts criados por dia', 'cyan'],
  ['50B', 'leituras de feed por dia', 'lime'],
  ['216 TB', 'armazenamento por dia', 'cyan'],
  ['~790 PB', 'armazenamento em 10 anos', 'lime'],
  ['~2 TB', 'cache por dia (1%)', 'cyan'],
  ['2,5 GB/s', 'ingress (entrada)', 'lime'],
  ['2,5 TB/s', 'egress (saída)', 'cyan'],
];

/** tipo, % dos posts, tamanho médio, TB por dia */
export const ARMAZENAMENTO: [string, string, string, number][] = [
  ['Texto', '20%', '100 KB', 1],
  ['Imagem', '60%', '0,5 MB', 15],
  ['Vídeo', '20%', '20 MB', 200],
];

export type Endpoint = {
  metodo: 'get' | 'post' | 'put' | 'delete';
  path: string;
  titulo: string;
  nota?: string;
  body?: Record<string, unknown>;
};
export const ENDPOINTS: Endpoint[] = [
  {metodo: 'post', path: '/v1/posts', titulo: 'Criar post de texto',
    body: {userId: 'u_123', text: 'Animado para minha viagem à Europa', hashtags: ['#travel', '#fun']}},
  {metodo: 'post', path: '/v1/posts', titulo: 'Criar post de imagem ou vídeo',
    nota: 'O arquivo vai antes para o object storage via pre-signed URL; aqui só a URL.',
    body: {userId: 'u_123', description: 'Animado para minha viagem à Europa', hashtags: ['#travel', '#fun'], mediaUrl: 'https://s3.amazonaws.com/bucket/media/abc123.mp4'}},
  {metodo: 'post', path: '/v1/comments', titulo: 'Comentar em um post',
    body: {userId: 'u_123', postId: 'p_456', comment: 'linda, ótima foto'}},
  {metodo: 'post', path: '/v1/likes', titulo: 'Curtir um post', body: {userId: 'u_123', postId: 'p_456'}},
  {metodo: 'post', path: '/v1/follow', titulo: 'Seguir um usuário', body: {followerId: 'u_123', followeeId: 'u_789'}},
  {metodo: 'get', path: '/v1/feed/{userId}', titulo: 'Ler o newsfeed', nota: 'Sem body: GET só busca dados.'},
];

/** Componentes da arquitetura, por coluna: [id, nome, detalhe] */
export const COLUNAS: [string, [string, string, string][]][] = [
  ['Cliente', [['client', 'Cliente', 'app / navegador']]],
  ['Borda', [['gw', 'API Gateway', 'porta de entrada'], ['lb', 'Load Balancer', 'distribui a carga']]],
  ['Serviços', [
    ['follow', 'Follow Service', ''], ['writer', 'Post Writer', ''], ['presign', 'Pre-signed URL Gen.', ''],
    ['generator', 'News Feed Generator', 'fan-out'], ['reader', 'NewsFeedReader', ''],
    ['comment', 'Comment Service', ''], ['like', 'Like Service', ''], ['notif', 'Notification', 'terceiro'],
  ]],
  ['Fila', [['queue', 'Message Queue', 'eventos postId · userId']]],
  ['Dados', [
    ['followdb', 'FollowDB', 'GraphDB'], ['postsdb', 'PostsDB', 'NoSQL'], ['feedsdb', 'FeedsDB', 'NoSQL'],
    ['feedscache', 'Feeds cache', ''], ['commentsdb', 'CommentsDB', 'NoSQL'], ['likesdb', 'LikesDB', 'NoSQL'],
    ['likescache', 'Likes cache', 'postId → contagem'], ['objstore', 'Object storage', 'S3'], ['cdn', 'CDN', 'serve a mídia'],
  ]],
];

export type Fluxo = {id: string; titulo: string; resumo: string; passos: [string, string[]][]};
export const FLUXOS: Fluxo[] = [
  {id: 'post', titulo: 'Criar post (fan-out)', resumo: 'O post é salvo e, em segundo plano, distribuído para o feed pronto de cada seguidor.', passos: [
    ['POST /v1/posts chega ao API Gateway.', ['client', 'gw']],
    ['O gateway encaminha, via load balancer, ao Post Writer.', ['gw', 'lb', 'writer']],
    ['O Post Writer salva o post no PostsDB.', ['writer', 'postsdb']],
    ['O cliente recebe a confirmação.', ['client', 'writer']],
    ['O Post Writer publica o evento {postId, userId} na fila.', ['writer', 'queue']],
    ['O News Feed Generator consome o evento.', ['queue', 'generator']],
    ['Busca o post completo no PostsDB.', ['generator', 'postsdb']],
    ['Busca todos os seguidores no FollowDB.', ['generator', 'followdb']],
    ['Grava o post no feed de cada seguidor no FeedsDB.', ['generator', 'feedsdb']],
    ['Atualiza o Feeds cache para leitura rápida.', ['generator', 'feedscache']],
  ]},
  {id: 'midia', titulo: 'Post de imagem/vídeo', resumo: 'A mídia nunca passa pelo servidor: vai direto ao object storage com uma URL pré-assinada.', passos: [
    ['O cliente pede uma pre-signed URL ao API Gateway.', ['client', 'gw']],
    ['O gateway encaminha ao Pre-signed URL Generator, que devolve a URL.', ['gw', 'lb', 'presign']],
    ['O cliente faz upload direto no object storage.', ['client', 'objstore']],
    ['O object storage devolve a URL do arquivo.', ['objstore', 'client']],
    ['O cliente envia POST /v1/posts com a mediaUrl.', ['client', 'gw']],
    ['O gateway encaminha ao Post Writer.', ['gw', 'lb', 'writer']],
    ['O Post Writer salva o post no PostsDB.', ['writer', 'postsdb']],
    ['O cliente recebe a confirmação.', ['client', 'writer']],
    ['Evento na fila; o News Feed Generator consome.', ['writer', 'queue', 'generator']],
    ['O generator busca o post no PostsDB.', ['generator', 'postsdb']],
    ['Busca os seguidores no FollowDB.', ['generator', 'followdb']],
    ['Grava no feed de cada seguidor (FeedsDB).', ['generator', 'feedsdb']],
    ['Atualiza o Feeds cache.', ['generator', 'feedscache']],
  ]},
  {id: 'feed', titulo: 'Ler o feed (otimizado)', resumo: 'O feed já está pronto no cache; a mídia vem da CDN. Por isso o texto às vezes aparece antes da imagem.', passos: [
    ['GET /v1/feed/{userId} chega ao API Gateway.', ['client', 'gw']],
    ['O gateway encaminha ao NewsFeedReader.', ['gw', 'lb', 'reader']],
    ['O NewsFeedReader lê o feed pronto no Feeds cache.', ['reader', 'feedscache']],
    ['3B · Busca a contagem de curtidas no Likes cache.', ['reader', 'likescache']],
    ['Devolve o feed com as URLs de mídia.', ['reader', 'client']],
    ['O cliente busca imagens e vídeos na CDN (ou no object storage, se faltar).', ['client', 'cdn', 'objstore']],
  ]},
  {id: 'feed0', titulo: 'Ler o feed (versão inicial)', resumo: 'A versão ingênua: junta e ordena tudo a cada leitura. Funciona, mas é lenta demais para 50 bilhões de leituras por dia.', passos: [
    ['O cliente pede o feed ao NewsFeedReader.', ['client', 'gw', 'lb', 'reader']],
    ['Busca no FollowDB quem o usuário segue.', ['reader', 'followdb']],
    ['Lê os posts dessas contas no PostsDB.', ['reader', 'postsdb']],
    ['Ordena tudo em ordem cronológica reversa e devolve.', ['reader', 'client']],
  ]},
  {id: 'follow', titulo: 'Seguir usuário', resumo: 'A relação seguidor → seguido vira uma aresta no banco de grafo.', passos: [
    ['POST /v1/follow chega ao API Gateway.', ['client', 'gw']],
    ['O gateway encaminha ao Follow Service.', ['gw', 'lb', 'follow']],
    ['O Follow Service grava a relação no FollowDB.', ['follow', 'followdb']],
    ['O cliente recebe a confirmação.', ['client', 'follow']],
  ]},
  {id: 'comment', titulo: 'Comentar', resumo: 'Grava o comentário e avisa o dono do post de forma assíncrona.', passos: [
    ['POST /v1/comments chega ao API Gateway.', ['client', 'gw']],
    ['O gateway encaminha ao Comment Service.', ['gw', 'lb', 'comment']],
    ['O Comment Service salva no CommentsDB.', ['comment', 'commentsdb']],
    ['O cliente recebe a confirmação.', ['client', 'comment']],
    ['Evento {userId, postId} na fila.', ['comment', 'queue']],
    ['O Notification Service (terceiro) consome e avisa o dono do post.', ['queue', 'notif']],
  ]},
  {id: 'like', titulo: 'Curtir', resumo: 'Igual ao comentário, mais um cache com a contagem de curtidas por post.', passos: [
    ['POST /v1/likes chega ao API Gateway.', ['client', 'gw']],
    ['O gateway encaminha ao Like Service.', ['gw', 'lb', 'like']],
    ['O Like Service salva no LikesDB.', ['like', 'likesdb']],
    ['Atualiza o Likes cache (postId → contagem).', ['like', 'likescache']],
    ['Evento {userId, postId} na fila.', ['like', 'queue']],
    ['O Notification Service avisa o dono do post.', ['queue', 'notif']],
  ]},
];

export type Banco = {nome: string; tipo: 'NoSQL' | 'GraphDB'; indice: string; escala: string; porque: string; campos: string[]};
export const BANCOS: Banco[] = [
  {nome: 'PostsDB', tipo: 'NoSQL', indice: 'postId', escala: '50M/dia', porque: 'Post de texto, imagem ou vídeo não tem estrutura fixa; consulta simples por id.', campos: ['postId', 'userId', 'text', 'mediaUrls[]', 'timestamp']},
  {nome: 'FeedsDB', tipo: 'NoSQL', indice: 'userId', escala: '50M/dia', porque: 'Mapeia usuário → feed pronto; leitura direta pelo userId.', campos: ['userId', 'feedItems[]']},
  {nome: 'CommentsDB', tipo: 'NoSQL', indice: 'postId', escala: '1,5B/dia', porque: 'Volume altíssimo e schema que pode evoluir (respostas a comentários).', campos: ['commentId', 'userId', 'postId', 'comment', 'timestamp']},
  {nome: 'LikesDB', tipo: 'NoSQL', indice: 'postId', escala: '1,5B/dia', porque: 'Mesmo volume; reações podem ganhar tipos novos.', campos: ['likeId', 'userId', 'postId', 'timestamp']},
  {nome: 'FollowDB', tipo: 'GraphDB', indice: 'userId', escala: 'milhões de conexões', porque: 'O dado central é a relação: usuários são nós, "segue" é aresta.', campos: ['userId', 'followers[]', 'followees[]']},
];

export type Questao = {pergunta: string; opcoes: string[]; certa: number; porque: string};
export const QUIZ: Questao[] = [
  {pergunta: 'Por que a estimativa de capacidade é importante antes de escolher um banco de dados para sistemas de rede social?', opcoes: ['Remove a necessidade de backups', 'Ajuda a escolher as cores da interface do usuário', 'Torna as features mais fáceis de codificar', 'Garante que o sistema aguente o volume de consultas e de dados necessário'], certa: 3, porque: 'A escala (50 milhões/dia, 1,5 bilhão/dia) foi um dos critérios decisivos para escolher NoSQL vs. GraphDB, e é a estimativa de capacidade que revela esses números.'},
  {pergunta: 'Qual é o uso principal de uma presigned URL no contexto de upload de mídia para o object storage?', opcoes: ['Conceder acesso ilimitado ao armazenamento', 'Permitir que o cliente faça upload de arquivos de mídia diretamente no object storage', 'Enviar notificações', 'Autenticar o login do usuário'], certa: 1, porque: 'Ela dá ao cliente permissão temporária para enviar o arquivo direto ao object storage, sem passar pelo servidor.'},
  {pergunta: 'Por que é importante estimar o número de read requests no planejamento de um sistema de rede social?', opcoes: ['Para garantir que o sistema aguente cargas de tráfego altas de forma eficiente', 'Para decidir algoritmos de encriptação', 'Para definir políticas de senha do usuário', 'Para determinar o formato de armazenamento dos posts'], certa: 0, porque: 'Os 50 bilhões de leituras/dia justificaram o fan-out na escrita e o feeds cache.'},
  {pergunta: 'Quando um usuário comenta em um post, qual serviço tipicamente lida com a notificação ao dono do post?', opcoes: ['Post Writer Service', 'API Gateway', 'Notification service', 'Comment database'], certa: 2, porque: 'O comment service salva e publica um evento na fila; o notification service (terceiro) consome e notifica o dono.'},
  {pergunta: 'Qual das opções abaixo NÃO é tipicamente estimada durante o capacity planning de sistemas de rede social?', opcoes: ['Usuários ativos diários (DAU)', 'Throughput', 'Usuários ativos mensais (MAU)', 'Esquema de cores dos elementos de UI'], certa: 3, porque: 'DAU/MAU e throughput são pilares da estimativa, junto de storage, cache e rede.'},
];

export const ENTREVISTA: string[] = [
  'Como você definiria a diferença entre requisito funcional e não funcional num newsfeed?',
  'Classifique os requisitos da Priya: upload de mídia, 99,999% de disponibilidade, 500M DAU e busca por nome.',
  'Como 500M DAU com latência abaixo de 2 s influenciam o armazenamento e a leitura dos dados?',
  'Encriptação em repouso e em trânsito: como categorizar e por que incluir na especificação?',
];

/* ------------------------------------------------------------------ */
/* Estudos e perfil                                                    */
/* ------------------------------------------------------------------ */
export type Estudo = {tema: string; status: 'estudando' | 'praticando' | 'concluido'; fonte: string; desde: string; nota: string; projeto?: Projeto};
export const ESTUDOS: Estudo[] = [
  {tema: 'System Design', status: 'estudando', fonte: 'System Design Masterclass (Packt)', desde: '2026-09', nota: 'Primeiro case documentado de ponta a ponta: o newsfeed do Instagram.', projeto: NEWSFEED},
];

/* ------------------------------------------------------------------ */
/* Utilidades de data                                                  */
/* ------------------------------------------------------------------ */
const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
export const fmtMes = (s: string) => { const [y, m] = s.split('-'); return `${MESES[Number(m) - 1]}/${y}`; };
export const fmtDia = (s: string) => { const [, m, d] = s.split('-'); return `${d}/${m}`; };
export const fmtData = (s: string) => { const [y, m, d] = s.split('-'); return `${Number(d)} ${MESES[Number(m) - 1]} ${y}`; };
