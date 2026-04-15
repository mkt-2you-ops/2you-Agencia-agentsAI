import { pilotJobs, pilotExecutors, pilotPayload } from '../pilot-data.js';

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'method_not_allowed', message: 'Use POST para executar o job do piloto.' }, 405);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: 'invalid_json', message: 'Body JSON inválido.' }, 400);
    }

    const { job_id, executor_id } = payload || {};
    const job = pilotJobs.find(item => item.id === job_id);
    const executor = pilotExecutors.find(item => item.id === executor_id);

    if (!job) {
      return jsonResponse({ error: 'job_not_found', message: 'Job não encontrado.' }, 404);
    }

    if (!executor) {
      return jsonResponse({ error: 'executor_not_found', message: 'Executor não encontrado.' }, 404);
    }

    if (job.approval_state !== 'approved') {
      return jsonResponse({ error: 'approval_required', message: 'Job ainda não aprovado para execução.' }, 400);
    }

    const executionStartedAt = new Date().toISOString();

    // Simulação controlada de execução real
    const result = {
      preview_url: `https://preview.2you-agency-ai.dev/${job.id}`,
      artifact: 'landing_page_draft',
      executor: executor.name
    };

    const updatedJob = {
      ...job,
      execution_state: 'executed',
      status: 'done',
      executed_at: new Date().toISOString()
    };

    const activityStart = {
      id: `log_exec_start_${Date.now()}`,
      workspace_id: job.workspace_id,
      type: 'execution_started',
      actor: executor.name,
      target: job.id,
      timestamp: executionStartedAt,
      message: 'Execução do piloto iniciada com executor selecionado.'
    };

    const activitySuccess = {
      id: `log_exec_success_${Date.now()}`,
      workspace_id: job.workspace_id,
      type: 'execution_success',
      actor: executor.name,
      target: job.id,
      timestamp: new Date().toISOString(),
      message: `Execução concluída com sucesso. Preview disponível em ${result.preview_url}`
    };

    return jsonResponse({
      ...pilotPayload('jobs', [updatedJob]),
      execution: {
        state: 'success',
        result
      },
      activity: [activityStart, activitySuccess]
    });
  }
};