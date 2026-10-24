# 01 — Review questions by module

*Sources: the notes each question links to · written October 23, 2026 · not yet attempted*

Scenario questions in the style of the Application Developer Associate exam: a situation, a question, and the answer folded away. Each is tagged with its exam domain from the [official guide](../../../Tracks/Application%20Developer/07_Exam_Guide.md):

- **D3** Ontology functions (publishing and diagnosis)
- **D6** Automate and operational workflows (recovery and monitoring)
- **D7** AIP Logic and AI-powered applications (traces)
- **D8** Application security, governance and operations (operational diagnosis)
- **—** not in the Associate guide (useful for work, not the exam)

Answer before opening each one. Every answer links to the note that explains it. Kestrel questions use the design in [04](../04-kestrel-case/README.md).

## 00 — Orientation

**Q1 · D8** A colleague says *we monitor the Delivery Desk with Automate*. What is the confusion, and which tool does the monitoring?

<details><summary>Answer</summary>

Automate replaced *Object Monitoring* as the business-automation tool: conditions on objects or time, effects such as actions. Monitoring the platform's resources is **Data Health** (monitoring views and health checks); automations are one of the resource types it watches. [00-01](../00-orientation/01-the-observability-map.md#what-is-not-in-this-area)
</details>

**Q2 · D8** Which tool answers *is something wrong*, and which answers *what happened inside the execution*?

<details><summary>Answer</summary>

