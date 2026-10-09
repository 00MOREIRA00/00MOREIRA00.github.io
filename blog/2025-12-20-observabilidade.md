---
title: Observabilidade
description: Entenda os pilares da observabilidade — logs, métricas e traces — e como usá-los para identificar falhas e gargalos, com exemplos em Python.
authors: roberto
tags: [observabilidade, python, desenvolvimento-software]
slug: observabilidade
image: /img/blog/observabilidade/capa.png
---

![Imagem de abertura do artigo sobre observabilidade.](/img/blog/observabilidade/capa.png)

Fala pessoaaaaal, tudo certo?

Essa semana eu estava ajudando um amigo que está iniciando seus estudos e seus primeiros desenvolvimentos, e ele estava com dificuldade para identificar problemas na aplicação que estava construindo. Durante a conversa, acabamos chegando em um assunto muito importante — **observabilidade** — e, com isso, surgiram algumas perguntas bem comuns:

> O que é observabilidade?
>
> Para que ela serve?
>
> Por que usar?
>
> Como usar?

A ideia é justamente responder essas perguntas de forma simples e direta.

<!-- truncate -->

## O que é Observabilidade?

A observabilidade nada mais é do que a **capacidade de entender como um sistema está se comportando e seu desempenho, a partir dos dados que ele gera**.

Ou seja, não basta o sistema estar rodando. Precisamos conseguir **enxergar o que está acontecendo dentro dele**, de forma fácil e rápida, para entender comportamentos, identificar problemas e tomar decisões mais assertivas.

Com observabilidade, conseguimos ter um “norte” do que está acontecendo e, principalmente, **onde devemos atuar** — seja para corrigir uma falha, melhorar desempenho ou até prevenir problemas futuros.

## Os três pilares da Observabilidade

Para que a observabilidade realmente funcione como um aliado, precisamos entender seus três pilares. Cada um deles responde a um tipo diferente de pergunta sobre o sistema, e **nenhum deles, sozinho, é suficiente para explicar o todo**.

Esses pilares são: **Logs, Métricas e Traces**.

- Logs nada mais são do que **registros de eventos importantes que acontecem ao longo do fluxo do sistema**. Eles funcionam como uma espécie de “histórico” do que aconteceu durante uma execução. Com logs, conseguimos saber, por exemplo, quando um processo: começou, terminou, falhou e/ou tomou alguma decisão importante.

Exemplo simples em Python:

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("app")

logger.info("Consulta realizada com sucesso")
```

Aqui estamos registrando um evento relevante dentro do fluxo da aplicação. Em um sistema real, esses logs costumam ser bem mais ricos e contextualizados.

- **Métricas:** As métricas, por outro lado, são **valores numéricos coletados ao longo do tempo**, geralmente durante a execução do sistema. Diferente dos logs, métricas **não contam uma história detalhada**, mas mostram **tendências e o estado de saúde** da aplicação. Elas são fundamentais para entender comportamento ao longo do tempo. Com métricas, conseguimos informações como: tempo médio de resposta, quantidade de requisições, consumo de recursos, taxa de erro, etc.

Exemplo simples:

A forma correta de aplicar métricas não é diretamente dentro da função, como no exemplo abaixo. Porém, para fins didáticos, optei por fazer dessa maneira para facilitar o entendimento.

```python
import time

total_requisicoes = 0
tempo_total = 0

def processar_requisicao():
    global total_requisicoes, tempo_total

    inicio = time.time()
    time.sleep(0.2)  # simula processamento
    fim = time.time()

    total_requisicoes += 1
    tempo_total += (fim - inicio)

    latencia_media = tempo_total / total_requisicoes
    print(f"Latência média: {latencia_media:.3f}s")

processar_requisicao()
```

Esse tipo de informação ajuda bastante na **análise de performance** e também na tomada de decisões, como quando escalar um serviço.

- **Traces:** Já os traces permitem algo diferente: **acompanhar o caminho completo de uma requisição ao longo do sistema**. Com tracing, conseguimos visualizar como uma chamada passou por diferentes serviços, funções ou componentes, entendendo como eles se relacionam entre si. Isso é extremamente útil em arquiteturas distribuídas.

Exemplo simples:

```python
def service_a(trace_id):
    print(f"{trace_id} - entrou no service A")
    service_b(trace_id)

