export default {
  async fetch() {
    const payload = {
      meta: {
        source: "phase-2-runtime",
        entity: "tasks",
        total: 6,
      },
      tasks: [
        {
          id: "T-201",
          title: "Mapear sinais que criam tarefas sem input humano",
          description: "Lead novo, e-mail inbound, baixa performance, deadline estourado, mudança de briefing.",
          owner: "Product Manager",
          priority: "Alta",
          status: "backlog",
          progress: 12,
        },
        {
          id: "T-202",
          title: "Quebrar campanha em task graph com dependências",
          description: "Estratégia, criativo, tracking, mídia, QA e reporting com ordem explícita.",
          owner: "Project Shepherd",
          priority: "Alta",
          status: "running",
          progress: 58,
        },
        {
          id: "T-203",
          title: "Gerar 3 hooks de criativo com hipótese por ICP",
          description: "Cada peça precisa ter hipótese, risco e critério de aprovação.",
          owner: "Content Creator",
          priority: "Alta",
          status: "review",
          progress: 86,
        },
        {
          id: "T-204",
          title: "Planejar estrutura de campanha com budget guardrails",
          description: "Definir teste, alocação inicial e limites automáticos de corte.",
          owner: "Paid Social Strategist",
          priority: "Média",
          status: "backlog",
          progress: 4,
        },
        {
          id: "T-205",
          title: "Registrar memória operacional da conta",
          description: "Salvar preferências, veto de linguagem, histórico e aprendizados úteis.",
          owner: "Agents Orchestrator",
          priority: "Média",
          status: "done",
          progress: 100,
        },
        {
          id: "T-206",
          title: "Validar QA gate para publicação automática",
          description: "Sem nota mínima, nada sobe. Civilização básica, incrivelmente rara.",
          owner: "Reality Checker",
          priority: "Alta",
          status: "running",
          progress: 67,
        }
      ]
    };

    return Response.json(payload, {
      headers: {
        "Cache-Control": "no-store, max-age=0"
      }
    });
  }
};