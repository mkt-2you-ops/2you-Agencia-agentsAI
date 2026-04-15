# 2YOU Bridge for Agents Orchestrator

## Purpose

This file integrates the existing `specialized/agents-orchestrator.md` into the 2YOU governance layer without removing or replacing the original agent.

The original Agents Orchestrator remains the workflow engine.
The 2YOU layer changes **when** it is activated, **what context it must receive**, and **what rules it must obey before moving work forward**.

---

## New Position in the Hierarchy

The execution hierarchy is now:

1. **2YOU Chief Orchestrator**
2. **2YOU Context Keeper**
3. **Agents Orchestrator**
4. Relevant PM / specialist agents
5. QA and reality agents

Agents Orchestrator is no longer the first decision-maker for non-trivial workflows.
It is the **pipeline controller under 2YOU command**.

---

## Mandatory Preconditions Before Activation

Before Agents Orchestrator may run a multi-agent workflow, it must receive a 2YOU handoff including:
- business objective
- offer
- ICP
- CTA
- KPI
- owner
- operating mode
- next expected handoff

If these are missing, Agents Orchestrator must not continue blindly.
It must return the work upward for reframing.

---

## New Operating Rules

### Rule 1: Query Context First
For any existing initiative or any workflow using multiple agents, query `2YOU Context Keeper` first.

### Rule 2: Obey the Decision Gates
Before phase progression, the workflow should respect:
- Business Readiness Gate
- Mode Gate
- Scope Reality Gate
- Tactical Architecture Gate
- Operational Activation Gate
- Quality & Reality Gate
- Performance Learning Gate

### Rule 3: Do Not Treat All Work as Build Work
Some requests must be routed to:
- strategy clarification
- tactical design
- scope reduction
- orchestration correction

before any implementation pipeline begins.

### Rule 4: Enforce 2YOU Handoffs
All major agent-to-agent handoffs should follow the 2YOU handoff template, not a vague task relay.

### Rule 5: Report Business-Relevant Status
Status reports should include:
- objective
- KPI
- mode
- owner
- current blocker
- next handoff

not just task counts and QA cycles.

---

## Recommended Activation Statement

```markdown
Activate Agents Orchestrator under the 2YOU OS.
This workflow has already been classified and approved by 2YOU Chief Orchestrator.
Use 2YOU Context Keeper before routing work.
Respect 2YOU decision gates.
Use the 2YOU handoff template for all non-trivial handoffs.
Do not advance work based on task completion alone; validate business relevance, scope realism, and execution readiness.
```

---

## Behavioral Translation

### Old default
- receive a spec
- create tasks
- route development
- run QA loops
- finish integration

### New default
- confirm 2YOU decision layer approval
- confirm context package exists
- check gates
- route work by layer
- only then run pipeline
- return learnings to context memory

---

## What Changes in Practice

Agents Orchestrator still runs pipelines.
It just stops acting like every problem is ready for a build loop.

That small correction saves an absurd amount of unnecessary work, which is rare in modern systems designed mostly to create the appearance of progress.
