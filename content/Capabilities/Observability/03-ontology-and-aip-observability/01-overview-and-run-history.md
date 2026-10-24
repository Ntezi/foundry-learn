# 01 — Overview and run history

*Sources: [Ontology and AIP observability](https://www.palantir.com/docs/foundry/aip-observability/overview/) · [Run history](https://www.palantir.com/docs/foundry/aip-observability/run-history/) · for RQ-26 also [Observability](https://www.palantir.com/docs/foundry/observability/overview/) and [Metrics](https://www.palantir.com/docs/foundry/aip-observability/metrics/) · checked October 23, 2026 · Ready for Review*

The second half of the area: not *is something wrong* (modules 01–02) but *what happened inside the execution*. The overview page lists the capabilities and the three-step way in; the run-history page is the first of those steps, the table every investigation starts from. This note also settles, as far as the pages allow, the seven-versus-thirty-days question the Ontology area logged as [RQ-26](../../Ontology/SOURCES.md#open-research-questions).

## What the feature set is

**[Docs]** Ontology and AIP observability gives "visibility into your AIP and Ontology workflow executions through metrics, tracing, logs, and execution history", integrated into **Workflow Lineage**. It works "even if AIP is not enabled on your enrollment". The capabilities:

| Capability | What the overview promises | Note |
|---|---|---|
| **Metrics** | Near real-time success/failure counts and P95 execution duration for functions, actions and AIP Logic | [04](04-metrics-performance-and-observability-dashboards.md) |
| **Execution history** | Functions, actions, automations and AIP Logic executions "over the past 30 days" | This note |
| **Distributed tracing** | "the complete execution flow across functions, actions, language models, automations, and ontology loads" | [02](02-trace-views-service-logs-and-debugging.md) |
| **Logging and debugging** | Service logs, custom function log messages, token usage, prompts, error details | [02](02-trace-views-service-logs-and-debugging.md) |
| **Log search** | Across executable resources in Workflow Lineage, "to find specific messages, errors, or patterns across multiple executions" | [03](03-log-search-and-log-permissions.md) |
| **Performance monitoring** | Bottlenecks and execution times | [04](04-metrics-performance-and-observability-dashboards.md) |
| **Observability dashboards** | Workshop, with the Observability Chart widget | [04](04-metrics-performance-and-observability-dashboards.md) |
| **Log export** | To a Foundry streaming dataset for "complex analysis on your telemetry" | [04](04-metrics-performance-and-observability-dashboards.md), [00-01](../00-orientation/01-the-observability-map.md) |

**[Docs]** Getting started is three steps: navigate to a function, action or automation in Workflow Lineage; open the **Run history** tab; choose **View log details** on an execution for traces and logs. Plus the condition the rest of the module turns on: "Ensure proper log permissions are configured for your resources."

**[Docs]** The overview also points outward, to pages in other sidebars: function instrumentation and monitoring, action metrics and monitoring, model instrumentation (performance); AIP usage metrics, Logic compute usage, AIP compute usage (cost); AIP Evals (model performance). The Ontology area read the function and action metrics pages ([Ontology 09-03](../../Ontology/09-functions/03-function-lifecycle.md), [14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md)); the AIP area read the usage and compute pages ([AIP 09](../../AIP/09-cost-and-observability/README.md)); the Evals pages are in [AIP 04](../../AIP/04-aip-evals/README.md).

## The run history table

**[Docs]** On a function, action or automation, the **Run history** tab is "a complete view of all executions over the past 30 days", sorted by timestamp. Columns:

| Column | Meaning |
|---|---|
| **Timestamp** | When the execution finished |
| **Status** | Success or failure |
| **Runtime** | Total execution time |
| **Caller** | "The resource that triggered the execution": a Workshop application, Agent, third-party application, Automation, Action, "or other system component" |
| **Source executor** | "The top level executable resource type (limited to Function, Action, or Automation) in the call chain" |

**[Docs]** Filters, combined with AND ("only those that match all specified filters"): **Status**; **Timestamp range**; **User** who triggered it; **Run time range**; **Version** (functions only); **Caller**; **Failure type** (the function and action failure types). One limitation: no execution history for **UDFs in Pipeline Builder** "run from a sidecar container, such as in Python or Java UDFs". *View log details* on a row opens the trace and logs ([02](02-trace-views-service-logs-and-debugging.md)).

**[Explanation]** *Caller* and *source executor* answer two different questions, and the distinction runs through the whole module. The caller is the immediate parent: the Workshop module whose button ran the action. The source executor is the root of the chain: if an automation ran an action that ran a function, the function's rows show the action as caller and the automation as source executor. Log search ([03](03-log-search-and-log-permissions.md)) is keyed to source executors; log *permission* ([03](03-log-search-and-log-permissions.md#who-may-read-logs)) is decided on the source executor's project. So when a Delivery Desk function misbehaves, the resource whose logs you may read, and whose project an administrator must have enabled, is whatever started the chain, not the function.

**[Explanation]** The filters are also where the alert hand-off from module 01 lands: a monitoring rule on a function or action opens this tab with *Status*, *Timestamp range*, *Run time range* or *Failure type* already set to the firing condition ([01-01](../01-monitoring-views/01-monitoring-views-and-core-concepts.md#5-from-an-alert-to-the-lineage)). Read the pre-filter before widening it, because it encodes what the rule saw.

## Seven days or thirty? (RQ-26)

**[Docs]** On the pages as fetched for this area: the **Observability overview** says Workflow Lineage shows "seven days of execution history" in its *Debug* paragraph, and "the last 30 days" for metrics two paragraphs later; the **Ontology and AIP observability overview** says execution history covers "the past 30 days"; the **Run history** page says 30 days twice; the **Metrics** page says 30 days for metrics and, in its related links, 30 days for execution history. The Ontology area's [09-03](../../Ontology/09-functions/03-function-lifecycle.md) recorded *7 days of run history* from the *Action metrics* page in the Ontology sidebar.

**[Explanation]** Four pages against one sentence, and the one sentence is on the sidebar's landing page, so neither reading can be called a typo from here. The honest position is unchanged from 14-06: **plan for seven**, design nothing that needs an execution older than a week (SOPs, reviews, the monthly checks in Kestrel's calendar), and treat anything older that the tab still shows as a bonus. RQ-26 stays open in the Ontology register with this re-check noted; the dedicated page's 30 days is the reading these notes quote when a number is needed.

## For Kestrel

**[Example]** *Adopted* in Phase 6 ([04](../04-kestrel-case/README.md)):

- **Run history is the first stop of every SOP** ([01-03](../01-monitoring-views/03-alerts-the-debug-page-and-external-systems.md#for-kestrel)), reached from the alert's pre-filtered link rather than by navigating, so the filter the rule applied is kept.
- **Source executors Kestrel cares about**: *Hold order* and *Re-route shipment* (actions called from the Delivery Desk), `draftDelayMessage` (an LLM function the agent calls as a tool, [Ontology 17-02 §6](../../Ontology/17-case-studies/02-kestrel-reference-model.md#6-functions-automations-and-the-agent)), the two payment automations, and the portal's functions (caller: the third-party application). The list matters because log access in [03](03-log-search-and-log-permissions.md#for-kestrel) is granted per source executor's project.
- **The calendar's weekly review** in [Ontology 14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md) is kept inside seven days, per RQ-26; the monthly items read the metrics (30 days), not the run history.
- Pipeline Builder UDFs, if Priya ever uses them, have no run history; failures there are found through the build's job report, which is the Data integration docs' ground.

---
[Module index](README.md) · Next: [02 — Trace views, service logs and debugging](02-trace-views-service-logs-and-debugging.md)
