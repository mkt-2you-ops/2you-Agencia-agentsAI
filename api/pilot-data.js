export const pilotWorkspace = {
  id: '2you-digital-pilot',
  name: '2YOU Digital Pilot',
  company: '2YOU Digital',
  mode: 'pilot',
  objective: 'Validar loop real de operação com approval e logging antes de escalar para multiworkspace.',
  primary_flow: 'campaign_ops',
  active: true
};

export const pilotJobs = [
  {
    id: 'job_campaign_ops_001',
    workspace_id: '2you-digital-pilot',
    type: 'campaign_ops',
    title: 'Criar e preparar campanha piloto de aquisição',
    objective: 'Gerar ativo, estrutura operacional e pacote de aprovação para campanha piloto.',
    company: '2YOU Digital',
    priority: 'Alta',
    status: 'pending_approval',
    owner: 'Agents Orchestrator',
    approval_state: 'pending_approval',
    execution_state: 'not_executed',
    created_by: 'system',
    deliverables: [
      'brief estruturado',
      'copy draft',
      'landing page draft',
      'deployment preview',
      'draft de e-mail interno'
    ]
  }
];

export const pilotTasks = [
  {
    id: 'task_001',
    job_id: 'job_campaign_ops_001',
    workspace_id: '2you-digital-pilot',
    title: 'Consolidar briefing do piloto',
    status: 'done',
    owner: 'Project Shepherd',
    progress: 100
  },
  {
    id: 'task_002',
    job_id: 'job_campaign_ops_001',
    workspace_id: '2you-digital-pilot',
    title: 'Gerar copy draft da campanha',
    status: 'review',
    owner: 'Content Creator',
    progress: 86
  },
  {
    id: 'task_003',
    job_id: 'job_campaign_ops_001',
    workspace_id: '2you-digital-pilot',
    title: 'Preparar landing page draft',
    status: 'running',
    owner: 'Product Manager',
    progress: 61
  },
  {
    id: 'task_004',
    job_id: 'job_campaign_ops_001',
    workspace_id: '2you-digital-pilot',
    title: 'Montar pacote de aprovação',
    status: 'backlog',
    owner: 'Reality Checker',
    progress: 8
  }
];

export const pilotApprovals = [
  {
    id: 'approval_001',
    workspace_id: '2you-digital-pilot',
    job_id: 'job_campaign_ops_001',
    item_type: 'campaign_package',
    item_label: 'Pacote de campanha piloto',
    state: 'pending',
    requested_by: 'Agents Orchestrator',
    approver: 'Ayran',
    risk_level: 'medium',
    execution_blocked_until_approval: true
  }
];

export const pilotExecutors = [
  {
    id: 'executor_github_preview',
    workspace_id: '2you-digital-pilot',
    name: 'GitHub / Vercel Preview Executor',
    type: 'real_execution_candidate',
    status: 'available',
    scope: ['landing page draft', 'preview deploy', 'issue/pr tracking']
  },
  {
    id: 'executor_gmail_draft',
    workspace_id: '2you-digital-pilot',
    name: 'Email Draft Executor',
    type: 'real_execution_candidate',
    status: 'available',
    scope: ['internal email draft', 'approval request draft']
  }
];

export const pilotActivityLog = [
  {
    id: 'log_001',
    workspace_id: '2you-digital-pilot',
    type: 'job_created',
    actor: 'system',
    target: 'job_campaign_ops_001',
    timestamp: '2026-04-15T06:10:00Z',
    message: 'Job piloto criado para validar o loop de campanha com approval gate.'
  },
  {
    id: 'log_002',
    workspace_id: '2you-digital-pilot',
    type: 'task_completed',
    actor: 'Project Shepherd',
    target: 'task_001',
    timestamp: '2026-04-15T06:18:00Z',
    message: 'Briefing consolidado e pronto para derivar copy e LP.'
  },
  {
    id: 'log_003',
    workspace_id: '2you-digital-pilot',
    type: 'approval_requested',
    actor: 'Agents Orchestrator',
    target: 'approval_001',
    timestamp: '2026-04-15T06:26:00Z',
    message: 'Pacote de campanha aguardando aprovação humana antes da execução real.'
  }
];

export function pilotPayload(entity, data) {
  return {
    meta: {
      source: 'pilot-mono-workspace',
      workspace_id: pilotWorkspace.id,
      entity,
      total: Array.isArray(data) ? data.length : undefined
    },
    workspace: pilotWorkspace,
    [entity]: data
  };
}
