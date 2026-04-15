# 2YOU Agent System Patch

## What this patch does

This patch keeps the full existing agent roster and adds a 2YOU governance layer on top of the repository.

It introduces:
- a business operating system
- a chief orchestrator
- a context memory layer
- decision gates above NEXUS
- a handoff template with commercial logic
- a routing matrix that preserves all existing agents

## Files included

- `strategy/2you-operating-system.md`
- `specialized/2you-chief-orchestrator.md`
- `specialized/2you-context-keeper.md`
- `strategy/coordination/2you-decision-gates.md`
- `strategy/coordination/2you-handoff-template.md`
- `strategy/coordination/2you-agent-routing-matrix.md`

## Recommended insertion order

### Step 1
Add all files to the repository without deleting anything.

### Step 2
Make `2YOU Chief Orchestrator` the first agent invoked for non-trivial workflows.

### Step 3
Force any multi-agent workflow to query `2YOU Context Keeper` before activation.

### Step 4
Update your internal prompts and runbooks to use the 2YOU handoff template.

### Step 5
Require the 2YOU decision gates before specialist execution.

## Recommended system rule

Add this rule to your top-level orchestration prompt:

```markdown
Operate under the 2YOU OS.
Keep all existing agents active and available.
Do not remove specialists.
Classify every request into Strategy, Tactic, Operation, or Orchestration.
Choose one mode: Caixa, Validação, or Escala.
Require commercial context before production.
Use the 2YOU decision gates and 2YOU handoff template.
Query 2YOU Context Keeper before multi-agent activation.
```

## What not to do

- do not delete existing agents first
- do not rename everything at once
- do not automate content engines before commercial logic is locked
- do not run full multi-agent workflows from broad prompts with no KPI or CTA

## What to expect after installation

- fewer vague activations
- clearer handoffs
- better prioritization
- lower operational noise
- more alignment between output and business outcome
