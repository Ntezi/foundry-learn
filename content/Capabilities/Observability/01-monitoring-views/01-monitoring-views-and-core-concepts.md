# 01 — Monitoring views and core concepts

*Sources: [Monitoring views](https://www.palantir.com/docs/foundry/monitoring-views/overview/) · [Core concepts](https://www.palantir.com/docs/foundry/monitoring-views/core-concepts/) · checked October 23, 2026 · Ready for Review*

The vocabulary first, because the overview page uses all of it at once; then the overview, read as the **life of one alert**: a rule is written on a scope, fires on a resource, reaches subscribers, is debugged, snoozed, and followed into the lineage view.

## The vocabulary

**[Docs]** From the core-concepts page, in the order the page gives them:

| Term | What the docs say | What to remember |
|---|---|---|
| **Metric** | Resources emit metrics or logs; monitors are built on top of them "to set a user's standards of performance on a given resource" | The metric exists whether or not anyone monitors it |
| **Resource** | A thing in Foundry that can be monitored: datasets, agents, schedules, objects, link types, live deployments | The overview's table lists all twelve types |
| **Scope** | "the boundary around the set of resources on which your thresholds are set"; **static** (*Single*: one chosen resource) or **dynamic** (*Folder*, not including subfolders; *Project*, one or several; *Workflow Lineage*, *Workshop*, *OSDK application* for function and action rules), updating "without requiring manual changes to the monitor" | Dynamic scope is the whole reason monitoring views exist |
| **Monitoring rule** | A threshold or set of thresholds on a resource type's metrics within a scope: resource type, metric threshold tolerances, severity | One rule, many resources |
| **Composite monitoring rule** | Several conditions joined by AND; "triggers only when every condition reaches a configured severity"; with different severities reached, it fires at "the lowest severity reached by all conditions" | The function failure-rate rules in [02](02-monitoring-rules-reference.md#functions) |
| **Monitoring view** | "A collection of monitoring rules that a group of subscribers care about" | A filesystem resource, saved in a project |
| **Subscriber** | A user subscribed to a monitoring view | Groups can be subscribed too |
| **Alert** | A notification with a low, medium or high assignment, sent to subscribers | Fires and resolves |
| **Severity** | LOW, MEDIUM or HIGH; "Severity acts as a routing mechanism": in-Foundry notifications and each external integration are configured against one severity level, and "only alerts matching that severity trigger the integration" | Route HIGH to a pager and MEDIUM and LOW to a queue, or everything to one chat channel: the page offers both |

**[Explanation]** The sentence to carry into module 03 is the one about severity being a routing mechanism. Severity is not a priority label for humans to read later; it is the key that picks the channel. A rule with no integration configured for its severity reaches only the Foundry inbox and email of subscribers. That is why [03](03-alerts-the-debug-page-and-external-systems.md) repeats "per severity level" for every integration.

## What can be watched, and with which scope

**[Docs]** The overview's table:

| Resource type | Supported scopes |
|---|---|
| Agent, object type, link type, schedule, automation | Single, Project |
| Streaming dataset, dataset | Single, Folder, Project |
| Live deployment, time series sync, geotemporal observation | Single |
| Function, action type | Single, Project, Workflow Lineage, Workshop, OSDK application |

**[Docs]** Two conditions on the table. Project scope with **ontology resources** (object types, link types) needs the ontology migrated to **project-based permissions** first ([Ontology 12-02](../../Ontology/12-security-and-governance/02-ontology-resource-permissions.md)). And the opening line of the page: monitoring views "are a collection of monitoring rules and health checks", offering "expanded functionality beyond what is available in check groups", which the docs recommend upgrading ([04](04-monitoring-faq-and-the-check-groups-sunset.md)). "If you need detailed content and schema validation, consider using health checks".

## The life of an alert

### 1. Create the view and add rules

**[Docs]** *Monitoring View* tab in the top right of Data Health, *New monitoring view*. On the *Manage monitors* tab, *Add monitoring rules*: pick the resource type, then the scope. Monitors are set "on the metrics emitted by a resource"; Foundry suggests "certain configurations based on Foundry's standards for health", which you can change, and you can monitor only some metrics. Severity per rule: low, medium, high. For composite rules, "configure a threshold for each condition at every alert severity". Edit a monitor from the list, in the side panel.

**[Docs]** Existing **health checks** can be added to the view (*Add health check*, top right; filter or search for a dataset; select; *Add checks*), but "This dialog only adds health checks that already exist": new checks are made on the dataset's Health tab, or on several datasets at once from Data Lineage ([02-01](../02-health-checks/01-health-checks-and-the-types-of-checks.md)).

**[Docs]** Permissions: "You must have Viewer permission on the resources to monitor them. To receive alerts triggered by monitoring rules, you must have Viewer permission on the resources and the monitoring view."

### 2. Subscribe and route

**[Docs]** *Manage subscriptions* lists subscribed users; add users and groups and "configure their alerts based on severity". A subscriber is "notified via email and Foundry notifications". External systems (PagerDuty, Slack, webhooks) are configured on the same tab ([03](03-alerts-the-debug-page-and-external-systems.md)).

### 3. Troubleshoot

**[Docs]** The *Troubleshoot alerts* tab lists alerts "by alert name, resource, failure reason, and the time of reported alert", with view options, *group by project*, and a type filter "(for checks only)". For an individual monitor rule, the **alert debug page** gives metrics, alert history and diagnostics ([03](03-alerts-the-debug-page-and-external-systems.md#the-alert-debug-page)).

### 4. Snooze

**[Docs]** Two levels. An **individual alert** (health check or monitor) is snoozed from the Troubleshoot alerts panel or the bell icon in the context panel's *About* tab, with a duration and a reason; snoozed alerts carry an inline bell tag showing who, when and why; *Hide snoozed alerts* hides them and a footer banner counts them; *Unsnooze* or expiry resumes. The difference from checks: "Unlike health check alerts, snoozed monitor alerts remain snoozed even if they re-fire." A whole **monitor rule** can be snoozed from *Manage monitors*, silencing "alerts across all targets within that rule's scope at once"; a rule-level snooze replaces any existing target-level snoozes for that rule.

**[Explanation]** The re-fire sentence is the operational trap. Snoozing a health check alert buys silence until the check fails *again*; snoozing a monitor alert buys silence for the duration, however many times the metric crosses the threshold. The first suits a flapping check you expect to settle; the second suits a known outage with a known end. Snoozing the rule is for *we know, we're on it, everything in this scope* and should come with the reason filled in, because the tag is the only record.

### 5. From an alert to the lineage

**[Docs]** From the Troubleshoot alerts tab or the debug page, an alert opens the resource's lineage: datasets, schedules and object types in **Data Lineage**; functions, action types and automations in **Workflow Lineage** "with the Run history tab selected". For function and action rules the run history is **pre-filtered** by rule type:

| Rule type | Pre-filter applied |
|---|---|
| Duration p95 | Run time range set to the monitor's threshold, "showing only executions that exceeded the threshold" |
| Number of failures in window | Status *Failed*; timestamp range from the start of the monitor's window at the time the alert fired |
| Number of user-facing failures in window | As above, plus failure reason *User facing error* |

### 6. See coverage, not just alerts

**[Docs]** Open a workflow as a graph in Workflow Lineage, choose **Monitoring status** under *Health* in the colour legend, and each node is coloured "by the highest severity among the monitors currently firing against that resource". Legend keys: *All monitors healthy*, *Low*, *Medium*, *High severity*, **No monitors configured** ("the resource can be monitored, but no monitoring rules target it"), *Not applicable*. "Use No monitors configured to find gaps in coverage". Three behaviours: only firing monitors affect the colour; a rule that hasn't computed its first status "is treated as healthy"; **AIP Logic nodes take the status of their backing function**. The colour reflects only the monitoring views you can see ("A resource may have additional alerts that are not visible to you"), and the mode appears only if monitoring views are available on the enrollment.

**[Explanation]** This is the audit tool for module 04: colour Kestrel's Delivery Desk workflow by monitoring status and every grey *No monitors configured* node is a resource nobody is watching. It also settles a question [Ontology 14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md) raised about automations in the *Failure rate* colour mode: that mode reads metrics automations don't report; the *Monitoring status* mode reads firing rules, and automations do have rules ([02](02-monitoring-rules-reference.md#automations)).

### 7. Upgrade a check group

**[Docs]** Open the check group, *Upgrade to monitoring view* in the banner; create a new view or move the checks into an existing one. "Monitoring views are filesystem resources", so store a new one "in a project accessible to potential subscribers". Checks keep working unchanged ("no changes to email digest, alerting, subscriptions"); each check group links to one monitoring view and vice versa. More in [04](04-monitoring-faq-and-the-check-groups-sunset.md).

## For Kestrel

**[Example]** *Adopted* in Phase 6 ([04](../04-kestrel-case/README.md)), checked against [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md) and the groups in [Security 11-01](../../Security/11-kestrel-case/01-kestrels-access-model-built-out.md#who-holds-what):

- **Two monitoring views, by audience**, as the FAQ advises (one view per set of people who care): `Commerce operations` in `Delivery Desk [Workflow]`, subscribers Ama's team lead, Daniel and Priya, covering the four commerce projects (only Priya holds a role on the datasource and transform projects, so their alerts reach her inbox alone; the external routes in [03](03-alerts-the-debug-page-and-external-systems.md) carry them to the channel); `Kestrel Pay operations` in `Payments [Ontology]`, subscribers Lena's team and the Kestrel Pay engineers. The view is a filesystem resource, so each sits in a project its subscribers already hold Viewer on. `Payments [Ontology]` is not marked at project level ([Ontology 02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout)), so the view itself is readable by anyone with a role there; its alerts about marked datasets still reach only subscribers who hold the marking, because alerts need Viewer on the resource.
- **Dynamic scopes everywhere a rule allows**: Project scope for datasets, schedules and automations in each project; **Workshop** scope on the Delivery Desk module for its functions and actions, so a new action Daniel adds is covered the day it ships; **OSDK application** scope on the customer portal's application for the functions it calls. Object types get Project scope, which Kestrel can use because its ontology is already on project-based permissions (17-02 §7).
- **No alerts for Kofi's warehouse staff.** They are not subscribed: alerts are the ontology team's job, not theirs, and a subscription would only reach the resources they can already see.
- **The coverage check**: before each Delivery Desk release ([Security 03-04](../../Security/03-discretionary-controls-propagation-and-diagnosis/04-diagnosing-access.md#for-kestrel) already has a release checklist), colour the workflow by *Monitoring status* and clear every *No monitors configured* node, either with a rule or with a written reason.

---
[Module index](README.md) · Next: [02 — Monitoring rules reference](02-monitoring-rules-reference.md)
