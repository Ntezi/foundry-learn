# 02 — Monitoring rules reference

*Sources: [Monitoring rules reference](https://www.palantir.com/docs/foundry/monitoring-views/rules-reference/) · checked October 23, 2026 · Ready for Review*

The longest page in the area, read as a **decision sheet**: for each resource type, which rules exist, what each one compares, the example or recommended value, and which severities are fixed. The page's own structure is kept (eleven resource types), the per-rule tables are collapsed into one row each, and the explanations say which rule to reach for. Every value is the page's **example option** or **recommendation**, dated October 23, 2026; they are starting points, not limits.

**[Docs]** Two things apply throughout. Most rules have a configurable **Alert severity** (Low, Medium, High); "Some rules have a fixed severity, as noted in the tables below." And a view "can be configured to only send alerts that meet or exceed a certain severity."

## Agents

**[Docs]** Ten single-condition rules for Data Connection agents, all configurable:

| Rule | Fires when… | Example / recommendation |
|---|---|---|
| Agent last heartbeat time | time since the bootstrapper's last heartbeat is greater than | **10 minutes** (recommended) |
| Agent manager last heartbeat time | the same for the agent manager | 10 minutes |
| Agent manager version stale time / Agent version stale time | the component has been on an old version for longer than | **10 days** (recommended, both) |
| High CPU utilization | CPU percentage greater than | **80** (recommended) |
| JVM heap usage is close to the limit | heap used / available greater than | **70** (recommended) |
| Low disk space | available disk less than | **10GB** (recommended) |
| Time until earliest keystore / truststore certificate expires | time until expiry less than | "medium severity at less than 30 days and high severity at less than 10 days" (recommended, both) |
| Queue size | jobs in the agent's queue greater than | **70** (recommended) |

**[Explanation]** This is the one resource type where the page recommends almost every value, because an agent is a box the customer runs ([Security 10-04](../../Security/10-privacy-governance-and-enterprise-security/04-infrastructure-security-and-disaster-recovery.md)) and the thresholds are about the box, not the data. The two certificate rules are the only place on the page where two severities are recommended for one metric.

## Schedules

| Rule | Fires when… | Example / default |
|---|---|---|
| **Consecutive schedule failures** | consecutive failures ≥ the threshold; "does not count schedule runs that result in a canceled build" | Default: "medium severity at one failure and high severity at three failures", though "highly dependent on the frequency and stability of the schedules" in scope |
| **Schedule duration** | a schedule runs longer than | 2 hours; "typically used on highly critical schedules" and "often schedule-scoped" |

**[Explanation]** These two replaced health checks (schedule status and duration, [04](04-monitoring-faq-and-the-check-groups-sunset.md)), and the second sentence of each is the design advice: a failure count across a whole project of schedules is fine, a duration threshold is per schedule, because durations differ.

## Objects and links

**[Docs]** The rules alert on **user-caused failures**: "a job failure that results from a problem with the configuration or input data, such as an invalid schema, a malformed row, or insufficient permissions", as opposed to transient or infrastructure failures "typically resolved automatically by retries", which these alerts don't surface.

| Rule | Fires when… | Example / default | Severity |
|---|---|---|---|
| **Changelog jobs failing** | consecutive user-caused changelog failures on the active or replacement pipeline ≥ | 1; default medium at one, high at three | Configurable |
| **Merge changes job failing** | the same for the merge-changes job | 1; default medium at one, high at three | Configurable |
| **Sync jobs failing** | a foreground sync job "fails terminally": not retryable, or too many unrecoverable errors | — | **Fixed high** |
| **Scroll job failing on pipeline** | consecutive scroll-job failures ≥ (scroll jobs stream data "from the backing datasource to the object databases") | 3; default low at one, medium at three, high at seven | Configurable |
| **Sync propagation delay** | a backing dataset's transaction took longer than the threshold to sync | 1 day | Configurable |
| **Liveness: time since last successful checkpoint** | a stream backing the object or link hasn't checkpointed within | default 2 minutes at high | Configurable |
| **Invalid stream records detected** | records in an input stream violate the format; "The scroll job ignores these records" | ≥ 1 ignored row | **Fixed high** |
| **Invalid direct write records detected** | direct-write records rejected for validation failures | ≥ 1 rejected record | **Fixed high** |

**[Explanation]** These are the rules [Ontology 13-02](../../Ontology/13-backend-architecture/02-indexing-and-funnel.md) meant by *Monitor the health of this object type*: the three Funnel job families (changelog, merge changes, scroll) plus sync propagation delay for freshness. Note which of them are fixed high: a terminal sync failure and any invalid record. Those aren't tunable because there is no acceptable number of them.

## Streaming datasets

**[Docs]** Two groups. **Derived stream monitors** (fifteen rules, all configurable, single condition): last checkpoint duration (greater than 7 minutes); liveness, time since last successful checkpoint (default 5 minutes; covers streams not running and streams failing to checkpoint); consecutive checkpoint failures (default high at 5); checkpoint trigger failure rate (greater than 0 in a 5-minute window); **total lag**, unprocessed upstream records greater than 1000, and **total lag V2**, ≥ 1,000 "throughout a 5-minute window"; **sustained lag**, lag ≥ 1,000 "for the entire configured window", window from 2 minutes through 1 hour, default 5 minutes; checkpoint size greater than 100 bytes; **total throughput**, records per checkpoint less than 100, and its V2 pair (less than / greater than, over a 5-minute window); Job Manager and Task Manager CPU and memory usage, 80%, the Task Manager pair "throughout a 10-minute window". The page's gloss on lag and throughput: either "streaming transforms are taking too long to run, or there is a problem with the streaming transforms infrastructure".

**[Docs]** **Ingest stream monitors** (four): records ingested over a selected window ≤ 100, windows of 5 minutes, 30 minutes, 1 hour, 4 hours and 1 day; total throughput ≤ or ≥ 100 records per second over 5 minutes; **high source staleness** greater than 20 seconds, "available only when latency sampling is enabled and the data connection task supplies a source timestamp".

**[Explanation]** The V2 and windowed variants exist to stop flapping: a single reading over a threshold is noise on a stream, a reading that stays there for five minutes is a condition.

**[Recommendation]** Prefer the V2 or *sustained* form of a rule when the page offers one.

## Live deployments

**[Docs]** Single scope only. Rules with an **evaluation window** "alert only when their condition holds throughout the entire window"; a brief excursion that recovers doesn't fire. The provisioning rules use a **scaling deficit**: ideal replica count (from load) minus target count (after replica limits and scheduled overrides); positive means under-provisioned.

| Rule | Fires when… | Example | Window |
|---|---|---|---|
| Live deployment heartbeat | no heartbeat for ≥ | 1 minute | — |
| Replica over-provisioning | scaling deficit less than 0 throughout the window; set the window "longer than the scale-down delay" | 0 | 30 minutes |
| Replica under-provisioning | scaling deficit greater than 0 throughout the window; consistent alerts suggest raising the maximum replica count | 0 | 30 minutes |
| High job queue | queued jobs ≥ (sampled every 30 seconds) | 30 | 5 minutes |
| CPU usage | any container's CPU ≥ percentage of its *requested* CPU | 80% | 2 minutes |
| Container out of memory | cumulative restarts greater than the threshold **and** the last termination was out-of-memory; "The restart count persists for the lifetime of the replica" | 1 | 2 minutes |
| Unresponsive replicas | percentage of replicas that can't respond or fail readiness ≥ | 50% | 10 minutes |

**[Explanation]** [DevTools 03-03](../../DevTools/03-compute-modules-and-custom-endpoints/03-debugging-history-and-cost.md) read the replica states (Starting, Responsive, Unresponsive) from the compute-module side; these rules are the alerting side of the same states, for model live deployments.

## Time series syncs, datasets, geotemporal observations

| Resource | Rule | Fires when… | Example / default |
|---|---|---|---|
| Time series sync | Points written over the last 5 or 30 minutes | points ≤ | 100 |
| Time series sync | Stream liveness: time since last successful checkpoint | ≥ | default 2 minutes at high |
| **Dataset** | **Time since job last succeeded** | no job succeeded within | 1 day; set it "based on your dataset's expected update frequency" |
| Geotemporal observation | Observations sent over the last 5 or 30 minutes | ≤ | 100 |

**[Docs]** The dataset rule differs from the *Time since last updated* health check: two things **pass** the monitor that would fail the check: "The job succeeded, but the transaction was aborted" and "The job succeeded, but no new data was added".

**[Explanation]** So the rule watches *the job ran*, the check watches *data arrived*. A nightly sync that runs and finds nothing new keeps the rule green and turns the check red. Pick by what you promise downstream: if Ama's queue needs *today's* shipments, that is the health check ([02-03](../02-health-checks/03-checks-reference.md)); if Priya needs to know the schedule is alive across forty datasets, that is the rule.

## Automations

**[Docs]** Six rules, for automations and time series streaming automations alike:

| Rule | Fires when… | Example | Severity |
|---|---|---|---|
| Automation has no new evaluations | no evaluation for ≥ the threshold; "does not alert when the automation has not been triggered" | 1 hour | Configurable |
| Automation has no new triggers | no trigger for ≥ | 1 day | Configurable |
| **Automation has been disabled by the system** | disabled "due to reaching limits or triggering cycles" | — | **Fixed high** |
| Repeated execution failures in a window | failed executions greater than the threshold in the window; for automations "that keep running and failing rather than ones the system has already disabled" | 0 in 1 hour | Configurable |
| Repeated evaluation failures in a window | failed evaluations greater than; "trigger conditions fail to evaluate" | 0 in 1 hour | Configurable |
| High number of effect execution failures in a window | failed effects greater than; effects "are the downstream actions or notifications the automation runs" | 0 in 1 hour | Configurable |

**[Explanation]** Three failure places, three rules: the trigger didn't fire (no new triggers), the condition couldn't be evaluated (evaluation failures), the effect failed (effect failures). [Apps 08-06](../../Apps/08-automate/06-operating-automations.md) covered what the system does when it disables an automation; the fixed-high rule here is how you hear about it without opening the automation.

## Functions

**[Docs]** Failure types are listed on the Functions docs' *function failure types* page ([Ontology 09-03](../../Ontology/09-functions/03-function-lifecycle.md) summarised them). Six rules:

| Rule | Condition | Failure types | Example |
|---|---|---|---|
| Function duration p95 | p95 "measured over a sliding window of recent data" greater than | — | 10s |
| Number of function failures in window | failures greater than, in the window | All | 0 in 1 hour |
| Number of user-facing function failures in window | the same | User-facing only | 0 in 1 hour |
| Number of non-user-facing function failures in window | the same; "useful for monitoring infrastructure and system-level failures without noise from expected user input errors" | All except user-facing | 0 in 1 hour |
| **Function failure rate in window** | **composite**: failure percentage greater than **and** total run count greater than | All | 10% and 10 runs in 5 minutes |
| **Non-user-facing function failure rate in window** | composite, the same shape | All except user-facing | 10% and 10 runs in 5 minutes |

**[Docs]** Why composite: the run-count condition "prevents alerts based on too little data" and stops the rule "triggering on low-traffic functions".

## Actions

| Rule | Condition | Failure types | Example |
|---|---|---|---|
| Action duration p95 | sliding-window p95 greater than | — | 10s |
| Number of action failures in window | failures greater than, in the window | All | 0 in 1 hour |
| Number of non-user-facing action failures in window | the same, excluding "user-facing errors thrown by function-backed action code" | All except user-facing function failures | 0 in 1 hour |

**[Explanation]** Actions have no failure-rate composite and no user-facing-only count; functions have both. If you want a rate on an action, monitor its backing function. And the rule to put on a production action is the **non-user-facing** count: a user-facing error is a validation message doing its job, as [Ontology 09-03](../../Ontology/09-functions/03-function-lifecycle.md) put it, and counting it as a failure teaches people to ignore the alert.

## Reading the sheet

**[Recommendation]** Four habits the page's own wording supports:

1. **Take the recommended value where there is one** (agents, schedules, objects), and write down why where there isn't (datasets, functions): the examples are examples.
2. **Prefer the rule that excludes what you expect**: non-user-facing counts over all-failure counts; sustained or V2 lag over instantaneous lag.
3. **Know the fixed-high rules** so you don't try to tune them: terminal sync failure, invalid stream or direct-write records, automation disabled by the system.
4. **Match the scope to the metric**: durations are per resource (schedule duration is "often schedule-scoped"); counts and heartbeats suit a project.

## For Kestrel

**[Example]** *Adopted* in Phase 6 ([04](../04-kestrel-case/README.md)), the rule picks for the two views in [01](01-monitoring-views-and-core-concepts.md#for-kestrel):

| View | Scope | Rules |
|---|---|---|
| `Commerce operations` | Project: `Storefront [Datasource]`, `Commerce [Transform]` | Consecutive schedule failures (defaults: medium at 1, high at 3); Time since job last succeeded on the datasource project, with the threshold taken from each dataset's `refresh` tag (`hourly`, `daily`, `static`; [Security 08-02](../../Security/08-compass/02-moving-sharing-tagging-uploading-and-the-data-catalog.md#for-kestrel)); the actual cadences aren't recorded in 17-02 and are logged as an open item |
| `Commerce operations` | Project: `Commerce [Ontology]` object types | Changelog, merge-changes and scroll job failures at the defaults; **Sync propagation delay 1 hour on `Shipment`** (14-06's requirement that the queue sees shipments under an hour old) and 1 day on the rest; the three fixed-high rules added as well |
| `Commerce operations` | Workshop: Delivery Desk | Function **non-user-facing** failure rate (10%, 10 runs, 5 minutes) and p95 duration 10s on `draftDelayMessage` and the queue's functions; **non-user-facing action failures** greater than 0 in 1 hour on *Re-route shipment* and *Hold order*; no all-failure or user-facing rules |
| `Kestrel Pay operations` | Project: `Kestrel Pay [Datasource]`, `Payments [Ontology]` | The schedule and dataset rules as above; action rules on *Issue refund* |
| `Kestrel Pay operations` | Project automations in `Payments [Ontology]` | *High-risk payment hold* (project-scoped there, [17-02 §6](../../Ontology/17-case-studies/02-kestrel-reference-model.md#6-functions-automations-and-the-agent)): disabled by the system (fixed high), effect execution failures greater than 0 in 1 hour, no new evaluations in 1 day; the paired *High-risk payment alert* the same ([Ontology 10-06](../../Ontology/10-applications/06-automate-and-ontology-events.md)) |

Not adopted: agent rules (no on-premise agent is recorded for Kestrel, [Security 10-04](../../Security/10-privacy-governance-and-enterprise-security/04-infrastructure-security-and-disaster-recovery.md#for-kestrel)), streaming and live-deployment rules (17-02 records no streams and no model live deployment: the Kestrel Pay model runs in the compute module `kestrel-pay-llm`, which isn't a monitoring-view resource type and is watched through its Metrics tab, [03-04](../03-ontology-and-aip-observability/04-metrics-performance-and-observability-dashboards.md)), and the user-facing failure counts, for the reason above.

---
[Module index](README.md) · Previous: [01 — Monitoring views and core concepts](01-monitoring-views-and-core-concepts.md) · Next: [03 — Alerts: the debug page and external systems](03-alerts-the-debug-page-and-external-systems.md)
