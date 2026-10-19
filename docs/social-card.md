# Card padrão de compartilhamento

Arquivo publicado: `static/img/social-card.jpg`, JPEG 1200 × 630, definido em
`themeConfig.image` no `docusaurus.config.ts`. Posts com `image:` próprio mantêm suas capas.

Criado com a ferramenta integrada **imagegen**. A imagem gerada foi normalizada para
1200 × 630 e exportada como JPEG otimizado (qualidade 90). Não há dependência de geração
por IA durante o build ou carregamento do site.

## Prompt utilizado

```text
Create a polished social sharing card for Roberto Neto's personal developer blog and portfolio. Final intended aspect ratio exactly 1200:630 landscape. Clean flat graphic design, typography-focused, no photographs, no people, no mockup, no borders outside image. Dark background #0d0f13 with extremely subtle fine square grid, accents cyan #23c3e6 and lime #ade022. Generous safe padding at least 70px. Large bold condensed italic sans-serif white text 'Roberto Neto' near upper left. Under it large two-line Portuguese headline, exact text: 'Projetos e estudos,' on first line in cyan and 'documentados de verdade.' on second line in lime. Bottom left small monospaced text exact 'BLOG + PORTFÓLIO'. Bottom right exact 'rneto.dev.br' in white. Upper right a small simple terminal symbol >_ using cyan and lime. Sharp readable typography, high contrast, restrained engineering aesthetic, strong left alignment, exact text without extra words or signatures. Keep all text within center 1060x490 safe area so image can be resized to 1200x630 without cutting text.
```

## Validação

Conferir no HTML gerado que `og:image` e `twitter:image` apontam para o JPEG nas páginas
sem capa própria, enquanto os posts preservam `capa-social.jpg`. Os serviços externos
podem manter cache; seus depuradores permitem solicitar uma nova leitura após trocar o card.
