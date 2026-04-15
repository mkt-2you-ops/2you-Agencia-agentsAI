import { pilotJobs, pilotApprovals, pilotPayload } from '../pilot-data.js';

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
      return jsonResponse({ error: 'method_not_allowed', message: 'Use POST para aprovar ou reprovar o pacote do piloto.' }, 405);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: 'invalid_json', message: 'Body JSON inválido.' }, 400);
    }

    const { approval_id, job_id, decision = 'approved', approver = 'Ayran' } = payload || {};
    const approval = pilotApprovals.find(item => item.id === approval_id || item.job_id === job_id);
    const job = pilotJobs.find(item => item.id === job_id || item.id === approval?.job_id);

    if (!approval || !job) {
      return jsonResponse({ error: 'not_found', message: 'Approval ou job não encontrado no piloto.' }, 404);
    }

    const normalizedDecision = decision === 'rejected' ? 'rejected' : 'approved';
    const approvalState = normalizedDecision === 'approved' ? 'approved' : 'rejected';
    const jobStatus = normalizedDecision === 'approved' ? 'approved' : 'blocked';

    const updatedApproval = {
      ...approval,
      state: approvalState,
      approver,
      reviewed_at: new Date().toISOString(),
      execution_blocked_until_approval: normalizedDecision !== 'approved'
    };

    const updatedJob = {
      ...job,
      status: jobStatus,
      approval_state: approvalState,
      execution_state: normalizedDecision === 'approved' ? 'ready_to_execute' : 'blocked_by_rejection'
    };

    const activity = {
      id: `log_approval_${Date.now()}`,
      workspace_id: job.workspace_id,
      type: normalizedDecision === 'approved' ? 'approval_approved' : 'approval_rejected',
      actor: approver,
      target: approval.id,
      timestamp: new Date().toISOString(),
      message: normalizedDecision === 'approved'
        ? 'Pacote do piloto aprovado para execução controlada.'
        : 'Pacote do piloto reprovado. Execução bloqueada até revisão.'
    };

    return jsonResponse({
      ...pilotPayload('approvals', [updatedApproval]),
      job: updatedJob,
      activity,
      next_action: normalizedDecision === 'approved' ? 'execute' : 'revise'
    });
  }
};