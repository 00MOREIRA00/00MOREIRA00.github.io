# Adicionar um estudo

Os estudos aparecem em "O que estou estudando", na home e no `/sobre`. Cada um é um item da lista
`ESTUDOS`, em `src/data/hub.ts`.

```ts
export const ESTUDOS: Estudo[] = [
  {
    tema: 'Kubernetes',
    status: 'estudando',              // 'estudando' | 'praticando' | 'concluido'
    fonte: 'Curso Y (plataforma Z)',
    desde: '2026-10',                 // AAAA-MM (só ano e mês)
    nota: 'Uma frase sobre onde você está nesse estudo.',
    projeto: MEU_PROJETO,             // opcional: mostra o link "→ ver o case"
  },
  {tema: 'System Design', /* ... */},
];
```

- `tema` precisa ser único, porque é usado como chave da lista.
- `projeto` recebe a constante do projeto (ex.: `NEWSFEED`), não o id em texto. Cadastre o projeto
  antes; veja [adicionar-projeto.md](adicionar-projeto.md).
- Para mudar o status, só troque o campo `status`. A cor do card muda junto.

O texto `estudo: "System Design"` no terminal da home (`src/pages/index.tsx`) é fixo. Atualize à
mão se quiser.
