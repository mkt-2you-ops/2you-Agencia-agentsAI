const INITIAL_STATE = {
  meta: {
    agency: "2YOU Agency AI",
    mode: "Autonomous",
    autopilot: true,
    qaStrictness: "Alta",
    maxConcurrent: 6,
    retryLimit: 3,
    memoryMode: "Hybrid memory",
    approvalPolicy: "Human only for critical",
  },
  agents: [
    {
      id: "orch-01",
      name: "Agents Orchestrator",
      division: "Specialized",
      role: "Despacho, priorização e handoff",
      status: "running",
      confidence: 96,
      retries: 0,
      currentTask: "Distribuir backlog entre mídia, conteúdo e produto",
      nextAction: "Aguardar feedback do evaluator e redispatch",
      tools: ["scheduler", "router", "policy-engine"],
    },
    {
      id: "pm-01",
      name: "Project Shepherd",
      division: "Project Management",
      role: "Quebra de escopo e cadência",
      status: "running",
      confidence: 92,
      retries: 0,
      currentTask: "Transformar objetivo comercial em task graph",
      nextAction: "Atualizar dependências e ETA por lote",
      tools: ["task-graph", "handoff", "notifier"],
    },
    {
      id: "mkt-01",
      name: "Content Creator",
      division: "Marketing",
      role: "Conteúdo e ativo criativo",
      status: "review",
      confidence: 84,
      retries: 1,
      currentTask: "Gerar 3 criativos para campanha de aquisição",
      nextAction: "Ajustar hook do criativo com base no evaluator",
      tools: ["brief-parser", "copy-engine", "asset-planner"],
    },
    {
      id: "paid-01",
      name: "Paid Social Strategist",
      division: "Paid Media",
      role: "Lances, segmentação e testes",
      status: "queued",
      confidence: 88,
      retries: 0,
      currentTask: "Planejar estrutura de testes Meta Ads",
      nextAction: "Entrar assim que o brief criativo for aprovado",
      tools: ["audience-map", "budget-allocator", "experiment-engine"],
    },
    {
      id: "prod-01",
      name: "Product Manager",
      division: "Product",
      role: "Descoberta e requisito funcional",
      status: "running",
      confidence: 91,
      retries: 0,
      currentTask: "Definir evento, trigger e regra de autonomia",
      nextAction: "Publicar contrato do runtime para frontend",
      tools: ["spec-writer", "schema-mapper", "roadmapper"],
    },
    {
      id: "qa-01",
      name: "Reality Checker",
      division: "Testing",
      role: "QA, gate e risco operacional",
      status: "running",
      confidence: 95,
      retries: 0,
      currentTask: "Validar saída antes de avançar para mídia paga",
      nextAction: "Aprovar ou devolver com evidência",
      tools: ["evaluator", "qa-gate", "evidence-log"],
    },
  ],
  tasks: [
    {
      id: "T-201",
      title: "Mapear sinais que criam tarefas sem input humano",
      description: "Lead novo, e-mail inbound, baixa performance, deadline estourado, mudança de briefing.",
      owner: "Product Manager",
      priority: "Alta",
      eta: "18m",
      lane: "backlog",
      progress: 12,
    },
    {
      id: "T-202",
      title: "Quebrar campanha em task graph com dependências",
      description: "Estratégia, criativo, tracking, mídia, QA e reporting com ordem explícita.",
      owner: "Project Shepherd",
      priority: "Alta",
      eta: "11m",
      lane: "running",
      progress: 58,
    },
    {
      id: "T-203",
      title: "Gerar 3 hooks de criativo com hipótese por ICP",
      description: "Cada peça precisa ter hipótese, risco e critério de aprovação.",
      owner: "Content Creator",
      priority: "Alta",
      eta: "9m",
      lane: "review",
      progress: 86,
    },
    {
      id: "T-204",
      title: "Planejar estrutura de campanha com budget guardrails",
      description: "Definir teste, alocação inicial e limites automáticos de corte.",
      owner: "Paid Social Strategist",
      priority: "Média",
      eta: "14m",
      lane: "backlog",
      progress: 4,
    },
    {
      id: "T-205",
      title: "Registrar memória operacional da conta",
      description: "Salvar preferências, veto de linguagem, histórico e aprendizados úteis.",
      owner: "Agents Orchestrator",
      priority: "Média",
      eta: "7m",
      lane: "done",
      progress: 100,
    },
    {
      id: "T-206",
      title: "Validar QA gate para publicação automática",
      description: "Sem nota mínima, nada sobe. Civilização básica, incrivelmente rara.",
      owner: "Reality Checker",
      priority: "Alta",
      eta: "6m",
      lane: "running",
      progress: 67,
    },
  ],
  events: [
    {
      id: 1,
      time: "agora",
      level: "running",
      title: "Orchestrator redistribuiu prioridade",
      description: "Campanha entrou em modo acquisition-first após detectar gargalo entre criativo e mídia.",
    },
    {
      id: 2,
      time: "há 1 min",
      level: "review",
      title: "Evaluator devolveu criativo 02",
      description: "Hook forte, mas promessa ampla demais para aprovação automática. Retry aberto.",
    },
    {
      id: 3,
      time: "há 3 min",
      level: "queued",
      title: "Fila recebeu nova rotina",
      description: "Evento inbound disparou análise de ICP e proposta de sequência de follow-up.",
    },
    {
      id: 4,
      time: "há 6 min",
      level: "done",
      title: "Memória operacional persistida",
      description: "Padrões de objeção, tom de voz e restrições do cliente adicionados ao contexto compartilhado.",
    },
  ],
};

