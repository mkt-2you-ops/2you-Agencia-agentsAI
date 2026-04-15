# 2YOU Handoff Template

## Purpose

This template standardizes how work moves between agents inside the 2YOU system.

It extends the existing NEXUS handoff idea by adding commercial fields, operating mode, stage logic, and decision context.

Use this template for every non-trivial handoff.

---

## Full Template

```markdown
# 2YOU Handoff

## Metadata
- From Agent:
- To Agent:
- Initiative:
- Layer: Strategy / Tactic / Operation / Orchestration
- Mode: Caixa / Validação / Escala
- Priority: Critical / High / Medium / Low
- Timestamp:

## Business Context
- Objective:
- Offer:
- ICP:
- Promise:
- Stage: Acquisition / Conversion / Delivery / Retention / Expansion
- CTA:
- Primary KPI:
- Secondary KPI:

## Current State
- What is already done:
- What remains open:
- Current blocker:
- Relevant learnings:
- Active risk:

## Deliverable Request
- What is needed:
- Why it matters:
- Exact output format:
- Deadline:
- Owner after delivery:

## Boundaries
- What this task must include:
- What this task must avoid:
- What is explicitly out of scope:
- Brand or compliance constraints:
- Budget or speed constraints:

## Acceptance Criteria
- Success looks like:
- Must-pass conditions:
- Evidence required:
- Definition of done:

## Dependencies
- Context required:
- Files / assets / references:
- Other agents involved:
- Pending approvals:

## Next Handoff
- Expected next agent:
- Expected next deliverable:
- What must be preserved in the next handoff:
```

---

## Minimum Required Version

For smaller workflows, use this reduced format.

```markdown
# 2YOU Mini Handoff

- From:
- To:
- Objective:
- Offer:
- ICP:
- CTA:
- KPI:
- Deliverable:
- Deadline:
- Constraints:
- Definition of done:
- Next handoff:
```

---

## Rules for Good Handoffs

### Rule 1: No Generic Requests
Bad:
- “Create content for the brand.”

Better:
- “Create three acquisition assets for [ICP] pushing [offer] with [CTA], optimized for [channel], under [mode], measured by [KPI].”

### Rule 2: Every Output Must Have a Destination
Do not request assets with no next stage.

### Rule 3: Preserve the Business Layer
Even when the next agent is purely operational, include:
- objective
- offer
- ICP
- CTA
- KPI

### Rule 4: Define the Boundary
Most waste comes from unclear scope, not low talent.

### Rule 5: Include the Next Handoff
No work should end in a dead file.

---

## Example: Strategy to Tactic

```markdown
# 2YOU Handoff

## Metadata
- From Agent: 2YOU Chief Orchestrator
- To Agent: Senior Project Manager
- Initiative: Offer Sprint - Broker Acquisition
- Layer: Tactic
- Mode: Caixa
- Priority: High

## Business Context
- Objective: Generate qualified broker leads for a 6-month retainer offer
- Offer: lead generation + creative + paid media + operational management
- ICP: mid-size brokers needing acquisition and brand support
- Promise: faster pipeline growth with managed execution
- Stage: Acquisition
- CTA: book diagnostic call
- Primary KPI: qualified calls booked
- Secondary KPI: lead cost

## Current State
- What is already done: offer thesis and ICP direction approved
- What remains open: funnel sequence, assets, sprint order
- Current blocker: execution team lacks prioritized plan
- Relevant learnings: broad service menus reduce conversion
- Active risk: over-scoped proposal and unclear CTA

## Deliverable Request
- What is needed: tactical sprint plan with channel sequence, asset list, owners, and dependencies
- Why it matters: specialists need a realistic plan to execute
- Exact output format: 2-week sprint plan
- Deadline: 24 hours
- Owner after delivery: Project Shepherd

## Boundaries
- What this task must include: one primary funnel, one CTA, one lead path
- What this task must avoid: multi-offer architecture, expansion ideas, speculative channels
- What is explicitly out of scope: automation scaling beyond MVP
- Budget or speed constraints: optimize for speed and commercial clarity

## Acceptance Criteria
- Success looks like: plan can be activated immediately by specialist agents
- Must-pass conditions: owner, KPI, deadline, asset count, dependencies all defined
- Definition of done: Project Shepherd can run execution from the output

## Next Handoff
- Expected next agent: Project Shepherd
- Expected next deliverable: execution workstream coordination brief
- What must be preserved in the next handoff: CTA, KPI, mode, narrow scope
```

---

## Example: Tactic to Operation

```markdown
# 2YOU Mini Handoff

- From: Senior Project Manager
- To: Proposal Strategist
- Objective: improve close rate for broker proposal
- Offer: managed growth retainer
- ICP: broker founder / commercial lead
- CTA: close discovery to proposal acceptance
- KPI: proposal acceptance rate
- Deliverable: persuasive proposal narrative + pricing framing
- Deadline: 48 hours
- Constraints: keep one offer path, avoid broad menu language
- Definition of done: proposal explains offer, differentiator, pricing logic, and next step
- Next handoff: Project Shepherd → commercial ops
```

---

## Enforcement

If a handoff is missing objective, offer, CTA, KPI, or next handoff, the receiving agent should reject it and request reframing.

That is not being difficult.
That is preventing expensive stupidity.
