# Decision guide

*Sources: the notes each branch links to · compiled October 23, 2026 · Ready for Review. The flowcharts are ours; every leaf links to the note with the docs' wording.*

Four decisions that come up on almost every monitoring question, as flowcharts. Each ends at the note to read next.

## 1. Rule or check?

```mermaid
flowchart TD
    A{What do you want to watch?} -- "many resources, or ones<br/>that will be added later" --> MV["Monitoring rule with a dynamic scope (01-01)"]
    A -- "one dataset's contents,<br/>freshness by column, schema" --> HC["Health check (02-01)"]
    A -- "agents, OSv2 objects, streams,<br/>deployments, automations" --> MV2["Monitoring rule: only views cover these (01-04)"]
    A -- "a fact that must never<br/>reach the Ontology" --> DE["Data expectation in the transform:<br/>a gate, not an observer (02-01)"]
    HC --> V["Add the check to a monitoring view so<br/>subscriptions and routing live in one place (01-01)"]
    MV --> R{Durations or counts?}
    R -- durations --> S["Scope per resource (01-02)"]
    R -- counts, heartbeats --> P["Scope per project (01-02)"]
```

[01-01](../01-monitoring-views/01-monitoring-views-and-core-concepts.md) · [01-02](../01-monitoring-views/02-monitoring-rules-reference.md) · [01-04](../01-monitoring-views/04-monitoring-faq-and-the-check-groups-sunset.md) · [02-01](../02-health-checks/01-health-checks-and-the-types-of-checks.md)

## 2. Which freshness signal?

```mermaid
flowchart TD
    A{What does downstream need?} -- "the job to have run" --> J["Rule: time since job last succeeded;<br/>passes on empty or aborted transactions (01-02)"]
    A -- "a transaction to have landed" --> T["Check: time since last updated;<br/>turn on ignore empty transactions (02-03)"]
    A -- "the rows to be current" --> D["Check: data freshness on the<br/>source event timestamp (02-01)"]
    A -- "a synced copy to be current" --> S["Check: sync freshness (02-01)"]
    A -- "the index to reflect the dataset" --> SP["Rule: sync propagation delay on the object type (01-02)"]
    D -. "pair with" .-> T
```

[01-02](../01-monitoring-views/02-monitoring-rules-reference.md#time-series-syncs-datasets-geotemporal-observations) · [02-01](../02-health-checks/01-health-checks-and-the-types-of-checks.md#three-freshnesses) · [02-03](../02-health-checks/03-checks-reference.md#time-checks)

## 3. Where does the alert go?

```mermaid
flowchart TD
    A{Must someone act now?} -- yes --> H["HIGH: a PagerDuty integration on this view (01-03)"]
    A -- "today" --> M["MEDIUM: a Slack channel the team reads (01-03)"]
    A -- "worth knowing" --> L["LOW: Foundry notifications and the digest (01-03)"]
    H --> V{Is the rule in a different view?}
    V -- yes --> V2["Configure the integration there too:<br/>integrations are per view and per severity (01-03)"]
    M --> N{Will the dataset's name<br/>appear in Slack?}
    N -- "only if every marking on it<br/>is exportable on the source" --> E["Otherwise the RID; decide which<br/>markings to export, if any (01-03)"]
    H --> SOP["Attach an SOP Notepad to the rule (01-03)"]
```

[01-03](../01-monitoring-views/03-alerts-the-debug-page-and-external-systems.md) · [01-01](../01-monitoring-views/01-monitoring-views-and-core-concepts.md#the-vocabulary)

## 4. *It failed.* Which signal do you read first?

```mermaid
flowchart TD
    A{What kind of resource?} -- "schedule, dataset, check" --> P["Data Lineage health colouring,<br/>then the build report (02-01, 02-04)"]
    A -- "object type" --> X["Which Funnel job; then<br/>Ontology 13-02's checklist (01-02)"]
    A -- "function, action, automation, agent" --> RH["Run history, pre-filtered from the alert (03-01)"]
    RH --> TR["Trace: the long or red span (03-02)"]
    TR --> SL["Service logs: ERROR, then WARN (03-02)"]
    SL --> Q{Still unclear?}
    Q -- "recurs across executions" --> LS["Log search: single-source first,<br/>global with the producer second (03-03)"]
    Q -- "can't see the logs" --> PERM["Log access overview: role, policy,<br/>markings (03-03)"]
    Q -- "slow, not failing" --> PERF["Performance signs in the trace (03-04)"]
```

[02-01](../02-health-checks/01-health-checks-and-the-types-of-checks.md) · [02-04](../02-health-checks/04-builds-and-checks-faq-health-checks-in-a-marketplace-product.md) · [01-02](../01-monitoring-views/02-monitoring-rules-reference.md#objects-and-links) · [03-01](../03-ontology-and-aip-observability/01-overview-and-run-history.md) · [03-02](../03-ontology-and-aip-observability/02-trace-views-service-logs-and-debugging.md) · [03-03](../03-ontology-and-aip-observability/03-log-search-and-log-permissions.md) · [03-04](../03-ontology-and-aip-observability/04-metrics-performance-and-observability-dashboards.md) · worked for Kestrel in [04-02](../04-kestrel-case/02-triage-at-kestrel-from-alert-to-fix.md)

---
[Module index](README.md) · [Observability home](../README.md)
