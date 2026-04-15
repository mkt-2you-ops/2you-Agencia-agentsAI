export default {
  async fetch() {
    return Response.json({
      meta: { source: "phase-2-runtime", entity: "agents", total: 6 },
      agents: [
        { id: "orch-01", name: "Agents Orchestrator", division: "Specialized", role: "Despacho, priorização e handoff", status: "running", confidence: 96, retries: 0, currentTask: "Distribuir backlog entre mídia, conteúdo e produto", nextAction: "Aguardar feedback do evaluator e redispatch" },
        { id: "pm-01", name: "Project Shepherd", division: "Project Management", role: "Quebra de escopo e cadência", status: "running", confidence: 92, retries: 0, currentTask: "Transformar objetivo comercial em task graph", nextAction: "Atualizar dependências e ETA por lote" },
        { id: "mkt-01", name: "Content Creator", division: "Marketing", role: "Conteúdo e ativo criativo", status: "review", confidence: 84, retries: 1, currentTask: "Gerar 3 criativos para campanha de aquisição", nextAction: "Ajustar hook do criativo com base no evaluator" },
        { id: "paid-01", name: "Paid Social Strategist", division: "Paid Media", role: "Lances, segmentação e testes", status: "queued", confidence: 88, retries: 0, currentTask: "Planejar estrutura de testes Meta Ads", nextAction: "Entrar assim que o brief criativo for aprovado" },
        { id: "prod-01", name: "Product Manager", division: "Product", role: "Descoberta e requisito funcional", status: "running", confidence: 91, retries: 0, currentTask: "Definir evento, trigger e regra de autonomia", nextAction: "Publicar contrato do runtime para frontend" },
        { id: "qa-01", name: "Reality Checker", division: "Testing", role: "QA, gate e risco operacional", status: "running", confidence: 95, retries: 0, currentTask: "Validar saída antes de avançar para mídia paga", nextAction: "Aprovar ou devolver com evidência" }
      ]
    }, { headers: { "Cache-Control": "no-store, max-age=0" } });
  }
};