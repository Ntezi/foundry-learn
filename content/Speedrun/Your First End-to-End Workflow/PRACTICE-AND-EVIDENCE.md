# E2E practice and evidence

Updated September 9, 2026. **Learn complete: 47/47. Notes: Ready for Review. Current live practical verification: Blocked at Foundry sign-in.** Historical build observations remain available; no fresh Foundry build/action success is claimed.

The user has authorized completing this course. Notes were revised before attempting practical verification. The current enrollment from workspace context, `https://unrulycorp.palantirfoundry.com/`, redirects to its sign-in screen. Confirm the intended enrollment if the historical training resources are elsewhere. Do not duplicate resources until the existing build is inspected.

## Recorded existing resources — historical, not freshly verified

| Resource | Prior record |
|---|---|
| Training location | /Hence/Exploration/Marius/Application Developer Training |
| Pipeline | Orders Pipeline; ri.eddie.main.pipeline.1ad235c4-da1d-46d3-a587-10a49fa3c5ab |
| Output | all_orders; ri.foundry.main.dataset.bbfd6b4f-6eea-473d-bb9e-ad56672a4b1d |
| Prior successful build | ri.foundry.main.build.e9ce4ac3-9939-4447-89d2-3b3193828a48; Aug 15 |
| Object type | Marius Order / MariusTrainingOrder; ri.ontology.main.object-type.b5b36a53-8eb5-481c-a6b7-ef05bc1627d3; historical 1,492 indexed objects |
| Application | Marius Orders Inbox |
| Prior assignment test | Course Order ID below; Gail Weber / assigned; prior note says it already showed Gail before submission |

## New local evidence — source files only

Inspected the existing course CSVs on September 9; this does not query Foundry or verify its deployed pipeline.

| File | Rows | Relevant findings |
|---|---:|---|
| orders_office_goods.csv | 746 | 10 columns; no empty orderId or duplicated nonempty orderId within this file; days_until_due is supplied |
| orders_bureau_transactional_system.csv | 746 | 9 columns; no empty order_id or duplicated nonempty order_id within this file; days_until_due is supplied |
| consolidated_customers.csv | 59 | 4 columns; Office Goods key empty in 8 rows and Bureau key empty in 9; no duplicate nonempty key within either source-key column |

The raw order row sum is 1,492, consistent with the old object count but not proof of the live output. Cross-source key collisions, unmatched joins and exact live output remain to verify. Missing master keys can be legitimate for customers present in only one source; they should not be silently classified as bad data.

## Practical sequence — reuse and verify before rebuilding

Budget: one two-hour block after access and understanding review. If repairs exceed the allowance, record the specific blocker and carry remaining work forward. This is a verification budget for an existing build, not a promise to rebuild everything in two hours.

<a id="p1"></a>
### P1 — Location and ingestion (15 minutes)

**Objective:** identify the intended training Project, three inputs and their schemas. **Requirements:** signed-in training enrollment, access to the Project and datasets. **Steps:** locate the historical folder; match datasets to the three course files; inspect schemas/counts and source identity; only upload the supplied training files if missing. Marketplace is an alternative, not an additional installation. **Expected:** three usable datasets with source-specific columns. **Verification:** record dataset IDs, row counts and schema differences. **Failures:** wrong folder, parsing errors, missing rights, duplicate names. **Reflection:** explain why a snapshot is not a live integration.

<a id="p2"></a>
### P2 — Pipeline and all_orders contract (25 minutes)

**Objective:** verify the two clean/enrich branches, union and materialized output. **Requirements:** input access and Pipeline Builder rights. **Steps:** inspect the recorded pipeline; verify casts, missing-key filters, rename/drop operations, source-specific customer joins and distinct union inputs; inspect a successful build and the 11-column output. Correct missing steps only after comparing with the notes; then save/deploy/build as needed. **Expected:** combined Orders at the intended grain. **Verification:** row counts before/after, join settings, key uniqueness across sources, unmatched customers, schema and build outcome. **Failures:** wrong join key, duplicate master matches, mismatched schema, preview confused with built data. **Reflection:** explain which source contract would break the Ontology.

<a id="p3"></a>
### P3 — Ontology identity and indexing (15 minutes)

**Objective:** verify the existing MariusTrainingOrder mapping. **Requirements:** access to the approved training Ontology. **Steps:** match object type to all_orders; check Order Id primary key, Item Name title and 11 mapped properties; inspect indexing and a known object. Use the approved branch process if changes are required. **Expected:** indexed objects with correct identity/properties. **Verification:** object type ID, dataset identity, index state, count and sample. **Failures:** wrong Ontology, naming collision, nonunique key, pending indexing. **Reflection:** explain why a title cannot replace identity.

<a id="p4"></a>
### P4 — Workshop data and interaction (20 minutes)

**Objective:** verify shared filtering, selection/details, charts and published app. **Requirements:** correct module and object access. **Steps:** inspect the existing table’s filtered object set; confirm filter output is used by that definition and the pie/bar charts; confirm active selection drives details; inspect column order and published View behavior. Repair only mismatches with the course. **Expected:** table/chart scope agrees and details reflect the chosen Order. **Verification:** apply one filter, compare counts/scope, select a different object and observe details. **Failures:** unconnected criteria, unfiltered chart, wrong active object, unpublished changes. **Reflection:** explain the three variables: base set, filtered set, active object.

<a id="p5"></a>
### P5 — Assignment rule and UI binding (15 minutes)

**Objective:** verify a declarative Action accepting Assignee and always setting Status to assigned. **Requirements:** training object edit support and authorized Action access. **Steps:** inspect Allow edits, Action target/type, input and static rule, learner-only course execution audience, absence of an editable Status input, and button default to the active Order. Reuse rather than recreate a working Action. **Expected:** governed assignment with the intended target. **Verification:** inspect rule and form separately. **Failures:** wrong target type, status left user-editable, overbroad access, wrong default. **Reflection:** explain why the form is not the authorization boundary.

<a id="p6"></a>
### P6 — End-to-end test, lineage and reflection (30 minutes)

**Official test objective:** assign the training order and verify persisted state. In published View, filter Order ID to:

`8d64e941-799c-4e35-b913-d0e3475c307ec206b101-f8b3-4bbe-a1f4-c674dc3124c8`

Confirm one target, record its actual before-values, select it, open Assign, set Gail Weber and submit once. Inspect success feedback **and** Assignee/Status afterward. If already Gail/assigned, report this honestly; do not invent an Alfredo→Gail transition or arbitrarily reset data to manufacture one.

Then perform the current conclusion’s **read-only** Workflow Lineage walkthrough: open from Workshop using Cmd+i/Ctrl+i, inspect application/object/Action dependencies, locate the Action’s button and downstream uses of properties. Do not perform bulk delete/publish/security changes simply because the lesson lists those capabilities.

**Expected:** correct target and final assignment, understandable dependency graph. **Verification:** before/after values, object ID, Action outcome, published UI state and lineage observations. **Failures:** stale display, access denial, different active target, indexing delay, missing historical resources. **Reflection:** state which pipeline/model/UI contracts a future teammate must preserve.

## Remaining evidence to record

For each step: date, environment, resource identity, expected/actual result, error or evidence link, repair, and reflection. No new live results have been populated while sign-in is pending. Extended concurrency, alternate-user security and source-system integration are follow-up learning, not verified by this course certificate.

## ACTION REQUIRED FROM ME

Sign in to the opened Unruly Foundry tab, or provide the correct enrollment URL for Marius Orders Inbox. Reply “signed in” once access is available. Do not send passwords. The existing application’s fresh verification will continue from P1; Learn course completion is already confirmed independently.
