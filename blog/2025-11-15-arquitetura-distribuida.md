---
title: Arquitetura Distribuída
description: Entenda o que é arquitetura distribuída, como os serviços se comunicam e quais são suas vantagens e desafios.
authors: roberto
tags: [arquitetura-distribuida, system-design]
slug: arquitetura-distribuida
image: /img/blog/arquitetura-distribuida/capa.png
---

![Imagem de abertura do artigo sobre arquitetura distribuída.](/img/blog/arquitetura-distribuida/capa.png)

Fala pessoaaaaal, tudo certo?

É inegável dizer que a forma como construímos software mudou com a chegada da computação em nuvem. Dessa forma, é impossível negar que Arquitetura Distribuída não pode deixar de ser estudada e considerada no mercado hoje em dia. Mas aí vocês podem perguntar:

O que é Arquitetura Distribuída? Para que serve? Por que usar isso?

Então a ideia é trazer toda essa informação para vocês.

<!-- truncate -->

## O que é Arquitetura Distribuída?

A Arquitetura Distribuída nada mais é do que um sistema de software sendo implementado em vários nós computacionais interconectados.

De forma simples, Arquitetura Distribuída é quando um sistema não vive em um único lugar, mas sim em vários componentes distribuídos que trabalham juntos para entregar uma aplicação completa.

Pensa assim:

Em vez de um megaservidor que faz tudo, você tem vários serviços menores, cada um responsável por uma parte do problema.

Esses serviços podem estar em:

- Máquinas diferentes
- Regiões diferentes
- Provedores de nuvem diferentes
- Linguagens diferentes
- Modelos de comunicação diferentes

![Diagrama de arquitetura distribuída: usuário, internet, balanceadores de carga e serviços interconectados.](/img/blog/arquitetura-distribuida/diagrama.png)

“Um exemplo simples disso é quando temos um balanceador de carga distribuindo requisições entre vários serviços independentes, como mostrei na imagem acima.”
E mesmo assim, precisam funcionar de forma coesa, confiável e rápida.

## Como funcionam as Arquiteturas Distribuídas?

A arquitetura funciona por meio de uma rede de serviços conectados, cada um com suas funções e responsabilidades relacionadas ao funcionamento do sistema.

“Tá, entendi que eles devem se comunicar… mas como isso acontece?”

Isso é “simples”: eles se comunicam através de protocolos de comunicação amplamente consolidados no mercado — como REST e gRPC — quando precisamos de interações diretas entre serviços, geralmente de forma síncrona.
Mas a comunicação não acontece apenas assim: muitos sistemas distribuídos também utilizam filas e plataformas de mensageria (como RabbitMQ, Kafka, SQS, entre outros) para permitir troca de informações de maneira assíncrona.


Dessa forma, os serviços podem enviar, receber ou reagir a eventos, seja em chamadas diretas ou por meio de mensagens enfileiradas, mantendo o fluxo da aplicação funcional, resiliente e performático.

Um forte aliado da arquitetura distribuída são os balanceadores de carga, que garantem o desempenho ideal e evitam sobrecarga, distribuindo as requisições entre diferentes nós da mesma aplicação. Mas isso é um assunto para entrarmos mais a fundo em outro momento.

## Tolerância a Falhas

Quando a gente fala de Arquitetura Distribuída, um ponto super importante é a tal da tolerância a falhas. Como o sistema é formado por vários serviços espalhados, a gente precisa assumir que alguma parte vai falhar em algum momento. E tudo bem!
A ideia é justamente que, mesmo quando um nó cai ou um serviço venha a travar, o sistema como um todo continue funcionando.

Isso acontece porque temos várias instâncias trabalhando juntas. Se uma falha, outra assume. Se uma região da nuvem fica indisponível, outra pode assumir o fluxo. Essa elasticidade faz com que o sistema se mantenha de pé, mesmo quando o inesperado acontece. Afinal, em sistemas distribuídos, falhar é normal — o problema é não estar preparado para isso.

## Desafios da Arquitetura Distribuída

Beleza, Arquitetura Distribuída tem várias vantagens, mas não é só festa. Também existem alguns desafios que aparecem justamente porque o sistema está espalhado em vários lugares.

Um deles é a latência. Como tudo passa pela rede, às vezes uma simples conversa entre serviços pode demorar mais do que gostaríamos. Outro ponto é a consistência dos dados — quando temos informações distribuídas, nem sempre tudo fica sincronizado no mesmo segundo, e isso pode gerar comportamentos inesperados se não for bem planejado.

Além disso, monitorar tudo também é mais complexo. Não dá pra ficar olhando servidor por servidor. É aí que entram logs centralizados, métricas e tracing para entender o que está acontecendo no meio de tantas partes. E claro, tem a parte de gerenciamento e orquestração, porque manter tudo funcionando em harmonia exige boas ferramentas e processos. Ou seja: é poderoso, mas vem com responsabilidades.

## Arquitetura Distribuída vs Arquitetura Centralizada

Em contrapartida da Arquitetura Distribuída, temos a mais conhecida Arquitetura Centralizada, que depende de um único e poderoso servidor central para lidar com todas as tarefas de processamento, armazenamento e gerenciamento. Parando para pensar, muitas pessoas podem chegar à conclusão de que ter as aplicações centralizadas em um único lugar pode ser a melhor opção pela facilidade, mas distribuí-las resolve muitas limitações existentes na centralizada.

Um dos pontos é a facilidade de escalabilidade, já que podemos adicionar novos nós da aplicação sem ficar limitados aos recursos de uma única máquina. Além disso, há melhor desempenho sob altas cargas, pois o tráfego pode ser distribuído entre diferentes nós, e maior flexibilidade pela possibilidade de modificação e desacoplamento de forma mais independente, entre outros motivos.

## Conclusão

No fim das contas, Arquitetura Distribuída é uma forma moderna, flexível e poderosa de construir sistemas. Ela permite que aplicações cresçam, suportem altas cargas, fiquem mais disponíveis e evoluam de forma independente.

Mas claro, isso também traz seus desafios: lidar com falhas, manter os dados consistentes, gerenciar comunicação entre serviços e ter boas ferramentas para observar tudo o que está rolando.

De qualquer forma, esse tipo de arquitetura já está no nosso dia a dia — e entender seus conceitos é essencial para quem trabalha com software hoje em dia.

## Referências

- [Distributed Architecture — vFunction](https://vfunction.com/blog/distributed-architecture/#toc-heading-7)
- [Arquitetura distribuída — Atlassian](https://www.atlassian.com/br/microservices/microservices-architecture/distributed-architecture)
