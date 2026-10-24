# 04 — Metrics, performance and observability dashboards

*Sources: [Metrics](https://www.palantir.com/docs/foundry/aip-observability/metrics/) · [Performance monitoring and optimization](https://www.palantir.com/docs/foundry/aip-observability/performance-monitoring-and-optimization/) · [Observability dashboards](https://www.palantir.com/docs/foundry/observability/dashboards/) · checked October 23, 2026 · Ready for Review*

The numbers, where they appear, and how to put them on a page. The metrics page is small but carries the second Workflow Lineage colour mode (**Failure rate**, beside *Monitoring status* from [01-01](../01-monitoring-views/01-monitoring-views-and-core-concepts.md#6-see-coverage-not-just-alerts)); the performance page is four paragraphs of advice; the dashboards page explains how the Observability Chart widget the Apps area already used relates to everything else here.

## Metrics

**[Docs]** "near real-time metrics for functions, actions, and AIP Logic resources", in Ontology Manager or on the resource node in Workflow Lineage, over "the last 30 days", from the **Foundry Telemetry Service (FTS)**. Two metrics: **success/failure counts** and **P95 duration**, "the 95th percentile (P95) execution duration", which "highlights the upper range of execution times". Each resource type has its own metrics page (function, action, AIP Logic) with its failure categories; the Ontology area read those ([Ontology 09-03](../../Ontology/09-functions/03-function-lifecycle.md), [14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md)). Permission: **Viewer** on the resource ([03](03-log-search-and-log-permissions.md#who-may-read-logs)).

## The Failure rate colour mode

**[Docs]** Open the workflow as a graph, colour legend, **Failure rate** under *Health*: nodes coloured "by the proportion of their runs that failed over a selected time window".

| Rule | Detail |
|---|---|
| **Which nodes** | Those that report execution metrics: action types, functions, AIP Logic functions. Object types, Workshop applications, language models and datasets keep their default colour. **Automations "are not yet supported"**: they execute but don't report these metrics, "so they appear as No runs even when they have run" |
| **Legend** | Four failure-rate ranges plus *No runs* and *No permission*; lower bounds inclusive ("a resource at exactly 5% falls in 5-15% failure rate"); nodes with a failure annotated "12/430 runs failed" |
| **Window** | Default *Past 4 hours*; a provided duration or a date range; the longest is **one day**, "shorter than the 30-day retention that applies to metrics elsewhere"; colours refresh "approximately once a minute" while the tab is visible; a duration window slides, a date range stays |
| **Permissions** | Resources you can't view metrics for show as *No permission* rather than disappearing, which "lets you tell the difference between a resource that is healthy and one whose health you cannot see"; Viewer required |

**[Explanation]** The two colour modes are a pair. *Failure rate* reads raw metrics over at most a day and has no automation support; *Monitoring status* reads firing rules, over whatever windows the rules use, and automations do have rules. [Ontology 14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md) read the first and concluded automations need their own line in the daily check; with the second mode that line becomes a rule in the view, and the graph shows it. [04-02](../04-kestrel-case/02-triage-at-kestrel-from-alert-to-fix.md#the-calendar-revised) revises the calendar accordingly.

## Performance monitoring

**[Docs]** Why: user experience, cost ("Optimized workflows use fewer resources and reduce compute costs"), reliability, scalability. Where to look, in the trace view: **long-running spans**; **sequential bottlenecks** ("operations that could potentially run in parallel"); **repeated operations** ("redundant calls that could be optimized"); **model latency** (consider "different models for time-sensitive operations"). The page's screenshot shows "unbatched model calls that could be optimized". Strategies: parallel execution of independent operations, model selection ("Balance performance and quality"), batching, error handling "to prevent cascading failures".

**[Explanation]** This is the only page in the sidebar that tells you what to *change*, and every item points back at the trace ([02](02-trace-views-service-logs-and-debugging.md)): a staircase of short spans is the sequential bottleneck, many identical child spans are the unbatched calls, one long LLM span is the model-latency case. For Kestrel's agent, whose tool T4 is `draftDelayMessage` ([Ontology 16-03](../../Ontology/16-ai-and-agents/03-ontology-tools-for-agents.md)), the first two signs would look like a staircase of one tool call per order.

## Observability dashboards

**[Docs]** Dashboards "let you compose Foundry telemetry into custom, reusable views built from Workshop widgets", assembling "the signals that matter for a workflow onto a single page". Today they are built with the **Observability Chart widget**, "which plots a resource's metrics over time"; "Additional observability widgets are in development." The difference from Ontology and AIP observability: the built-in metrics, traces, history and logs "are available out of the box and require no configuration"; dashboards "draw on the same underlying signals, but you build them yourself in Workshop".

**[Docs]** The widget plots one resource's metrics, "such as execution counts, P95 duration, CPU, and memory", over a time range. Being a standard widget: several on one module, each charting a different action, function or compute module; start and end **bound to shared timestamp variables**, "so selecting a range on one chart re-scopes every widget bound to the same variables"; laid out with Workshop's tools "to reflect the structure of your workflow". Configuration is on the widget's own page in the Workshop docs, which [Apps 03-06](../../Apps/03-workshop-widgets/06-ai-observability-and-embedding.md) read.

**[Explanation]** The CPU and memory in the widget's list are the compute-module metrics from the *Metrics tab* the overview mentioned ([00-01](../00-orientation/01-the-observability-map.md)); functions and actions bring counts and P95. So a dashboard can put the Kestrel Pay model's compute module ([Ontology 17-02 §6](../../Ontology/17-case-studies/02-kestrel-reference-model.md#6-functions-automations-and-the-agent)) on the same page as the functions that call it, which no built-in view does. What a dashboard can't do is alert: it is a page someone opens. Rules alert ([01](../01-monitoring-views/README.md)); the dashboard is for the person the alert woke up.

## For Kestrel

**[Example]** *Adopted* in Phase 6 ([04](../04-kestrel-case/README.md)):

- **The Delivery Desk health page** from [Apps 11-01](../../Apps/11-kestrel-case/01-delivery-desk-queue-built-out.md) (charts for `draftDelayMessage` and *Hold order*, one shared time range) gains two charts: *Re-route shipment* (counts and P95) and the `kestrel-pay-llm` compute module (CPU, memory), so the page shows the agent, its actions and the model it depends on together. It stays a page for the ontology team, linked from each SOP, not a substitute for the rules.
- **The weekly review** reads the *Failure rate* colour mode over the past day for a quick picture and the per-resource metrics for the 30-day trend; the monthly review reads P95 on the four charted resources and opens a trace for the slowest, following the performance page's four signs.
- **Performance rule for the agent**: `draftDelayMessage` is called once per order, never in a loop over a queue; a batch path is Daniel's to design if the P95 chart says so. Recorded as an operating rule, since the pages give the signs but not a threshold.

---
[Module index](README.md) · Previous: [03 — Log search and log permissions](03-log-search-and-log-permissions.md) · Next module: [04 — Kestrel case](../04-kestrel-case/README.md)
