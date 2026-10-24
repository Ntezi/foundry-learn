# 04 — Monitoring FAQ and the check-groups sunset

*Sources: [Monitoring FAQ](https://www.palantir.com/docs/foundry/monitoring-views/monitoring-faq/) · [Check groups (Sunset)](https://www.palantir.com/docs/foundry/monitoring-views/check-groups/) · checked October 23, 2026 · Ready for Review*

Two pages that answer the questions module 01 raises. The FAQ settles the **coverage** question between rules and checks, and the three organising questions (why rules, when a new view, what permissions). The check-groups page documents the feature monitoring views replaced, read here for the one thing it still owns, the **diagnosis page**, and for the exam's sake, since "check group" still appears in older material.

## The FAQ

### Do all health checks exist as monitoring rules?

**[Docs]** No: "the most important health checks have analogous monitoring rules", and the recommendation is "a combination of monitoring rules and health checks together in a monitoring view". The coverage split:

| Only monitoring views | Only health checks | Rules that **replaced** checks |
|---|---|---|
| Data Connection agents; objects and links in Object Storage v2; streaming datasets; live deployments of models; time series syncs; automations | Content, freshness and schema checks; data expectations; Object Storage v1 (Phonograph) and foundry-sync checks | Consecutive schedule failures (for schedule status checks); schedule duration; dataset *time since job last succeeded* |

**[Explanation]** Read with [02](02-monitoring-rules-reference.md#time-series-syncs-datasets-geotemporal-observations): the replacement is not one-for-one. *Time since job last succeeded* replaces the schedule-flavoured use of the freshness check (did the job run?) but not the data-flavoured one (did data arrive?), which stays a health check. The OSv1 column also explains [Ontology 13-04](../../Ontology/13-backend-architecture/04-object-storage-v1-vs-v2.md)'s line that health checks become monitoring views when moving to OSv2: the Phonograph checks have no OSv2 equivalent, the object and link rules in 02 take over.

### Why use monitors over health checks?

**[Docs]** "Monitors cover an entire scope rather than a single resource": a rule on all agents in a project also covers "any further agents added into that Project at a later time".

### When should I create a new monitoring view?

**[Docs]** "Each monitoring view should relate to a set of users who care about the monitors that are in that view." Users [a, b, c] who care about projects [x, y, z] get one view holding those projects; a team that cares only about agents gets one view of all agents in all projects.

**[Explanation]** The unit of a view is an **audience**, not a system. That is why module 01's Kestrel design has two views rather than one per project: the commerce team and the Kestrel Pay team are different sets of people, and a view's subscriptions and routing are per view (SOPs are per rule).

### What permissions does a monitoring view need?

**[Docs]** Three layers, because "a monitoring view is a filesystem resource": permission to the project or folder the view is saved in; access to the project resources being monitored, to set up rules or receive alerts; and, for subscribers, the same, since "those new subscribers will not receive alerts on any resources if they do not have explicit access permissions to that monitoring view", even when a fully-permissioned user subscribed them.

**[Explanation]** The last sentence is the exam trap: subscribing someone is not granting them anything. A subscriber silently receives nothing until they hold Viewer on both the view and the resources, which is the ordinary discretionary model of [Security 01-02](../../Security/01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md) with no monitoring-specific shortcut.

## Check groups

**[Docs]** The banner: check groups "are in the sunset phase of development and will be deprecated at a future date. Full support remains available." Existing groups can be edited; "no new check groups can be created"; migrate to monitoring views, which give "the functionality of check groups as well as enhanced scope-based monitoring capability". Palantir Support helps with migration.

### What they were

**[Docs]** A grouping of related datasets, such as a physical pipeline, for subscription. The key sentence: "Check groups do not run your checks or have any effect on when your checks will run." They were a way to subscribe to a set of checks and receive an **aggregated email digest**, at a configurable frequency (every 15 minutes for an urgent pipeline, weekly for a quiet one), with an *Only when failing* option. Subscribing to a group did not subscribe you to its individual checks. A group had a name, description, a schedule (the digest frequency, "about checks only") and its checks; subscribing was the *Watch* button, and view permission on the group was needed, granted by the owner through *Manage permissions*.

### The diagnosis page

**[Docs]** *Actions > Troubleshoot checks* opened a page in four parts, built for incidents that "often span multiple interconnected resources":

| Part | What it did |
|---|---|
| **Check group details** | Description and a status diagram of checks by severity; snoozed checks as faded striped bars |
| **Failure spotlight** | Clusters of failing checks with common properties (type, resource, data source) that "can point to a single root cause"; clicking a cluster highlights its checks |
| **List of checks** | Currently failing checks, grouped by *Build* (same dataset build), *Snoozed together* (same time and reason) or *Related* (both strategies in turn); view options *Hide snoozed* and *Hide finished duration checks*; multi-select with Cmd/Ctrl opens an actions toolbar |
| **Context panel** | **Comments** (visible to anyone who can view the group; posting while checks are selected references their target resources), **Issues** (open Foundry Issues on the monitored resources: "Check the issues tab before starting to troubleshoot a check"), **Schedules** (every schedule touching the targets, with a run button), **Source information** (the originating resource; for a code repository, the **commit history** of the dataset that caused the failure) |

**[Docs]** Snoozing: per check (a coloured button while snoozed; an orange dot for *recently snoozed*, with the history on hover) or for several at once with one time frame and reason; un-snoozing several needs them selected again.

**[Explanation]** Two of these ideas survived into monitoring views as described in [01](01-monitoring-views-and-core-concepts.md): snoozing with a reason, and the jump from an alert to the resource's lineage. Two did not, or not yet: the failure spotlight's clustering, and the context panel's comments, issues and commit history. The alert debug page ([03](03-alerts-the-debug-page-and-external-systems.md#the-alert-debug-page)) covers functions and actions with an SOP link instead. So for a dataset pipeline, the richest incident view today is still the Data Lineage colouring and the Health tab ([02-01](../02-health-checks/01-health-checks-and-the-types-of-checks.md)), not a monitoring-view page.

## For Kestrel

**[Example]** *Considered, not adopted*: a check-group migration. 17-02 records no check groups for Kestrel, and new ones can't be created, so the two monitoring views in [01](01-monitoring-views-and-core-concepts.md#for-kestrel) start from nothing. One habit from the diagnosis page is kept as an operating rule: **check Issues before triaging** an alert, because someone may already be handling it; module 04 puts it as the first line of every SOP.

---
[Module index](README.md) · Previous: [03 — Alerts: the debug page and external systems](03-alerts-the-debug-page-and-external-systems.md) · Next module: [02 — Health checks](../02-health-checks/README.md)
