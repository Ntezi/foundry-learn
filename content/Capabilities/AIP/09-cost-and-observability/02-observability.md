# 02 — Ontology and AIP observability

*Sources: [Ontology and AIP observability](https://www.palantir.com/docs/foundry/aip/aip-observability/) · [AIP Logic metrics](https://www.palantir.com/docs/foundry/logic/logic-metrics/) · [Session logging](https://www.palantir.com/docs/foundry/chatbot-studio/session-logging/) · [Analyze run results](https://www.palantir.com/docs/foundry/aip-evals/analyze-run-results/) · checked October 8, 2026 · Ready for Review*

**[Docs]** The AIP sidebar's observability page is two sentences: Ontology and AIP observability is "a set of capabilities in Workflow Lineage" giving visibility into AIP and Ontology workflow executions (metrics, execution history, distributed tracing, logging and log search), part of Palantir's platform-wide observability strategy. It points to a separate documentation section for the details.

That section is covered in the Ontology area: [Ontology 14-06 — Monitoring and cleanup](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md) has the run history, trace and service-log workflow, and the rule that an administrator must **enable log access for a project** before traces and service logs are visible beyond your own last 24 hours.

This note is the **AIP-specific index**: for each AIP product, where its execution evidence lives.

## Where to look, per product

| Product | Metrics | Execution detail | Retention or condition | Note |
|---|---|---|---|---|
| **AIP Logic** | Success/failure counts and **P95 duration** over 30 days, in Ontology Manager or Workflow Lineage; viewers of the Logic resource only | Run history (7 days); the Debugger; with project-scoped execution, a **run history dataset** of the last 10,000 runs | User-scoped logs: own runs, 24 hours | [03-03](../03-aip-logic/03-execution-modes-and-branching.md), [03-04](../03-aip-logic/04-logic-in-production.md#is-it-healthy) |
| **AIP Evals** | Pass rates; metrics dashboard | Debug view per test case; LLM trace viewer; judge reasoning as debug output | User-scoped results: 24 hours; project-scoped: kept, and can go to a results dataset | [04-04](../04-aip-evals/04-reading-results.md) |
| **AIP Chatbot Studio** | *Monitoring* and *Usage* tabs; thumbs-up/down feedback | **Session logs** exported to a streaming dataset; *Get Session Trace* API | Export needs log-export permissions; retention is yours to set | [05-04](../05-chatbot-studio/04-session-logging.md), [05-03](../05-chatbot-studio/03-chatbots-outside-the-studio.md) |
| **AIP Analyst** | Token estimator; tokens per tool call in the outline | Graph view of each step's provenance | Saved analyses store steps, not results | [07-04](../07-end-user-apps/04-aip-analyst.md#trusting-the-answer) |
| **AI FDE** | Tokens per message in the chat outline | The outline and the session; the branch proposal or pull request | Session visible only to its creator; audit logs under the user | [07-05](../07-end-user-apps/05-ai-fde.md) |
| **AIP Evolve** | Proposal with validation results | Agent graph | — | [07-07](../07-end-user-apps/07-threads-evolve-and-realtime-audio.md#aip-evolve-let-agents-improve-an-ai-workflow) |
| **Document Intelligence** transforms | Build status | Build **Telemetry**, filtered on `aip_workflows` | — | [06-02](../06-document-intelligence/02-deploying-extraction.md) |
| **Usage and capacity** | Per-minute tokens and requests; limit lines | AIP Token Usage dataset; Analysis page for cost | Two weeks of per-minute data | [08-04](../08-security-governance-and-admin/04-capacity-and-rate-limits.md), [01](01-compute-usage.md) |

## Kestrel's incident drill

**[Example]** Monday 09:10: Ama's team reports that Delivery Desk "stopped drafting". Where Daniel looks, in order:

1. **Chatbot session logs**: `execution_error` events since 09:00? `tool_call_result` failures for T4? ([05-04 recipe 2](../05-chatbot-studio/04-session-logging.md#recipe-2--which-tools-are-unreliable-or-slow))
2. **Workflow Lineage** on the Delivery Desk app → `draftDelayMessage` → its model node: a deprecation alert? ([01-01 runbook](../01-models-and-llms/01-supported-llms-and-model-catalog.md#5-runbook-a-model-you-use-is-being-retired))
3. **Function run history** for `draftDelayMessage`, filtered to failures: `LanguageModelNotAvailable` means a brownout; a rate-limit failure means capacity ([Ontology 14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md))
4. **Resource Management → AIP usage & limits** for the model: did the invoice batch hit the project limit at 09:00 ([08-04](../08-security-governance-and-admin/04-capacity-and-rate-limits.md#kestrels-design))?

The answer that morning: the monthly invoice extraction started early, all of Kestrel's projects still shared the default 70% project limit, and the batch run took most of the model's capacity. This incident is why Kestrel set up the "Batch" project limit and Delivery Desk's reserved capacity described in [08-04](../08-security-governance-and-admin/04-capacity-and-rate-limits.md#kestrels-design).

---
[Module index](README.md) · Previous: [01 — Compute usage](01-compute-usage.md) · Next module: [10 — Kestrel case](../10-kestrel-case/README.md)