**Data Health** alerts that something is wrong and routes the news; **Workflow Lineage** (run history, traces, service logs, log search) shows what happened. An alert on a function or action opens its run history pre-filtered. [00-01](../00-orientation/01-the-observability-map.md#four-verbs-four-tools)
</details>

## 01 — Monitoring views

**Q3 · D6** Priya adds a fourth schedule to `Commerce [Transform]`. Nobody touches Data Health, yet it is monitored the next day. How?

<details><summary>Answer</summary>

A monitoring rule with a **dynamic scope** (Project) covers resources added to the scope later, "without requiring manual changes to the monitor". A health check or a Single-scope rule would not. [01-01](../01-monitoring-views/01-monitoring-views-and-core-concepts.md#the-vocabulary)
</details>

**Q4 · D8** A PagerDuty integration is configured on a monitoring view at MEDIUM. A rule fires at HIGH. Does anyone get paged?

<details><summary>Answer</summary>

No. Every integration is configured against one severity level and "only alerts matching that severity trigger the integration". Severity is a routing key: configure an integration per severity you want routed. [01-01](../01-monitoring-views/01-monitoring-views-and-core-concepts.md#the-vocabulary), [01-03](../01-monitoring-views/03-alerts-the-debug-page-and-external-systems.md#sending-alerts-out)
</details>

**Q5 · D8** An administrator subscribes Kofi to the `Commerce operations` view. Kofi receives no alerts. Why?

<details><summary>Answer</summary>

Subscribing grants nothing: to receive alerts a subscriber needs **Viewer on the monitored resources and on the monitoring view**. Monitoring views are filesystem resources with ordinary permissions. [01-01](../01-monitoring-views/01-monitoring-views-and-core-concepts.md#1-create-the-view-and-add-rules), [01-04](../01-monitoring-views/04-monitoring-faq-and-the-check-groups-sunset.md#what-permissions-does-a-monitoring-view-need)
</details>

**Q6 · D8** You snooze a monitor alert and a health check alert for two hours. Each condition recurs within the hour. Which one notifies you again?

<details><summary>Answer</summary>

The **health check** alert. "Unlike health check alerts, snoozed monitor alerts remain snoozed even if they re-fire." [01-01](../01-monitoring-views/01-monitoring-views-and-core-concepts.md#4-snooze)
</details>

**Q7 · D8** You want to find every resource in a workflow that nobody is watching. Which Workflow Lineage colour mode, and which legend key?

<details><summary>Answer</summary>

**Monitoring status** under *Health*; the key *No monitors configured* marks a resource that can be monitored but no rule targets. A newly created rule shows as healthy until it has run once. [01-01](../01-monitoring-views/01-monitoring-views-and-core-concepts.md#6-see-coverage-not-just-alerts)
</details>

**Q8 · D3** A validation error in a function ("refund exceeds policy") keeps triggering your failure alert. Which rule should you have used?

<details><summary>Answer</summary>

A **non-user-facing** failure rule (count or rate), which excludes user-facing errors thrown by function code. A user-facing error is the function doing its job. [01-02](../01-monitoring-views/02-monitoring-rules-reference.md#functions)
</details>

**Q9 · D3** Why does the *function failure rate in window* rule have two conditions?

<details><summary>Answer</summary>

It is a **composite** rule: a failure percentage **and** a minimum run count, both of which must reach a severity. The run-count condition "prevents alerts based on too little data" on low-traffic functions. [01-02](../01-monitoring-views/02-monitoring-rules-reference.md#functions)
</details>

**Q10 · D6** An automation stopped running and nobody noticed for a week. Which rule has a fixed high severity and would have caught it?

<details><summary>Answer</summary>

**Automation has been disabled by the system** (limits or a trigger cycle), fixed high. *No new evaluations* and *no new triggers* catch quieter failures. [01-02](../01-monitoring-views/02-monitoring-rules-reference.md#automations)
</details>

**Q11 · D8** A nightly sync ran, found no new rows, and committed an empty transaction. The *time since job last succeeded* monitor is green and the *time since last updated* health check is red. Which is right?

<details><summary>Answer</summary>

Both, about different things. The rule passes when "The job succeeded, but no new data was added"; the check measures time since the last transaction and, unless *ignore empty transactions* is on, counts the empty one. Rule: the job ran. Check: data arrived. [01-02](../01-monitoring-views/02-monitoring-rules-reference.md#time-series-syncs-datasets-geotemporal-observations), [02-03](../02-health-checks/03-checks-reference.md#time-checks)
</details>

**Q12 · D8** A Slack alert shows `ri.foundry.main.dataset.abc123` instead of the dataset's name. What decides that?

<details><summary>Answer</summary>

The Slack source's **exportable markings**: the name appears only when every marking and organization on the resource is in that list; otherwise the RID. Enabling exports needs the Information security officer role; listing a marking needs its Apply and Remove permissions. [01-03](../01-monitoring-views/03-alerts-the-debug-page-and-external-systems.md#slack)
</details>

**Q13 · D8** Which resources can be monitored only with monitoring views, and which checks exist only as health checks?

<details><summary>Answer</summary>

Only views: Data Connection agents, OSv2 objects and links, streaming datasets, model live deployments, time series syncs, automations. Only checks: content, freshness and schema checks, data expectations, OSv1 and foundry-sync checks. [01-04](../01-monitoring-views/04-monitoring-faq-and-the-check-groups-sunset.md#do-all-health-checks-exist-as-monitoring-rules)
</details>

**Q14 · —** Can you create a new check group today?

<details><summary>Answer</summary>

No: check groups are in sunset; existing ones can be edited and should be upgraded to monitoring views, which keep the checks working unchanged. [01-04](../01-monitoring-views/04-monitoring-faq-and-the-check-groups-sunset.md#check-groups)
</details>

## 02 — Health checks

**Q15 · D8** A job status check sits on a downstream dataset. The build fails upstream. What does the check report?

<details><summary>Answer</summary>

Nothing: the dataset "will register as having a canceled build and the job status will not be evaluated". A **schedule status** check on the schedule would have fired. [02-01](../02-health-checks/01-health-checks-and-the-types-of-checks.md#job-build-schedule)
</details>

**Q16 · D8** A schedule already has a schedule status check. Should you add job status checks to its intermediate datasets?

<details><summary>Answer</summary>

No: "any job failing on the schedule will trigger a schedule status check". Job status is for datasets you want to watch independently of the rest of the build. [02-01](../02-health-checks/01-health-checks-and-the-types-of-checks.md#job-build-schedule), [02-03](../02-health-checks/03-checks-reference.md#status-checks)
</details>

**Q17 · D8** A pipeline runs on time every night but the newest rows are two days old. Which freshness check catches it, and why not the others?

<details><summary>Answer</summary>

**Data freshness**: it compares the last transaction with the maximum of a timestamp column. *Time since last updated* only sees that a transaction committed; *time since job last succeeded* only sees that the job ran. [02-01](../02-health-checks/01-health-checks-and-the-types-of-checks.md#three-freshnesses)
</details>

**Q18 · D8** A wrong `customerId` must never reach the Ontology. Health check or data expectation?

<details><summary>Answer</summary>

A **data expectation**: it runs during the build and can abort it. A health check runs after the data is committed and only tells someone. [02-01](../02-health-checks/01-health-checks-and-the-types-of-checks.md#after-the-build-or-inside-it)
</details>

**Q19 · D8** A *time since last updated* check has a one-hour threshold and the dataset updates every 58 minutes. When does the check run, and does it ever fail?

<details><summary>Answer</summary>

On each update (passing) and at the threshold; each update resets the timer to now plus one hour, so with 58-minute updates the check "will continue to pass on dataset update, and never reach the threshold you have configured". At 62 minutes it fails at the hour mark and passes again on the late update. [02-02](../02-health-checks/02-schedules-watching-and-notifications.md#when-a-time-based-check-runs)
</details>

**Q20 · D8** Why do the docs recommend a *looser* threshold for Critical than for Moderate?

<details><summary>Answer</summary>

They are two thresholds on one metric: Moderate at the first sign (a build at 5 minutes), Critical when it's unmistakable (10 minutes). Watchers can choose *Only critical*. [02-02](../02-health-checks/02-schedules-watching-and-notifications.md#who-is-told)
</details>

**Q21 · D8** You set a fixed *row count ≥ 100,000* on a growing table. What does the reference offer instead?

<details><summary>Answer</summary>

**Median deviation**: a threshold in approximate standard deviations from the median of recent builds, computed from the median absolute deviation so one freak build doesn't skew it. [02-03](../02-health-checks/03-checks-reference.md#approximate-standard-deviation)
</details>

**Q22 · D8** Which check proves a column is a primary key, and why not *approximate unique percentage*?

<details><summary>Answer</summary>

The **primary key** check: 100% unique and non-null. The unique-percentage check is approximate and "not suitable for checking if a column is a primary key". [02-03](../02-health-checks/03-checks-reference.md#content-checks)
</details>

**Q23 · D8** A dataset feeding the Ontology may gain columns but must never lose one. Which schema comparison type?

<details><summary>Answer</summary>

`COLUMN_ADDITIONS_ALLOWED_STRICT`: extra columns allowed, and each new column is added to the check so it can't go missing later. [02-03](../02-health-checks/03-checks-reference.md#schema-checks)
</details>

**Q24 · D8** A build fails with "Waiting for input dependencies to be computed". Where is the problem?

<details><summary>Answer</summary>

Upstream: the schedule was cancelled because an upstream dataset failed. Open the build report and fix "the first dataset in this build that failed". [02-04](../02-health-checks/04-builds-and-checks-faq-health-checks-in-a-marketplace-product.md#the-faq-as-a-triage-card)
</details>

**Q25 · —** You package a pipeline into a Marketplace product. Which health checks travel with it automatically, which by choice, and which not at all?

<details><summary>Answer</summary>

**Data expectations** travel automatically with the transformation; dataset checks by selecting them from the *Suggestions*; checks that refer to another dataset, use path configuration or create an Issue are not supported. Monitoring views are added as inputs the installer supplies. [02-04](../02-health-checks/04-builds-and-checks-faq-health-checks-in-a-marketplace-product.md#health-checks-in-a-marketplace-product)
</details>

## 03 — Ontology and AIP observability

**Q26 · D6** An automation runs an action that runs a function. In the function's run history, what are the caller and the source executor?

<details><summary>Answer</summary>

Caller: the **action** (the immediate parent). Source executor: the **automation** (the first executable resource in the chain). Log search and log permissions are keyed to the source executor. [03-01](../03-ontology-and-aip-observability/01-overview-and-run-history.md#the-run-history-table)
</details>

**Q27 · D3** How far back does run history go?

<details><summary>Answer</summary>

The run-history page says 30 days; the Observability overview says seven. The docs disagree (RQ-26), so plan for seven and treat older rows as a bonus. Metrics are 30 days on every page. [03-01](../03-ontology-and-aip-observability/01-overview-and-run-history.md#seven-days-or-thirty-rq-26)
</details>

**Q28 · D7** Daniel suspects the agent's prompt is the problem. Where does he see the prompt, the response and the token usage of one call?

<details><summary>Answer</summary>

In the **trace view**: select the LLM span to open its Trace Log Details, which include the prompt, response and token usage. Reading it needs log access (Q30). [03-02](../03-ontology-and-aip-observability/02-trace-views-service-logs-and-debugging.md#the-trace-view)
</details>

**Q29 · D3** A function reads a `Customer` whose email is hidden from most users by a property policy, then logs the whole object. Who can read the email in the logs?

<details><summary>Answer</summary>

Anyone who meets the log-access requirements: the platform "does not propagate markings" from the data into the logs; only the markings the administrator applied when enabling log access are enforced. The developer's rule is never to log sensitive data. [03-03](../03-ontology-and-aip-observability/03-log-search-and-log-permissions.md#who-may-read-logs), [03-02](../03-ontology-and-aip-observability/02-trace-views-service-logs-and-debugging.md#writing-logs-that-help)
</details>

**Q30 · D8** A developer with Editor on a function cannot see the logs of a colleague's execution from yesterday. What are the three requirements?

<details><summary>Answer</summary>

Edit on the **source executor**; **log access enabled** on its project (and attributed project) or by a resource-level override, by an Information security officer or Enrollment administrator; and **every marking** applied to the logs. Editor alone covers only their own executions from the past 24 hours. [03-03](../03-ontology-and-aip-observability/03-log-search-and-log-permissions.md#who-may-read-logs)
</details>

**Q31 · D8** Which role lets you view metrics, and which lets you view run history?

<details><summary>Answer</summary>

**Viewer** for metrics (`foundry-telemetry-service:read-metrics`); **Editor** for run history and logs (`foundry-telemetry-service:view-execution-history`). Both can be granted through custom roles. [03-03](../03-ontology-and-aip-observability/03-log-search-and-log-permissions.md#who-may-read-logs)
</details>

**Q32 · D8** You search logs for `error` and find nothing, though the ERROR entries say "Error:". Why?

<details><summary>Answer</summary>

Log search is **case-sensitive**: `Error` finds `Error`, not `error` or `ERROR`. Use `*` as a wildcard, for example `*rror*`. [03-03](../03-ontology-and-aip-observability/03-log-search-and-log-permissions.md#searching-and-reading)
</details>

**Q33 · D6** In the *Failure rate* colour mode an automation that failed twice today shows as *No runs*. Is the automation healthy?

<details><summary>Answer</summary>

Unknown from that mode: automations "are not yet supported" there and show *No runs* even when they ran. Use the *Monitoring status* mode with automation rules, or the automation's run history. [03-04](../03-ontology-and-aip-observability/04-metrics-performance-and-observability-dashboards.md#the-failure-rate-colour-mode)
</details>

**Q34 · D8** The *Failure rate* legend offers a date range. Can you colour by the last 30 days?

<details><summary>Answer</summary>

No: the longest window is **one day**; the default is the past four hours. For longer periods use the per-resource metrics or run history. [03-04](../03-ontology-and-aip-observability/04-metrics-performance-and-observability-dashboards.md#the-failure-rate-colour-mode)
</details>

**Q35 · D7** A trace shows twenty identical short LLM spans in sequence. Which two performance signs is that, and what does the page suggest?

<details><summary>Answer</summary>

**Repeated operations** and **sequential bottlenecks**: unbatched calls that could run in parallel or be batched. The page also suggests choosing a different model for time-sensitive steps. [03-04](../03-ontology-and-aip-observability/04-metrics-performance-and-observability-dashboards.md#performance-monitoring)
</details>

**Q36 · D8** What can an observability dashboard do that the built-in views can't, and what can it not do?

<details><summary>Answer</summary>

It puts several resources' metrics (functions, actions, compute modules) on one page with a shared time range, laid out to match the workflow; it cannot alert. Rules alert; the dashboard is for the person the alert woke. [03-04](../03-ontology-and-aip-observability/04-metrics-performance-and-observability-dashboards.md#observability-dashboards)
</details>

---
[Module index](README.md) · Next module: [99 — Reference](../99-reference/README.md)
