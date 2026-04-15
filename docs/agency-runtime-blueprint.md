# Agency Runtime Blueprint

## Diagnóstico direto

O repositório atual é uma **prompt library operacionalizada por instaladores**.
Ele contém agentes bem definidos, integrações e um orquestrador em nível de instrução, mas ainda não contém um **runtime agentic** capaz de:

- detectar sinais do ambiente
- gerar tarefas sozinho
- manter estado persistente
- coordenar retries de forma confiável
- aprovar ou bloquear saídas
- expor telemetria em tempo real

Sem isso, não existe agência autônoma. Existe coleção de agentes.

## Objetivo da V1

Criar uma V1 funcional que permita:

1. receber eventos e tarefas
2. decidir qual agente executa cada passo
3. registrar estado da execução
4. validar saída com evaluator
5. mostrar tudo em uma interface visual

## Arquitetura mínima

### 1. Ingestion Layer
Responsável por transformar sinais em eventos.

Exemplos:
- novo lead
- novo briefing
- campanha abaixo da meta
- reply de cliente
- deadline próximo
- tarefa bloqueada

Saída:
- evento padronizado
- prioridade
- contexto inicial

### 2. Scheduler + Trigger Engine
Responsável por decidir **quando agir sem comando humano**.

Funções:
- executar rotinas recorrentes
- escutar eventos externos
- criar tarefas derivadas
- aplicar regras de prioridade
- respeitar janelas, limites e budgets

### 3. Task Graph / Queue Engine
Responsável por quebrar trabalho em unidades rastreáveis.

Cada tarefa precisa ter:
- `id`
- `goal`
- `ownerAgent`
- `status`
- `priority`
- `dependencies`
- `retryCount`
- `approvalRequirement`
- `contextRefs`

Estados mínimos:
- backlog
- queued
- running
- review
- blocked
- done
- dead_letter

### 4. Agent Runtime
Camada que seleciona o agente certo e executa a ação.

Responsabilidades:
- roteamento por tipo de tarefa
- seleção de ferramentas
- montagem do contexto
- execução de prompt/pipeline
- registro de output
- fallback quando um agente falha

### 5. Evaluator Layer
Camada separada da execução.

Regra central:
**quem executa não se autoaprova**.

Funções:
- verificar qualidade
- validar aderência ao briefing
- checar restrições e políticas
- devolver feedback estruturado
- liberar avanço ou pedir retry

### 6. Shared Memory
Memória é o que impede o sistema de repetir burrice em escala.

Blocos:
- memória por cliente
- memória por projeto
- memória por campanha
- memória por agente
- memória de incidentes e learnings

### 7. Observability Layer
Sem observabilidade, você não opera. Você torce.

Métricas mínimas:
- tarefas criadas por período
- taxa de conclusão
- taxa de retry
- tempo médio por etapa
- custo por agente
- custo por fluxo
- taxa de bloqueio
- taxa de intervenção humana
- score médio de QA

### 8. Human Escalation Layer
Nem tudo deve ser autônomo.

Casos que exigem humano:
- risco reputacional
- promessa comercial sensível
- orçamento alto
- publicação externa irreversível
- conflito entre regras
- 3 retries falhos

## Fluxo operacional sugerido

1. Evento entra
2. Trigger engine classifica
3. Orchestrator cria task graph
4. Task vai para fila
5. Runtime despacha agente
6. Saída vai para evaluator
7. Se aprovado, avança
8. Se falhar, abre retry
9. Se exceder regra, escala para humano
10. Interface visual reflete tudo em tempo real

## Contrato de dados sugerido

### Task

```json
{
  "id": "T-301",
  "goal": "Gerar hooks para anúncio de aquisição",
  "ownerAgent": "marketing-content-creator",
  "status": "running",
  "priority": "high",
  "dependencies": ["T-300"],
  "retryCount": 1,
  "approvalRequirement": "evaluator_pass",
  "contextRefs": ["client:2you-digital", "campaign:broker-acquisition-q2"]
}
```

### Agent state

```json
{
  "id": "mkt-01",
  "name": "Content Creator",
  "status": "review",
  "currentTaskId": "T-301",
  "confidence": 83,
  "lastAction": "submitted_for_review",
  "nextAction": "apply_feedback_and_retry"
}
```

### Evaluation result

```json
{
  "taskId": "T-301",
  "status": "fail",
  "score": 71,
  "reasons": [
    "hook genérico",
    "hipótese mal definida",
    "CTA sem critério de qualificação"
  ],
  "nextAction": "retry",
  "retryCount": 2
}
```

## Roadmap recomendado

### Fase 1
- painel visual
- modelo de estados
- mock runtime
- task board
- event feed

### Fase 2
- backend simples com API
- persistência de tarefas
- websocket para updates ao vivo
- evaluator básico

### Fase 3
- triggers reais
- memória compartilhada
- roteamento por agente
- retries automáticos
- guardrails e approval policies

### Fase 4
- custo por fluxo
- telemetry avançada
- learning loops
- otimização automática de dispatch

## Recomendação de stack

### Frontend
- React + Next.js ou Vite
- Tailwind ou design system próprio
- WebSocket/SSE para feed em tempo real

### Backend
- Node.js ou Python FastAPI
- Redis para fila e estado efêmero
- Postgres para persistência
- BullMQ / Celery / Temporal para orquestração

### Observability
- OpenTelemetry
- PostHog / Grafana / Prometheus
- logs estruturados por `taskId`, `agentId` e `workflowId`

## Decisão mais inteligente agora

Não tente plugar 147 agentes em produção de uma vez.

Comece com um recorte operacional pequeno:
- orchestrator
- project shepherd
- content creator
- paid social strategist
- reality checker

Isso já basta para provar:
- dispatch
- fila
- retry
- QA
- visualização
- supervisão humana

## Critério de sucesso da V1

A V1 funciona quando você consegue responder, em segundos:

- quem está fazendo o quê
- o que está travado
- por que voltou em retry
- o que está pronto
- onde o humano precisa entrar
- quanto custou
- qual fluxo gera mais resultado

Sem isso, não existe agência autônoma. Existe caos com interface bonita.