def service_b(trace_id):
    print(f"{trace_id} - entrou no service B")

service_a("trace-123")
```

Nesse caso, o trace_id nos permite acompanhar toda a jornada da requisição, ajudando a identificar **onde realmente ocorreu uma falha ou gargalo**.

## Ferramentas de Observabilidade

Até aqui falamos bastante do conceito, mas na prática a observabilidade só acontece quando temos **ferramentas capazes de coletar, armazenar e correlacionar logs, métricas e traces**.

Hoje o mercado oferece diversas soluções para observabilidade, tanto *open source* quanto **comerciais (ferramentas pagas oferecidas por empresas)**. No entanto, o mais importante não é a ferramenta em si, mas o que ela permite fazer.

De forma geral, uma boa ferramenta de observabilidade deve permitir:

- Centralizar logs de diferentes serviços
- Coletar métricas de performance e uso
- Visualizar traces completos de uma requisição
- Correlacionar essas informações entre si

Existem stacks que focam mais em logs, outras em métricas, outras em tracing — e também soluções que tentam unificar tudo em um único lugar. Muitas vezes, as ferramentas se complementam, e a escolha depende muito do contexto, do tamanho do sistema e da maturidade do time.

O ponto principal é entender que observabilidade não é sobre instalar uma ferramenta, mas sobre compreender o que acontece no sistema por meio de uma instrumentação adequada. A ferramenta apenas consome e apresenta esses dados de forma mais amigável.

## Benefícios da Observabilidade

O principal benefício da observabilidade é a **facilidade para entender o que está acontecendo dentro do sistema**. Em vez de trabalhar no escuro, passamos a ter dados que mostram o comportamento real da aplicação.

Ela também reduz o tempo para identificar e resolver problemas, já que logs, métricas e traces ajudam a apontar rapidamente onde algo saiu do esperado. Isso diminui o impacto de incidentes e evita longas investigações.

Além disso, a observabilidade contribui para a **melhoria contínua do desempenho**, permitindo identificar gargalos e pontos de lentidão com base em dados, e não em suposições.

No fim, ter observabilidade traz mais segurança para evoluir o sistema e mais confiança nas decisões técnicas do dia a dia.

## Prática

Pra fixar os conceitos, resolvi partir para a parte que todo programador gosta, a parte prática.

Criei um pequeno projeto em Python com um fluxo simples de execução, no qual todo o processo faz uso de **logs**, **métricas** e **traces**. O objetivo é obter visibilidade completa sobre o comportamento, os resultados e a performance da aplicação durante sua execução.

Qual o resultado disso?

Ao final, temos um relatório detalhado com todas as informações coletadas ao longo do processo. Com esses dados em mãos, é possível analisar o comportamento da aplicação, identificar gargalos e chegar às conclusões necessárias de forma mais assertiva.

O projeto está disponível aqui:

🔗 [https://github.com/00MOREIRA00/python-observability-intro](https://github.com/00MOREIRA00/python-observability-intro)

## Conclusão

No fim das contas, observabilidade é sobre **entender o que está acontecendo dentro do sistema**, e não apenas reagir quando algo dá errado.

Com a utilização dos pilares, conseguimos enxergar o comportamento da aplicação, identificar falhas, gargalos de performance e tomar decisões mais assertivas, seja em ambientes simples ou mais complexos.

Muita gente confunde observabilidade com monitoramento, e apesar de estarem relacionados, eles não são a mesma coisa. O monitoramento geralmente nos avisa que algo está fora do esperado. A observabilidade vai além e nos ajuda a entender **o porquê** disso estar acontecendo — mas esse é um assunto que merece um post próprio, e vamos falar sobre isso em breve.

Se você está começando agora ou já trabalha com software há algum tempo, entender observabilidade não é mais um diferencial — é praticamente uma necessidade.

## Referências

- [https://newrelic.com/pt/blog/observability/what-is-observability](https://newrelic.com/pt/blog/observability/what-is-observability)
- [https://www.redhat.com/pt-br/topics/devops/what-is-observability](https://www.redhat.com/pt-br/topics/devops/what-is-observability)
