# Limits and thresholds

*Sources: the pages linked in each row · numbers as read October 23, 2026 · compiled October 23, 2026 · Ready for Review*

Every number this area's notes state from the docs, in one place. **Numbers change**: check the linked page before relying on one. The monitoring rules reference's example values and recommendations (10 minutes, 80%, 70, 10GB, and so on) are summarised in [01-02](../01-monitoring-views/02-monitoring-rules-reference.md) and not repeated row by row; only its windows, defaults and fixed behaviours are listed here. Kestrel's own thresholds are design choices and live in [04](../04-kestrel-case/README.md).

## Retention and windows

| What | Value | Docs page | Note |
|---|---|---|---|
| Execution history in Workflow Lineage | **seven days** (Observability overview) versus **30 days** (Ontology and AIP observability overview, Run history, Metrics): the docs disagree, Ontology RQ-26 | [Observability](https://www.palantir.com/docs/foundry/observability/overview/) · [Run history](https://www.palantir.com/docs/foundry/aip-observability/run-history/) | [03-01](../03-ontology-and-aip-observability/01-overview-and-run-history.md#seven-days-or-thirty-rq-26) |
| Metrics (success/failure counts, P95) | The last **30 days** | [Observability](https://www.palantir.com/docs/foundry/observability/overview/) · [Metrics](https://www.palantir.com/docs/foundry/aip-observability/metrics/) | [03-04](../03-ontology-and-aip-observability/04-metrics-performance-and-observability-dashboards.md#metrics) |
| Alert history on the alert debug page | The past **30 days** | [Alert debug page](https://www.palantir.com/docs/foundry/monitoring-views/alert-debug-page/) | [01-03](../01-monitoring-views/03-alerts-the-debug-page-and-external-systems.md#the-alert-debug-page) |
| Own-execution log access without log access enabled | The past **24 hours**; not on CBAC stacks | [Log permissions](https://www.palantir.com/docs/foundry/aip-observability/log-permissioning/) | [03-03](../03-ontology-and-aip-observability/03-log-search-and-log-permissions.md#who-may-read-logs) |
| Global log search timestamp range | Maximum **30 days**; default the past day | [Log search](https://www.palantir.com/docs/foundry/aip-observability/log-search/) | [03-03](../03-ontology-and-aip-observability/03-log-search-and-log-permissions.md#searching-and-reading) |
| Single-source-executor search range | The enrollment's log retention period, shown by the date picker | [Log search](https://www.palantir.com/docs/foundry/aip-observability/log-search/) | 03-03 |
| Log search result pages | **100** entries (single-source), **25** (global) | [Log search](https://www.palantir.com/docs/foundry/aip-observability/log-search/) | 03-03 |
| Failure rate colour mode window | Default **Past 4 hours**; longest **one day**; refreshes about **once a minute** | [Metrics](https://www.palantir.com/docs/foundry/aip-observability/metrics/) | [03-04](../03-ontology-and-aip-observability/04-metrics-performance-and-observability-dashboards.md#the-failure-rate-colour-mode) |

## Monitoring rules: defaults, windows and fixed behaviours

| What | Value | Docs page | Note |
|---|---|---|---|
| Consecutive schedule failures default | Medium at **one** failure, high at **three** | [Monitoring rules reference](https://www.palantir.com/docs/foundry/monitoring-views/rules-reference/) | [01-02](../01-monitoring-views/02-monitoring-rules-reference.md#schedules) |
| Changelog and merge-changes job failures default | Medium at one, high at three | [Monitoring rules reference](https://www.palantir.com/docs/foundry/monitoring-views/rules-reference/) | [01-02](../01-monitoring-views/02-monitoring-rules-reference.md#objects-and-links) |
| Scroll job failures default | Low at **one**, medium at **three**, high at **seven** | [Monitoring rules reference](https://www.palantir.com/docs/foundry/monitoring-views/rules-reference/) | 01-02 |
| Fixed high severity rules | Sync jobs failing; invalid stream records (≥ **1** ignored row); invalid direct write records (≥ 1 rejected record); automation disabled by the system | [Monitoring rules reference](https://www.palantir.com/docs/foundry/monitoring-views/rules-reference/) | 01-02 |
| Object and link stream liveness default | **2 minutes** at high | [Monitoring rules reference](https://www.palantir.com/docs/foundry/monitoring-views/rules-reference/) | 01-02 |
| Derived stream liveness default; consecutive checkpoint failures | **5 minutes**; high at **five** failures | [Monitoring rules reference](https://www.palantir.com/docs/foundry/monitoring-views/rules-reference/) | [01-02](../01-monitoring-views/02-monitoring-rules-reference.md#streaming-datasets) |
| Sustained lag window | **2 minutes** through **1 hour**, default **5 minutes**; total lag V2 default **1,000** records | [Monitoring rules reference](https://www.palantir.com/docs/foundry/monitoring-views/rules-reference/) | 01-02 |
| Ingest stream windows | **5 minutes**, **30 minutes**, **1 hour**, **4 hours**, and **1 day** | [Monitoring rules reference](https://www.palantir.com/docs/foundry/monitoring-views/rules-reference/) | 01-02 |
| Live deployment job queue sampling | Every **30 seconds** | [Monitoring rules reference](https://www.palantir.com/docs/foundry/monitoring-views/rules-reference/) | [01-02](../01-monitoring-views/02-monitoring-rules-reference.md#live-deployments) |
| Time series sync and geotemporal windows | The last **5 or 30 minutes** | [Monitoring rules reference](https://www.palantir.com/docs/foundry/monitoring-views/rules-reference/) | 01-02 |
| Composite failure-rate rule example | **10**% failures and **10** runs over **5 minutes** | [Monitoring rules reference](https://www.palantir.com/docs/foundry/monitoring-views/rules-reference/) | [01-02](../01-monitoring-views/02-monitoring-rules-reference.md#functions) |
| Alert debug page scope | Function and action type resources with **single-condition** rules only | [Alert debug page](https://www.palantir.com/docs/foundry/monitoring-views/alert-debug-page/) | 01-03 |
| SOPs per monitor rule | Up to **two** (rule SOP and default template SOP) | [Alert debug page](https://www.palantir.com/docs/foundry/monitoring-views/alert-debug-page/) | 01-03 |
| PagerDuty for health checks | Views created before **v1.860.0** (February 2024) must enable it manually | [Sending alerts to external systems](https://www.palantir.com/docs/foundry/monitoring-views/external-systems/) | [01-03](../01-monitoring-views/03-alerts-the-debug-page-and-external-systems.md#pagerduty) |

## Health checks

| What | Value | Docs page | Note |
|---|---|---|---|
| Dataset partition check | Always passes under **50** files; with 50 or more, passes if at least **90%** of files exceed **96MB** | [Checks reference](https://www.palantir.com/docs/foundry/health-checks/checks-reference/) | [02-03](../02-health-checks/03-checks-reference.md#size-checks) |
| Approximate standard deviation | σ = MAD × **1.4826** | [Checks reference](https://www.palantir.com/docs/foundry/health-checks/checks-reference/) | [02-03](../02-health-checks/03-checks-reference.md#approximate-standard-deviation) |
| Watching example | Build duration fails Moderately at **5** minutes, Critically at **10** | [Watching checks](https://www.palantir.com/docs/foundry/health-checks/watching-checks/) | [02-02](../02-health-checks/02-schedules-watching-and-notifications.md#who-is-told) |
| Check schedule example | A **1 hour** threshold: update at 58 minutes passes and resets; at 62 minutes the check fails at 60 | [Check schedules](https://www.palantir.com/docs/foundry/health-checks/check-evaluation/) | [02-02](../02-health-checks/02-schedules-watching-and-notifications.md#when-a-time-based-check-runs) |
| Check-group digest example | As often as every **15 minutes**, or weekly | [Check groups (Sunset)](https://www.palantir.com/docs/foundry/monitoring-views/check-groups/) | [01-04](../01-monitoring-views/04-monitoring-faq-and-the-check-groups-sunset.md#check-groups) |

---
[Module index](README.md) · [Observability home](../README.md)
