# 02 — Kestrel's monitoring posture

*Sources: no new doc pages; the Kestrel decisions in [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md) and [14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md), and the *For Kestrel* sections of modules 01–03 · assembled October 23, 2026; statuses settled in Phase 6 the same day · Ready for Review*

Every monitoring and debugging decision Kestrel has **today**, from the earlier areas, and every decision this area added, with its status. This is the register Phase 6 worked from: each row marked **A** was adopted into [17-02 §7](../../Ontology/17-case-studies/02-kestrel-reference-model.md#7-security-environments-and-governance) on October 23, 2026 and built out in [04-01](../04-kestrel-case/01-the-delivery-desk-monitored.md) and [04-02](../04-kestrel-case/02-triage-at-kestrel-from-alert-to-fix.md), which also revises the [14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md) calendar; rows marked **C** were considered and not adopted; rows marked **O** are open items recorded in 17-02 §9. Everything here is **[Example]**.

## What Kestrel has from the earlier areas

| Rule | Decided in |
|---|---|
| An operations calendar: daily (Data Health alerts, action failure counts, the payment-hold automation's run history), weekly and monthly items; a triage flowchart from alert to run history to trace or service logs; the rule to plan for seven days of run history (RQ-26) | [Ontology 14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md) |
| A Sync Propagation Delay rule on `Shipment` (the queue needs shipments under an hour old) and job-failure rules on every type with user edits | [Ontology 13-02](../../Ontology/13-backend-architecture/02-indexing-and-funnel.md) |
| The *High-risk payment hold* automation, project-scoped in `Payments [Ontology]`, and the user-scoped *High-risk payment alert* | [Ontology 17-02 §6](../../Ontology/17-case-studies/02-kestrel-reference-model.md#6-functions-automations-and-the-agent), [Apps 08-05](../../Apps/08-automate/05-security-ownership-and-history.md) |
| A *Delivery Desk health* page of Observability Charts for `draftDelayMessage` and *Hold order* on one shared time range | [Apps 03-06](../../Apps/03-workshop-widgets/06-ai-observability-and-embedding.md), [11-01](../../Apps/11-kestrel-case/01-delivery-desk-queue-built-out.md) |
| The customer portal's error handling and Developer Console usage metrics | [DevTools 09-01](../../DevTools/09-kestrel-case/01-customer-portal-built-out.md#errors-limits-and-monitoring) |
| The audit export's four standing queries; the release checklist (emulation, *Check access*); two custom code-scanning rules | [Security 10-02](../../Security/10-privacy-governance-and-enterprise-security/02-audit-logs.md#for-kestrel), [03-04](../../Security/03-discretionary-controls-propagation-and-diagnosis/04-diagnosing-access.md#for-kestrel), [10-05](../../Security/10-privacy-governance-and-enterprise-security/05-code-scanning.md#for-kestrel) |
| The ontology on project-based permissions; `Payments [Ontology]` unmarked at project level, its datasets marked by inheritance | [Ontology 17-02 §7](../../Ontology/17-case-studies/02-kestrel-reference-model.md#7-security-environments-and-governance), [02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout) |

## What this area added

Status: **A** adopted (Phase 6); **C** considered, not adopted; **O** open, needs a decision or a fact from outside the notes.

### Monitoring views (module 01)

| # | Proposal | Status | Note |
|---|---|---|---|
| 1 | Two monitoring views by audience: `Commerce operations` in `Delivery Desk [Workflow]` (Ama's team lead, Daniel, Priya; the four commerce projects) and `Kestrel Pay operations` in `Payments [Ontology]` (Lena's team, the Kestrel Pay engineers) | A | [01-01](../01-monitoring-views/01-monitoring-views-and-core-concepts.md#for-kestrel) |
| 2 | Dynamic scopes: Project for datasets, schedules, automations and object types; Workshop on the Delivery Desk; OSDK application on the portal | A | 01-01 |
| 3 | No subscriptions for Kofi's warehouse staff | A | 01-01 |
| 4 | The *Monitoring status* colour mode added to the release checklist: every *No monitors configured* node gets a rule or a written reason | A | 01-01 |
| 5 | Schedule rules at the defaults on the pipeline projects; *time since job last succeeded* with thresholds from each dataset's `refresh` tag | A (cadence O) | [01-02](../01-monitoring-views/02-monitoring-rules-reference.md#for-kestrel) |
| 6 | Object rules on `Commerce [Ontology]`: changelog, merge and scroll failures at the defaults, Sync propagation delay 1 hour on `Shipment`, 1 day elsewhere, the fixed-high rules | A | 01-02 |
| 7 | Function and action rules on the Delivery Desk: non-user-facing failure rate (10%, 10 runs, 5 minutes) and p95 10s; non-user-facing action failures on *Re-route shipment* and *Hold order*; no all-failure or user-facing rules | A | 01-02 |
| 8 | Automation rules on both payment automations in the `Kestrel Pay operations` view: disabled by the system, effect failures, no new evaluations | A | 01-02 |
| 9 | Kestrel Pay view: schedule and dataset rules; action rules on *Issue refund* | A | 01-02 |
| 10 | Agent, streaming and live-deployment rules; user-facing failure counts | C | 01-02 |
| 11 | Routing: HIGH to one PagerDuty service (the 14-06 on-call) from both views; MEDIUM to `#delivery-desk-ops` or `#kestrel-pay-ops`; LOW to Foundry notifications (commerce) or the same Slack channel (payments) | A | [01-03](../01-monitoring-views/03-alerts-the-debug-page-and-external-systems.md#for-kestrel) |
| 12 | A Slack source owned by the platform administrators, token in the PAM; exportable markings limited to the Kestrel organization, so marked datasets appear as RIDs | A | 01-03 |
| 13 | One SOP Notepad per rule family, attached from *Manage monitors*, opening with *check Issues first* | A | 01-03, [01-04](../01-monitoring-views/04-monitoring-faq-and-the-check-groups-sunset.md#for-kestrel) |
| 14 | Webhook integrations | C | 01-03 |
| 15 | A check-group migration | C | 01-04 |

### Health checks (module 02)

| # | Proposal | Status | Note |
|---|---|---|---|
| 16 | Schedule status (Critical, escalate) and schedule duration (median deviation) on every schedule in the three pipeline projects; no job status checks under a schedule | A | [02-01](../02-health-checks/01-health-checks-and-the-types-of-checks.md#for-kestrel), [02-03](../02-health-checks/03-checks-reference.md#for-kestrel) |
| 17 | Both freshnesses on `customer_master` and the shipments dataset (shipments Moderate 1 hour, Critical 3 hours) | A | 02-01, 02-03 |
| 18 | Key uniqueness on `customer_master.customerId` and `policyRegion` validity as **data expectations** in the transforms, not checks | A | 02-01 |
| 19 | The checks table: row count, null percentage on `region`, strict-additions schema on `customer_master`; allowed `status` values on the orders dataset; row count, transaction size, amount range, primary key on the ledger; exact unordered schema on `shared_shipments`; partition check on raw storefront tables | A | 02-03 |
| 20 | Automatic schedules for freshness checks; a daily manual schedule for content checks | A (cadence O) | [02-02](../02-health-checks/02-schedules-watching-and-notifications.md#for-kestrel) |
| 21 | Two thresholds per continuous check (Moderate first sign, Critical unmistakable) | A | 02-02 |
| 22 | Issues on, auto-close, assigned to Priya (commerce) and a named Kestrel Pay engineer (ledger); every check added to its monitoring view; no individual watching except while tuning | A | 02-02 |
| 23 | Sync checks; approximate column relation | C | 02-03 |
| 24 | The FAQ's first questions as the schedule-failure SOP, ending with a hand-off to Priya's group; schedules kept off the hour and midnight | A | [02-04](../02-health-checks/04-builds-and-checks-faq-health-checks-in-a-marketplace-product.md#for-kestrel) |
| 25 | Delivery Desk v1.1 carries no health checks (it packages no transformation); the rule for a future product that does | A | 02-04 |

### Ontology and AIP observability (module 03)

| # | Proposal | Status | Note |
|---|---|---|---|
| 26 | Run history as the first stop of every SOP, opened from the alert's pre-filtered link; the list of Kestrel's source executors | A | [03-01](../03-ontology-and-aip-observability/01-overview-and-run-history.md#for-kestrel) |
| 27 | The weekly review kept within seven days of run history (RQ-26); monthly items read the 30-day metrics | A | 03-01 |
| 28 | A logging standard for Kestrel's functions (TypeScript v2, IDs in `body`, never a `Customer`, address, email, card number or prompt) in the repository templates | A | [03-02](../03-ontology-and-aip-observability/02-trace-views-service-logs-and-debugging.md#for-kestrel) |
| 29 | A third code-scanning rule for sensitive values in log calls | A | 03-02 |
| 30 | The trace view as the audit view for the agent's staged writes | A | 03-02 |
| 31 | The portal logs timestamp, service user and failing call; whether error responses carry a `foundryTraceId` it could keep | A (O) | 03-02 |
| 32 | Log access enabled per project with worst-case markings: `Customer PII` on the commerce projects, both markings on `Payments [Ontology]` | A | [03-03](../03-ontology-and-aip-observability/03-log-search-and-log-permissions.md#for-kestrel) |
| 33 | Who reads logs: Editor is the line (Daniel, Priya, the Kestrel Pay engineers); Viewers see metrics and their own 24 hours; no custom role | A | 03-03 |
| 34 | A resource-level override for the user-scoped *High-risk payment alert* | A | 03-03 |
| 35 | Who holds the Information security officer role at Kestrel (17-02 names nobody) | O | 03-03 |
| 36 | Log search habits in every SOP (single-source first, `*rror*`, originating code) | A | 03-03 |
| 37 | The health page gains *Re-route shipment* and the `kestrel-pay-llm` compute module | A | [03-04](../03-ontology-and-aip-observability/04-metrics-performance-and-observability-dashboards.md#for-kestrel) |
| 38 | Weekly: *Failure rate* colour mode over a day plus per-resource metrics; monthly: P95 trend and one trace of the slowest | A | 03-04 |
| 39 | `draftDelayMessage` called once per order, never in a loop | A | 03-04 |
| 40 | Log export to a stream beside the audit export | O (availability) | [00-01](01-the-observability-map.md) |

## Gaps this area leaves

**[Explanation]** Open items (status **O**) the notes could not settle from the docs: the refresh cadence of each pipeline dataset (5, 20), which sets every freshness threshold; who holds the Information security officer role (35); whether an OSDK error response carries a trace identifier the portal could log (31); whether log export is available on Kestrel's enrollment (40); and the seven-versus-thirty-day run history (Ontology RQ-26, re-checked in 03-01). They are recorded in [17-02 §9](../../Ontology/17-case-studies/02-kestrel-reference-model.md#9-known-gaps-in-the-example) alongside the existing gaps.

---
[Module index](README.md) · Previous: [01 — The observability map](01-the-observability-map.md) · Next module: [01 — Monitoring views](../01-monitoring-views/README.md)
