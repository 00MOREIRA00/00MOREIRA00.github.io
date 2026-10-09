---
title: MCP — Model Context Protocol
description: Entenda como o MCP conecta aplicações de IA a fontes de dados externas e veja um exemplo prático com SQLite e GitHub Copilot.
authors: roberto
tags: [model-context-protocol, inteligencia-artificial, desenvolvimento-software]
slug: mcp-model-context-protocol
image: /img/blog/mcp/capa.png
---

![Model Context Protocol: imagem de abertura do artigo.](/img/blog/mcp/capa.png)

Fala pessoaaaaal, tudo certo?

Algumas semanas atrás, durante o trabalho, surgiu uma discussão sobre um tal de **MCP**. Confesso que o termo me deixou curioso: *“O que é isso, afinal?”*

Pois bem… fui estudar o assunto, entender a fundo e, claro, trazer aqui um post explicando o que descobri!

Nos últimos tempos, muito se fala sobre **IA generativa**, **LLMs** e suas aplicações. Mas à medida que essas tecnologias evoluem, uma dúvida natural surge:

> *Como essas inteligências realmente se comunicam com o mundo externo?*

E é exatamente aí que entra o **MCP — Model Context Protocol**, criado pela **Anthropic**.

<!-- truncate -->

## O que é o MCP?

De forma simples, o MCP é um **protocolo que padroniza como as LLMs (Large Language Models)** se conectam a **fontes de dados externas** — sejam bancos de dados, APIs, arquivos locais ou outros sistemas.

Vamos pensar nele como um **intérprete universal** entre o modelo de IA e o mundo externo. Sem ele, cada integração precisaria ser feita “na mão”, com código customizado.

Em outras palavras, ele é uma **ponte inteligente** entre o modelo de IA e o mundo real.

## Como o MCP funciona?

A **IA** (como ChatGPT, Claude, etc.) se conecta a um **servidor MCP**, que funciona como uma **ponte entre o modelo e o mundo externo**.

A IA traduz as requisições para a linguagem que o servidor MCP entende, esse servidor se comunica com a fonte de dados externa e depois devolve as respostas para o modelo, tudo de forma estruturada.

Toda essa conversa acontece usando o protocolo **JSON-RPC**, que padroniza as mensagens trocadas entre a IA e o servidor MCP.

![Diagrama do fluxo de comunicação entre a aplicação de IA, o servidor MCP e fontes de dados externas.](/img/blog/mcp/fluxo-mcp.png)

## JSON RPC

O **JSON-RPC** é o coração técnico do MCP. É um protocolo leve de chamada remota (Remote Procedure Call) que usa **JSON** como formato de mensagem.

Ele permite que a IA e o servidor MCP “conversem” de forma previsível e padronizada — pedindo informações, executando comandos e recebendo respostas.

Um exemplo prático:

```json
{
  "jsonrpc": "2.0",
  "method": "getUser",
  "params": { "id": 123 },
  "id": 1
}
```

O servidor MCP entende esse formato, executa a ação e responde algo como:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": { "name": "Alice", "age": 30 }
}
```

## Por que o MCP é importante?

Talvez estejam se perguntando o motivo pelo qual o MCP é importante e a resposta é: O MCP vem para padronizar toda essa integração entre as diferentes IAs. Com ele, qualquer modelo compatível pode se conectar a qualquer servidor MCP — sem precisar reinventar a roda a cada integração.

**Principais vantagens do MCP**

Além da padronização, o MCP traz uma série de benefícios práticos:

- **Maior precisão de respostas** → a IA consulta dados reais, não precisa “chutar”.
- **Menos dependência de prompts manuais complexos** → as instruções são estruturadas, não textuais.
- **Integração fluida com ferramentas externas**.
- **Segurança e auditabilidade** → você sabe o que foi acessado e como.
- **Menos dependência de plugins proprietários**.
- **Continuidade nas integrações** → tudo segue o mesmo padrão JSON-RPC.

## Prática

Pra fixar os conceitos, resolvi partir para a parte que todo programador gosta, a parte prática.

Criei um pequeno projeto usando um **banco de dados SQLite** simulando uma loja de games. Subi um **servidor MCP** para esse banco e configurei o **Visual Studio Code** para se conectar a ele.

Qual o resultado disso?

Consegui pedir pro **GitHub Copilot** fazer consultas no banco apenas descrevendo o que eu queria — e tudo isso via MCP!

O projeto está disponível aqui:

🔗 [https://github.com/00MOREIRA00/mcp-labs-sqlite](https://github.com/00MOREIRA00/mcp-labs-sqlite)

## Conclusão

O **Model Context Protocol** é uma das tecnologias mais promissoras no ecossistema de IA hoje. Ele **simplifica, padroniza e profissionaliza** a comunicação entre modelos de linguagem e fontes de dados externas.

Além de reduzir o retrabalho e a complexidade de prompts, o MCP abre portas para integrações muito mais seguras, consistentes e escaláveis.

Se você ainda não testou, recomendo fortemente explorar — vai mudar a forma como você enxerga o uso de IAs conectadas com o mundo real.

Espero que tenham gostado!!

## Referências

- [https://modelcontextprotocol.io/docs/getting-started/intro](https://modelcontextprotocol.io/docs/getting-started/intro)
- [https://triggo.ai/blog/o-que-e-o-mcp-model-context-protocol/](https://triggo.ai/blog/o-que-e-o-mcp-model-context-protocol/)
- [https://lusoai.com/inteligencia-artificial/o-que-e-o-model-context-protocol-mcp-e-por-que-esta-a-transformar-a-integracao-de-ia/](https://lusoai.com/inteligencia-artificial/o-que-e-o-model-context-protocol-mcp-e-por-que-esta-a-transformar-a-integracao-de-ia/)
