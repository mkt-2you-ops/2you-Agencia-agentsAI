# 2YOU Agency AI Control Tower

Interface visual para observar uma agência de agentes em operação.

## O que esta interface resolve

Este diretório entrega uma **camada de visualização operacional** para o repositório.
O projeto original é forte em **catálogo de agentes** e **instruções de uso**, mas não expõe uma visão clara de:

- quais agentes estão ativos
- qual tarefa cada agente está executando
- onde a fila está travando
- quando um output entra em QA
- quando o sistema entra em retry, bloqueio ou conclusão

A Control Tower cobre exatamente isso.

## O que ela é

- um dashboard visual estático
- uma simulação de runtime multiagente
- um modelo de fila com backlog, execução, revisão e concluído
- uma referência de UX para futura integração com backend real

## O que ela não é

- não é o runtime de autonomia
- não executa LLMs reais
- não persiste memória compartilhada
- não despacha tarefas para provedores externos
- não substitui scheduler, queue, evaluator, memory e policy engine

## Como abrir

Abra `index.html` no navegador.

## Estrutura

- `index.html` — layout principal do painel
- `styles.css` — visual premium/dark da control tower
- `app.js` — estado inicial, renderização e simulação de operação

## Próxima evolução obrigatória

Para transformar a interface em autonomia real, ligue este frontend a um backend com:

1. **Scheduler**
   - cron jobs
   - event listeners
   - triggers por mudança de estado

2. **Queue / Task Graph**
   - tarefas com dependências
   - retries
   - prioridades
   - dead-letter queue

3. **Agent Runtime**
   - roteamento por capacidade
   - seleção de ferramenta
   - limite de concorrência
   - budget e guardrails

4. **Evaluator Layer**
   - nota de qualidade
   - critérios de aprovação
   - retry automático
   - escalonamento humano quando necessário

5. **Shared Memory**
   - contexto por cliente
   - histórico de campanhas
   - preferências, restrições e aprendizados

6. **Observability**
   - logs por tarefa
   - custo por agente
   - throughput
   - latência
   - taxa de bloqueio

## Contrato sugerido para integração futura

### Snapshot do sistema

```json
{
  "meta": {
    "mode": "Autonomous",
    "autopilot": true,
    "qaStrictness": "Alta",
    "maxConcurrent": 6,
    "retryLimit": 3,
    "memoryMode": "Hybrid memory"
  },
  "agents": [],
  "tasks": [],
  "events": []
}
```

### Evento em tempo real

```json
{
  "type": "task.review.failed",
  "taskId": "T-203",
  "agentId": "mkt-01",
  "timestamp": "2026-04-15T03:12:00Z",
  "payload": {
    "reason": "promessa ampla demais",
    "retryCount": 1,
    "nextAction": "ajustar hook e reenviar"
  }
}
```

## Recomendação prática

Não tente plugar autonomia completa antes de validar a espinha dorsal:

- primeiro: fila + estados + painel
- depois: evaluator + retries
- só então: gatilhos proativos + memory + execução autônoma multiagente

Fazer ao contrário é o tipo de decisão que produz um demo bonito e uma operação quebrada.