const laneMap = {
  backlog: { title: "Backlog priorizado", subtitle: "Fila pronta para despacho", pill: "pill-queued" },
  running: { title: "Em execução", subtitle: "Agentes trabalhando", pill: "pill-running" },
  review: { title: "QA / revisão", subtitle: "Validação e retry", pill: "pill-review" },
  done: { title: "Concluído", subtitle: "Saídas aprovadas", pill: "pill-done" },
};

const statusPill = {
  idle: "pill-idle",
  queued: "pill-queued",
  running: "pill-running",
  review: "pill-review",
  blocked: "pill-blocked",
  done: "pill-done",
};

const state = structuredClone(INITIAL_STATE);
const dom = {
  kpis: document.getElementById("kpis"),
  agentsGrid: document.getElementById("agentsGrid"),
  queueBoard: document.getElementById("queueBoard"),
  eventFeed: document.getElementById("eventFeed"),
  controlPanel: document.getElementById("controlPanel"),
  modeBadge: document.getElementById("modeBadge"),
  autopilotButton: document.getElementById("autopilotButton"),
  resetButton: document.getElementById("resetButton"),
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomChoice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function addEvent(level, title, description) {
  state.events.unshift({
    id: Date.now() + Math.random(),
    time: "agora",
    level,
    title,
    description,
  });

  state.events = state.events
    .slice(0, 14)
    .map((event, index) => ({
      ...event,
      time: index === 0 ? "agora" : `há ${index} min`,
    }));
}

function getAgentByName(name) {
  return state.agents.find((agent) => agent.name === name);
}

function computeMetrics() {
  const totalAgents = state.agents.length;
  const runningAgents = state.agents.filter((agent) => agent.status === "running").length;
  const blockedAgents = state.agents.filter((agent) => agent.status === "blocked").length;
  const reviewTasks = state.tasks.filter((task) => task.lane === "review").length;
  const doneTasks = state.tasks.filter((task) => task.lane === "done").length;
  const avgConfidence = Math.round(
    state.agents.reduce((sum, agent) => sum + agent.confidence, 0) / totalAgents
  );

  return [
    {
      label: "Agentes ativos",
      value: `${runningAgents}/${totalAgents}`,
      foot: "Em execução agora",
    },
    {
      label: "Tarefas em fila",
      value: state.tasks.filter((task) => task.lane === "backlog").length,
      foot: "Prontas para despacho",
    },
    {
      label: "QA pendente",
      value: reviewTasks,
      foot: "Bloqueando avanço",
    },
    {
      label: "Concluídas",
      value: doneTasks,
      foot: "Saídas aprovadas",
    },
    {
      label: "Confiança média",
      value: `${avgConfidence}%`,
      foot: "Sinal do runtime",
    },
    {
      label: "Agentes bloqueados",
      value: blockedAgents,
      foot: "Exigem intervenção",
    },
  ];
}

function renderKpis() {
  dom.kpis.innerHTML = computeMetrics()
    .map(
      (item) => `
        <div class="card kpi-card">
          <div class="kpi-label">${item.label}</div>
          <div class="kpi-value">${item.value}</div>
          <div class="kpi-foot">${item.foot}</div>
        </div>
      `
    )
    .join("");
}

function renderAgents() {
  dom.agentsGrid.innerHTML = state.agents
    .map(
      (agent) => `
        <article class="agent-card">
          <div class="agent-head">
            <div>
              <div class="agent-title">${agent.name}</div>
              <div class="agent-subtitle">${agent.division} · ${agent.role}</div>
            </div>
            <span class="pill ${statusPill[agent.status]}">${agent.status}</span>
          </div>

          <div class="agent-body">
            <div class="agent-stat-row">
              <div class="mini-stat">
                <div class="label">Confiança</div>
                <div class="value">${agent.confidence}%</div>
              </div>
              <div class="mini-stat">
                <div class="label">Retries</div>
                <div class="value">${agent.retries}</div>
              </div>
              <div class="mini-stat">
                <div class="label">Próxima ação</div>
                <div class="value">${agent.status === "review" ? "retry" : agent.status === "queued" ? "await" : "advance"}</div>
              </div>
            </div>

            <div class="agent-task">
              <strong>Tarefa atual</strong>
              <div>${agent.currentTask}</div>
            </div>

            <div class="agent-task">
              <strong>Next</strong>
              <div>${agent.nextAction}</div>
            </div>

            <div class="tags">
              ${agent.tools.map((tool) => `<span class="tag">${tool}</span>`).join("")}
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderQueue() {
  dom.queueBoard.innerHTML = Object.entries(laneMap)
    .map(([lane, meta]) => {
      const tasks = state.tasks.filter((task) => task.lane === lane);
      return `
        <section class="queue-column">
          <div>
            <div class="queue-title">${meta.title}</div>
            <div class="queue-subtitle">${meta.subtitle}</div>
          </div>
          ${tasks
            .map(
              (task) => `
                <article class="task-card">
                  <div class="task-card-head">
                    <span class="pill ${meta.pill}">${task.priority}</span>
                    <span class="task-meta">${task.eta}</span>
                  </div>
                  <div>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                  </div>
                  <div class="task-meta">Owner: ${task.owner}</div>
                  <div class="progress"><span style="width: ${task.progress}%"></span></div>
                </article>
              `
            )
            .join("")}
        </section>
      `;
    })
    .join("");
}

function renderEvents() {
  dom.eventFeed.innerHTML = state.events
    .map(
      (event) => `
        <article class="feed-item">
          <div class="feed-item-head">
            <span class="pill ${statusPill[event.level] || "pill-idle"}">${event.level}</span>
            <span class="feed-time">${event.time}</span>
          </div>
          <h3>${event.title}</h3>
          <p>${event.description}</p>
        </article>
      `
    )
    .join("");
}

function renderControls() {
  const controls = [
    ["Modo", state.meta.mode],
    ["QA strictness", state.meta.qaStrictness],
    ["Concorrência máxima", String(state.meta.maxConcurrent)],
    ["Retry limit", String(state.meta.retryLimit)],
    ["Memory", state.meta.memoryMode],
    ["Approval policy", state.meta.approvalPolicy],
  ];

  dom.controlPanel.innerHTML = controls
    .map(
      ([label, value]) => `
        <div class="control-block">
          <div class="control-row">
            <span>${label}</span>
            <span>${value}</span>
          </div>
        </div>
      `
    )
    .join("");

  dom.modeBadge.textContent = state.meta.mode;
  dom.modeBadge.className = `pill ${state.meta.autopilot ? "pill-running" : "pill-idle"}`;
  dom.autopilotButton.textContent = state.meta.autopilot ? "Pausar autopilot" : "Retomar autopilot";
}

function render() {
  renderKpis();
  renderAgents();
  renderQueue();
  renderEvents();
  renderControls();
}

function progressRunningTasks() {
  state.tasks
    .filter((task) => task.lane === "running")
    .forEach((task) => {
      task.progress = clamp(task.progress + Math.floor(Math.random() * 16), 10, 100);
      if (task.progress >= 85 && Math.random() > 0.45) {
        task.lane = "review";
        task.progress = clamp(task.progress, 85, 96);
        const owner = getAgentByName(task.owner);
        if (owner) {
          owner.status = "review";
          owner.currentTask = task.title;
          owner.nextAction = "Responder feedback do evaluator";
          owner.retries += Math.random() > 0.72 ? 1 : 0;
        }
        addEvent(
          "review",
          `${task.id} entrou em revisão`,
          `${task.owner} concluiu a execução e enviou a saída para QA gate.`
        );
      }
    });
}

function promoteBacklogTask() {
  const backlog = state.tasks.filter((task) => task.lane === "backlog");
  const runningCount = state.tasks.filter((task) => task.lane === "running").length;

  if (!backlog.length || runningCount >= state.meta.maxConcurrent || Math.random() < 0.45) {
    return;
  }

  const task = backlog[0];
  task.lane = "running";
  task.progress = clamp(task.progress + 14, 10, 42);
  const owner = getAgentByName(task.owner);
  if (owner) {
    owner.status = "running";
    owner.currentTask = task.title;
    owner.nextAction = "Executar etapa e publicar evidência";
    owner.confidence = clamp(owner.confidence + 1, 68, 99);
  }

  addEvent(
    "running",
    `${task.id} saiu do backlog`,
    `Orchestrator despachou a tarefa para ${task.owner} com prioridade ${task.priority.toLowerCase()}.`
  );
}

function processReviews() {
  state.tasks
    .filter((task) => task.lane === "review")
    .forEach((task) => {
      const owner = getAgentByName(task.owner);
      const failChance = task.priority === "Alta" ? 0.46 : 0.32;

      if (Math.random() < failChance) {
        task.lane = "running";
        task.progress = clamp(task.progress - 20, 35, 82);
        if (owner) {
          owner.status = "running";
          owner.retries += 1;
          owner.confidence = clamp(owner.confidence - 3, 62, 99);
          owner.nextAction = "Aplicar feedback e reenviar";
        }
        addEvent(
          "review",
          `${task.id} voltou para execução`,
          `Evaluator detectou inconsistência. Retry aberto para ${task.owner}.`
        );
      } else {
        task.lane = "done";
        task.progress = 100;
        if (owner) {
          owner.status = "idle";
          owner.confidence = clamp(owner.confidence + 2, 65, 99);
          owner.nextAction = "Aguardar novo dispatch";
        }
        addEvent(
          "done",
          `${task.id} aprovado`,
          `QA gate liberou a saída e registrou a entrega como pronta para a próxima etapa.`
        );
      }
    });
}

function refreshAgentNoise() {
  state.agents.forEach((agent) => {
    if (agent.status === "idle" && Math.random() > 0.75) {
      agent.confidence = clamp(agent.confidence + 1, 70, 99);
    }
    if (agent.status === "running" && Math.random() > 0.8) {
      agent.currentTask = randomChoice([
        agent.currentTask,
        "Consolidar contexto antes da próxima ação",
        "Executar subtask com policy guardrails",
        "Publicar evidência parcial para QA",
      ]);
    }
  });
}

function simulationTick() {
  if (!state.meta.autopilot) return;
  progressRunningTasks();
  processReviews();
  promoteBacklogTask();
  refreshAgentNoise();
  render();
}

function resetSimulation() {
  Object.assign(state, structuredClone(INITIAL_STATE));
  render();
}

dom.autopilotButton.addEventListener("click", () => {
  state.meta.autopilot = !state.meta.autopilot;
  state.meta.mode = state.meta.autopilot ? "Autonomous" : "Paused";
  addEvent(
    state.meta.autopilot ? "running" : "blocked",
    state.meta.autopilot ? "Autopilot retomado" : "Autopilot pausado",
    state.meta.autopilot
      ? "Scheduler voltou a despachar tarefas automaticamente."
      : "Execução automática congelada para revisão humana."
  );
  render();
});

dom.resetButton.addEventListener("click", resetSimulation);

render();
setInterval(simulationTick, 2800);