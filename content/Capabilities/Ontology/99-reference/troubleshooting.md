# Troubleshooting

*Sources: the linked notes and the official pages they cite · compiled October 3, 2026 · Ready for Review*

Symptom first, then the likely causes in the order to check them, then where the full explanation is. This page only routes; the notes hold the reasoning.

## "I can't see it"

| Symptom | Check, in order | Go to |
|---|---|---|
| An object doesn't show up for one user | 1. Type permission (can they see the type?) 2. Datasource or object policy (row) 3. Property policy (shows as null) 4. Marking 5. Is it indexed yet? Use **Check access** | [12-01 Five questions](../12-security-and-governance/01-two-layer-permission-model.md#when-an-object-doesnt-show-up) |
| Some properties are blank for one user, filled for another | Property security policy, or no access to one MDO datasource (its columns read as null) | [12-03](../12-security-and-governance/03-object-and-property-security.md), [04-02](../04-object-types/02-backing-datasources-and-mapping.md#step-3--several-datasources-for-one-type-mdos) |
| A portal or service user sees nothing | The object policy has no positive branch for service users | [12-03](../12-security-and-governance/03-object-and-property-security.md) |
| A new function isn't in the Workshop picker | Permissions still propagating after tagging; or the user lacks Viewer on the repository | [09-05](../09-functions/05-writing-functions-in-practice.md#1-setting-up), [09-03](../09-functions/03-function-lifecycle.md#who-can-run-it) |
| A saved list or exploration shared with a colleague is empty for them | Sharing an artifact doesn't share the data | [10-02](../10-applications/02-object-views-and-object-explorer.md#stop-2--the-question-that-isnt-about-one-order) |

## "The data is wrong or late"

| Symptom | Check, in order | Go to |
|---|---|---|
| Objects missing or stale after a pipeline run | Funnel job failed; hydration still running; duplicate primary keys; Sync Propagation Delay alert | [13-02 Part 2](../13-backend-architecture/02-indexing-and-funnel.md#part-2--my-objects-are-wrong-or-missing) |
| A user's edit was overwritten by the nightly sync | The datasource conflict strategy is *apply most recent value* | [08-01](../08-actions/01-action-types.md#when-the-source-and-an-edit-disagree) |
| Edits vanished after a pipeline change | Primary keys changed (non-deterministic IDs, mutable attribute as key) | [01-02](../01-foundations/02-keys-and-identity.md#mistakes-that-orphan-edits), [15-04](../15-advanced-patterns/04-entity-resolution-across-sources.md#4-stable-master-ids-the-crosswalk) |
| A "top 10" chart isn't the real top 10 | Approximate aggregation above the bucket limit | [13-05](../13-backend-architecture/05-limits-usage-and-compute.md#aggregations-arent-always-exact) |
| A new property doesn't appear on the object page | The configured Object View was edited, so it no longer updates automatically | [10-02](../10-applications/02-object-views-and-object-explorer.md#stop-5--daniel-configures-the-order-view) |
| Ontology metrics show "No usage" for a busy type | Internal tables not configured, or the metrics toggle is off | [14-06](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md#reference-card-the-instruments) |

## "Search doesn't find it"

| Symptom | Likely cause | Go to |
|---|---|---|
| Part of a word doesn't match | Tokens are whole words; use a prefix (`run*`) | [10-07 lab](../10-applications/07-searching-the-ontology.md#the-lab) |
| A code with underscores can't be found by a fragment | Underscores and periods stay inside one token | [10-07](../10-applications/07-searching-the-ontology.md#the-one-idea-analyzers) |
| `ABC*` finds nothing but `abc*` does | Wildcard queries aren't analyzed; case must match the stored tokens | [10-07](../10-applications/07-searching-the-ontology.md#the-lab) |
| `*smith` returns nothing | Leading wildcards need a render hint, and work only in property filters (RQ-29) | [10-07](../10-applications/07-searching-the-ontology.md#sources-disagree) |
| A two-word search returns too much | The global bar ORs the words; quote the phrase | [10-07](../10-applications/07-searching-the-ontology.md#the-lab) |
| A derived property can't be searched | Derived properties aren't usable in text search | [05-05](../05-properties/05-derived-properties.md) |
| An agent misses an answer that's in the documents | Retrieval failed, not the LLM: check the retrieved chunks; try query augmentation or hybrid search | [16-02](../16-ai-and-agents/02-semantic-search-and-embeddings.md#when-basic-retrieval-isnt-enough) |

## "The action failed" or "did something odd"

| Symptom | Likely cause | Go to |
|---|---|---|
| Users see the button but can't submit | Submission criteria; check the metrics' *authentication* failure count | [08-03](../08-actions/03-submission-criteria.md), [14-06](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md#every-week-ontology-owner-about-30-minutes) |
| The same refund was issued twice | Concurrent submissions; no idempotency check in criteria | [08-07 Incident 1](../08-actions/07-consistency-reverts-and-logs.md#incident-1--two-refunds-for-one-order) |
| A re-route failed "for no reason" and wasn't retried | Conflict with another edit; actions with external calls aren't retried automatically | [08-07 Incident 2](../08-actions/07-consistency-reverts-and-logs.md#incident-2--the-re-route-that-failed-for-no-reason) |
| The whole action failed because of a notification | Default "require all recipients to have permissions" (RQ-21) | [08-05](../08-actions/05-side-effects.md#notifications) |
| An edit function "ran" but nothing changed | Edit functions only apply through an action; Automate ignores returned edits | [09-02](../09-functions/02-query-functions-and-ontology-edits.md#the-two-surprises) |
| A function can't see the edits it just made | Not a staged-write function | [16-04](../16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md#staged-writes-the-execution-model-underneath) |
| An automation ran its effect twice | At-least-once execution; make the action idempotent | [10-06](../10-applications/06-automate-and-ontology-events.md#what-can-go-wrong) |
| An automation stopped | The owner's account was disabled | [10-06](../10-applications/06-automate-and-ontology-events.md#why-each-choice) |
| "Undo" isn't possible any more | Revert is offered only in the success toast, to the user who applied it, and fails if anything edited the object since | [08-07 Incident 3](../08-actions/07-consistency-reverts-and-logs.md#incident-3--undo-after-lunch) |

## "My function fails when published"

| Symptom | Likely cause | Go to |
|---|---|---|
| Works in live preview, times out published | Different runtime limits | [09-05](../09-functions/05-writing-functions-in-practice.md#1-setting-up) |
| Dataset read works in preview, fails published | Functions can't read datasets through the platform SDK | [09-05](../09-functions/05-writing-functions-in-practice.md#4-calling-outside-the-function) |
| External call returns HTTP 407 | Outside the source's egress policy | [09-05](../09-functions/05-writing-functions-in-practice.md#4-calling-outside-the-function) |
| Array property changes don't save (Python) | The list was mutated in place; assign a new list | [09-05](../09-functions/05-writing-functions-in-practice.md#2-writing-edits) |
| Callers broke after a release | A breaking change in a minor version; consumers on a range picked it up | [09-03](../09-functions/03-function-lifecycle.md#111--the-accident) |

## "The save or merge failed"

| Symptom | Likely cause | Go to |
|---|---|---|
| *Save* is greyed out | Someone saved since you started; choose *Update* | [14-01](../14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md#3-when-two-people-edit-at-once) |
| A save fails with an `OntologyMetadata:` or `Phonograph2:` error | Search the docs for the error name | [14-01](../14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md#4-when-a-save-goes-wrong) |
| A merge fails after rebase | You kept your branch's version of a datasource or conditional-formatting rule that main replaced | [14-02](../14-lifecycle-and-operations/02-branching-and-proposals.md#day-3--main-moves-on) |
| A type can't be edited on the branch | It was created in Pipeline Builder | [14-02](../14-lifecycle-and-operations/02-branching-and-proposals.md#days-14--work-on-the-branch) |
| Import fails with `UnreferencedRuleSets` | Conditional formatting can only be imported into its own ontology | [14-05](../14-lifecycle-and-operations/05-migration-and-export-import.md#the-four-routes) |
| A branch's objects disappeared | The branch went inactive after 35 days | [14-02](../14-lifecycle-and-operations/02-branching-and-proposals.md#after--the-branchs-life-cycle) |
| A saved scenario is gone | Scenarios are deleted after 30 days | [15-02](../15-advanced-patterns/02-scenarios.md#what-a-scenario-is-not) |

---
[Reference index](README.md) · Previous: [Limits and thresholds](limits-and-thresholds.md) · [Ontology home](../README.md)
