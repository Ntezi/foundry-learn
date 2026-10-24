# 01 — Security, privacy and ethics

*Sources: [AIP security and privacy](https://www.palantir.com/docs/foundry/aip/aip-security/) · [AI ethics and governance](https://www.palantir.com/docs/foundry/aip/ethics-governance/) · checked October 8, 2026 · Ready for Review*

Two pages that are mostly read by someone **reviewing** an AIP project: a client's security team, a data protection officer, an audit committee. This note is arranged as their questions, with the docs' answer and where in Foundry you would show the evidence.

## Part 1 — The security reviewer's questions

| Question | **[Docs]** answer | Evidence you can show |
|---|---|---|
| Is AIP covered by the same security as Foundry data? | Yes: the same access controls, encryption and auditing | The permission model ([Ontology 12](../../Ontology/12-security-and-governance/README.md)); audit logs |
| Where do third-party models run? | Regional endpoints "wherever available and possible", currently in regions like the US, UK and EU for some models; subject to the providers' restrictions | The georestriction table ([01-01](../01-models-and-llms/01-supported-llms-and-model-catalog.md#1-whats-on-the-list)) |
| Do model providers store our prompts or completions? | **No.** Palantir gets technical and contractual guarantees before adding a model; data is "immediately discarded after prompt completion" | The trust portal FAQ the page links to |
| Is our data used to retrain their models? | **No**, by contract and technical guarantee. Retraining **your own** private models is possible and governed | — |
| Can provider staff see our prompts? | **No** | — |
| What certifications do providers hold? | Unless your agreement says otherwise: ISO 27017, SOC 1/2/3, CSA STAR and/or others; infrastructure on AWS, Azure, Google Cloud | Trust portal |
| What contracts cover personal data? | Data protection agreements (and similar, such as business associate agreements) before processing personal data | Your agreement |

**[Docs]** The page adds a privacy best practice: evaluate the **whole** AI workflow (purpose, data, access boundaries, points of human review), not just the model.

**[Explanation]** Every answer above is about the **model provider**. None of them limits what your own workflow does with model output: who can read a drafted message, where a summary is written, which action a chatbot can call. That part is yours; the next notes in this module and [Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md) cover it.

**[Docs] Palantir's AI ethics principles**, as listed on the security page:

1. Focus on the fully integrated system, not just its component tools.
2. Acknowledge technology limits.
3. Do not solve problems that should not be solved.
4. Adhere to methodological best practices for sound data science.
5. Keep AI responsible, accountable and oriented towards humans.
6. Promote multi-stakeholder engagement.
7. Ensure technical, governance and cultural awareness.

## Part 2 — The ethics reviewer's themes

**[Docs]** The ethics page maps responsible-AI themes to platform capabilities. Its introduction promises "eight core themes"; the page describes **seven**. See [RQ-05](../SOURCES.md#open-research-questions).

| Theme | Capabilities the page names | Kestrel's evidence (**[Example]**) |
|---|---|---|
| **Equitable** (fair, non-discriminatory) | Sensitive Data Scanner; subset evaluation in Modeling Objectives; AIP Evals and experiments; data health monitoring | A gap: the delay model ([Ontology 15-03](../../Ontology/15-advanced-patterns/03-models-in-the-ontology.md)) isn't yet evaluated per region; subset evaluation would show whether Accra is served worse |
| **Explainable** | Modeling Objectives evaluation dashboard; AIP Evals; Logic tools for delegating to interpretable components; the Logic debug view; Ontology and AIP observability | Deterministic facts loading in the Logic draft function ([03-02](../03-aip-logic/02-building-a-logic-function.md)) |
| **Reliable** (safe, secure, robust) | Model deployments; function versioning and release; rollback; monitoring; access controls and markings; georestriction; encryption; capacity limits | Pinned function version for tool T4; capacity setup ([04](04-capacity-and-rate-limits.md)) |
| **Traceable** | Data Lineage; Workflow Lineage; audit logs; Modeling Objectives documentation; Notepad documentation templates; LLM cost governance | Workflow Lineage from Delivery Desk to its model ([01-01 runbook](../01-models-and-llms/01-supported-llms-and-model-catalog.md#5-runbook-a-model-you-use-is-being-retired)) |
| **Collaborative** | Role-based permissions; Code Workspaces and Repositories; Workshop; external sharing controls; no-, low- and pro-code evaluations | Ama's lead edits prompts on a branch; Daniel reviews ([03-03](../03-aip-logic/03-execution-modes-and-branching.md)) |
| **Accountable** | Groups and roles; audit trails; approval workflows through checks; **Checkpoints** for acknowledging and justifying AI-suggested decisions | Kofi accepts each `RerouteProposal` himself |
| **Human-centered** | Ontology-based decision support; human oversight through actions and approvals; dashboards; automation with Checkpoints; opt-out and fallback; feedback loops | The control ladder ([Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md)) |

**[Docs]** The page's starting checklist restates the seven principles from Part 1 as practical steps, for example "evaluate whether your use case is appropriate for AI intervention" and use problem-first modelling to set limits before building.

**[Explanation]** The ethics page lists capabilities; it doesn't claim any of them is switched on for you. A review should ask, theme by theme, "which of these do we actually use, and where is the evidence?", which is how the third column was filled.

<!-- security-go-deeper -->
**Go deeper in the Security area:** [06 — Approvals and Checkpoints](../../Security/06-approvals-and-checkpoints/README.md) · [09 — Sensitive Data Scanner and Data Lifetime](../../Security/09-sensitive-data-scanner-and-data-lifetime/README.md) · [10 — Privacy, governance and enterprise security](../../Security/10-privacy-governance-and-enterprise-security/README.md)

---
[Module index](README.md) · Next: [02 — Enabling AIP features](02-enabling-aip.md)
