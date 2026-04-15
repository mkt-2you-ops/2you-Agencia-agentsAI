export default {
  async fetch() {
    const payload = {
      meta: {
        source: "phase-2-runtime",
        entity: "events",
        total: 4,
      },
      events: [
        {
          id: 1,
          time: "agora",
          level: "running",
          title: "Orchestrator redistribuiu prioridade",
          description: "Campanha entrou em modo acquisition-first após detectar gargalo entre criativo e mídia."
        },
        {
          id: 2,
          time: "há 1 min",
          level: "review",
          title: "Evaluator devolveu criativo 02",
          description: "Hook forte, mas promessa ampla demais para aprovação automática. Retry aberto."
        },
        {
          id: 3,
          time: "há 3 min",
          level: "queued",
          title: "Fila recebeu nova rotina",
          description: "Evento inbound disparou análise de ICP e proposta de sequência de follow-up."
        },
        {
          id: 4,
          time: "há 6 min",
          level: "done",
          title: "Memória operacional persistida",
          description: "Padrões de objeção, tom de voz e restrições do cliente adicionados ao contexto compartilhado."
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